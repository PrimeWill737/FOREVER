'use server';

import { createClient } from '@/lib/supabase/server';
import type { RsvpInsert } from '@/lib/supabase/types';

export async function submitRsvp(formData: FormData) {
  const guest_name = formData.get('guest_name') as string;
  const email = (formData.get('email') as string) || null;
  const attending = formData.get('attending') === 'yes';
  const plus_one = formData.get('plus_one') === 'true';
  const plus_one_name = (formData.get('plus_one_name') as string) || null;
  const dietary = (formData.get('dietary') as string) || null;
  const message = (formData.get('message') as string) || null;

  if (!guest_name?.trim()) {
    throw new Error('Name is required');
  }

  const supabase = await createClient();
  const insert: RsvpInsert = {
    guest_name: guest_name.trim(),
    email: email?.trim() || undefined,
    attending,
    plus_one,
    plus_one_name: plus_one_name?.trim() || undefined,
    dietary: dietary?.trim() || undefined,
    message: message?.trim() || undefined,
  };

  const { error } = await supabase.from('rsvp').insert(insert);
  if (error) throw error;
}
