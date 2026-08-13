import apiClient from './client';
import type { ClassItem, Subject, UserItem } from '@/types';

interface ApiResponse<T> {
  data: T;
}

export interface PagedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CreateUserInput {
  fullName: string;
  email: string;
  password: string;
  role: string;
}

export interface UpdateUserInput {
  fullName: string;
  email: string;
}

export interface CreateClassInput {
  name: string;
  description?: string | null;
}

export interface CreateSubjectInput {
  name: string;
  classId: string;
}

export interface AssignTeacherInput {
  teacherId: string;
  subjectId: string;
  classId: string;
}

export interface EnrollStudentInput {
  studentId: string;
  classId: string;
}

// Users
export const getUsers = async (role?: string): Promise<PagedResponse<UserItem>> => {
  const res = await apiClient.get<ApiResponse<PagedResponse<UserItem>>>(
    `/admin/users${role ? `?role=${role}` : ''}`
  );
  return res.data.data;
};

export const createUser = async (data: CreateUserInput): Promise<UserItem> => {
  const res = await apiClient.post<ApiResponse<UserItem>>('/admin/users', data);
  return res.data.data;
};

export const updateUser = async (id: string, data: UpdateUserInput): Promise<UserItem> => {
  const res = await apiClient.put<ApiResponse<UserItem>>(`/admin/users/${id}`, data);
  return res.data.data;
};

export const deactivateUser = async (id: string): Promise<void> => {
  await apiClient.delete(`/admin/users/${id}`);
};

// Classes
export const getClasses = async (): Promise<ClassItem[]> => {
  const res = await apiClient.get<ApiResponse<ClassItem[]>>('/admin/classes');
  return res.data.data;
};

export const createClass = async (data: CreateClassInput): Promise<ClassItem> => {
  const res = await apiClient.post<ApiResponse<ClassItem>>('/admin/classes', data);
  return res.data.data;
};

// Subjects
export const getSubjects = async (classId?: string): Promise<Subject[]> => {
  const res = await apiClient.get<ApiResponse<Subject[]>>(
    `/admin/subjects${classId ? `?classId=${classId}` : ''}`
  );
  return res.data.data;
};

export const createSubject = async (data: CreateSubjectInput): Promise<Subject> => {
  const res = await apiClient.post<ApiResponse<Subject>>('/admin/subjects', data);
  return res.data.data;
};

// Teacher assignment
export const assignTeacher = async (data: AssignTeacherInput): Promise<void> => {
  await apiClient.post('/admin/teacher-subjects', data);
};

// Student enrollment
export const enrollStudent = async (data: EnrollStudentInput): Promise<void> => {
  await apiClient.post('/admin/student-classes', data);
};
