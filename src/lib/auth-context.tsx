'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { api, Admin } from './api';

interface AuthCtx {
  admin: Admin | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const Ctx = createContext<AuthCtx>({} as AuthCtx);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin]   = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('rbv_token');
    if (!token) { setLoading(false); return; }
    api.me()
      .then(setAdmin)
      .catch(() => localStorage.removeItem('rbv_token'))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.login(email, password);
    localStorage.setItem('rbv_token', res.token);
    setAdmin(res.admin);
    router.push('/admin-dashboard');
  };

  const logout = () => {
    localStorage.removeItem('rbv_token');
    setAdmin(null);
    router.push('/admin-dashboard/login');
  };

  return <Ctx.Provider value={{ admin, loading, login, logout }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
