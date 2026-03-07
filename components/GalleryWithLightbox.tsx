'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import type { GalleryImage } from '@/lib/supabase/types';
import { imageUnoptimized } from '@/lib/image';

const CAPTION_PREVIEW_WORDS = 50;

function getFirstNWords(text: string, n: number): { preview: string; rest: string; hasMore: boolean } {
  const trimmed = text.trim();
  if (!trimmed) return { preview: '', rest: '', hasMore: false };
  const words = trimmed.split(/\s+/);
  if (words.length <= n) return { preview: trimmed, rest: '', hasMore: false };
  const preview = words.slice(0, n).join(' ');
  const rest = words.slice(n).join(' ');
  return { preview, rest, hasMore: true };
}

interface GalleryWithLightboxProps {
  gallery: GalleryImage[];
}

function getFilename(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    const base = pathname.split('/').pop() || 'image';
    return base.includes('.') ? base : `${base}.jpg`;
  } catch {
    return 'gallery-image.jpg';
  }
}

async function downloadImage(url: string, filename: string) {
  const res = await fetch(url, { mode: 'cors' });
  const blob = await res.blob();
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

export function GalleryWithLightbox({ gallery }: GalleryWithLightboxProps) {
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const [expandedCaptionId, setExpandedCaptionId] = useState<string | null>(null);

  const close = useCallback(() => setSelected(null), []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, img: GalleryImage) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (expandedCaptionId) setExpandedCaptionId(null);
        else setSelected(img);
      }
    },
    [expandedCaptionId]
  );

  const handleLightboxKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (expandedCaptionId) setExpandedCaptionId(null);
        else close();
      }
    },
    [close, expandedCaptionId]
  );

  useEffect(() => {
    if (!expandedCaptionId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpandedCaptionId(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [expandedCaptionId]);

  if (gallery.length === 0) {
    return <p className="gallery-empty">No photos in the gallery yet.</p>;
  }

  return (
    <>
      <div className="gallery-grid gallery-grid--full">
        {gallery.map((img) => {
          const src = img.url || '/img/IMG_2527.JPG';
          const caption = img.caption?.trim() || '';
          const { preview, rest, hasMore } = getFirstNWords(caption, CAPTION_PREVIEW_WORDS);
          const showBadge = caption.length > 0;
          const isCaptionExpanded = expandedCaptionId === img.id;

          return (
            <div
              key={img.id}
              className="gallery-grid__item"
              role="button"
              tabIndex={0}
              onClick={() => {
                if (isCaptionExpanded) setExpandedCaptionId(null);
                else setSelected(img);
              }}
              onKeyDown={(e) => handleKeyDown(e, img)}
              aria-label={img.caption || 'View image'}
            >
              <div className="gallery-grid__image-wrap">
                <Image
                  src={src}
                  alt={img.caption || 'Gallery'}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized={imageUnoptimized(src)}
                />
              </div>

              {showBadge && !isCaptionExpanded && (
                <div
                  className="gallery-grid__badge"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    if (e.key === 'Enter' || e.key === ' ') e.preventDefault();
                  }}
                  role="presentation"
                >
                  <span className="gallery-grid__badge-text">{preview}</span>
                  {hasMore && (
                    <button
                      type="button"
                      className="gallery-grid__read-more"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedCaptionId(img.id);
                      }}
                    >
                      Read more
                    </button>
                  )}
                </div>
              )}

              {isCaptionExpanded && caption && (
                <div
                  className="gallery-grid__caption-overlay"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedCaptionId(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      e.stopPropagation();
                      setExpandedCaptionId(null);
                    }
                  }}
                  role="dialog"
                  aria-label="Full caption"
                >
                  <div
                    className="gallery-grid__caption-overlay-inner"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      className="gallery-grid__caption-overlay-close"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedCaptionId(null);
                      }}
                      aria-label="Close"
                    >
                      ×
                    </button>
                    <p className="gallery-grid__caption-overlay-text">{caption}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selected && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image view"
          onKeyDown={handleLightboxKeyDown}
        >
          <div
            className="gallery-lightbox__backdrop"
            onClick={close}
            aria-hidden
          />
          <div className="gallery-lightbox__content">
            <button
              type="button"
              className="gallery-lightbox__close"
              onClick={close}
              aria-label="Close"
            >
              ×
            </button>
            <div className="gallery-lightbox__image-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selected.url || '/img/IMG_2527.JPG'}
                alt={selected.caption || 'Gallery'}
                className="gallery-lightbox__image"
              />
            </div>
            <div className="gallery-lightbox__actions">
              {selected.caption && (
                <p className="gallery-lightbox__caption">{selected.caption}</p>
              )}
              <div className="gallery-lightbox__buttons">
                <a
                  href={selected.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--secondary btn--sm"
                >
                  Open in new tab
                </a>
                <button
                  type="button"
                  className="btn btn--primary btn--sm"
                  onClick={() =>
                    downloadImage(
                      selected.url || '',
                      getFilename(selected.url || '')
                    )
                  }
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
