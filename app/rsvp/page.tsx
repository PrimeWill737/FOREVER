import { createClient } from '@/lib/supabase/server';
import { getWeddingCard } from '@/lib/supabase/queries';
import { RsvpPageContent } from '@/components/RsvpPageContent';

export default async function RsvpPage() {
  const supabase = await createClient();
  const weddingCard = await getWeddingCard(supabase);

  return <RsvpPageContent dateText={weddingCard?.date_text} />;
}
