'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { getStudentAssignments } from '@/lib/api/assignments';
import Navbar from '@/components/shared/Navbar';
import DeadlineBadge from '@/components/shared/DeadlineBadge';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Assignment } from '@/types';

export default function StudentAssignments() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;
    if (!user || user.role !== 'Student') { router.push('/login'); return; }
    getStudentAssignments()
      .then(data => setAssignments(data || []))
      .finally(() => setLoading(false));
  }, [user, isLoading, router]);

  if (isLoading || loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50"><Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">My Assignments</h2>
        {assignments.length === 0
          ? <Card><CardContent className="p-8 text-center text-gray-500">No assignments available.</CardContent></Card>
          : <div className="space-y-3">
              {assignments.map(a => (
                <Card key={a.id} className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => router.push('/student/assignments/' + a.id)}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{a.title}</p>
                      <p className="text-sm text-gray-500">{a.className} - {a.subjectName} | By: {a.teacherName} | Marks: {a.maxMarks}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {a.allowLate && <Badge variant="outline">Late OK</Badge>}
                      <DeadlineBadge deadline={a.deadline} />
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