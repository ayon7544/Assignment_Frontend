'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { getClasses, createClass, getSubjects, createSubject, assignTeacher, enrollStudent } from '@/lib/api/admin';
import { getUsers } from '@/lib/api/admin';
import Navbar from '@/components/shared/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/api/error';
import { ClassItem, Subject, UserItem } from '@/types';

export default function AdminClasses() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachers, setTeachers] = useState<UserItem[]>([]);
  const [students, setStudents] = useState<UserItem[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [classForm, setClassForm] = useState({ name: '', description: '' });
  const [subjectForm, setSubjectForm] = useState({ name: '', classId: '' });
  const [teacherForm, setTeacherForm] = useState({ teacherId: '', subjectId: '', classId: '' });
  const [studentForm, setStudentForm] = useState({ studentId: '', classId: '' });
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const [cls, subs, tchrs, studs] = await Promise.all([
      getClasses(), getSubjects(), getUsers('Teacher'), getUsers('Student')
    ]);
    setClasses(cls ?? []);
    setSubjects(subs ?? []);
    setTeachers(tchrs.data ?? []);
    setStudents(studs.data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    if (isLoading) return;
    if (!user || user.role !== 'Admin') { router.push('/login'); return; }

    const loadInitialData = async () => {
      const [cls, subs, tchrs, studs] = await Promise.all([
        getClasses(), getSubjects(), getUsers('Teacher'), getUsers('Student')
      ]);
      setClasses(cls ?? []);
      setSubjects(subs ?? []);
      setTeachers(tchrs.data ?? []);
      setStudents(studs.data ?? []);
      setLoading(false);
    };

    void loadInitialData();
  }, [user, isLoading, router]);

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createClass(classForm);
      toast.success('Class created');
      setClassForm({ name: '', description: '' });
      load();
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, 'Failed'));
    }
  };

  const handleCreateSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSubject(subjectForm);
      toast.success('Subject created');
      setSubjectForm({ name: '', classId: '' });
      load();
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, 'Failed'));
    }
  };

  const handleAssignTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await assignTeacher(teacherForm);
      toast.success('Teacher assigned');
      setTeacherForm({ teacherId: '', subjectId: '', classId: '' });
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, 'Failed'));
    }
  };

  const handleEnrollStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await enrollStudent(studentForm);
      toast.success('Student enrolled');
      setStudentForm({ studentId: '', classId: '' });
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, 'Failed'));
    }
  };

  if (isLoading || loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  const filteredSubjects = selectedClass ? subjects.filter(s => s.classId === selectedClass) : subjects;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Classes & Subjects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Create Class */}
          <Card>
            <CardHeader><CardTitle>Create Class</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleCreateClass} className="space-y-3">
                <Input placeholder="Class name (e.g. Class 10 Science)" value={classForm.name}
                  onChange={e => setClassForm({...classForm, name: e.target.value})} required />
                <Input placeholder="Description (optional)" value={classForm.description}
                  onChange={e => setClassForm({...classForm, description: e.target.value})} />
                <Button type="submit" className="w-full">Create Class</Button>
              </form>
              <div className="mt-4 space-y-2">
                {classes.map(c => (
                  <div key={c.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                    <div>
                      <p className="font-medium text-sm">{c.name}</p>
                      <p className="text-xs text-gray-500">{c.subjectCount} subjects · {c.studentCount} students</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Create Subject */}
          <Card>
            <CardHeader><CardTitle>Create Subject</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleCreateSubject} className="space-y-3">
                <Input placeholder="Subject name (e.g. Mathematics)" value={subjectForm.name}
                  onChange={e => setSubjectForm({...subjectForm, name: e.target.value})} required />
                <Select value={subjectForm.classId} onValueChange={v => setSubjectForm({...subjectForm, classId: v ?? ''})}>
                  <SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger>
                  <SelectContent>
                    {classes.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Button type="submit" className="w-full">Create Subject</Button>
              </form>
              <div className="mt-4 space-y-2">
                {subjects.map(s => (
                  <div key={s.id} className="p-3 bg-gray-50 rounded-lg border">
                    <p className="font-medium text-sm">{s.name}</p>
                    <p className="text-xs text-gray-500">{s.className}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Assign Teacher */}
          <Card>
            <CardHeader><CardTitle>Assign Teacher to Subject</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleAssignTeacher} className="space-y-3">
                <Select value={teacherForm.teacherId} onValueChange={v => setTeacherForm({...teacherForm, teacherId: v ?? ''})}>
                  <SelectTrigger><SelectValue placeholder="Select teacher" /></SelectTrigger>
                  <SelectContent>
                    {teachers.map(t => <SelectItem key={t.id} value={t.id}>{t.fullName}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={teacherForm.classId} onValueChange={v => {
                  setTeacherForm({...teacherForm, classId: v ?? '', subjectId: ''});
                  setSelectedClass(v ?? '');
                }}>
                  <SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger>
                  <SelectContent>
                    {classes.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={teacherForm.subjectId} onValueChange={v => setTeacherForm({...teacherForm, subjectId: v ?? ''})}>
                  <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                  <SelectContent>
                    {filteredSubjects.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Button type="submit" className="w-full">Assign Teacher</Button>
              </form>
            </CardContent>
          </Card>

          {/* Enroll Student */}
          <Card>
            <CardHeader><CardTitle>Enroll Student in Class</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleEnrollStudent} className="space-y-3">
                <Select value={studentForm.studentId} onValueChange={v => setStudentForm({...studentForm, studentId: v ?? ''})}>
                  <SelectTrigger><SelectValue placeholder="Select student" /></SelectTrigger>
                  <SelectContent>
                    {students.map(s => <SelectItem key={s.id} value={s.id}>{s.fullName}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={studentForm.classId} onValueChange={v => setStudentForm({...studentForm, classId: v ?? ''})}>
                  <SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger>
                  <SelectContent>
                    {classes.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Button type="submit" className="w-full">Enroll Student</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
