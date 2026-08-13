'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { getAssignmentSubmissions, gradeSubmission } from '@/lib/api/assignments';
import Navbar from '@/components/shared/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/api/error';
import { Submission } from '@/types';

export default function AssignmentSubmissions() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const assignmentId = params.id as string;
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [gradeForm, setGradeForm] = useState({ marks: '', feedback: '', status: 'Graded' });
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    const data = await getAssignmentSubmissions(assignmentId);
    setSubmissions(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    if (isLoading) return;
    if (!user || user.role !== 'Teacher') { router.push('/login'); return; }

    const loadInitialSubmissions = async () => {
      const data = await getAssignmentSubmissions(assignmentId);
      setSubmissions(data ?? []);
      setLoading(false);
    };

    void loadInitialSubmissions();
  }, [user, isLoading, router, assignmentId]);

  const handleGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setSubmitting(true);
    try {
      await gradeSubmission(selected.id, {
        marks: parseInt(gradeForm.marks),
        feedback: gradeForm.feedback,
        status: gradeForm.status
      });
      toast.success('Submission graded successfully');
      setSelected(null);
      load();
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, 'Failed to grade'));
    } finally {
      setSubmitting(false);
    }
  };

  const statusColor: Record<string, string> = {
    Submitted: 'bg-blue-100 text-blue-700',
    Graded: 'bg-green-100 text-green-700',
    Late: 'bg-orange-100 text-orange-700',
    Rejected: 'bg-red-100 text-red-700',
  };

  if (isLoading || loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" onClick={() => router.back()}>← Back</Button>
          <h2 className="text-2xl font-bold text-gray-900">
            Submissions ({submissions.length})
          </h2>
        </div>

        {submissions.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">No submissions yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {submissions.map(s => (
              <Card key={s.id}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{s.studentName}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[s.status]}`}>
                          {s.status}
                        </span>
                        {s.isLate && <Badge variant="destructive" className="text-xs">Late</Badge>}
                      </div>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{s.answerText}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Submitted: {new Date(s.submittedAt).toLocaleString()}</span>
                        {s.marks !== null && (
                          <span className="font-medium text-green-600">
                            Marks: {s.marks}/{s.maxMarks}
                          </span>
                        )}
                      </div>
                      {s.feedback && (
                        <p className="text-xs text-gray-500 mt-1 italic">Feedback: {s.feedback}</p>
                      )}
                    </div>
                    <Button size="sm" className="ml-4"
                      onClick={() => {
                        setSelected(s);
                        setGradeForm({
                          marks: s.marks?.toString() ?? '',
                          feedback: s.feedback ?? '',
                          status: 'Graded'
                        });
                      }}>
                      {s.status === 'Graded' ? 'Re-grade' : 'Grade'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Grade Submission — {selected?.studentName}</DialogTitle>
            </DialogHeader>
            {selected && (
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg border max-h-32 overflow-y-auto">
                  <p className="text-sm text-gray-700">{selected.answerText}</p>
                </div>
                <form onSubmit={handleGrade} className="space-y-3">
                  <div className="space-y-1">
                    <Label>Marks (max {selected.maxMarks})</Label>
                    <Input type="number" min="0" max={selected.maxMarks}
                      value={gradeForm.marks}
                      onChange={e => setGradeForm({...gradeForm, marks: e.target.value})}
                      required />
                  </div>
                  <div className="space-y-1">
                    <Label>Feedback (optional)</Label>
                    <Textarea value={gradeForm.feedback}
                      onChange={e => setGradeForm({...gradeForm, feedback: e.target.value})}
                      placeholder="Write feedback for the student..." rows={3} />
                  </div>
                  <div className="space-y-1">
                    <Label>Status</Label>
                    <Select value={gradeForm.status} onValueChange={v => setGradeForm({...gradeForm, status: v ?? ''})}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Graded">Graded</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? 'Saving...' : 'Save Grade'}
                  </Button>
                </form>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
