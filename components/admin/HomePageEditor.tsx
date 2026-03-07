'use client';

import { useState } from 'react';
import { saveHomeSettings } from '@/app/actions/settings';

export interface HeroSettings {
  title?: string;
  subtitle?: string;
}

interface HomePageEditorProps {
  initialHero: HeroSettings | null;
}

export function HomePageEditor({ initialHero }: HomePageEditorProps) {
  const [title, setTitle] = useState(initialHero?.title ?? 'William & Esther');
  const [subtitle, setSubtitle] = useState(initialHero?.subtitle ?? 'Forever');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await saveHomeSettings({ title, subtitle });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="admin-form__row">
        <label>Hero title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="admin-form__row">
        <label>Hero subtitle</label>
        <input
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
      </div>
      {error && <p className="admin-form__error" role="alert">{error}</p>}
      <button type="submit" className="btn btn--primary">
        {saved ? 'Saved' : 'Save'}
      </button>
    </form>
  );
}
