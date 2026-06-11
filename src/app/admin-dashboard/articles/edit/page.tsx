'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import ArticleForm from '@/components/admin/ArticleForm';
import { api, Article } from '@/lib/api';
import Link from 'next/link';

function EditArticleContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      api.getArticle(+id).then(setArticle).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id]);

  return (
    <AdminShell>
      <div style={{ marginBottom:'24px' }}>
        <Link href="/admin-dashboard/articles" style={{ color:'#9444A1', fontSize:'13px', fontWeight:600, textDecoration:'none' }}>← Back to Articles</Link>
        <h1 style={{ fontSize:'22px', fontWeight:700, color:'#1a1a2e', marginTop:'8px' }}>Edit Article</h1>
      </div>
      <div style={{ background:'#fff', borderRadius:'12px', border:'1px solid #e5e7eb', padding:'28px', boxShadow:'0 1px 3px rgba(0,0,0,.06)' }}>
        {loading ? <p style={{ color:'#9ca3af' }}>Loading…</p> : article ? <ArticleForm initial={article} /> : <p>Not found.</p>}
      </div>
    </AdminShell>
  );
}

export default function EditArticlePage() {
  return (
    <Suspense fallback={
      <AdminShell>
        <p style={{ color:'#9ca3af' }}>Loading…</p>
      </AdminShell>
    }>
      <EditArticleContent />
    </Suspense>
  );
}
