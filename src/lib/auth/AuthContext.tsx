'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api/client';

type Role = 'Admin' | 'Teacher' | 'Student';

interface User {
  userId: string;
  email: string;
  fullName: string;
  role: Role;
}

interface LoginResponseData {
  token: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    role: Role;
  };
}

interface ApiResponse<T> {
  data: T;
}

interface StoredAuth {
  token: string;
  user: User;
}

interface AuthCtx {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const Ctx = createContext<AuthCtx | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeTimer = window.setTimeout(() => {
      const stored = localStorage.getItem('auth');
      if (stored) {
        try {
          const data = JSON.parse(stored) as StoredAuth;
          setUser(data.user);
          setToken(data.token);
          document.cookie = `token=${data.token}; path=/; max-age=86400`;
        } catch {
          localStorage.removeItem('auth');
          document.cookie = 'token=; path=/; max-age=0';
        }
      }
      setIsLoading(false);
    }, 0);

    const handleUnauthorized = () => {
      setUser(null);
      setToken(null);
      setIsLoading(false);
      router.replace('/login');
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);

    return () => {
      window.clearTimeout(initializeTimer);
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, [router]);

  const login = async (email: string, password: string) => {
    const response = await apiClient.post<ApiResponse<LoginResponseData>>('/auth/login', {
      email,
      password,
    });
    const data = response.data.data;
    const nextUser: User = {
      userId: data.user.id,
      email: data.user.email,
      fullName: data.user.fullName,
      role: data.user.role,
    };

    setUser(nextUser);
    setToken(data.token);
    localStorage.setItem('auth', JSON.stringify({ token: data.token, user: nextUser }));
    document.cookie = `token=${data.token}; path=/; max-age=86400`;

    if (nextUser.role === 'Admin') router.push('/admin/dashboard');
    else if (nextUser.role === 'Teacher') router.push('/teacher/dashboard');
    else router.push('/student/dashboard');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth');
    document.cookie = 'token=; path=/; max-age=0';
    router.push('/login');
  };

  return <Ctx.Provider value={{ user, token, isLoading, login, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const context = useContext(Ctx);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
