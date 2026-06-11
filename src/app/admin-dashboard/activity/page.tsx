'use client';
import { useEffect, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { api, ActivityList } from '@/lib/api';

export default function ActivityPage() {
  const [data, setData]       = useState<ActivityList | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage]       = useState(1);

  useEffect(() => {
    setLoading(true);
    api.getActivity(page).then(setData).finally(() => setLoading(false));
  }, [page]);

  const logs = data?.logs ?? [];

  const actionColor = (action: string) => {
    if (action.includes('delete')) return { bg:'rgba(239,68,68,.1)', color:'#ef4444' };
    if (action.includes('create') || action.includes('login')) return { bg:'rgba(34,197,94,.1)', color:'#16a34a' };
    if (action.includes('update')) return { bg:'rgba(59,130,246,.1)', color:'#3b82f6' };
    return { bg:'rgba(107,114,128,.1)', color:'#6b7280' };
  };

  return (
    <AdminShell>
      <div style={s.pageHeader}>
        <div>
          <h1 style={s.pageTitle}>Activity Log</h1>
          <p style={s.pageSub}>{data?.total ?? 0} events recorded</p>
        </div>
      </div>

      <div style={s.card}>
        {loading ? <div style={s.loading}>Loading…</div> : logs.length === 0 ? (
          <div style={s.empty}>No activity recorded yet.</div>
        ) : (
          <div style={s.tableWrap}>
            <table style={s.table}>
              <thead>
                <tr>{['Admin','Action','Target','Time'].map(h => <th key={h} style={s.th}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {logs.map(log => {
                  const c = actionColor(log.action);
                  return (
                    <tr key={log.id}>
                      <td style={s.td}>
                        <div style={s.adminRow}>
                          <div style={s.avatar}>{(log.admin_name || 'S').charAt(0).toUpperCase()}</div>
                          <span style={s.name}>{log.admin_name || 'System'}</span>
                        </div>
                      </td>
                      <td style={s.td}>
                        <span style={{ ...s.badge, background: c.bg, color: c.color }}>{log.action}</span>
                      </td>
                      <td style={s.td}><span style={s.target}>{log.target || '—'}</span></td>
                      <td style={s.td}><span style={s.time}>{new Date(log.created_at).toLocaleString()}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

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
  pageHeader: { display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'24px' },
  pageTitle:  { fontSize:'22px', fontWeight:700, color:'#1a1a2e', marginBottom:'4px' },
  pageSub:    { fontSize:'13px', color:'#6b7280' },
  card:       { background:'#fff', borderRadius:'12px', border:'1px solid #e5e7eb', boxShadow:'0 1px 3px rgba(0,0,0,.06)', overflow:'hidden' },
  loading:    { padding:'40px', textAlign:'center', color:'#9ca3af' },
  empty:      { padding:'60px', textAlign:'center', color:'#9ca3af' },
  tableWrap:  { overflowX:'auto' },
  table:      { width:'100%', borderCollapse:'collapse', fontSize:'14px' },
  th:         { background:'#f9fafb', padding:'12px 16px', textAlign:'left', fontSize:'11px', fontWeight:600, textTransform:'uppercase', letterSpacing:'.05em', color:'#6b7280', borderBottom:'1px solid #e5e7eb' },
  td:         { padding:'14px 16px', borderBottom:'1px solid #f3f4f6', verticalAlign:'middle' },
  adminRow:   { display:'flex', alignItems:'center', gap:'10px' },
  avatar:     { width:'30px', height:'30px', borderRadius:'50%', background:'#9444A1', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:'12px', flexShrink:0 },
  name:       { fontWeight:600, color:'#1a1a2e' },
  badge:      { padding:'3px 10px', borderRadius:'20px', fontSize:'11px', fontWeight:600 },
  target:     { fontSize:'13px', color:'#6b7280' },
  time:       { fontSize:'12px', color:'#9ca3af' },
  pagination: { display:'flex', gap:'6px', padding:'16px 20px', borderTop:'1px solid #f3f4f6' },
  pageBtn:    { padding:'7px 13px', borderRadius:'7px', border:'1.5px solid #e5e7eb', background:'#fff', fontSize:'13px', cursor:'pointer' },
  pageBtnActive:{ background:'#9444A1', color:'#fff', borderColor:'#9444A1' },
};
