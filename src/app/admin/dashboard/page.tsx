'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { getUsers } from '@/lib/api/admin';
import { getAdminAssignments, getAdminSubmissions } from '@/lib/api/assignments';
import Navbar from '@/components/shared/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({ users: 0, assignments: 0, submissions: 0 });

  useEffect(() => {
    if (isLoading) return;
    if (!user || user.role !== 'Admin') { router.push('/login'); return; }

    const load = async () => {
      const [users, assignments, submissions] = await Promise.all([
        getUsers(), getAdminAssignments(), getAdminSubmissions()
      ]);
      setStats({
        users: users.data?.length ?? 0,
        assignments: assignments?.length ?? 0,
        submissions: submissions?.length ?? 0,
      });
    };
    load();
  }, [user, isLoading, router]);

  if (isLoading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader><CardTitle className="text-sm text-gray-500">Total Users</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold text-blue-600">{stats.users}</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-sm text-gray-500">Total Assignments</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold text-green-600">{stats.assignments}</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-sm text-gray-500">Total Submissions</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold text-purple-600">{stats.submissions}</p></CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push('/admin/users')}>
            <CardHeader><CardTitle>Manage Users</CardTitle></CardHeader>
            <CardContent><p className="text-gray-500">Create and manage Admin, Teacher, and Student accounts</p></CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push('/admin/classes')}>
            <CardHeader><CardTitle>Manage Classes & Subjects</CardTitle></CardHeader>
            <CardContent><p className="text-gray-500">Set up classes, subjects, and assign teachers</p></CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
