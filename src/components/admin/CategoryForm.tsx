'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { api, Category } from '@/lib/api';

const EMOJIS = ['🐕','🐈','🐴','🦜','🐇','🐠','🐢','🦎','🐾','🐶','🐱','🐭','🐹'];

export default function CategoryForm({ initial }: { initial?: Category }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name:        initial?.name        ?? '',
    slug:        initial?.slug        ?? '',
    description: initial?.description ?? '',
    icon:        initial?.icon        ?? '🐾',
    sort_order:  initial?.sort_order  ?? 0,
    is_active:   initial?.is_active   ?? 1,
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError]   = useState('');

  const set = (k: string, v: unknown) => setForm(f => ({ ...f, [k]: v }));

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await api.uploadMedia(file);
      set('icon', res.url);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      if (initial?.id) {
        await api.updateCategory(initial.id, form);
      } else {
        await api.createCategory(form);
      }
      router.push('/admin-dashboard/categories');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={s.form}>
      {error && <div style={s.error}>⚠️ {error}</div>}

      <div style={s.grid}>
        <div style={s.field}>
          <label style={s.label}>Category Name *</label>
          <input style={s.input} value={form.name} required
            onChange={e => { set('name', e.target.value); if (!initial) set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')); }} />
        </div>
        <div style={s.field}>
          <label style={s.label}>Slug *</label>
          <input style={s.input} value={form.slug} required onChange={e => set('slug', e.target.value)} />
          <span style={s.hint}>URL-friendly identifier</span>
        </div>
        <div style={{ ...s.field, gridColumn:'span 2' }}>
          <label style={s.label}>Description</label>
          <textarea style={s.textarea} value={form.description} onChange={e => set('description', e.target.value)} rows={3} />
        </div>
        <div style={s.field}>
          <label style={s.label}>Category Icon / Image</label>
          <div style={s.imageRow}>
            <input style={{ ...s.input, flex: 1 }} value={form.icon} placeholder="Emoji or Image URL"
              onChange={e => set('icon', e.target.value)} />
            <label style={s.uploadBtn}>
              {uploading ? 'Uploading…' : '📁 Upload'}
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} disabled={uploading} />
            </label>
          </div>
          <span style={s.hint}>
            Recommended size: 512x512px (Square, PNG/SVG with transparent background).
          </span>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '4px' }}>
            <div style={s.previewContainer}>
              {form.icon && (form.icon.startsWith('http') || form.icon.startsWith('/') || form.icon.startsWith('data:')) ? (
                <img src={form.icon} alt="preview" style={s.imgPreview} />
              ) : (
                <span style={{ fontSize: '24px' }}>{form.icon || '🐾'}</span>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ ...s.label, fontSize: '11px', display: 'block', marginBottom: '4px' }}>Emoji Presets:</span>
              <div style={s.emojiGrid}>
                {EMOJIS.map(em => (
                  <button key={em} type="button" onClick={() => set('icon', em)}
                    style={{ ...s.emojiBtn, ...(form.icon === em ? s.emojiBtnActive : {}) }}>
                    {em}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={s.field}>
          <label style={s.label}>Sort Order</label>
          <input style={s.input} type="number" value={form.sort_order} onChange={e => set('sort_order', +e.target.value)} />
          <div style={{ marginTop:'12px' }}>
            <label style={s.label}>Status</label>
            <select style={s.input} value={form.is_active} onChange={e => set('is_active', +e.target.value)}>
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div style={s.footer}>
        <button type="button" onClick={() => router.back()} style={s.cancelBtn}>Cancel</button>
        <button type="submit" disabled={saving} style={s.saveBtn}>
          {saving ? 'Saving…' : initial ? 'Update Category' : 'Create Category'}
        </button>
      </div>
    </form>
  );
}

const s: Record<string, React.CSSProperties> = {
  form:         { display:'flex', flexDirection:'column', gap:'0' },
  error:        { background:'rgba(239,68,68,.08)', border:'1px solid rgba(239,68,68,.25)', color:'#b91c1c', borderRadius:'8px', padding:'12px 14px', fontSize:'13px', marginBottom:'20px' },
  grid:         { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', marginBottom:'24px' },
  field:        { display:'flex', flexDirection:'column', gap:'6px' },
  label:        { fontSize:'13px', fontWeight:600, color:'#374151' },
  input:        { padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:'8px', fontSize:'14px', fontFamily:'inherit', outline:'none', width:'100%', color:'#1a1a2e' },
  textarea:     { padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:'8px', fontSize:'14px', fontFamily:'inherit', outline:'none', resize:'vertical', width:'100%', color:'#1a1a2e' },
  hint:         { fontSize:'11px', color:'#9ca3af' },
  imageRow:     { display:'flex', gap:'10px', alignItems:'center' },
  uploadBtn:    { padding:'10px 16px', background:'#f3f4f6', border:'1.5px solid #e5e7eb', borderRadius:'8px', cursor:'pointer', fontSize:'13px', fontWeight:600, whiteSpace:'nowrap', flexShrink:0 },
  previewContainer:{ width:'54px', height:'54px', border:'1.5px solid #e5e7eb', borderRadius:'10px', background:'#f9fafb', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', flexShrink:0 },
  imgPreview:   { width:'100%', height:'100%', objectFit:'contain' },
  emojiGrid:    { display:'flex', flexWrap:'wrap', gap:'6px' },
  emojiBtn:     { width:'36px', height:'36px', border:'1.5px solid #e5e7eb', borderRadius:'8px', background:'#f9fafb', cursor:'pointer', fontSize:'18px', display:'flex', alignItems:'center', justifyContent:'center' },
  emojiBtnActive:{ border:'1.5px solid #9444A1', background:'rgba(148,68,161,.1)' },
  footer:       { display:'flex', gap:'12px', justifyContent:'flex-end', paddingTop:'20px', borderTop:'1px solid #e5e7eb' },
  cancelBtn:    { padding:'10px 20px', borderRadius:'8px', border:'1.5px solid #e5e7eb', background:'#fff', cursor:'pointer', fontSize:'14px', fontWeight:600 },
  saveBtn:      { padding:'10px 24px', borderRadius:'8px', background:'#9444A1', color:'#fff', border:'none', cursor:'pointer', fontSize:'14px', fontWeight:600 },
};
