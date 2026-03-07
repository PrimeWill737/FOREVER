'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ADMIN_NAV } from '@/lib/admin-nav';

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand">William & Esther · Admin</div>
      <nav className="admin-sidebar__nav">
        {ADMIN_NAV.map(({ href, label, exact }) => {
          const active = exact === true ? pathname === href : pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`admin-sidebar__link ${active ? 'admin-sidebar__link--active' : ''}`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="admin-sidebar__footer">
        <Link href="/" target="_blank" rel="noopener noreferrer" className="admin-sidebar__link">
          View site →
        </Link>
      </div>
    </aside>
  );
}
