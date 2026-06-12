'use client';

import { ScrollReveal } from '@/components/ScrollReveal';
import { GalleryWithLightbox } from '@/components/GalleryWithLightbox';
import type { GalleryImage } from '@/lib/supabase/types';

interface GalleryPageContentProps {
  gallery: GalleryImage[];
}

export function GalleryPageContent({ gallery }: GalleryPageContentProps) {
  return (
    <main className="page-cinematic page-cinematic--inner">
      <section className="section gallery-preview section--cinematic section--page-hero">
        <div className="container">
          <ScrollReveal variant="line" className="section__header">
            <span className="section__label">Captured</span>
            <h1 className="section__title">Gallery</h1>
          </ScrollReveal>

          <GalleryWithLightbox gallery={gallery} />
        </div>
      </section>
    </main>
  );
}
