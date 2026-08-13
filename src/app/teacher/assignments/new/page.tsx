'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { createAssignment } from '@/lib/api/assignments';
import { getClasses, getSubjects } from '@/lib/api/admin';
import Navbar from '@/components/shared/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/api/error';
import { ClassItem, Subject } from '@/types';

export default function NewAssignment() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [form, setForm] = useState({
    title: '', description: '', classId: '', subjectId: '',
    maxMarks: '', deadline: '', allowLate: false
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isLoading) return;
    if (!user || user.role !== 'Teacher') { router.push('/login'); return; }
    const load = async () => {
      const [cls, subs] = await Promise.all([getClasses(), getSubjects()]);
      setClasses(cls ?? []);
      setSubjects(subs ?? []);
    };
    load();
  }, [user, isLoading, router]);

  const filteredSubjects = form.classId
    ? subjects.filter(s => s.classId === form.classId)
    : subjects;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.classId || !form.subjectId || !form.maxMarks || !form.deadline) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSubmitting(true);
    try {
      await createAssignment({
        ...form,
        maxMarks: parseInt(form.maxMarks),
        deadline: new Date(form.deadline).toISOString(),
      });
      toast.success('Assignment created as Draft');
      router.push('/teacher/dashboard');
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, 'Failed to create assignment'));
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-2xl mx-auto p-6">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" onClick={() => router.back()}>← Back</Button>
          <h2 className="text-2xl font-bold text-gray-900">New Assignment</h2>
        </div>

        <Card>
          <CardHeader><CardTitle>Assignment Details</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input placeholder="e.g. Chapter 5 Algebra Exercises"
                  value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
              </div>

              <div className="space-y-2">
                <Label>Description *</Label>
                <Textarea placeholder="Describe the assignment in detail..."
                  value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                  rows={4} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Class *</Label>
                  <Select value={form.classId} onValueChange={v => setForm({...form, classId: v ?? '', subjectId: ''})}>
                    <SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger>
                    <SelectContent>
                      {classes.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Subject *</Label>
                  <Select value={form.subjectId} onValueChange={v => setForm({...form, subjectId: v ?? ''})}>
                    <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                    <SelectContent>
                      {filteredSubjects.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Max Marks *</Label>
                  <Input type="number" min="1" max="1000" placeholder="100"
                    value={form.maxMarks} onChange={e => setForm({...form, maxMarks: e.target.value})} required />
                </div>

                <div className="space-y-2">
                  <Label>Deadline *</Label>
                  <Input type="datetime-local"
                    value={form.deadline} onChange={e => setForm({...form, deadline: e.target.value})} required />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="allowLate" checked={form.allowLate}
                  onChange={e => setForm({...form, allowLate: e.target.checked})}
                  className="w-4 h-4" />
                <Label htmlFor="allowLate" className="cursor-pointer">
                  Allow late submissions
                </Label>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" disabled={submitting} className="flex-1">
                  {submitting ? 'Creating...' : 'Create Assignment (Draft)'}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
