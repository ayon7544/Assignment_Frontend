'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { getAdminSubmissions } from '@/lib/api/assignments';
import Navbar from '@/components/shared/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Submission } from '@/types';

export default function AdminSubmissions() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;
    if (!user || user.role !== 'Admin') { router.push('/login'); return; }
    getAdminSubmissions()
      .then(data => setSubmissions(data || []))
      .finally(() => setLoading(false));
  }, [user, isLoading, router]);

  if (isLoading || loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50"><Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">All Submissions</h2>
        {submissions.length === 0
          ? <Card><CardContent className="p-8 text-center text-gray-500">No submissions.</CardContent></Card>
          : <Card><CardContent className="p-0">
              <table className="w-full text-sm">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="text-left p-4">Assignment</th>
                    <th className="text-left p-4">Student</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Marks</th>
                    <th className="text-left p-4">Late</th>
                    <th className="text-left p-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map(s => (
                    <tr key={s.id} className="border-b">
                      <td className="p-4 font-medium">{s.assignmentTitle}</td>
                      <td className="p-4">{s.studentName}</td>
                      <td className="p-4"><Badge variant="secondary">{s.status}</Badge></td>
                      <td className="p-4">{s.marks ?? '-'}</td>
                      <td className="p-4">{s.isLate ? 'Yes' : 'No'}</td>
                      <td className="p-4">{new Date(s.submittedAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent></Card>
        }
      </main>
    </div>
  );
}