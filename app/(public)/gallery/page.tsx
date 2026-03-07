import { createClient } from '@/lib/supabase/server';
import { getGallery } from '@/lib/supabase/queries';
import { GalleryWithLightbox } from '@/components/GalleryWithLightbox';

export default async function GalleryPage() {
  const supabase = await createClient();
  const gallery = await getGallery(supabase);

  return (
    <main>
      <section className="section gallery-preview">
        <div className="container">
          <h1 className="section__title">Gallery</h1>
          <GalleryWithLightbox gallery={gallery} />
        </div>
      </section>
    </main>
  );
}
