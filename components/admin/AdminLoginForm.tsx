'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { loginWithCredentials } from '@/app/actions/admin-auth';

export function AdminLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    // Try table-based admin credentials first (EstherWilliam@gmail.com / 001977)
    const result = await loginWithCredentials(email, password);
    if (result.ok) {
      setLoading(false);
      router.push('/admin');
      router.refresh();
      return;
    }
    // Fallback to Supabase Auth
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) {
      setError(result.error ?? err.message);
      return;
    }
    router.push('/admin');
    router.refresh();
  }

  return (
    <form className="admin-login-form" onSubmit={handleSubmit}>
      {error && <p className="admin-login-form__error">{error}</p>}
      <div className="admin-login-form__row">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>
      <div className="admin-login-form__row">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </div>
      <button type="submit" className="btn btn--primary" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}
