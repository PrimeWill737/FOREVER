'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ADMIN_NAV } from '@/lib/admin-nav';

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    closeSidebar();
  }, [pathname]);

  // Close sidebar when resizing to desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handler = () => {
      if (mq.matches) setSidebarOpen(false);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Close sidebar on Escape (mobile)
  useEffect(() => {
    if (!sidebarOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sidebarOpen]);

  return (
    <>
      <header className="admin-header" aria-label="Admin menu">
        <button
          type="button"
          className="admin-header__toggle"
          onClick={() => setSidebarOpen((o) => !o)}
          aria-expanded={sidebarOpen}
          aria-controls="admin-sidebar"
          aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
        >
          <HeartIcon className="admin-header__heart" />
        </button>
        <span className="admin-header__title">Admin</span>
      </header>

      <div
        id="admin-sidebar-overlay"
        className={`admin-sidebar__overlay ${sidebarOpen ? 'admin-sidebar__overlay--open' : ''}`}
        onClick={closeSidebar}
        onKeyDown={(e) => e.key === 'Escape' && closeSidebar()}
        aria-hidden
      />

      <aside
        id="admin-sidebar"
        className={`admin-sidebar ${sidebarOpen ? 'admin-sidebar--open' : ''}`}
        aria-label="Admin navigation"
      >
        <div className="admin-sidebar__brand">William & Esther · Admin</div>
        <nav className="admin-sidebar__nav">
          {ADMIN_NAV.map(({ href, label, exact }) => {
            const active = exact === true ? pathname === href : pathname?.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`admin-sidebar__link ${active ? 'admin-sidebar__link--active' : ''}`}
                onClick={closeSidebar}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="admin-sidebar__footer">
          <Link href="/" target="_blank" rel="noopener noreferrer" className="admin-sidebar__link" onClick={closeSidebar}>
            View site →
          </Link>
        </div>
      </aside>
    </>
  );
}
