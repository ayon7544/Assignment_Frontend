'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import {
  getStudentAssignment,
  getMySubmissions,
  submitAssignment,
  updateSubmission,
} from '@/lib/api/assignments';
import Navbar from '@/components/shared/Navbar';
import DeadlineBadge from '@/components/shared/DeadlineBadge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/api/error';
import type { Assignment, Submission } from '@/types';

export default function StudentAssignmentPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [assignment, setAssignment] =
    useState<Assignment | null>(null);

  const [mySubmission, setMySubmission] =
    useState<Submission | null>(null);

  const [answerText, setAnswerText] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [isPastDeadline, setIsPastDeadline] =
    useState(false);

  useEffect(() => {
    if (isLoading) return;

    if (!user || user.role !== 'Student') {
      router.push('/login');
      return;
    }

    const load = async () => {
      try {
        const [assignmentData, submissions] =
          await Promise.all([
            getStudentAssignment(id),
            getMySubmissions(),
          ]);

        setAssignment(assignmentData);

        setIsPastDeadline(
          new Date(
            assignmentData.deadline
          ).getTime() < Date.now()
        );

        const existing = submissions.find(
          (submission) =>
            submission.assignmentId === id
        );

        if (existing) {
          setMySubmission(existing);
          setAnswerText(
            existing.answerText ?? ''
          );
        }
      } catch (error: unknown) {
        toast.error(
          getApiErrorMessage(
            error,
            'Failed to load assignment'
          )
        );
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [user, isLoading, router, id]);

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    const trimmedAnswer = answerText.trim();

    if (!trimmedAnswer) {
      toast.error('Please write your answer');
      return;
    }

    setSubmitting(true);

    try {
      const created = await submitAssignment(
        id,
        trimmedAnswer
      );

      setMySubmission(created);

      setAnswerText(
        created.answerText ?? trimmedAnswer
      );

      toast.success(
        'Assignment submitted successfully'
      );
    } catch (error: unknown) {
      toast.error(
        getApiErrorMessage(
          error,
          'Failed to submit assignment'
        )
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (!mySubmission || !assignment) return;

    const deadlinePassed =
      new Date(
        assignment.deadline
      ).getTime() < Date.now();

    if (deadlinePassed) {
      setIsPastDeadline(true);

      toast.error(
        'Submission can no longer be edited because the deadline has passed'
      );

      return;
    }

    const trimmedAnswer = answerText.trim();

    if (!trimmedAnswer) {
      toast.error('Please write your answer');
      return;
    }

    setSubmitting(true);

    try {
      const updated = await updateSubmission(
        mySubmission.id,
        trimmedAnswer
      );

      setMySubmission(updated);

      setAnswerText(
        updated.answerText ?? trimmedAnswer
      );

      setEditing(false);

      toast.success(
        'Submission updated successfully'
      );
    } catch (error: unknown) {
      toast.error(
        getApiErrorMessage(
          error,
          'Failed to update submission'
        )
      );
    } finally {
      setSubmitting(false);
    }
  };

  const cancelEditing = () => {
    if (mySubmission) {
      setAnswerText(
        mySubmission.answerText ?? ''
      );
    }

    setEditing(false);
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

      <main className="mx-auto max-w-3xl p-6">
        <div className="mb-6 flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.back()}
          >
            Back
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">
              {assignment.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">
                {assignment.className}
              </Badge>

              <Badge variant="outline">
                {assignment.subjectName}
              </Badge>

              <Badge variant="outline">
                Max {assignment.maxMarks} marks
              </Badge>

              <DeadlineBadge
                deadline={assignment.deadline}
              />
            </div>

            <p className="text-sm text-gray-500">
              Teacher: {assignment.teacherName}
              {' | '}
              Deadline:{' '}
              {new Date(
                assignment.deadline
              ).toLocaleString()}
            </p>

            <div className="rounded-lg border bg-gray-50 p-4">
              <p className="whitespace-pre-wrap text-gray-700">
                {assignment.description}
              </p>
            </div>

            {assignment.allowLate && (
              <p className="text-sm text-blue-600">
                Late submissions are allowed for this
                assignment.
              </p>
            )}
          </CardContent>
        </Card>

        {mySubmission && !editing && (
          <Card className="mb-6 border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="text-base">
                Your Submission
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>
                  {mySubmission.status}
                </Badge>

                {mySubmission.isLate && (
                  <Badge variant="destructive">
                    Late
                  </Badge>
                )}
              </div>

              <div className="rounded-lg border bg-gray-50 p-4">
                <p className="whitespace-pre-wrap text-sm text-gray-700">
                  {mySubmission.answerText}
                </p>
              </div>

              {mySubmission.marks !== null && (
                <div className="rounded-lg bg-green-50 p-3">
                  <p className="text-lg font-bold text-green-700">
                    Grade: {mySubmission.marks} /{' '}
                    {mySubmission.maxMarks}
                  </p>

                  {mySubmission.feedback && (
                    <p className="mt-1 text-sm text-gray-600">
                      <span className="font-medium">
                        Feedback:
                      </span>{' '}
                      {mySubmission.feedback}
                    </p>
                  )}
                </div>
              )}

              <p className="text-xs text-gray-500">
                Submitted:{' '}
                {new Date(
                  mySubmission.submittedAt
                ).toLocaleString()}
              </p>

              {!isPastDeadline ? (
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setEditing(true)
                    }
                  >
                    Edit Submission
                  </Button>

                  <p className="text-xs text-gray-500">
                    You can update your submission
                    until the assignment deadline.
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  The deadline has passed. This
                  submission can no longer be edited.
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {mySubmission && editing && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">
                Edit Submission
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form
                onSubmit={handleUpdate}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="editAnswer">
                    Update your answer *
                  </Label>

                  <Textarea
                    id="editAnswer"
                    value={answerText}
                    onChange={(event) =>
                      setAnswerText(
                        event.target.value
                      )
                    }
                    placeholder="Update your answer here..."
                    rows={8}
                    required
                  />
                </div>

                <div className="flex gap-3">
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
                    onClick={cancelEditing}
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {!mySubmission && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Your Answer
              </CardTitle>
            </CardHeader>

            <CardContent>
              {isPastDeadline &&
              !assignment.allowLate ? (
                <div className="py-6 text-center">
                  <p className="font-medium text-red-500">
                    The deadline has passed
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    This assignment does not allow
                    late submissions.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {isPastDeadline &&
                    assignment.allowLate && (
                      <div className="rounded-lg border border-orange-200 bg-orange-50 p-3">
                        <p className="text-sm text-orange-600">
                          You are submitting after the
                          deadline. This submission
                          will be marked as Late.
                        </p>
                      </div>
                    )}

                  <div className="space-y-2">
                    <Label htmlFor="answer">
                      Write your answer *
                    </Label>

                    <Textarea
                      id="answer"
                      value={answerText}
                      onChange={(event) =>
                        setAnswerText(
                          event.target.value
                        )
                      }
                      placeholder="Type your answer here..."
                      rows={8}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={submitting}
                  >
                    {submitting
                      ? 'Submitting...'
                      : 'Submit Assignment'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}