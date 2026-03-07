'use server';

import { getAdminSupabase } from '@/app/actions/admin-auth';

export async function saveHomeSettings(payload: { title: string; subtitle: string }) {
  const supabase = await getAdminSupabase();
  const { error } = await supabase.from('site_settings').upsert(
    { key: 'hero', value: payload, updated_at: new Date().toISOString() },
    { onConflict: 'key' }
  );
  if (error) throw new Error(error.message);
}
