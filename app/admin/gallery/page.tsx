import { getAdminSupabase } from '@/app/actions/admin-auth';
import { getGallery } from '@/lib/supabase/queries';
import { GalleryManager } from '@/components/admin/GalleryManager';
import { AdminPageShell } from '@/components/admin/AdminPageShell';

export default async function AdminGalleryPage() {
  const supabase = await getAdminSupabase();
  const gallery = await getGallery(supabase);

  return (
    <AdminPageShell
      label="Media"
      title="Gallery"
      subtitle="Upload and reorder photos. Set one as hero for the landing page."
    >
      <GalleryManager initialGallery={gallery} />
    </AdminPageShell>
  );
}
