'use client';
import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { api, Topic, Category } from '@/lib/api';

export default function TopicForm({ initial }: { initial?: Topic }) {
  const router = useRouter();
  const [cats, setCats]   = useState<Category[]>([]);
  const [form, setForm]   = useState({
    category_id: initial?.category_id ?? 0,
    title:       initial?.title       ?? '',
    slug:        initial?.slug        ?? '',
    description: initial?.description ?? '',
    sort_order:  initial?.sort_order  ?? 0,
    is_active:   initial?.is_active   ?? 1,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState('');

  useEffect(() => { api.getCategories().then(setCats); }, []);

  const set = (k: string, v: unknown) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      if (initial?.id) {
        await api.updateTopic(initial.id, form);
      } else {
        await api.createTopic(form);
      }
      router.push('/admin-dashboard/topics');
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
          <label style={s.label}>Category *</label>
          <select style={s.input} value={form.category_id} required onChange={e => set('category_id', +e.target.value)}>
            <option value={0}>— Select category —</option>
            {cats.map(c => {
              const isEmoji = c.icon && !c.icon.startsWith('http') && !c.icon.startsWith('/') && !c.icon.startsWith('data:');
              return (
                <option key={c.id} value={c.id}>
                  {isEmoji ? c.icon : '🐾'} {c.name}
                </option>
              );
            })}
          </select>
        </div>
        <div style={s.field}>
          <label style={s.label}>Sort Order</label>
          <input style={s.input} type="number" value={form.sort_order} onChange={e => set('sort_order', +e.target.value)} />
        </div>
        <div style={s.field}>
          <label style={s.label}>Title *</label>
          <input style={s.input} value={form.title} required
            onChange={e => { set('title', e.target.value); if (!initial) set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')); }} />
        </div>
        <div style={s.field}>
          <label style={s.label}>Slug *</label>
          <input style={s.input} value={form.slug} required onChange={e => set('slug', e.target.value)} />
        </div>
        <div style={{ ...s.field, gridColumn:'span 2' }}>
          <label style={s.label}>Description</label>
          <textarea style={s.textarea} value={form.description} onChange={e => set('description', e.target.value)} rows={3} />
        </div>
        <div style={s.field}>
          <label style={s.label}>Status</label>
          <select style={s.input} value={form.is_active} onChange={e => set('is_active', +e.target.value)}>
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
        </div>
      </div>

      <div style={s.footer}>
        <button type="button" onClick={() => router.back()} style={s.cancelBtn}>Cancel</button>
        <button type="submit" disabled={saving} style={s.saveBtn}>
          {saving ? 'Saving…' : initial ? 'Update Topic' : 'Create Topic'}
        </button>
      </div>
    </form>
  );
}

const s: Record<string, React.CSSProperties> = {
  form:     { display:'flex', flexDirection:'column' },
  error:    { background:'rgba(239,68,68,.08)', border:'1px solid rgba(239,68,68,.25)', color:'#b91c1c', borderRadius:'8px', padding:'12px 14px', fontSize:'13px', marginBottom:'20px' },
  grid:     { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', marginBottom:'24px' },
  field:    { display:'flex', flexDirection:'column', gap:'6px' },
  label:    { fontSize:'13px', fontWeight:600, color:'#374151' },
  input:    { padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:'8px', fontSize:'14px', fontFamily:'inherit', outline:'none', width:'100%', color:'#1a1a2e' },
  textarea: { padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:'8px', fontSize:'14px', fontFamily:'inherit', outline:'none', resize:'vertical', width:'100%', color:'#1a1a2e' },
  footer:   { display:'flex', gap:'12px', justifyContent:'flex-end', paddingTop:'20px', borderTop:'1px solid #e5e7eb' },
  cancelBtn:{ padding:'10px 20px', borderRadius:'8px', border:'1.5px solid #e5e7eb', background:'#fff', cursor:'pointer', fontSize:'14px', fontWeight:600 },
  saveBtn:  { padding:'10px 24px', borderRadius:'8px', background:'#9444A1', color:'#fff', border:'none', cursor:'pointer', fontSize:'14px', fontWeight:600 },
};
