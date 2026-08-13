import apiClient from './client';
import type { Assignment, Submission } from '@/types';

interface ApiResponse<T> {
  data: T;
}

export interface CreateAssignmentInput {
  title: string;
  description: string;
  classId: string;
  subjectId: string;
  maxMarks: number;
  deadline: string;
  allowLate: boolean;
}

export interface UpdateAssignmentInput {
  title: string;
  description: string;
  maxMarks: number;
  deadline: string;
  allowLate: boolean;
}

export interface GradeSubmissionInput {
  marks: number;
  feedback: string;
  status: string;
}

// Teacher
export const getTeacherAssignments = async (): Promise<Assignment[]> => {
  const res = await apiClient.get<ApiResponse<Assignment[]>>('/teacher/assignments');
  return res.data.data;
};

export const createAssignment = async (data: CreateAssignmentInput): Promise<Assignment> => {
  const res = await apiClient.post<ApiResponse<Assignment>>('/teacher/assignments', data);
  return res.data.data;
};

export const updateAssignment = async (id: string, data: UpdateAssignmentInput): Promise<Assignment> => {
  const res = await apiClient.put<ApiResponse<Assignment>>(`/teacher/assignments/${id}`, data);
  return res.data.data;
};

export const deleteAssignment = async (id: string): Promise<void> => {
  await apiClient.delete(`/teacher/assignments/${id}`);
};

export const publishAssignment = async (id: string): Promise<Assignment> => {
  const res = await apiClient.patch<ApiResponse<Assignment>>(`/teacher/assignments/${id}/publish`);
  return res.data.data;
};

export const getAssignmentSubmissions = async (id: string): Promise<Submission[]> => {
  const res = await apiClient.get<ApiResponse<Submission[]>>(`/teacher/assignments/${id}/submissions`);
  return res.data.data;
};

export const gradeSubmission = async (
  submissionId: string,
  data: GradeSubmissionInput
): Promise<Submission> => {
  const res = await apiClient.patch<ApiResponse<Submission>>(
    `/teacher/submissions/${submissionId}/grade`,
    data
  );
  return res.data.data;
};

// Student
export const getStudentAssignments = async (): Promise<Assignment[]> => {
  const res = await apiClient.get<ApiResponse<Assignment[]>>('/student/assignments');
  return res.data.data;
};

export const getStudentAssignment = async (id: string): Promise<Assignment> => {
  const res = await apiClient.get<ApiResponse<Assignment>>(`/student/assignments/${id}`);
  return res.data.data;
};

export const submitAssignment = async (id: string, answerText: string): Promise<Submission> => {
  const res = await apiClient.post<ApiResponse<Submission>>(`/student/assignments/${id}/submit`, {
    answerText,
  });
  return res.data.data;
};

export const updateSubmission = async (
  submissionId: string,
  answerText: string
): Promise<Submission> => {
  const res = await apiClient.put<ApiResponse<Submission>>(`/student/submissions/${submissionId}`, {
    answerText,
  });
  return res.data.data;
};

export const getMySubmissions = async (): Promise<Submission[]> => {
  const res = await apiClient.get<ApiResponse<Submission[]>>('/student/submissions');
  return res.data.data;
};

// Admin
export const getAdminAssignments = async (): Promise<Assignment[]> => {
  const res = await apiClient.get<ApiResponse<Assignment[]>>('/admin/assignments');
  return res.data.data;
};

export const getAdminSubmissions = async (): Promise<Submission[]> => {
  const res = await apiClient.get<ApiResponse<Submission[]>>('/admin/submissions');
  return res.data.data;
};
