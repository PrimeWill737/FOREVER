'use client';

import Link from 'next/link';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="admin-page">
      <h1 className="admin-page__title">Something went wrong</h1>
      <p className="admin-page__subtitle">{error.message}</p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button type="button" className="btn btn--primary" onClick={reset}>
          Try again
        </button>
        <Link href="/admin" className="btn btn--secondary">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
