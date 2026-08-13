'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { getStudentAssignments, getMySubmissions } from '@/lib/api/assignments';
import Navbar from '@/components/shared/Navbar';
import DeadlineBadge from '@/components/shared/DeadlineBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Assignment, Submission } from '@/types';

export default function StudentDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;
    if (!user || user.role !== 'Student') { router.push('/login'); return; }
    const load = async () => {
      const [a, s] = await Promise.all([getStudentAssignments(), getMySubmissions()]);
      setAssignments(a ?? []);
      setSubmissions(s ?? []);
      setLoading(false);
    };
    load();
  }, [user, isLoading, router]);

  const submittedIds = new Set(submissions.map(s => s.assignmentId));

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
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Assignments</h2>
          <p className="text-gray-500 text-sm mt-1">
            {assignments.length} assignments · {submissions.length} submitted
          </p>
        </div>

        {/* Submissions with grades */}
        {submissions.filter(s => s.marks !== null).length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Grades</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {submissions.filter(s => s.marks !== null).slice(0, 3).map(s => (
                <Card key={s.id} className="border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <p className="font-medium text-sm text-gray-900 mb-1">{s.assignmentTitle}</p>
                    <p className="text-2xl font-bold text-green-600">{s.marks}/{s.maxMarks}</p>
                    {s.feedback && <p className="text-xs text-gray-500 mt-1 italic">{s.feedback}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Assignment list */}
        {assignments.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">No assignments yet. Check back later.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {assignments.map(a => {
              const mySubmission = submissions.find(s => s.assignmentId === a.id);
              const isSubmitted = submittedIds.has(a.id);

              return (
                <Card key={a.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{a.title}</h3>
                          {isSubmitted && mySubmission && (
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[mySubmission.status]}`}>
                              {mySubmission.status}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mb-2">
                          {a.className} · {a.subjectName} · {a.teacherName} · Max {a.maxMarks} marks
                        </p>
                        <div className="flex items-center gap-3">
                          <DeadlineBadge deadline={a.deadline} />
                          <span className="text-xs text-gray-500">
                            {new Date(a.deadline).toLocaleDateString()}
                          </span>
                          {a.allowLate && (
                            <span className="text-xs text-blue-500">Late submissions allowed</span>
                          )}
                        </div>
                        {mySubmission?.marks !== null && mySubmission?.marks !== undefined && (
                          <p className="text-sm font-medium text-green-600 mt-2">
                            Grade: {mySubmission.marks}/{a.maxMarks}
                            {mySubmission.feedback && ` — ${mySubmission.feedback}`}
                          </p>
                        )}
                      </div>
                      <Button size="sm" className="ml-4"
                        onClick={() => router.push(`/student/assignments/${a.id}`)}>
                        {isSubmitted ? 'View Submission' : 'Submit'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
