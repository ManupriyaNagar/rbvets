'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import CategoryForm from '@/components/admin/CategoryForm';
import { api, Category } from '@/lib/api';
import Link from 'next/link';

function EditCategoryContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [cat, setCat]       = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      api.getCategory(+id).then(setCat).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id]);

  return (
    <AdminShell>
      <div style={{ marginBottom:'24px' }}>
        <Link href="/admin-dashboard/categories" style={{ color:'#9444A1', fontSize:'13px', fontWeight:600, textDecoration:'none' }}>← Back to Categories</Link>
        <h1 style={{ fontSize:'22px', fontWeight:700, color:'#1a1a2e', marginTop:'8px' }}>Edit Category</h1>
      </div>
      <div style={{ background:'#fff', borderRadius:'12px', border:'1px solid #e5e7eb', padding:'28px', boxShadow:'0 1px 3px rgba(0,0,0,.06)' }}>
        {loading ? <p style={{ color:'#9ca3af' }}>Loading…</p> : cat ? <CategoryForm initial={cat} /> : <p>Not found.</p>}
      </div>
    </AdminShell>
  );
}

export default function EditCategoryPage() {
  return (
    <Suspense fallback={
      <AdminShell>
        <p style={{ color:'#9ca3af' }}>Loading…</p>
      </AdminShell>
    }>
      <EditCategoryContent />
    </Suspense>
  );
}
