'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import AdminForm from '@/components/admin/AdminForm';
import { api, AdminUser } from '@/lib/api';
import Link from 'next/link';

function EditAdminContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    if (id) {
      api.getAdmins()
        .then(list => {
          const match = list.find(u => u.id === +id);
          setAdminUser(match ?? null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id]);

  return (
    <AdminShell>
      <div style={{ marginBottom:'24px' }}>
        <Link href="/admin-dashboard/admins" style={{ color:'#9444A1', fontSize:'13px', fontWeight:600, textDecoration:'none' }}>← Back to Admins</Link>
        <h1 style={{ fontSize:'22px', fontWeight:700, color:'#1a1a2e', marginTop:'8px' }}>Edit Admin User</h1>
      </div>
      <div style={{ background:'#fff', borderRadius:'12px', border:'1px solid #e5e7eb', padding:'28px', boxShadow:'0 1px 3px rgba(0,0,0,.06)', maxWidth: '600px' }}>
        {loading ? <p style={{ color:'#9ca3af' }}>Loading…</p> : adminUser ? <AdminForm initial={adminUser} /> : <p>Not found.</p>}
      </div>
    </AdminShell>
  );
}

export default function EditAdminPage() {
  return (
    <Suspense fallback={
      <AdminShell>
        <p style={{ color:'#9ca3af' }}>Loading…</p>
      </AdminShell>
    }>
      <EditAdminContent />
    </Suspense>
  );
}
