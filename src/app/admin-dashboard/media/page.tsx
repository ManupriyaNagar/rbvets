'use client';
import { useEffect, useState, useRef } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { api, MediaItem, MediaList } from '@/lib/api';

export default function MediaPage() {
  const [data, setData]         = useState<MediaList | null>(null);
  const [loading, setLoading]   = useState(true);
  const [uploading, setUploading] = useState(false);
  const [page, setPage]         = useState(1);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [copied, setCopied]     = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = (p = page) => {
    setLoading(true);
    api.getMedia(p).then(setData).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, [page]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    try {
      await Promise.all(files.map(f => api.uploadMedia(f)));
      load(1); setPage(1);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this file permanently?')) return;
    setDeleting(id);
    try { await api.deleteMedia(id); load(); }
    catch (e: unknown) { alert(e instanceof Error ? e.message : 'Delete failed'); }
    finally { setDeleting(null); }
  };

  const copyUrl = (item: MediaItem) => {
    navigator.clipboard.writeText(item.url);
    setCopied(item.id);
    setTimeout(() => setCopied(null), 2000);
  };

  const items = data?.media ?? [];

  return (
    <AdminShell>
      <div style={s.pageHeader}>
        <div>
          <h1 style={s.pageTitle}>Media Library</h1>
          <p style={s.pageSub}>{data?.total ?? 0} files uploaded</p>
        </div>
        <label style={s.uploadBtn}>
          {uploading ? '⏳ Uploading…' : '📁 Upload Files'}
          <input ref={inputRef} type="file" accept="image/*" multiple style={{ display:'none' }} onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      {/* Drop zone hint */}
      <div style={s.dropHint}>
        Click "Upload Files" to add images (JPG, PNG, WEBP, GIF, SVG — max 5 MB each)
      </div>

      {loading ? (
        <div style={s.loading}>Loading…</div>
      ) : items.length === 0 ? (
        <div style={s.empty}>No media yet. Upload your first image above.</div>
      ) : (
        <div style={s.grid}>
          {items.map(item => (
            <div key={item.id} style={s.mediaCard}>
              <div style={s.imgWrap}>
                {item.mime_type?.startsWith('image/') ? (
                  <img src={item.url} alt={item.original} style={s.img} />
                ) : (
                  <div style={s.fileIcon}>📄</div>
                )}
              </div>
              <div style={s.mediaInfo}>
                <div style={s.mediaName}>{item.original}</div>
                <div style={s.mediaMeta}>{(item.size_bytes / 1024).toFixed(1)} KB · {new Date(item.created_at).toLocaleDateString()}</div>
              </div>
              <div style={s.mediaActions}>
                <button onClick={() => copyUrl(item)} style={s.copyBtn}>
                  {copied === item.id ? '✓ Copied' : '🔗 Copy URL'}
                </button>
                <button onClick={() => handleDelete(item.id)} disabled={deleting === item.id} style={s.deleteBtn}>
                  {deleting === item.id ? '…' : '🗑'}
                </button>
              </div>
            </div>
          ))}
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
    </AdminShell>
  );
}

const s: Record<string, React.CSSProperties> = {
  pageHeader: { display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'16px', flexWrap:'wrap', gap:'12px' },
  pageTitle:  { fontSize:'22px', fontWeight:700, color:'#1a1a2e', marginBottom:'4px' },
  pageSub:    { fontSize:'13px', color:'#6b7280' },
  uploadBtn:  { background:'#9444A1', color:'#fff', padding:'10px 20px', borderRadius:'10px', fontWeight:600, fontSize:'14px', cursor:'pointer' },
  dropHint:   { background:'rgba(148,68,161,.05)', border:'1.5px dashed rgba(148,68,161,.3)', borderRadius:'10px', padding:'14px 20px', fontSize:'13px', color:'#9444A1', marginBottom:'20px', textAlign:'center' },
  loading:    { padding:'40px', textAlign:'center', color:'#9ca3af' },
  empty:      { padding:'60px', textAlign:'center', color:'#9ca3af', background:'#fff', borderRadius:'12px', border:'1px solid #e5e7eb' },
  grid:       { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:'16px' },
  mediaCard:  { background:'#fff', borderRadius:'12px', border:'1px solid #e5e7eb', overflow:'hidden', boxShadow:'0 1px 3px rgba(0,0,0,.06)' },
  imgWrap:    { height:'140px', background:'#f9fafb', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' },
  img:        { width:'100%', height:'100%', objectFit:'cover' },
  fileIcon:   { fontSize:'40px' },
  mediaInfo:  { padding:'10px 12px 6px' },
  mediaName:  { fontSize:'12px', fontWeight:600, color:'#1a1a2e', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' },
  mediaMeta:  { fontSize:'11px', color:'#9ca3af', marginTop:'2px' },
  mediaActions:{ display:'flex', gap:'6px', padding:'8px 12px 12px' },
  copyBtn:    { flex:1, padding:'6px 8px', background:'rgba(148,68,161,.08)', color:'#9444A1', border:'none', borderRadius:'6px', cursor:'pointer', fontSize:'11px', fontWeight:600 },
  deleteBtn:  { padding:'6px 10px', background:'rgba(239,68,68,.08)', color:'#ef4444', border:'none', borderRadius:'6px', cursor:'pointer', fontSize:'13px' },
  pagination: { display:'flex', gap:'6px', marginTop:'20px' },
  pageBtn:    { padding:'7px 13px', borderRadius:'7px', border:'1.5px solid #e5e7eb', background:'#fff', fontSize:'13px', cursor:'pointer' },
  pageBtnActive:{ background:'#9444A1', color:'#fff', borderColor:'#9444A1' },
};
