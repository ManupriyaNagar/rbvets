'use client';
import { useState, FormEvent } from 'react';
import { useAuth } from '@/lib/auth-context';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoWrap}>
          <div style={styles.logoIcon}>🐾</div>
          <div>
            <div style={styles.logoTitle}>RBV Admin</div>
            <div style={styles.logoSub}>Vetcare Dashboard</div>
          </div>
        </div>

        <h1 style={styles.heading}>Welcome back</h1>
        <p style={styles.sub}>Sign in to manage your pet blog content</p>

        {error && (
          <div style={styles.errorBox}>
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Email address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@rbvetcare.com"
              required
              style={styles.input}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={styles.input}
            />
          </div>
          <button type="submit" disabled={loading} style={styles.btn}>
            {loading ? 'Signing in…' : 'Sign in →'}
          </button>
        </form>

        <p style={styles.hint}>
          Default: admin@rbvetcare.com / Admin@123
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh', background: 'linear-gradient(135deg,#1e1b2e 0%,#2a2540 50%,#1e1b2e 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
  },
  card: {
    background: '#fff', borderRadius: '20px', padding: '48px 40px',
    width: '100%', maxWidth: '420px', boxShadow: '0 25px 60px rgba(0,0,0,.35)',
  },
  logoWrap: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' },
  logoIcon: {
    width: '44px', height: '44px', background: '#9444A1', borderRadius: '12px',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
  },
  logoTitle: { fontWeight: 700, fontSize: '16px', color: '#1a1a2e' },
  logoSub:   { fontSize: '12px', color: '#9ca3af' },
  heading:   { fontSize: '24px', fontWeight: 700, color: '#1a1a2e', marginBottom: '6px' },
  sub:       { fontSize: '14px', color: '#6b7280', marginBottom: '28px' },
  errorBox:  {
    background: 'rgba(239,68,68,.08)', border: '1px solid rgba(239,68,68,.25)',
    color: '#b91c1c', borderRadius: '8px', padding: '12px 14px',
    fontSize: '13px', marginBottom: '20px', display: 'flex', gap: '8px', alignItems: 'center',
  },
  form:  { display: 'flex', flexDirection: 'column', gap: '18px' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: 600, color: '#374151' },
  input: {
    padding: '11px 14px', border: '1.5px solid #e5e7eb', borderRadius: '8px',
    fontSize: '14px', fontFamily: 'inherit', outline: 'none', transition: 'border-color .2s',
    color: '#1a1a2e',
  },
  btn: {
    background: '#9444A1', color: '#fff', border: 'none', borderRadius: '10px',
    padding: '13px', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
    marginTop: '4px', transition: 'background .2s',
  },
  hint: { textAlign: 'center', fontSize: '11px', color: '#9ca3af', marginTop: '20px' },
};
