'use client';

import { useState } from 'react';
import type { WeddingCard } from '@/lib/supabase/types';
import { saveWeddingCard } from '@/app/actions/wedding-card';

interface WeddingCardEditorProps {
  initialCard: WeddingCard | null;
}

export function WeddingCardEditor({ initialCard }: WeddingCardEditorProps) {
  const [headline, setHeadline] = useState(initialCard?.headline ?? '');
  const [dateText, setDateText] = useState(initialCard?.date_text ?? '');
  const [venue, setVenue] = useState(initialCard?.venue ?? '');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await saveWeddingCard({ headline, date_text: dateText, venue });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="admin-form__row">
        <label>Headline</label>
        <input
          type="text"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          placeholder="e.g. Celebrate With Us"
        />
      </div>
      <div className="admin-form__row">
        <label>Date (text)</label>
        <input
          type="text"
          value={dateText}
          onChange={(e) => setDateText(e.target.value)}
          placeholder="e.g. Saturday, 15 June 2026"
        />
      </div>
      <div className="admin-form__row">
        <label>Venue</label>
        <input
          type="text"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          placeholder="Venue name and address"
        />
      </div>
      {error && <p className="admin-form__error" role="alert">{error}</p>}
      <button type="submit" className="btn btn--primary">
        {saved ? 'Saved' : 'Save'}
      </button>
    </form>
  );
}
