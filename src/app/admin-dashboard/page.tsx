'use client';
import { useEffect, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { api, StatsData } from '@/lib/api';
import Link from 'next/link';

export default function DashboardPage() {
  const [data, setData]     = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.stats().then(setData).catch(console.error).finally(() => setLoading(false));
  }, []);

  const stats = data?.stats;

  const statCards = [
    { label: 'Categories',  value: stats?.categories ?? 0, icon: '📁', color: '#9444A1', bg: 'rgba(148,68,161,.1)' },
    { label: 'Topics',      value: stats?.topics ?? 0,     icon: '📋', color: '#d7a463', bg: 'rgba(215,164,99,.1)' },
    { label: 'Published',   value: stats?.published ?? 0,  icon: '✅', color: '#22c55e', bg: 'rgba(34,197,94,.1)' },
    { label: 'Drafts',      value: stats?.drafts ?? 0,     icon: '📄', color: '#f59e0b', bg: 'rgba(245,158,11,.1)' },
    { label: 'Total Articles',value: stats?.articles ?? 0, icon: '📝', color: '#3b82f6', bg: 'rgba(59,130,246,.1)' },
    { label: 'Media Files', value: stats?.media ?? 0,      icon: '🖼️', color: '#ec4899', bg: 'rgba(236,72,153,.1)' },
  ];

  return (
    <AdminShell>
      <div>
        <div style={s.pageHeader}>
          <div>
            <h1 style={s.pageTitle}>Dashboard</h1>
            <p style={s.pageSub}>Welcome back — here's what's happening with your pet blog.</p>
          </div>
          <Link href="/admin-dashboard/articles/new" style={s.primaryBtn}>
            + New Article
          </Link>
        </div>

        {/* Stats */}
        <div style={s.statsGrid}>
          {statCards.map(c => (
            <div key={c.label} style={s.statCard}>
              <div style={{ ...s.statIcon, background: c.bg, color: c.color }}>{c.icon}</div>
              <div>
                <div style={s.statValue}>{loading ? '—' : c.value}</div>
                <div style={s.statLabel}>{c.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={s.grid2}>
          {/* Recent Articles */}
          <div style={s.card}>
            <div style={s.cardHeader}>
              <span style={s.cardTitle}>Recent Articles</span>
              <Link href="/admin-dashboard/articles" style={s.cardLink}>View all →</Link>
            </div>
            <div style={s.cardBody}>
              {loading ? <p style={s.muted}>Loading…</p> : data?.recent_articles.length === 0 ? (
                <p style={s.muted}>No articles yet.</p>
              ) : data?.recent_articles.map((a, i) => (
                <div key={i} style={s.listRow}>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={s.listTitle}>{a.title}</div>
                    <div style={s.listSub}>{a.topic_title} · {new Date(a.created_at!).toLocaleDateString()}</div>
                  </div>
                  <span style={{ ...s.badge, ...(a.status === 'published' ? s.badgeGreen : s.badgeGray) }}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div style={s.card}>
            <div style={s.cardHeader}>
              <span style={s.cardTitle}>Recent Activity</span>
              <Link href="/admin-dashboard/activity" style={s.cardLink}>View all →</Link>
            </div>
            <div style={s.cardBody}>
              {loading ? <p style={s.muted}>Loading…</p> : data?.activity.length === 0 ? (
                <p style={s.muted}>No activity yet.</p>
              ) : data?.activity.map((a, i) => (
                <div key={i} style={s.listRow}>
                  <div style={s.activityDot} />
                  <div style={{ flex:1 }}>
                    <div style={s.listTitle}><b>{a.admin_name}</b> {a.action} <span style={{ color:'#9444A1' }}>{a.target}</span></div>
                    <div style={s.listSub}>{new Date(a.created_at).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={s.card}>
          <div style={s.cardHeader}><span style={s.cardTitle}>Quick Actions</span></div>
          <div style={{ ...s.cardBody, display:'flex', flexWrap:'wrap', gap:'12px' }}>
            {[
              { label:'+ New Category', href:'/admin-dashboard/categories/new', color:'#9444A1' },
              { label:'+ New Topic',    href:'/admin-dashboard/topics/new',     color:'#d7a463' },
              { label:'+ New Article',  href:'/admin-dashboard/articles/new',   color:'#22c55e' },
              { label:'Upload Media',   href:'/admin-dashboard/media',          color:'#3b82f6' },
            ].map(q => (
              <Link key={q.label} href={q.href} style={{ ...s.quickBtn, background: q.color }}>
                {q.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

const s: Record<string, React.CSSProperties> = {
  pageHeader:  { display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'28px', flexWrap:'wrap', gap:'12px' },
  pageTitle:   { fontSize:'24px', fontWeight:700, color:'#1a1a2e', marginBottom:'4px' },
  pageSub:     { fontSize:'14px', color:'#6b7280' },
  primaryBtn:  { background:'#9444A1', color:'#fff', padding:'10px 20px', borderRadius:'10px', textDecoration:'none', fontWeight:600, fontSize:'14px' },
  statsGrid:   { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:'16px', marginBottom:'24px' },
  statCard:    { background:'#fff', borderRadius:'12px', border:'1px solid #e5e7eb', padding:'20px', display:'flex', alignItems:'center', gap:'14px', boxShadow:'0 1px 3px rgba(0,0,0,.06)' },
  statIcon:    { width:'46px', height:'46px', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px', flexShrink:0 },
  statValue:   { fontSize:'26px', fontWeight:700, color:'#1a1a2e', lineHeight:1 },
  statLabel:   { fontSize:'12px', color:'#6b7280', marginTop:'3px' },
  grid2:       { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', marginBottom:'20px' },
  card:        { background:'#fff', borderRadius:'12px', border:'1px solid #e5e7eb', boxShadow:'0 1px 3px rgba(0,0,0,.06)', marginBottom:'20px' },
  cardHeader:  { padding:'16px 20px', borderBottom:'1px solid #e5e7eb', display:'flex', alignItems:'center', justifyContent:'space-between' },
  cardTitle:   { fontWeight:700, fontSize:'15px', color:'#1a1a2e' },
  cardLink:    { fontSize:'13px', color:'#9444A1', textDecoration:'none', fontWeight:600 },
  cardBody:    { padding:'16px 20px' },
  listRow:     { display:'flex', alignItems:'center', gap:'12px', padding:'10px 0', borderBottom:'1px solid #f3f4f6' },
  listTitle:   { fontSize:'14px', fontWeight:500, color:'#1a1a2e', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' },
  listSub:     { fontSize:'12px', color:'#9ca3af', marginTop:'2px' },
  badge:       { padding:'3px 10px', borderRadius:'20px', fontSize:'11px', fontWeight:600, flexShrink:0 },
  badgeGreen:  { background:'rgba(34,197,94,.1)', color:'#16a34a' },
  badgeGray:   { background:'rgba(107,114,128,.1)', color:'#6b7280' },
  activityDot: { width:'8px', height:'8px', borderRadius:'50%', background:'#9444A1', flexShrink:0 },
  muted:       { color:'#9ca3af', fontSize:'14px' },
  quickBtn:    { color:'#fff', padding:'10px 18px', borderRadius:'8px', textDecoration:'none', fontWeight:600, fontSize:'13px' },
};
