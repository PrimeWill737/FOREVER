import { getAdminSupabase } from '@/app/actions/admin-auth';
import { getGallery } from '@/lib/supabase/queries';
import { GalleryManager } from '@/components/admin/GalleryManager';

export default async function AdminGalleryPage() {
  const supabase = await getAdminSupabase();
  const gallery = await getGallery(supabase);

  return (
    <div className="admin-page">
      <h1 className="admin-page__title">Gallery</h1>
      <p className="admin-page__subtitle">Upload and reorder photos. Set one as hero for the landing page.</p>
      <GalleryManager initialGallery={gallery} />
    </div>
  );
}
