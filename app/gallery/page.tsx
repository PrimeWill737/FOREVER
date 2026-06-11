import { createClient } from '@/lib/supabase/server';
import { getGallery } from '@/lib/supabase/queries';
import { GalleryPageContent } from '@/components/GalleryPageContent';

export default async function GalleryPage() {
  const supabase = await createClient();
  const gallery = await getGallery(supabase);

  return <GalleryPageContent gallery={gallery} />;
}
