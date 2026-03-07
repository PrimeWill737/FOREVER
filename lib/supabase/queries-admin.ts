import type { SupabaseClient } from '@supabase/supabase-js';
import type { Rsvp } from './types';

export async function getRsvpList(supabase: SupabaseClient<any>): Promise<Rsvp[]> {
  const { data, error } = await supabase
    .from('rsvp')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Rsvp[];
}
