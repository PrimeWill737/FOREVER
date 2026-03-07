import { getAdminSupabase } from '@/app/actions/admin-auth';
import { getWeddingCard } from '@/lib/supabase/queries';
import { WeddingCardEditor } from '@/components/admin/WeddingCardEditor';

export default async function AdminWeddingCardPage() {
  const supabase = await getAdminSupabase();
  const card = await getWeddingCard(supabase);

  return (
    <div className="admin-page">
      <h1 className="admin-page__title">Wedding Card</h1>
      <p className="admin-page__subtitle">Headline, date and venue shown on the landing page and RSVP.</p>
      <WeddingCardEditor initialCard={card} />
    </div>
  );
}
