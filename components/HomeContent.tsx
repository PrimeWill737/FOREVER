'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CinematicHero } from '@/components/CinematicHero';
import { ScrollReveal } from '@/components/ScrollReveal';
import type { GalleryImage, OurStorySection, WhoAreWeProfile, WeddingCard } from '@/lib/supabase/types';
import { imageUnoptimized } from '@/lib/image';
import { getGalleryTileSize } from '@/lib/gallery-layout';

interface HomeContentProps {
  heroSrc: string;
  heroTitle: string;
  heroSubtitle: string;
  galleryForGrid: GalleryImage[];
  ourStory: OurStorySection[];
  whoAreWe: WhoAreWeProfile[];
  weddingCard: WeddingCard | null;
  fallbackImage: string;
}

export function HomeContent({
  heroSrc,
  heroTitle,
  heroSubtitle,
  galleryForGrid,
  ourStory,
  whoAreWe,
  weddingCard,
  fallbackImage,
}: HomeContentProps) {
  const showCta = weddingCard && (weddingCard.headline || weddingCard.date_text);

  return (
    <main className="page-cinematic">
      <CinematicHero
        src={heroSrc}
        title={heroTitle}
        subtitle={heroSubtitle}
      />

      <section className="section section--story section--cinematic">
        <div className="section__glow section__glow--warm" aria-hidden />
        <div className="container">
          <ScrollReveal variant="line" className="section__header">
            <span className="section__label">Chapter One</span>
            <h2 className="section__title">Our Story</h2>
          </ScrollReveal>

          <div className="story-content story-content--preview">
            {ourStory.length > 0 ? (
              <>
                {ourStory.slice(0, 2).map((section, i) => (
                  <ScrollReveal key={section.id} variant="fade-up" delay={i * 120}>
                    <article className="story-section">
                      {section.title && (
                        <h3 className="story-section__title">{section.title}</h3>
                      )}
                      {section.body && (
                        <div
                          className="story-section__body"
                          dangerouslySetInnerHTML={{ __html: section.body }}
                        />
                      )}
                    </article>
                  </ScrollReveal>
                ))}
                <ScrollReveal variant="fade-up" delay={240}>
                  <Link href="/our-story" className="btn btn--outline story-preview__more">
                    Read our full story
                  </Link>
                </ScrollReveal>
              </>
            ) : (
              <ScrollReveal variant="blur">
                <p className="story-placeholder">
                  Our story is being written. Check back soon.
                </p>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      <section className="section section--who section--cinematic">
        <div className="container">
          <ScrollReveal variant="line" className="section__header">
            <span className="section__label">The Couple</span>
            <h2 className="section__title">Who Are We</h2>
          </ScrollReveal>

          <div className="who-grid">
            {whoAreWe.map((person, i) => (
              <ScrollReveal key={person.id} variant={i % 2 === 0 ? 'fade-left' : 'fade-right'} delay={i * 100}>
                <article className="who-card">
                  {person.image_url && (
                    <div className="who-card__img-wrap">
                      <Image
                        src={person.image_url}
                        alt={person.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="who-card__img"
                        unoptimized={imageUnoptimized(person.image_url)}
                      />
                      <div className="who-card__img-shine" aria-hidden />
                    </div>
                  )}
                  <div className="who-card__body">
                    <h3 className="who-card__name">{person.name}</h3>
                    {person.bio && (
                      <div
                        className="who-card__bio"
                        dangerouslySetInnerHTML={{ __html: person.bio.replace(/\n/g, '<br />') }}
                      />
                    )}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {showCta && (
        <section className="section section--dark cta-block section--cinematic">
          <div className="cta-block__aurora" aria-hidden />
          <div className="container">
            <ScrollReveal variant="scale">
              <h2 className="cta-block__title">
                {weddingCard!.headline || 'Celebrate With Us'}
              </h2>
            </ScrollReveal>
            {weddingCard!.date_text && (
              <ScrollReveal variant="fade-up" delay={100}>
                <p className="cta-block__date">{weddingCard!.date_text}</p>
              </ScrollReveal>
            )}
            {weddingCard!.venue && (
              <ScrollReveal variant="fade-up" delay={180}>
                <p className="cta-block__venue">{weddingCard!.venue}</p>
              </ScrollReveal>
            )}
            <ScrollReveal variant="fade-up" delay={260}>
              <Link href="/rsvp" className="btn btn--gold">
                RSVP
              </Link>
            </ScrollReveal>
          </div>
        </section>
      )}

      <section className="section gallery-preview section--cinematic">
        <div className="container">
          <ScrollReveal variant="line" className="section__header">
            <span className="section__label">Moments</span>
            <h2 className="section__title">Gallery</h2>
          </ScrollReveal>

          <div className="gallery-grid gallery-grid--mosaic">
            {galleryForGrid.slice(0, 12).map((img, i) => {
              const size = getGalleryTileSize(i);
              return (
              <ScrollReveal
                key={img.id}
                variant="scale"
                delay={(i % 4) * 80}
                className={`gallery-grid__cell gallery-grid__cell--${size}`}
              >
                <Link href="/gallery" className={`gallery-grid__item gallery-grid__item--${size}`}>
                  <Image
                    src={img.url || fallbackImage}
                    alt={img.caption || 'Gallery'}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    unoptimized={imageUnoptimized(img.url)}
                  />
                  <div className="gallery-grid__overlay" aria-hidden />
                </Link>
              </ScrollReveal>
            );
            })}
          </div>

          {galleryForGrid.length > 0 && (
            <ScrollReveal variant="fade-up" delay={200}>
              <div className="gallery-preview__more">
                <Link href="/gallery" className="btn btn--outline">
                  View Full Gallery
                </Link>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </main>
  );
}
