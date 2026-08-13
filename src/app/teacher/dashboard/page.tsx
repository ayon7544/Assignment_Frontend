'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { getTeacherAssignments, deleteAssignment, publishAssignment } from '@/lib/api/assignments';
import Navbar from '@/components/shared/Navbar';
import DeadlineBadge from '@/components/shared/DeadlineBadge';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/api/error';
import { Assignment } from '@/types';

export default function TeacherDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const data = await getTeacherAssignments();
    setAssignments(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    if (isLoading) return;
    if (!user || user.role !== 'Teacher') { router.push('/login'); return; }

    const loadInitialAssignments = async () => {
      const data = await getTeacherAssignments();
      setAssignments(data ?? []);
      setLoading(false);
    };

    void loadInitialAssignments();
  }, [user, isLoading, router]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this assignment?')) return;
    try {
      await deleteAssignment(id);
      toast.success('Assignment deleted');
      load();
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, 'Cannot delete published assignment'));
    }
  };

  const handlePublish = async (id: string) => {
    try {
      await publishAssignment(id);
      toast.success('Assignment published — students can now see it');
      load();
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, 'Failed to publish'));
    }
  };

  if (isLoading || loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Assignments</h2>
            <p className="text-gray-500 text-sm mt-1">{assignments.length} total assignments</p>
          </div>
          <Button onClick={() => router.push('/teacher/assignments/new')}>+ New Assignment</Button>
        </div>

        {assignments.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500 mb-4">No assignments yet</p>
              <Button onClick={() => router.push('/teacher/assignments/new')}>Create your first assignment</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {assignments.map(a => (
              <Card key={a.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{a.title}</h3>
                        <Badge variant={a.status === 'Published' ? 'default' : 'secondary'}>
                          {a.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        {a.className} · {a.subjectName} · Max {a.maxMarks} marks
                      </p>
                      <div className="flex items-center gap-3">
                        <DeadlineBadge deadline={a.deadline} />
                        <span className="text-xs text-gray-500">
                          {new Date(a.deadline).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-gray-500">
                          {a.submissionCount} submission{a.submissionCount !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
  <Button
    size="sm"
    variant="outline"
    onClick={() =>
      router.push(`/teacher/assignments/${a.id}/edit`)
    }
  >
    Edit
  </Button>

  {a.status === 'Draft' && (
    <Button
      size="sm"
      variant="outline"
      onClick={() => handlePublish(a.id)}
    >
      Publish
    </Button>
  )}

  <Button
    size="sm"
    variant="outline"
    onClick={() =>
      router.push(`/teacher/assignments/${a.id}/submissions`)
    }
  >
    Submissions
  </Button>

  {a.status === 'Draft' && (
    <Button
      size="sm"
      variant="destructive"
      onClick={() => handleDelete(a.id)}
    >
      Delete
    </Button>
  )}
</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
