'use client';

import { useState, useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Image from 'next/image';
import type { GalleryImage } from '@/lib/supabase/types';
import { imageUnoptimized } from '@/lib/image';
import { uploadGalleryImage, deleteGalleryImage, setHeroImage, updateCaption } from '@/app/actions/gallery';

function UploadTrigger({ formRef }: { formRef: React.RefObject<HTMLFormElement | null> }) {
  const { pending } = useFormStatus();
  return (
    <>
      <span>{pending ? 'Uploading...' : 'Upload photos'}</span>
      <input
        type="file"
        name="files"
        accept="image/*"
        multiple
        disabled={pending}
        onChange={() => formRef.current?.requestSubmit()}
        hidden
      />
    </>
  );
}

interface GalleryManagerProps {
  initialGallery: GalleryImage[];
}

export function GalleryManager({ initialGallery }: GalleryManagerProps) {
  const [gallery, setGallery] = useState(initialGallery);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const [uploadState, formAction] = useFormState(uploadGalleryImage, null);

  useEffect(() => {
    if (uploadState && Array.isArray(uploadState) && uploadState.length > 0) {
      setGallery((prev) => [...prev, ...uploadState]);
      setError('');
    } else if (uploadState && typeof uploadState === 'object' && 'error' in uploadState) {
      setError(uploadState.error);
    }
  }, [uploadState]);

  async function handleDelete(id: string) {
    try {
      await deleteGalleryImage(id);
      setGallery((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  }

  async function handleSetHero(id: string) {
    try {
      await setHeroImage(id);
      setGallery((prev) =>
        prev.map((img) => ({ ...img, is_hero: img.id === id }))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
    }
  }

  async function handleCaptionChange(id: string, caption: string) {
    try {
      await updateCaption(id, caption);
      setGallery((prev) =>
        prev.map((img) => (img.id === id ? { ...img, caption } : img))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
    }
  }

  return (
    <div className="gallery-manager">
      <div className="gallery-manager__toolbar">
        <form ref={formRef} action={formAction} encType="multipart/form-data">
          <input type="hidden" name="sortOrder" value={gallery.length} />
          <label className="btn btn--primary">
            <UploadTrigger formRef={formRef} />
          </label>
        </form>
      </div>
      {error && <p className="gallery-manager__error">{error}</p>}
      <div className="gallery-manager__grid">
        {gallery.map((img) => (
          <div key={img.id} className="gallery-manager__item">
            <div className="gallery-manager__thumb">
              <Image
                src={img.url || '/img/IMG_2527.JPG'}
                alt={img.caption || 'Gallery'}
                fill
                sizes="200px"
                unoptimized={imageUnoptimized(img.url)}
              />
            </div>
            <input
              type="text"
              className="gallery-manager__caption"
              placeholder="Caption"
              defaultValue={img.caption ?? ''}
              onBlur={(e) => handleCaptionChange(img.id, e.target.value)}
            />
            <div className="gallery-manager__actions">
              <button
                type="button"
                className={`btn btn--secondary btn--sm ${img.is_hero ? 'btn--active' : ''}`}
                onClick={() => handleSetHero(img.id)}
              >
                {img.is_hero ? 'Hero' : 'Set hero'}
              </button>
              <button
                type="button"
                className="btn btn--secondary btn--sm btn--danger"
                onClick={() => handleDelete(img.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
