'use client';

import Link from 'next/link';
import { ScrollReveal } from '@/components/ScrollReveal';

interface AdminDashboardContentProps {
  galleryCount: number;
  rsvpCount: number;
}

const QUICK_LINKS = [
  { href: '/admin/home', label: 'Home page', desc: 'Hero title & subtitle' },
  { href: '/admin/wedding-card', label: 'Wedding card', desc: 'Date, venue & headline' },
  { href: '/admin/footer', label: 'Footer', desc: 'Social & external links' },
] as const;

export function AdminDashboardContent({
  galleryCount,
  rsvpCount,
}: AdminDashboardContentProps) {
  return (
    <div className="admin-page">
      <ScrollReveal variant="line" className="admin-page__header">
        <span className="admin-page__label">Studio</span>
        <h1 className="admin-page__title">Dashboard</h1>
        <p className="admin-page__subtitle">William & Esther · Forever</p>
      </ScrollReveal>

      <div className="admin-cards">
        <ScrollReveal variant="fade-up" delay={80} className="admin-cards__cell">
          <Link href="/admin/gallery" className="admin-card admin-card--stat">
            <span className="admin-card__number">{galleryCount}</span>
            <span className="admin-card__label">Gallery photos</span>
            <span className="admin-card__arrow" aria-hidden>→</span>
          </Link>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={140} className="admin-cards__cell">
          <Link href="/admin/rsvp" className="admin-card admin-card--stat">
            <span className="admin-card__number">{rsvpCount}</span>
            <span className="admin-card__label">RSVP responses</span>
            <span className="admin-card__arrow" aria-hidden>→</span>
          </Link>
        </ScrollReveal>

        {QUICK_LINKS.map((item, i) => (
          <ScrollReveal
            key={item.href}
            variant="fade-up"
            delay={200 + i * 60}
            className="admin-cards__cell"
          >
            <Link href={item.href} className="admin-card">
              <span className="admin-card__label">{item.label}</span>
              <span className="admin-card__desc">{item.desc}</span>
              <span className="admin-card__arrow" aria-hidden>→</span>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
