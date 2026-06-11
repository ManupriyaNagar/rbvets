'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { api, AdminUser } from '@/lib/api';

export default function AdminForm({ initial }: { initial?: AdminUser }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name:      initial?.name ?? '',
    email:     initial?.email ?? '',
    password:  '',
    role:      initial?.role ?? 'editor',
    is_active: initial?.is_active ?? 1,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState('');

  const set = (k: string, v: unknown) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      if (initial?.id) {
        await api.updateAdmin(initial.id, {
          name: form.name,
          role: form.role,
          is_active: form.is_active,
          ...(form.password ? { password: form.password } : {}),
        });
      } else {
        if (!form.email || !form.password) {
          throw new Error('Email and password are required for new admins.');
        }
        await api.createAdmin({
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
          is_active: form.is_active,
        });
      }
      router.push('/admin-dashboard/admins');
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
          <label style={s.label}>Name *</label>
          <input
            style={s.input}
            value={form.name}
            required
            onChange={e => set('name', e.target.value)}
            placeholder="John Doe"
          />
        </div>

        {!initial && (
          <div style={s.field}>
            <label style={s.label}>Email Address *</label>
            <input
              style={s.input}
              type="email"
              value={form.email}
              required
              onChange={e => set('email', e.target.value)}
              placeholder="john@example.com"
            />
          </div>
        )}

        <div style={s.field}>
          <label style={s.label}>
            {initial ? 'New Password (leave blank to keep)' : 'Password *'}
          </label>
          <input
            style={s.input}
            type="password"
            value={form.password}
            required={!initial}
            onChange={e => set('password', e.target.value)}
            placeholder={initial ? '••••••••' : 'Password (min 6 characters)'}
          />
        </div>

        <div style={s.grid2}>
          <div style={s.field}>
            <label style={s.label}>Role</label>
            <select
              style={s.input}
              value={form.role}
              onChange={e => set('role', e.target.value)}
            >
              <option value="editor">Editor</option>
              <option value="superadmin">Superadmin</option>
            </select>
          </div>

          <div style={s.field}>
            <label style={s.label}>Status</label>
            <select
              style={s.input}
              value={form.is_active}
              onChange={e => set('is_active', +e.target.value)}
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div style={s.footer}>
        <button type="button" onClick={() => router.back()} style={s.cancelBtn}>
          Cancel
        </button>
        <button type="submit" disabled={saving} style={s.saveBtn}>
          {saving ? 'Saving…' : initial ? 'Update Admin' : 'Create Admin'}
        </button>
      </div>
    </form>
  );
}

const s: Record<string, React.CSSProperties> = {
  form:      { display: 'flex', flexDirection: 'column', gap: '0' },
  error:     { background: 'rgba(239,68,68,.08)', border: '1px solid rgba(239,68,68,.25)', color: '#b91c1c', borderRadius: '8px', padding: '12px 14px', fontSize: '13px', marginBottom: '20px' },
  grid:      { display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' },
  grid2:     { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  field:     { display: 'flex', flexDirection: 'column', gap: '6px' },
  label:     { fontSize: '13px', fontWeight: 600, color: '#374151' },
  input:     { padding: '10px 14px', border: '1.5px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', width: '100%', color: '#1a1a2e' },
  footer:    { display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '20px', borderTop: '1px solid #e5e7eb' },
  cancelBtn: { padding: '10px 20px', borderRadius: '8px', border: '1.5px solid #e5e7eb', background: '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: 600 },
  saveBtn:   { padding: '10px 24px', borderRadius: '8px', background: '#9444A1', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600 },
};
