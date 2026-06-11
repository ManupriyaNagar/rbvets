'use client';
import { useEffect, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { api, AdminUser } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';

export default function AdminsPage() {
  const { admin: me } = useAuth();
  const [admins, setAdmins]   = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => { setLoading(true); api.getAdmins().then(setAdmins).finally(() => setLoading(false)); };
  useEffect(load, []);

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Remove admin "${name}"?`)) return;
    try { await api.deleteAdmin(id); load(); }
    catch (e: unknown) { alert(e instanceof Error ? e.message : 'Delete failed'); }
  };

  if (me?.role !== 'superadmin') return (
    <AdminShell>
      <div style={{ padding:'60px', textAlign:'center', color:'#9ca3af' }}>
        <div style={{ fontSize:'40px', marginBottom:'12px' }}>🔒</div>
        <p>Only superadmins can manage admin users.</p>
      </div>
    </AdminShell>
  );

  return (
    <AdminShell>
      <div style={s.pageHeader}>
        <div>
          <h1 style={s.pageTitle}>Admin Users</h1>
          <p style={s.pageSub}>{admins.length} admins</p>
        </div>
        <Link href="/admin-dashboard/admins/new" style={s.primaryBtn}>+ Add Admin</Link>
      </div>

      <div style={s.card}>
        {loading ? <div style={s.loading}>Loading…</div> : (
          <div style={s.tableWrap}>
            <table style={s.table}>
              <thead><tr>{['Name','Email','Role','Status','Last Login','Actions'].map(h => <th key={h} style={s.th}>{h}</th>)}</tr></thead>
              <tbody>
                {admins.map(a => (
                  <tr key={a.id}>
                    <td style={s.td}><div style={s.adminRow}><div style={s.avatar}>{a.name.charAt(0).toUpperCase()}</div><span style={s.name}>{a.name}</span></div></td>
                    <td style={s.td}>{a.email}</td>
                    <td style={s.td}><span style={{ ...s.badge, ...(a.role === 'superadmin' ? s.badgePurple : s.badgeGray) }}>{a.role}</span></td>
                    <td style={s.td}><span style={{ ...s.badge, ...(a.is_active ? s.badgeGreen : s.badgeRed) }}>{a.is_active ? 'Active' : 'Inactive'}</span></td>
                    <td style={s.td}>{a.last_login ? new Date(a.last_login).toLocaleDateString() : 'Never'}</td>
                    <td style={s.td}>
                      <div style={s.actions}>
                        <Link href={`/admin-dashboard/admins/edit/?id=${a.id}`} style={s.editBtn}>Edit</Link>
                        {a.id !== me?.id && <button onClick={() => handleDelete(a.id, a.name)} style={s.deleteBtn}>Remove</button>}
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
  pageHeader:   { display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'24px', flexWrap:'wrap', gap:'12px' },
  pageTitle:    { fontSize:'22px', fontWeight:700, color:'#1a1a2e', marginBottom:'4px' },
  pageSub:      { fontSize:'13px', color:'#6b7280' },
  primaryBtn:   { background:'#9444A1', color:'#fff', padding:'10px 20px', borderRadius:'10px', textDecoration:'none', fontWeight:600, fontSize:'14px', display:'inline-block' },
  card:         { background:'#fff', borderRadius:'12px', border:'1px solid #e5e7eb', boxShadow:'0 1px 3px rgba(0,0,0,.06)', overflow:'hidden' },
  loading:      { padding:'40px', textAlign:'center', color:'#9ca3af' },
  tableWrap:    { overflowX:'auto' },
  table:        { width:'100%', borderCollapse:'collapse', fontSize:'14px' },
  th:           { background:'#f9fafb', padding:'12px 16px', textAlign:'left', fontSize:'11px', fontWeight:600, textTransform:'uppercase', letterSpacing:'.05em', color:'#6b7280', borderBottom:'1px solid #e5e7eb' },
  td:           { padding:'14px 16px', borderBottom:'1px solid #f3f4f6', verticalAlign:'middle' },
  adminRow:     { display:'flex', alignItems:'center', gap:'10px' },
  avatar:       { width:'32px', height:'32px', borderRadius:'50%', background:'#9444A1', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:'13px', flexShrink:0 },
  name:         { fontWeight:600, color:'#1a1a2e' },
  badge:        { padding:'3px 10px', borderRadius:'20px', fontSize:'11px', fontWeight:600 },
  badgePurple:  { background:'rgba(148,68,161,.1)', color:'#9444A1' },
  badgeGray:    { background:'rgba(107,114,128,.1)', color:'#6b7280' },
  badgeGreen:   { background:'rgba(34,197,94,.1)', color:'#16a34a' },
  badgeRed:     { background:'rgba(239,68,68,.1)', color:'#ef4444' },
  actions:      { display:'flex', gap:'8px' },
  editBtn:      { padding:'6px 14px', borderRadius:'6px', background:'rgba(148,68,161,.1)', color:'#9444A1', textDecoration:'none', fontSize:'12px', fontWeight:600 },
  deleteBtn:    { padding:'6px 14px', borderRadius:'6px', background:'rgba(239,68,68,.1)', color:'#ef4444', border:'none', cursor:'pointer', fontSize:'12px', fontWeight:600 },
};
