'use client';
import { useEffect, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { api, Category } from '@/lib/api';
import Link from 'next/link';

export default function CategoriesPage() {
  const [cats, setCats]     = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    api.getCategories().then(setCats).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Delete category "${name}"? This will also delete all its topics and articles.`)) return;
    setDeleting(id);
    try { await api.deleteCategory(id); load(); }
    catch (e: unknown) { alert(e instanceof Error ? e.message : 'Delete failed'); }
    finally { setDeleting(null); }
  };

  return (
    <AdminShell>
      <div style={s.pageHeader}>
        <div>
          <h1 style={s.pageTitle}>Categories</h1>
          <p style={s.pageSub}>{cats.length} categories total</p>
        </div>
        <Link href="/admin-dashboard/categories/new" style={s.primaryBtn}>+ New Category</Link>
      </div>

      <div style={s.card}>
        {loading ? <div style={s.loading}>Loading…</div> : (
          <div style={s.tableWrap}>
            <table style={s.table}>
              <thead>
                <tr>
                  {['Icon','Name','Slug','Topics','Status','Sort','Actions'].map(h => (
                    <th key={h} style={s.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cats.length === 0 ? (
                  <tr><td colSpan={7} style={s.empty}>No categories yet. <Link href="/admin-dashboard/categories/new" style={{ color:'#9444A1' }}>Create one →</Link></td></tr>
                ) : cats.map(c => (
                  <tr key={c.id} style={s.tr}>
                    <td style={s.td}>
                      {c.icon && (c.icon.startsWith('http') || c.icon.startsWith('/') || c.icon.startsWith('data:')) ? (
                        <img src={c.icon} alt={c.name} style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                      ) : (
                        <span style={s.emoji}>{c.icon || '🐾'}</span>
                      )}
                    </td>
                    <td style={s.td}><span style={s.name}>{c.name}</span></td>
                    <td style={s.td}><code style={s.slug}>{c.slug}</code></td>
                    <td style={s.td}><span style={s.badge}>{c.topic_count ?? 0}</span></td>
                    <td style={s.td}>
                      <span style={{ ...s.status, ...(c.is_active ? s.active : s.inactive) }}>
                        {c.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={s.td}>{c.sort_order}</td>
                    <td style={s.td}>
                      <div style={s.actions}>
                        <Link href={`/admin-dashboard/categories/edit/?id=${c.id}`} style={s.editBtn}>Edit</Link>
                        <button
                          onClick={() => handleDelete(c.id, c.name)}
                          disabled={deleting === c.id}
                          style={s.deleteBtn}
                        >
                          {deleting === c.id ? '…' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminShell>
  );
}

const s: Record<string, React.CSSProperties> = {
  pageHeader: { display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'24px', flexWrap:'wrap', gap:'12px' },
  pageTitle:  { fontSize:'22px', fontWeight:700, color:'#1a1a2e', marginBottom:'4px' },
  pageSub:    { fontSize:'13px', color:'#6b7280' },
  primaryBtn: { background:'#9444A1', color:'#fff', padding:'10px 20px', borderRadius:'10px', textDecoration:'none', fontWeight:600, fontSize:'14px' },
  card:       { background:'#fff', borderRadius:'12px', border:'1px solid #e5e7eb', boxShadow:'0 1px 3px rgba(0,0,0,.06)', overflow:'hidden' },
  loading:    { padding:'40px', textAlign:'center', color:'#9ca3af' },
  tableWrap:  { overflowX:'auto' },
  table:      { width:'100%', borderCollapse:'collapse', fontSize:'14px' },
  th:         { background:'#f9fafb', padding:'12px 16px', textAlign:'left', fontSize:'11px', fontWeight:600, textTransform:'uppercase', letterSpacing:'.05em', color:'#6b7280', borderBottom:'1px solid #e5e7eb' },
  tr:         { transition:'background .15s' },
  td:         { padding:'14px 16px', borderBottom:'1px solid #f3f4f6', verticalAlign:'middle' },
  empty:      { padding:'40px', textAlign:'center', color:'#9ca3af' },
  emoji:      { fontSize:'22px' },
  name:       { fontWeight:600, color:'#1a1a2e' },
  slug:       { background:'#f3f4f6', padding:'2px 8px', borderRadius:'4px', fontSize:'12px', color:'#6b7280' },
  badge:      { background:'rgba(148,68,161,.1)', color:'#9444A1', padding:'3px 10px', borderRadius:'20px', fontSize:'12px', fontWeight:600 },
  status:     { padding:'3px 10px', borderRadius:'20px', fontSize:'11px', fontWeight:600 },
  active:     { background:'rgba(34,197,94,.1)', color:'#16a34a' },
  inactive:   { background:'rgba(107,114,128,.1)', color:'#6b7280' },
  actions:    { display:'flex', gap:'8px' },
  editBtn:    { padding:'6px 14px', borderRadius:'6px', background:'rgba(148,68,161,.1)', color:'#9444A1', textDecoration:'none', fontSize:'12px', fontWeight:600 },
  deleteBtn:  { padding:'6px 14px', borderRadius:'6px', background:'rgba(239,68,68,.1)', color:'#ef4444', border:'none', cursor:'pointer', fontSize:'12px', fontWeight:600 },
};
