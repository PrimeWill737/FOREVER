'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) return null;

  return (
    <header className="header">
      <div className="header__inner container">
        <Link href="/" className="header__brand">William & Esther</Link>
        <Link href="/rsvp" className="btn btn--primary header__cta">
          RSVP
        </Link>
      </div>
    </header>
  );
}
