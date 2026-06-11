'use client';
import { useEffect, ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

const NAV = [
  { key: 'dashboard',  label: 'Dashboard',    icon: '📊', href: '/admin-dashboard' },
  { key: 'categories', label: 'Categories',   icon: '📁', href: '/admin-dashboard/categories' },
  { key: 'topics',     label: 'Topics',       icon: '📋', href: '/admin-dashboard/topics' },
  { key: 'articles',   label: 'Articles',     icon: '📝', href: '/admin-dashboard/articles' },
  { key: 'media',      label: 'Media',        icon: '🖼️', href: '/admin-dashboard/media' },
  { key: 'admins',     label: 'Admin Users',  icon: '👥', href: '/admin-dashboard/admins' },
  { key: 'activity',   label: 'Activity Log', icon: '🕐', href: '/admin-dashboard/activity' },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const { admin, loading, logout } = useAuth();
  const router   = useRouter();
  const pathname = usePathname();
  const [sideOpen, setSideOpen] = useState(false);

  useEffect(() => {
    if (!loading && !admin) router.replace('/admin-dashboard/login');
  }, [admin, loading, router]);

  if (loading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#f4f6fb' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:'40px', marginBottom:'12px' }}>🐾</div>
        <p style={{ color:'#9444A1', fontWeight:600 }}>Loading…</p>
      </div>
    </div>
  );
  if (!admin) return null;

  const initial = admin.name.charAt(0).toUpperCase();

  return (
    <div style={s.shell}>
      {/* Overlay for mobile */}
      {sideOpen && <div style={s.overlay} onClick={() => setSideOpen(false)} />}

      {/* Sidebar */}
      <aside style={{ ...s.sidebar, ...(sideOpen ? s.sidebarOpen : {}) }}>
        <div style={s.sidebarLogo}>
          <div style={s.logoIcon}>🐾</div>
          <div>
            <div style={s.logoTitle}>RBV Admin</div>
            <div style={s.logoSub}>Vetcare Dashboard</div>
          </div>
        </div>

        <nav style={s.nav}>
          <div style={s.navLabel}>MAIN MENU</div>
          {NAV.slice(0,1).map(item => (
            <NavItem key={item.key} item={item} active={pathname === item.href} onClick={() => setSideOpen(false)} />
          ))}
          <div style={{ ...s.navLabel, marginTop:'20px' }}>CONTENT</div>
          {NAV.slice(1,5).map(item => (
            <NavItem key={item.key} item={item} active={pathname.startsWith(item.href) && item.href !== '/admin-dashboard'} onClick={() => setSideOpen(false)} />
          ))}
          <div style={{ ...s.navLabel, marginTop:'20px' }}>SYSTEM</div>
          {NAV.slice(5).map(item => (
            <NavItem key={item.key} item={item} active={pathname.startsWith(item.href)} onClick={() => setSideOpen(false)} />
          ))}
        </nav>

        <div style={s.sidebarFooter}>
          <div style={s.adminCard}>
            <div style={s.avatar}>{initial}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={s.adminName}>{admin.name}</div>
              <div style={s.adminRole}>{admin.role}</div>
            </div>
            <button onClick={logout} style={s.logoutBtn} title="Logout">⏻</button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div style={s.main}>
        {/* Topbar */}
        <header style={s.topbar}>
          <button style={s.menuBtn} onClick={() => setSideOpen(!sideOpen)}>☰</button>
          <div style={s.topbarRight}>
            <Link href="/" target="_blank" style={s.viewSiteBtn}>↗ View Site</Link>
            <div style={s.topbarAvatar}>{initial}</div>
          </div>
        </header>
        <main style={s.content}>{children}</main>
      </div>
    </div>
  );
}

function NavItem({ item, active, onClick }: { item: typeof NAV[0]; active: boolean; onClick: () => void }) {
  return (
    <Link href={item.href} onClick={onClick} style={{ ...s.navItem, ...(active ? s.navItemActive : {}) }}>
      <span style={s.navIcon}>{item.icon}</span>
      {item.label}
    </Link>
  );
}

const s: Record<string, React.CSSProperties> = {
  shell:       { display:'flex', minHeight:'100vh', fontFamily:"'Inter',sans-serif", background:'#f4f6fb' },
  overlay:     { position:'fixed', inset:0, background:'rgba(0,0,0,.5)', zIndex:99 },
  sidebar:     {
    width:'256px', minHeight:'100vh', background:'#1e1b2e',
    display:'flex', flexDirection:'column', position:'fixed', top:0, left:0, zIndex:100,
    transition:'transform .3s',
  },
  sidebarOpen: { transform:'translateX(0)' },
  sidebarLogo: { padding:'24px 20px 20px', borderBottom:'1px solid rgba(255,255,255,.08)', display:'flex', alignItems:'center', gap:'12px' },
  logoIcon:    { width:'40px', height:'40px', background:'#9444A1', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', flexShrink:0 },
  logoTitle:   { color:'#fff', fontWeight:700, fontSize:'15px' },
  logoSub:     { color:'rgba(255,255,255,.4)', fontSize:'11px' },
  nav:         { flex:1, padding:'16px 12px', overflowY:'auto' },
  navLabel:    { fontSize:'10px', fontWeight:600, letterSpacing:'.08em', color:'rgba(255,255,255,.3)', textTransform:'uppercase', padding:'0 8px', marginBottom:'6px' },
  navItem:     { display:'flex', alignItems:'center', gap:'10px', padding:'10px 12px', borderRadius:'8px', color:'rgba(255,255,255,.65)', textDecoration:'none', fontSize:'14px', fontWeight:500, marginBottom:'2px', transition:'background .2s' },
  navItemActive:{ background:'#9444A1', color:'#fff' },
  navIcon:     { fontSize:'16px', width:'20px', textAlign:'center' },
  sidebarFooter:{ padding:'16px 12px', borderTop:'1px solid rgba(255,255,255,.08)' },
  adminCard:   { display:'flex', alignItems:'center', gap:'10px', padding:'10px 12px', borderRadius:'8px', background:'rgba(255,255,255,.06)' },
  avatar:      { width:'34px', height:'34px', borderRadius:'50%', background:'#9444A1', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:'14px', flexShrink:0 },
  adminName:   { color:'#fff', fontSize:'13px', fontWeight:600, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' },
  adminRole:   { color:'rgba(255,255,255,.4)', fontSize:'11px' },
  logoutBtn:   { background:'none', border:'none', color:'rgba(255,255,255,.4)', cursor:'pointer', fontSize:'18px', padding:'4px', lineHeight:1 },
  main:        { marginLeft:'256px', flex:1, display:'flex', flexDirection:'column', minHeight:'100vh' },
  topbar:      { background:'#fff', borderBottom:'1px solid #e5e7eb', padding:'0 24px', height:'60px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:50, boxShadow:'0 1px 3px rgba(0,0,0,.06)' },
  menuBtn:     { background:'none', border:'none', fontSize:'22px', cursor:'pointer', color:'#374151', display:'none' },
  topbarRight: { display:'flex', alignItems:'center', gap:'12px' },
  viewSiteBtn: { fontSize:'13px', color:'#9444A1', fontWeight:600, textDecoration:'none', padding:'7px 14px', border:'1.5px solid #9444A1', borderRadius:'8px' },
  topbarAvatar:{ width:'34px', height:'34px', borderRadius:'50%', background:'#9444A1', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:'14px' },
  content:     { padding:'28px', flex:1 },
};
