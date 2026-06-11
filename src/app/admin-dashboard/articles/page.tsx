'use client';
import { useEffect, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { api, Article, ArticleList } from '@/lib/api';
import Link from 'next/link';

export default function ArticlesPage() {
  const [data, setData]       = useState<ArticleList | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage]       = useState(1);
  const [status, setStatus]   = useState('');
  const [deleting, setDeleting] = useState<number | null>(null);

  const load = (p = page, st = status) => {
    setLoading(true);
    api.getArticles({ page: p, status: st || undefined })
      .then(setData)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [page, status]);

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Delete article "${title}"?`)) return;
    setDeleting(id);
    try { await api.deleteArticle(id); load(); }
    catch (e: unknown) { alert(e instanceof Error ? e.message : 'Delete failed'); }
    finally { setDeleting(null); }
  };

  const articles = data?.articles ?? [];

  return (
    <AdminShell>
      <div style={s.pageHeader}>
        <div>
          <h1 style={s.pageTitle}>Articles</h1>
          <p style={s.pageSub}>{data?.total ?? 0} articles total</p>
        </div>
        <Link href="/admin-dashboard/articles/new" style={s.primaryBtn}>+ New Article</Link>
      </div>

      {/* Filters */}
      <div style={s.filters}>
        {['', 'published', 'draft'].map(st => (
          <button key={st} onClick={() => { setStatus(st); setPage(1); }}
            style={{ ...s.filterBtn, ...(status === st ? s.filterActive : {}) }}>
            {st === '' ? 'All' : st.charAt(0).toUpperCase() + st.slice(1)}
          </button>
        ))}
      </div>

      <div style={s.card}>
        {loading ? <div style={s.loading}>Loading…</div> : (
          <div style={s.tableWrap}>
            <table style={s.table}>
              <thead>
                <tr>{['Title','Category / Topic','Author','Status','Views','Updated','Actions'].map(h => <th key={h} style={s.th}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {articles.length === 0 ? (
                  <tr><td colSpan={7} style={s.empty}>No articles found. <Link href="/admin-dashboard/articles/new" style={{ color:'#9444A1' }}>Create one →</Link></td></tr>
                ) : articles.map((a: Article) => (
                  <tr key={a.id}>
                    <td style={s.td}>
                      <div style={s.name}>{a.title}</div>
                      <div style={s.slugText}>{a.slug}</div>
                    </td>
                    <td style={s.td}>
                      <div style={s.catText}>{a.category_name}</div>
                      <div style={s.topicText}>{a.topic_title}</div>
                    </td>
                    <td style={s.td}>{a.author || '—'}</td>
                    <td style={s.td}>
                      <span style={{ ...s.badge, ...(a.status === 'published' ? s.badgeGreen : s.badgeGray) }}>
                        {a.status}
                      </span>
                    </td>
                    <td style={s.td}>{a.views}</td>
                    <td style={s.td}>{new Date(a.updated_at).toLocaleDateString()}</td>
                    <td style={s.td}>
                      <div style={s.actions}>
                        <Link href={`/admin-dashboard/articles/edit/?id=${a.id}`} style={s.editBtn}>Edit</Link>
                        <button onClick={() => handleDelete(a.id, a.title)} disabled={deleting === a.id} style={s.deleteBtn}>
                          {deleting === a.id ? '…' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {data && data.total_pages > 1 && (
          <div style={s.pagination}>
            {Array.from({ length: data.total_pages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)}
                style={{ ...s.pageBtn, ...(page === p ? s.pageBtnActive : {}) }}>
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}

const s: Record<string, React.CSSProperties> = {
  pageHeader:   { display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'20px', flexWrap:'wrap', gap:'12px' },
  pageTitle:    { fontSize:'22px', fontWeight:700, color:'#1a1a2e', marginBottom:'4px' },
  pageSub:      { fontSize:'13px', color:'#6b7280' },
  primaryBtn:   { background:'#9444A1', color:'#fff', padding:'10px 20px', borderRadius:'10px', textDecoration:'none', fontWeight:600, fontSize:'14px' },
  filters:      { display:'flex', gap:'8px', marginBottom:'16px' },
  filterBtn:    { padding:'7px 16px', borderRadius:'8px', border:'1.5px solid #e5e7eb', background:'#fff', cursor:'pointer', fontSize:'13px', fontWeight:500 },
  filterActive: { background:'#9444A1', color:'#fff', borderColor:'#9444A1' },
  card:         { background:'#fff', borderRadius:'12px', border:'1px solid #e5e7eb', boxShadow:'0 1px 3px rgba(0,0,0,.06)', overflow:'hidden' },
  loading:      { padding:'40px', textAlign:'center', color:'#9ca3af' },
  tableWrap:    { overflowX:'auto' },
  table:        { width:'100%', borderCollapse:'collapse', fontSize:'14px' },
  th:           { background:'#f9fafb', padding:'12px 16px', textAlign:'left', fontSize:'11px', fontWeight:600, textTransform:'uppercase', letterSpacing:'.05em', color:'#6b7280', borderBottom:'1px solid #e5e7eb' },
  td:           { padding:'14px 16px', borderBottom:'1px solid #f3f4f6', verticalAlign:'middle' },
  empty:        { padding:'40px', textAlign:'center', color:'#9ca3af' },
  name:         { fontWeight:600, color:'#1a1a2e', maxWidth:'260px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' },
  slugText:     { fontSize:'11px', color:'#9ca3af', marginTop:'2px' },
  catText:      { fontSize:'12px', fontWeight:600, color:'#9444A1' },
  topicText:    { fontSize:'11px', color:'#9ca3af', marginTop:'2px' },
  badge:        { padding:'3px 10px', borderRadius:'20px', fontSize:'11px', fontWeight:600 },
  badgeGreen:   { background:'rgba(34,197,94,.1)', color:'#16a34a' },
  badgeGray:    { background:'rgba(107,114,128,.1)', color:'#6b7280' },
  actions:      { display:'flex', gap:'8px' },
  editBtn:      { padding:'6px 14px', borderRadius:'6px', background:'rgba(148,68,161,.1)', color:'#9444A1', textDecoration:'none', fontSize:'12px', fontWeight:600 },
  deleteBtn:    { padding:'6px 14px', borderRadius:'6px', background:'rgba(239,68,68,.1)', color:'#ef4444', border:'none', cursor:'pointer', fontSize:'12px', fontWeight:600 },
  pagination:   { display:'flex', gap:'6px', padding:'16px 20px', borderTop:'1px solid #f3f4f6' },
  pageBtn:      { padding:'7px 13px', borderRadius:'7px', border:'1.5px solid #e5e7eb', background:'#fff', fontSize:'13px', cursor:'pointer' },
  pageBtnActive:{ background:'#9444A1', color:'#fff', borderColor:'#9444A1' },
};
