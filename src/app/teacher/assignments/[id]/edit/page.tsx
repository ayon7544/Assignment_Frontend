'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import {
  getTeacherAssignments,
  updateAssignment,
} from '@/lib/api/assignments';
import Navbar from '@/components/shared/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/api/error';
import type { Assignment } from '@/types';

function toDateTimeLocal(value: string): string {
  const date = new Date(value);

  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);

  return localDate.toISOString().slice(0, 16);
}

export default function EditAssignmentPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();

  const assignmentId = params.id as string;

  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    maxMarks: '',
    deadline: '',
    allowLate: false,
  });

  useEffect(() => {
    if (isLoading) return;

    if (!user || user.role !== 'Teacher') {
      router.push('/login');
      return;
    }

    const loadAssignment = async () => {
      try {
        const assignments = await getTeacherAssignments();

        const currentAssignment = assignments.find(
          (item) => item.id === assignmentId
        );

        if (!currentAssignment) {
          toast.error('Assignment not found');
          router.push('/teacher/dashboard');
          return;
        }

        setAssignment(currentAssignment);

        setForm({
          title: currentAssignment.title,
          description: currentAssignment.description,
          maxMarks: currentAssignment.maxMarks.toString(),
          deadline: toDateTimeLocal(currentAssignment.deadline),
          allowLate: currentAssignment.allowLate,
        });
      } catch (error: unknown) {
        toast.error(
          getApiErrorMessage(error, 'Failed to load assignment')
        );
      } finally {
        setLoading(false);
      }
    };

    void loadAssignment();
  }, [assignmentId, user, isLoading, router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.maxMarks ||
      !form.deadline
    ) {
      toast.error('Please fill in all required fields');
      return;
    }

    const maxMarks = Number(form.maxMarks);

    if (!Number.isInteger(maxMarks) || maxMarks <= 0) {
      toast.error('Maximum marks must be a positive whole number');
      return;
    }

    const deadline = new Date(form.deadline);

    if (Number.isNaN(deadline.getTime())) {
      toast.error('Please enter a valid deadline');
      return;
    }

    if (deadline <= new Date()) {
      toast.error('Deadline must be in the future');
      return;
    }

    setSubmitting(true);

    try {
      await updateAssignment(assignmentId, {
        title: form.title.trim(),
        description: form.description.trim(),
        maxMarks,
        deadline: deadline.toISOString(),
        allowLate: form.allowLate,
      });

      toast.success('Assignment updated successfully');
      router.push('/teacher/dashboard');
    } catch (error: unknown) {
      toast.error(
        getApiErrorMessage(error, 'Failed to update assignment')
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Assignment not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-2xl p-6">
        <div className="mb-6 flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.back()}
          >
            ← Back
          </Button>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Edit Assignment
            </h2>

            <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
              <span>
                {assignment.className} · {assignment.subjectName}
              </span>

              <Badge
                variant={
                  assignment.status === 'Published'
                    ? 'default'
                    : 'secondary'
                }
              >
                {assignment.status}
              </Badge>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Assignment Details</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>

                <Input
                  id="title"
                  value={form.title}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      title: event.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Description *
                </Label>

                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      description: event.target.value,
                    })
                  }
                  rows={5}
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Class</Label>

                  <Input
                    value={assignment.className}
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label>Subject</Label>

                  <Input
                    value={assignment.subjectName}
                    disabled
                  />
                </div>
              </div>

              <p className="text-xs text-gray-500">
                Class and subject cannot be changed after an
                assignment has been created.
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="maxMarks">
                    Maximum Marks *
                  </Label>

                  <Input
                    id="maxMarks"
                    type="number"
                    min="1"
                    max="1000"
                    value={form.maxMarks}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        maxMarks: event.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">
                    Deadline *
                  </Label>

                  <Input
                    id="deadline"
                    type="datetime-local"
                    value={form.deadline}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        deadline: event.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="allowLate"
                  type="checkbox"
                  checked={form.allowLate}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      allowLate: event.target.checked,
                    })
                  }
                  className="h-4 w-4"
                />

                <Label
                  htmlFor="allowLate"
                  className="cursor-pointer"
                >
                  Allow late submissions
                </Label>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={submitting}
                >
                  {submitting
                    ? 'Saving...'
                    : 'Save Changes'}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
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