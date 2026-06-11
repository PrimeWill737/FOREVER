'use client';

import { ScrollReveal } from '@/components/ScrollReveal';
import { RsvpForm } from '@/components/RsvpForm';

interface RsvpPageContentProps {
  dateText?: string | null;
}

export function RsvpPageContent({ dateText }: RsvpPageContentProps) {
  return (
    <main className="page-cinematic page-cinematic--inner">
      <section className="section section--story section--cinematic section--page-hero">
        <div className="section__glow section__glow--gold" aria-hidden />
        <div className="container container--narrow">
          <ScrollReveal variant="line" className="section__header">
            <span className="section__label">Join Us</span>
            <h1 className="section__title">RSVP</h1>
          </ScrollReveal>

          {dateText && (
            <ScrollReveal variant="fade-up" delay={100}>
              <p className="rsvp-date">{dateText}</p>
            </ScrollReveal>
          )}

          <ScrollReveal variant="fade-up" delay={200}>
            <RsvpForm />
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
