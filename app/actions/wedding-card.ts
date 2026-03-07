'use server';

import { getAdminSupabase } from '@/app/actions/admin-auth';

export async function saveWeddingCard(payload: {
  headline: string;
  date_text: string;
  venue: string;
}) {
  const supabase = await getAdminSupabase();
  const { data: existing } = await supabase.from('wedding_card').select('id').limit(1).maybeSingle();
  const row = {
    headline: payload.headline || null,
    date_text: payload.date_text || null,
    venue: payload.venue || null,
    updated_at: new Date().toISOString(),
  };
  if (existing) {
    const { error } = await supabase.from('wedding_card').update(row).eq('id', existing.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from('wedding_card').insert(row);
    if (error) throw new Error(error.message);
  }
}
