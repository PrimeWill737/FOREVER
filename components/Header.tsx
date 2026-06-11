'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (isAdmin) return null;

  const headerClass = [
    'header',
    scrolled ? 'header--scrolled' : '',
    isHome && !scrolled ? 'header--hero' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={headerClass}>
      <div className="header__inner container">
        <Link href="/" className="header__brand">
          <span className="header__brand-mark" aria-hidden />
          William & Esther
        </Link>
        <nav className="header__nav" aria-label="Main">
          <Link href="/our-story" className="header__link">Story</Link>
          <Link href="/gallery" className="header__link">Gallery</Link>
          <Link href="/rsvp" className="btn btn--gold header__cta">RSVP</Link>
        </nav>
      </div>
    </header>
  );
}
