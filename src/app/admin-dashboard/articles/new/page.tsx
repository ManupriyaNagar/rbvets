'use client';
import AdminShell from '@/components/admin/AdminShell';
import ArticleForm from '@/components/admin/ArticleForm';
import Link from 'next/link';

export default function NewArticlePage() {
  return (
    <AdminShell>
      <div style={{ marginBottom:'24px' }}>
        <Link href="/admin-dashboard/articles" style={{ color:'#9444A1', fontSize:'13px', fontWeight:600, textDecoration:'none' }}>← Back to Articles</Link>
        <h1 style={{ fontSize:'22px', fontWeight:700, color:'#1a1a2e', marginTop:'8px' }}>New Article</h1>
        <p style={{ fontSize:'13px', color:'#6b7280', marginTop:'4px' }}>Fill in the details and add content sections below.</p>
      </div>
      <div style={{ background:'#fff', borderRadius:'12px', border:'1px solid #e5e7eb', padding:'28px', boxShadow:'0 1px 3px rgba(0,0,0,.06)' }}>
        <ArticleForm />
      </div>
    </AdminShell>
  );
}
