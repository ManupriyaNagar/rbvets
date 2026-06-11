'use client';
import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { api, Article, Topic, Category, Section } from '@/lib/api';

export default function ArticleForm({ initial }: { initial?: Article }) {
  const router = useRouter();
  const [cats, setCats]     = useState<Category[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [catId, setCatId]   = useState<number>(0);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState('');

  const [form, setForm] = useState({
    topic_id:      initial?.topic_id      ?? 0,
    title:         initial?.title         ?? '',
    slug:          initial?.slug          ?? '',
    summary:       initial?.summary       ?? '',
    content:       initial?.content       ?? '',
    featured_image:initial?.featured_image ?? '',
    author:        initial?.author        ?? '',
    reviewed_date: initial?.reviewed_date ?? '',
    status:        initial?.status        ?? 'draft' as 'draft'|'published',
    sort_order:    initial?.sort_order    ?? 0,
  });

  const [sections, setSections] = useState<Section[]>(
    initial?.sections?.length ? initial.sections : [{ heading: '', body: '' }]
  );

  useEffect(() => {
    api.getCategories().then(cs => {
      setCats(cs);
      if (initial?.topic_id) {
        // find which category this topic belongs to
        api.getTopics().then(ts => {
          const t = ts.find(x => x.id === initial.topic_id);
          if (t) { setCatId(t.category_id); setTopics(ts.filter(x => x.category_id === t.category_id)); }
        });
      }
    });
  }, [initial]);

  const handleCatChange = async (cid: number) => {
    setCatId(cid);
    setForm(f => ({ ...f, topic_id: 0 }));
    if (cid) {
      const ts = await api.getTopics(cid);
      setTopics(ts);
    } else {
      setTopics([]);
    }
  };

  const set = (k: string, v: unknown) => setForm(f => ({ ...f, [k]: v }));

  // Sections
  const addSection    = () => setSections(s => [...s, { heading:'', body:'' }]);
  const removeSection = (i: number) => setSections(s => s.filter((_,j) => j !== i));
  const updateSection = (i: number, k: keyof Section, v: string) =>
    setSections(s => s.map((sec, j) => j === i ? { ...sec, [k]: v } : sec));

  // Image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await api.uploadMedia(file);
      set('featured_image', res.url);
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
      const payload = { ...form, sections: sections.filter(s => s.heading && s.body) };
      if (initial?.id) {
        await api.updateArticle(initial.id, payload);
      } else {
        await api.createArticle(payload);
      }
      router.push('/admin-dashboard/articles');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={s.error}>⚠️ {error}</div>}

      {/* Row 1 — Category + Topic */}
      <div style={s.grid2}>
        <div style={s.field}>
          <label style={s.label}>Category *</label>
          <select style={s.input} value={catId} required onChange={e => handleCatChange(+e.target.value)}>
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
          <label style={s.label}>Topic *</label>
          <select style={s.input} value={form.topic_id} required onChange={e => set('topic_id', +e.target.value)} disabled={!catId}>
            <option value={0}>— Select topic —</option>
            {topics.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
          </select>
        </div>
      </div>

      {/* Row 2 — Title + Slug */}
      <div style={s.grid2}>
        <div style={s.field}>
          <label style={s.label}>Title *</label>
          <input style={s.input} value={form.title} required
            onChange={e => { set('title', e.target.value); if (!initial) set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')); }} />
        </div>
        <div style={s.field}>
          <label style={s.label}>Slug *</label>
          <input style={s.input} value={form.slug} required onChange={e => set('slug', e.target.value)} />
        </div>
      </div>

      {/* Row 3 — Author + Reviewed Date + Status */}
      <div style={s.grid3}>
        <div style={s.field}>
          <label style={s.label}>Author</label>
          <input style={s.input} value={form.author} placeholder="Dr. Jane Smith, DVM" onChange={e => set('author', e.target.value)} />
        </div>
        <div style={s.field}>
          <label style={s.label}>Reviewed Date</label>
          <input style={s.input} value={form.reviewed_date} placeholder="Jul 2025" onChange={e => set('reviewed_date', e.target.value)} />
        </div>
        <div style={s.field}>
          <label style={s.label}>Status</label>
          <select style={s.input} value={form.status} onChange={e => set('status', e.target.value)}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      {/* Summary */}
      <div style={{ ...s.field, marginBottom:'20px' }}>
        <label style={s.label}>Summary</label>
        <textarea style={s.textarea} value={form.summary} rows={3}
          placeholder="Brief description shown in article listings…"
          onChange={e => set('summary', e.target.value)} />
      </div>

      {/* Featured Image */}
      <div style={{ ...s.field, marginBottom:'24px' }}>
        <label style={s.label}>Featured Image</label>
        <div style={s.imageRow}>
          <input style={{ ...s.input, flex:1 }} value={form.featured_image} placeholder="https://… or upload below"
            onChange={e => set('featured_image', e.target.value)} />
          <label style={s.uploadBtn}>
            {uploading ? 'Uploading…' : '📁 Upload'}
            <input type="file" accept="image/*" style={{ display:'none' }} onChange={handleImageUpload} disabled={uploading} />
          </label>
        </div>
        {form.featured_image && (
          <img src={form.featured_image} alt="preview" style={s.imgPreview} />
        )}
      </div>

      {/* Content Sections */}
      <div style={s.sectionsWrap}>
        <div style={s.sectionsHeader}>
          <span style={s.label}>Content Sections</span>
          <button type="button" onClick={addSection} style={s.addSectionBtn}>+ Add Section</button>
        </div>
        {sections.map((sec, i) => (
          <div key={i} style={s.sectionBlock}>
            <div style={s.sectionNum}>Section {i + 1}</div>
            <div style={s.field}>
              <label style={s.label}>Heading</label>
              <input style={s.input} value={sec.heading} placeholder="e.g. How Often Should My Dog See a Vet?"
                onChange={e => updateSection(i, 'heading', e.target.value)} />
            </div>
            <div style={{ ...s.field, marginTop:'10px' }}>
              <label style={s.label}>Body</label>
              <textarea style={s.textarea} value={sec.body} rows={4}
                placeholder="Write the section content here…"
                onChange={e => updateSection(i, 'body', e.target.value)} />
            </div>
            {sections.length > 1 && (
              <button type="button" onClick={() => removeSection(i)} style={s.removeSectionBtn}>✕ Remove</button>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={s.footer}>
        <button type="button" onClick={() => router.back()} style={s.cancelBtn}>Cancel</button>
        <button type="submit" disabled={saving} style={{ ...s.saveBtn, background: form.status === 'published' ? '#22c55e' : '#9444A1' }}>
          {saving ? 'Saving…' : form.status === 'published' ? '🚀 Publish Article' : '💾 Save Draft'}
        </button>
      </div>
    </form>
  );
}

const s: Record<string, React.CSSProperties> = {
  error:          { background:'rgba(239,68,68,.08)', border:'1px solid rgba(239,68,68,.25)', color:'#b91c1c', borderRadius:'8px', padding:'12px 14px', fontSize:'13px', marginBottom:'20px' },
  grid2:          { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', marginBottom:'20px' },
  grid3:          { display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'20px', marginBottom:'20px' },
  field:          { display:'flex', flexDirection:'column', gap:'6px' },
  label:          { fontSize:'13px', fontWeight:600, color:'#374151' },
  input:          { padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:'8px', fontSize:'14px', fontFamily:'inherit', outline:'none', width:'100%', color:'#1a1a2e' },
  textarea:       { padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:'8px', fontSize:'14px', fontFamily:'inherit', outline:'none', resize:'vertical', width:'100%', color:'#1a1a2e' },
  imageRow:       { display:'flex', gap:'10px', alignItems:'center' },
  uploadBtn:      { padding:'10px 16px', background:'#f3f4f6', border:'1.5px solid #e5e7eb', borderRadius:'8px', cursor:'pointer', fontSize:'13px', fontWeight:600, whiteSpace:'nowrap', flexShrink:0 },
  imgPreview:     { marginTop:'10px', maxHeight:'180px', borderRadius:'8px', border:'1px solid #e5e7eb', objectFit:'cover' },
  sectionsWrap:   { marginBottom:'24px' },
  sectionsHeader: { display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'12px' },
  addSectionBtn:  { padding:'7px 14px', background:'rgba(148,68,161,.1)', color:'#9444A1', border:'none', borderRadius:'8px', cursor:'pointer', fontSize:'13px', fontWeight:600 },
  sectionBlock:   { border:'1.5px solid #e5e7eb', borderRadius:'10px', padding:'16px', marginBottom:'12px', background:'#fafafa', position:'relative' },
  sectionNum:     { fontSize:'11px', fontWeight:700, color:'#9444A1', textTransform:'uppercase', letterSpacing:'.05em', marginBottom:'10px' },
  removeSectionBtn:{ marginTop:'10px', padding:'5px 12px', background:'rgba(239,68,68,.08)', color:'#ef4444', border:'none', borderRadius:'6px', cursor:'pointer', fontSize:'12px', fontWeight:600 },
  footer:         { display:'flex', gap:'12px', justifyContent:'flex-end', paddingTop:'20px', borderTop:'1px solid #e5e7eb' },
  cancelBtn:      { padding:'10px 20px', borderRadius:'8px', border:'1.5px solid #e5e7eb', background:'#fff', cursor:'pointer', fontSize:'14px', fontWeight:600 },
  saveBtn:        { padding:'10px 28px', borderRadius:'8px', color:'#fff', border:'none', cursor:'pointer', fontSize:'14px', fontWeight:700 },
};
