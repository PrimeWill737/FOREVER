import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { getGallery, getWeddingCard, getSiteSetting, getOurStory, getWhoAreWe } from '@/lib/supabase/queries';
import { GalleryImage } from '@/lib/supabase/types';
import { imageUnoptimized } from '@/lib/image';

const HERO_IMAGE = '/img/IMG_2527.JPG';

export default async function HomePage() {
  const supabase = await createClient();
  const [gallery, weddingCard, heroSetting, ourStory, whoAreWe] = await Promise.all([
    getGallery(supabase),
    getWeddingCard(supabase),
    getSiteSetting(supabase, 'hero'),
    getOurStory(supabase),
    getWhoAreWe(supabase),
  ]);

  const heroImage = gallery.find((i) => i.is_hero) ?? gallery[0];
  const heroSrc = heroImage?.url || HERO_IMAGE;
  const galleryForGrid: GalleryImage[] = heroImage
    ? gallery.filter((i) => i.id !== heroImage.id)
    : gallery;
  const heroText = (heroSetting?.value as { title?: string; subtitle?: string } | null) ?? {};
  const heroTitle = heroText.title ?? 'William & Esther';
  const heroSubtitle = heroText.subtitle ?? 'Forever';

  return (
    <main>
      <section className="hero">
        <div className="hero__media">
          <Image
            src={heroSrc}
            alt="William & Esther"
            fill
            priority
            sizes="100vw"
            className="hero__img"
            unoptimized={imageUnoptimized(heroSrc)}
          />
          <div className="hero__overlay" />
        </div>
        <div className="hero__content">
          <h1 className="hero__title">{heroTitle}</h1>
          <p className="hero__subtitle">{heroSubtitle}</p>
          <Link href="/gallery" className="btn btn--secondary hero__cta">
            Our Gallery
          </Link>
        </div>
      </section>

      <section className="section section--story">
        <div className="container">
          <h2 className="section__title">Our Story</h2>
          <div className="story-content story-content--preview">
            {ourStory.length > 0 ? (
              <>
                {ourStory.slice(0, 2).map((section) => (
                  <article key={section.id} className="story-section">
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
                ))}
                <Link href="/our-story" className="btn btn--primary story-preview__more">
                  Read our full story
                </Link>
              </>
            ) : (
              <p className="story-placeholder">
                Our story is being written. Check back soon.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="section section--who">
        <div className="container">
          <h2 className="section__title">Who Are We</h2>
          <div className="who-grid">
            {whoAreWe.map((person) => (
              <article key={person.id} className="who-card">
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
            ))}
          </div>
        </div>
      </section>

      {weddingCard && (weddingCard.headline || weddingCard.date_text) && (
        <section className="section section--dark cta-block">
          <div className="container">
            <h2 className="cta-block__title">
              {weddingCard.headline || 'Celebrate With Us'}
            </h2>
            {weddingCard.date_text && (
              <p className="cta-block__date">{weddingCard.date_text}</p>
            )}
            {weddingCard.venue && (
              <p className="cta-block__venue">{weddingCard.venue}</p>
            )}
            <Link href="/rsvp" className="btn btn--secondary">
              RSVP
            </Link>
          </div>
        </section>
      )}

      <section className="section gallery-preview">
        <div className="container">
          <h2 className="section__title">Gallery</h2>
          <div className="gallery-grid">
            {galleryForGrid.slice(0, 12).map((img) => (
              <Link
                key={img.id}
                href="/gallery"
                className="gallery-grid__item"
              >
                <Image
                  src={img.url || HERO_IMAGE}
                  alt={img.caption || 'Gallery'}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  unoptimized={imageUnoptimized(img.url)}
                />
              </Link>
            ))}
          </div>
          {galleryForGrid.length > 0 && (
            <div className="gallery-preview__more">
              <Link href="/gallery" className="btn btn--primary">
                View Full Gallery
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
