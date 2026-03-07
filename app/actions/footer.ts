'use server';

import { getAdminSupabase } from '@/app/actions/admin-auth';

export async function saveFooterLinks(
  links: { label: string; url: string; sort_order: number }[]
) {
  const supabase = await getAdminSupabase();
  const { data: existing } = await supabase.from('footer_links').select('id');
  if (existing?.length) {
    const { error: deleteError } = await supabase.from('footer_links').delete().in('id', existing.map((r) => r.id));
    if (deleteError) throw new Error(deleteError.message);
  }
  const toInsert = links.filter((l) => l.label.trim() && l.url.trim()).map((l, i) => ({ ...l, sort_order: i }));
  if (toInsert.length > 0) {
    const { error } = await supabase.from('footer_links').insert(toInsert);
    if (error) throw new Error(error.message);
  }
}
