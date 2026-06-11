'use client';

import Link from 'next/link';
import { ScrollReveal } from '@/components/ScrollReveal';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="admin-page">
      <ScrollReveal variant="line" className="admin-page__header">
        <span className="admin-page__label">Error</span>
        <h1 className="admin-page__title">Something went wrong</h1>
        <p className="admin-page__subtitle">{error.message}</p>
      </ScrollReveal>
      <ScrollReveal variant="fade-up" delay={100}>
        <div className="admin-page__actions">
          <button type="button" className="btn btn--gold" onClick={reset}>
            Try again
          </button>
          <Link href="/admin" className="btn btn--outline">
            Back to Dashboard
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
