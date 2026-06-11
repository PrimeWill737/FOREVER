'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { imageUnoptimized } from '@/lib/image';

interface CinematicHeroProps {
  src: string;
  title: string;
  subtitle: string;
  ctaHref?: string;
  ctaLabel?: string;
}

export function CinematicHero({
  src,
  title,
  subtitle,
  ctaHref = '/gallery',
  ctaLabel = 'Our Gallery',
}: CinematicHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
      el.style.setProperty('--hero-progress', String(progress));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 120);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`hero hero--cinematic${loaded ? ' hero--loaded' : ''}`}
      aria-label="Welcome"
    >
      <div className="hero__media">
        <div className="hero__parallax">
          <Image
            src={src}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="hero__img"
            unoptimized={imageUnoptimized(src)}
          />
        </div>
        <div className="hero__vignette" />
        <div className="hero__scanline" aria-hidden />
        <div className="hero__grain" aria-hidden />
      </div>

      <div className="hero__frame hero__frame--top" aria-hidden />
      <div className="hero__frame hero__frame--bottom" aria-hidden />

      <div className="hero__content">
        <p className="hero__eyebrow">A celebration of love</p>
        <h1 className="hero__title">
          <span className="hero__title-line">{title}</span>
        </h1>
        <div className="hero__divider" aria-hidden />
        <p className="hero__subtitle">{subtitle}</p>
        <Link href={ctaHref} className="btn btn--ghost hero__cta">
          <span>{ctaLabel}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      <div className="hero__scroll-hint" aria-hidden>
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
