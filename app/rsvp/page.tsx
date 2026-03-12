import { createClient } from '@/lib/supabase/server';
import { getWeddingCard } from '@/lib/supabase/queries';
import { RsvpForm } from '@/components/RsvpForm';

export default async function RsvpPage() {
  const supabase = await createClient();
  const weddingCard = await getWeddingCard(supabase);

  return (
    <main>
      <section className="section section--story">
        <div className="container container--narrow">
          <h1 className="section__title">RSVP</h1>
          {weddingCard?.date_text && (
            <p className="rsvp-date">{weddingCard.date_text}</p>
          )}
          <RsvpForm />
        </div>
      </section>
    </main>
  );
}
