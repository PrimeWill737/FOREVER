'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';

export function AdminLoginContent() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className={`admin-login${loaded ? ' admin-login--loaded' : ''}`}>
      <div className="admin-login__bg" aria-hidden>
        <div className="admin-login__glow admin-login__glow--1" />
        <div className="admin-login__glow admin-login__glow--2" />
        <div className="admin-login__grain" />
      </div>

      <div className="admin-login__inner">
        <div className="admin-login__box">
            <Link href="/" className="admin-login__back">
              ← Back to site
            </Link>
            <span className="admin-login__label">Private access</span>
            <h1 className="admin-login__title">Admin</h1>
            <p className="admin-login__subtitle">William & Esther</p>
            <div className="admin-login__divider" aria-hidden />
            <AdminLoginForm />
          </div>
      </div>
    </div>
  );
}
