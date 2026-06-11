'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ADMIN_NAV } from '@/lib/admin-nav';

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    closeSidebar();
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handler = () => {
      if (mq.matches) setSidebarOpen(false);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

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
          <MenuIcon />
        </button>
        <span className="admin-header__title">
          <span className="admin-header__mark" aria-hidden />
          Admin
        </span>
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
        <div className="admin-sidebar__brand">
          <span className="admin-sidebar__mark" aria-hidden />
          <div>
            <span className="admin-sidebar__brand-name">William & Esther</span>
            <span className="admin-sidebar__brand-sub">Admin Studio</span>
          </div>
        </div>

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
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-sidebar__link admin-sidebar__link--out"
            onClick={closeSidebar}
          >
            View site →
          </Link>
        </div>
      </aside>
    </>
  );
}
