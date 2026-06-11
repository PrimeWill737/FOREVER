'use client';

import { ScrollReveal } from '@/components/ScrollReveal';
import type { OurStorySection } from '@/lib/supabase/types';

interface StoryContentProps {
  sections: OurStorySection[];
}

export function StoryContent({ sections }: StoryContentProps) {
  return (
    <main className="page-cinematic page-cinematic--inner">
      <section className="section section--story section--cinematic section--page-hero">
        <div className="section__glow section__glow--warm" aria-hidden />
        <div className="container">
          <ScrollReveal variant="line" className="section__header">
            <span className="section__label">Our Journey</span>
            <h1 className="section__title">Our Story</h1>
          </ScrollReveal>

          <div className="story-content">
            {sections.length > 0 ? (
              sections.map((section, i) => (
                <ScrollReveal key={section.id} variant="fade-up" delay={i * 100}>
                  <article className="story-section">
                    {section.title && (
                      <h2 className="story-section__title">{section.title}</h2>
                    )}
                    {section.body && (
                      <div
                        className="story-section__body"
                        dangerouslySetInnerHTML={{ __html: section.body }}
                      />
                    )}
                  </article>
                </ScrollReveal>
              ))
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
    </main>
  );
}
