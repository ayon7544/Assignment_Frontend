'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { getMySubmissions } from '@/lib/api/assignments';
import Navbar from '@/components/shared/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Submission } from '@/types';

export default function StudentSubmissions() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;
    if (!user || user.role !== 'Student') { router.push('/login'); return; }
    getMySubmissions()
      .then(data => setSubmissions(data || []))
      .finally(() => setLoading(false));
  }, [user, isLoading, router]);

  if (isLoading || loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50"><Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">My Submissions</h2>
        {submissions.length === 0
          ? <Card><CardContent className="p-8 text-center text-gray-500">No submissions yet.</CardContent></Card>
          : <div className="space-y-3">
              {submissions.map(s => (
                <Card key={s.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{s.assignmentTitle}</p>
                        <p className="text-sm text-gray-500 mt-1">Submitted: {new Date(s.submittedAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={s.status === 'Graded' ? 'default' : s.status === 'Late' ? 'destructive' : 'secondary'}>{s.status}</Badge>
                        {s.isLate && <Badge variant="destructive">Late</Badge>}
                      </div>
                    </div>
                    {s.marks !== null && (
                      <div className="mt-3 p-3 bg-green-50 rounded">
                        <p className="font-medium">Marks: {s.marks}</p>
                        {s.feedback && <p className="text-sm text-gray-600 mt-1">Feedback: {s.feedback}</p>}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
        }
      </main>
    </div>
  );
}