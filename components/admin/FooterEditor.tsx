'use client';

import { useState } from 'react';
import type { FooterLink } from '@/lib/supabase/types';
import { saveFooterLinks } from '@/app/actions/footer';

interface FooterEditorProps {
  initialLinks: FooterLink[];
}

export function FooterEditor({ initialLinks }: FooterEditorProps) {
  const [links, setLinks] = useState(initialLinks);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  function addLink() {
    setLinks((prev) => [
      ...prev,
      { id: `new-${Date.now()}`, label: '', url: '', sort_order: prev.length },
    ]);
  }

  function removeLink(id: string) {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }

  function updateLink(id: string, field: 'label' | 'url', value: string) {
    setLinks((prev) =>
      prev.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await saveFooterLinks(
        links.map(({ label, url }, i) => ({ label, url, sort_order: i }))
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      {links.map((link) => (
        <div key={link.id} className="admin-form__row admin-form__row--inline">
          <input
            type="text"
            placeholder="Label (e.g. Instagram)"
            value={link.label}
            onChange={(e) => updateLink(link.id, 'label', e.target.value)}
          />
          <input
            type="url"
            placeholder="URL"
            value={link.url}
            onChange={(e) => updateLink(link.id, 'url', e.target.value)}
          />
          <button
            type="button"
            className="btn btn--secondary btn--sm"
            onClick={() => removeLink(link.id)}
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" className="btn btn--secondary" onClick={addLink}>
        Add link
      </button>
      {error && <p className="admin-form__error" role="alert">{error}</p>}
      <button type="submit" className="btn btn--primary">
        {saved ? 'Saved' : 'Save'}
      </button>
    </form>
  );
}
