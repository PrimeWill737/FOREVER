'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import type { WhoAreWeProfile } from '@/lib/supabase/types';
import { saveWhoAreWeProfile, uploadWhoAreWeImage } from '@/app/actions/who-are-we';
import { imageUnoptimized } from '@/lib/image';

type PersonSlug = 'william' | 'esther';

interface WhoAreWeEditorProps {
  profiles: WhoAreWeProfile[];
}

export function WhoAreWeEditor({ profiles }: WhoAreWeEditorProps) {
  const william = profiles.find((p) => p.slug === 'william');
  const esther = profiles.find((p) => p.slug === 'esther');
  const [active, setActive] = useState<PersonSlug>('william');
  const [name, setName] = useState(active === 'william' ? (william?.name ?? 'William') : (esther?.name ?? 'Esther'));
  const [bio, setBio] = useState(active === 'william' ? (william?.bio ?? '') : (esther?.bio ?? ''));
  const [imageUrl, setImageUrl] = useState(active === 'william' ? (william?.image_url ?? '') : (esther?.image_url ?? ''));
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  function switchPerson(slug: PersonSlug) {
    const next = slug === 'william' ? william : esther;
    setActive(slug);
    setName(next?.name ?? (slug === 'william' ? 'William' : 'Esther'));
    setBio(next?.bio ?? '');
    setImageUrl(next?.image_url ?? '');
    setError('');
    setUploadError('');
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError('');
    setUploading(true);
    try {
      const formData = new FormData();
      formData.set('file', file);
      const result = await uploadWhoAreWeImage(active, formData);
      if ('error' in result) {
        setUploadError(result.error);
        return;
      }
      setImageUrl(result.url);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      const result = await saveWhoAreWeProfile(active, { name, bio, image_url: imageUrl || undefined });
      if ('error' in result) {
        setError(result.error);
        return;
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    }
  }

  return (
    <div className="who-are-we-admin">
      <div className="who-are-we-admin__tabs">
        <button
          type="button"
          className={`btn ${active === 'william' ? 'btn--primary btn--active' : 'btn--secondary'}`}
          onClick={() => switchPerson('william')}
        >
          William
        </button>
        <button
          type="button"
          className={`btn ${active === 'esther' ? 'btn--primary btn--active' : 'btn--secondary'}`}
          onClick={() => switchPerson('esther')}
        >
          Esther
        </button>
      </div>
      <form className="admin-form" onSubmit={handleSubmit}>
        <p className="admin-form__hint">
          Editing profile for <strong>{active === 'william' ? 'William' : 'Esther'}</strong>. Changes appear in the &quot;Who Are We&quot; section on the home page.
        </p>
        <div className="admin-form__row">
          <label>Display name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={active === 'william' ? 'William' : 'Esther'}
          />
        </div>
        <div className="admin-form__row">
          <label>Bio (plain text or HTML)</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="A few words about them..."
            rows={5}
          />
        </div>
        <div className="admin-form__row">
          <label>Profile image (optional)</label>
          <div className="who-are-we-admin__image">
            {imageUrl && (
              <div className="who-are-we-admin__preview">
                <Image
                  src={imageUrl}
                  alt={name}
                  width={96}
                  height={96}
                  unoptimized={imageUnoptimized(imageUrl)}
                  className="who-are-we-admin__preview-img"
                />
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="who-are-we-admin__file-input"
              disabled={uploading}
              aria-label="Upload profile image"
            />
            <button
              type="button"
              className="btn btn--secondary btn--sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? 'Uploading…' : 'Upload image'}
            </button>
            {imageUrl && (
              <button
                type="button"
                className="btn btn--sm who-are-we-admin__remove-img"
                onClick={() => setImageUrl('')}
              >
                Remove
              </button>
            )}
          </div>
          {uploadError && <p className="admin-form__error" role="alert">{uploadError}</p>}
        </div>
        {error && <p className="admin-form__error" role="alert">{error}</p>}
        <button type="submit" className="btn btn--primary">
          {saved ? 'Saved' : `Save ${active === 'william' ? 'William' : 'Esther'}`}
        </button>
      </form>
    </div>
  );
}
