export interface User {
  userId: string;
  fullName: string;
  email: string;
  role: 'Admin' | 'Teacher' | 'Student';
  token: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  classId: string;
  className: string;
  subjectId: string;
  subjectName: string;
  teacherName: string;
  maxMarks: number;
  deadline: string;
  status: string;
  allowLate: boolean;
  submissionCount: number;
  createdAt: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  assignmentTitle: string;
  studentName: string;
  answerText: string;
  submittedAt: string;
  marks: number | null;
  maxMarks: number;
  feedback: string | null;
  status: string;
  isLate: boolean;
}

export interface ClassItem {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  subjectCount: number;
  studentCount: number;
  createdAt: string;
}

export interface Subject {
  id: string;
  name: string;
  classId: string;
  className: string;
  createdAt: string;
}

export interface UserItem {
  id: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}