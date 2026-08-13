'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { getAdminAssignments } from '@/lib/api/assignments';
import Navbar from '@/components/shared/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Assignment } from '@/types';

export default function AdminAssignments() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;
    if (!user || user.role !== 'Admin') { router.push('/login'); return; }
    getAdminAssignments()
      .then(data => setAssignments(data || []))
      .finally(() => setLoading(false));
  }, [user, isLoading, router]);

  if (isLoading || loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50"><Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">All Assignments</h2>
        {assignments.length === 0
          ? <Card><CardContent className="p-8 text-center text-gray-500">No assignments.</CardContent></Card>
          : <Card><CardContent className="p-0">
              <table className="w-full text-sm">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="text-left p-4">Title</th>
                    <th className="text-left p-4">Class</th>
                    <th className="text-left p-4">Teacher</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Deadline</th>
                    <th className="text-left p-4">Submissions</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.map(a => (
                    <tr key={a.id} className="border-b">
                      <td className="p-4 font-medium">{a.title}</td>
                      <td className="p-4">{a.className}</td>
                      <td className="p-4">{a.teacherName}</td>
                      <td className="p-4"><Badge variant={a.status === 'Published' ? 'default' : 'secondary'}>{a.status}</Badge></td>
                      <td className="p-4">{new Date(a.deadline).toLocaleDateString()}</td>
                      <td className="p-4">{a.submissionCount}</td>
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