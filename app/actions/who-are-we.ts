'use server';

import { getAdminSupabase } from '@/app/actions/admin-auth';
import type { WhoAreWeProfile } from '@/lib/supabase/types';

function getPublicUrl(path: string): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return '';
  return `${url}/storage/v1/object/public/gallery/${path}`;
}

/** Upload an image for Who Are We (William or Esther). Returns the public URL or { error }. */
export async function uploadWhoAreWeImage(
  slug: 'william' | 'esther',
  formData: FormData
): Promise<{ url: string } | { error: string }> {
  try {
    const supabase = await getAdminSupabase();
    const file = formData.get('file') as File | null;
    if (!file || !(file instanceof File)) return { error: 'No file selected' };
    if (!file.type.startsWith('image/')) return { error: 'Please select an image file' };

    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const path = `who-are-we/${slug}-${Date.now()}.${ext}`;

    const buf = await file.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from('gallery')
      .upload(path, buf, { contentType: file.type || 'image/jpeg', upsert: true });

    if (uploadError) return { error: uploadError.message };
    return { url: getPublicUrl(path) };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Upload failed' };
  }
}

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
