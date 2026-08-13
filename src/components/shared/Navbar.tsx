'use client';
import { useAuth } from '@/lib/auth/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Navbar() {
  const { user, logout } = useAuth();

  const roleColor: Record<string, 'default' | 'secondary' | 'destructive'> = {
    Admin: 'destructive',
    Teacher: 'default',
    Student: 'secondary',
  };

  return (
    <nav className="border-b bg-white px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h1 className="font-bold text-lg text-gray-900">Assignment System</h1>
        {user && (
          <Badge variant={roleColor[user.role] ?? 'default'}>{user.role}</Badge>
        )}
      </div>
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{user.fullName}</span>
          <Button variant="outline" size="sm" onClick={logout}>Sign Out</Button>
        </div>
      )}
    </nav>
  );
}