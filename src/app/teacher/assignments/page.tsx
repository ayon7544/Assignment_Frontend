'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { getTeacherAssignments } from '@/lib/api/assignments';
import Navbar from '@/components/shared/Navbar';
import DeadlineBadge from '@/components/shared/DeadlineBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Assignment } from '@/types';

export default function TeacherAssignments() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;
    if (!user || user.role !== 'Teacher') { router.push('/login'); return; }
    getTeacherAssignments()
      .then(data => setAssignments(data || []))
      .finally(() => setLoading(false));
  }, [user, isLoading, router]);

  if (isLoading || loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50"><Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Assignments</h2>
          <Button onClick={() => router.push('/teacher/assignments/new')}>+ New Assignment</Button>
        </div>
        {assignments.length === 0
          ? <Card><CardContent className="p-8 text-center text-gray-500">No assignments yet.</CardContent></Card>
          : <div className="space-y-3">
              {assignments.map(a => (
                <Card key={a.id} className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => router.push('/teacher/assignments/' + a.id + '/submissions')}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{a.title}</p>
                      <p className="text-sm text-gray-500">{a.className} - {a.subjectName} | Marks: {a.maxMarks}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={a.status === 'Published' ? 'default' : 'secondary'}>{a.status}</Badge>
                      <DeadlineBadge deadline={a.deadline} />
                      <Badge variant="outline">{a.submissionCount} submissions</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
        }
      </main>
    </div>
  );
}