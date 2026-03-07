'use server';

import { getAdminSupabase } from '@/app/actions/admin-auth';
import type { GalleryImage } from '@/lib/supabase/types';

function getPublicUrl(path: string): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return '';
  return `${url}/storage/v1/object/public/gallery/${path}`;
}

type UploadState = GalleryImage[] | { error: string } | null;

/** Server action: accepts FormData from form (input name="files" multiple, hidden name="sortOrder"). Use with useFormState so FormData is sent by the form. */
export async function uploadGalleryImage(
  _prevState: UploadState,
  formData: FormData
): Promise<UploadState> {
  try {
    const supabase = await getAdminSupabase();
    const files = formData.getAll('files') as File[];
    const sortOrderStart = Number(formData.get('sortOrder')) || 0;
    if (!files?.length) return null;

    const inserted: GalleryImage[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!(file instanceof File)) continue;
      const ext = file.name.split('.').pop() || 'jpg';
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}-${i}.${ext}`;

      const buf = await file.arrayBuffer();
      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(path, buf, { contentType: file.type || 'image/jpeg', upsert: false });

      if (uploadError) throw new Error(uploadError.message);

      const url = getPublicUrl(path);
      const { data, error } = await supabase
        .from('gallery')
        .insert({
          storage_path: path,
          url,
          sort_order: sortOrderStart + i,
          is_hero: false,
        })
        .select()
        .single();

      if (error) throw new Error(error.message);
      inserted.push(data as GalleryImage);
    }
    return inserted;
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Upload failed' };
  }
}

export async function deleteGalleryImage(id: string): Promise<void> {
  const supabase = await getAdminSupabase();
  const { data: row } = await supabase
    .from('gallery')
    .select('storage_path')
    .eq('id', id)
    .single();

  if (row?.storage_path) {
    await supabase.storage.from('gallery').remove([row.storage_path]);
  }
  const { error } = await supabase.from('gallery').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

export async function setHeroImage(id: string): Promise<void> {
  const supabase = await getAdminSupabase();
  await supabase.from('gallery').update({ is_hero: false }).neq('id', id);
  const { error } = await supabase.from('gallery').update({ is_hero: true }).eq('id', id);
  if (error) throw new Error(error.message);
}

export async function updateCaption(id: string, caption: string): Promise<void> {
  const supabase = await getAdminSupabase();
  const { error } = await supabase
    .from('gallery')
    .update({ caption: caption || null })
    .eq('id', id);
  if (error) throw new Error(error.message);
}
