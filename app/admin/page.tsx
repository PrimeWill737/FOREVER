import { getAdminSupabase } from '@/app/actions/admin-auth';
import { getGallery } from '@/lib/supabase/queries';
import { getRsvpList } from '@/lib/supabase/queries-admin';
import { AdminDashboardContent } from '@/components/admin/AdminDashboardContent';

export default async function AdminDashboard() {
  const supabase = await getAdminSupabase();
  const [gallery, rsvpList] = await Promise.all([
    getGallery(supabase),
    getRsvpList(supabase),
  ]);

  return (
    <AdminDashboardContent
      galleryCount={gallery.length}
      rsvpCount={rsvpList.length}
    />
  );
}
