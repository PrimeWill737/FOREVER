import { getAdminSupabase } from '@/app/actions/admin-auth';
import { getWeddingCard } from '@/lib/supabase/queries';
import { WeddingCardEditor } from '@/components/admin/WeddingCardEditor';
import { AdminPageShell } from '@/components/admin/AdminPageShell';

export default async function AdminWeddingCardPage() {
  const supabase = await getAdminSupabase();
  const card = await getWeddingCard(supabase);

  return (
    <AdminPageShell
      label="Invite"
      title="Wedding Card"
      subtitle="Headline, date and venue shown on the landing page and RSVP."
    >
      <WeddingCardEditor initialCard={card} />
    </AdminPageShell>
  );
}
