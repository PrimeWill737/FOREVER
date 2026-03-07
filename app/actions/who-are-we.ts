'use server';

import { getAdminSupabase } from '@/app/actions/admin-auth';
import type { WhoAreWeProfile } from '@/lib/supabase/types';

export async function saveWhoAreWeProfile(
  slug: 'william' | 'esther',
  payload: { name: string; bio: string; image_url?: string }
): Promise<WhoAreWeProfile | { error: string }> {
  const supabase = await getAdminSupabase();
  const { data: existing } = await supabase
    .from('who_are_we')
    .select('id')
    .eq('slug', slug)
    .maybeSingle();

  const row = {
    name: (payload.name || '').trim() || (slug === 'william' ? 'William' : 'Esther'),
    bio: (payload.bio ?? '').trim() || null,
    image_url: (payload.image_url ?? '').trim() || null,
    updated_at: new Date().toISOString(),
  };

  if (existing) {
    const { data, error } = await supabase
      .from('who_are_we')
      .update(row)
      .eq('id', existing.id)
      .select()
      .single();
    if (error) return { error: error.message };
    return data as WhoAreWeProfile;
  }

  const { data, error } = await supabase
    .from('who_are_we')
    .insert({ ...row, slug, sort_order: slug === 'william' ? 0 : 1 })
    .select()
    .single();
  if (error) return { error: error.message };
  return data as WhoAreWeProfile;
}
