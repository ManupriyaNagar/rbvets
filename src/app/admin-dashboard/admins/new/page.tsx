'use client';
import AdminShell from '@/components/admin/AdminShell';
import AdminForm from '@/components/admin/AdminForm';
import Link from 'next/link';

export default function NewAdminPage() {
  return (
    <AdminShell>
      <div style={{ marginBottom:'24px' }}>
        <Link href="/admin-dashboard/admins" style={{ color:'#9444A1', fontSize:'13px', fontWeight:600, textDecoration:'none' }}>← Back to Admins</Link>
        <h1 style={{ fontSize:'22px', fontWeight:700, color:'#1a1a2e', marginTop:'8px' }}>Add Admin User</h1>
      </div>
      <div style={{ background:'#fff', borderRadius:'12px', border:'1px solid #e5e7eb', padding:'28px', boxShadow:'0 1px 3px rgba(0,0,0,.06)', maxWidth: '600px' }}>
        <AdminForm />
      </div>
    </AdminShell>
  );
}
