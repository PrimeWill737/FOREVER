import { getAdminSupabase } from '@/app/actions/admin-auth';
import { getWhoAreWe } from '@/lib/supabase/queries';
import { WhoAreWeEditor } from '@/components/admin/WhoAreWeEditor';
import { AdminPageShell } from '@/components/admin/AdminPageShell';

export default async function AdminWhoAreWePage() {
  const supabase = await getAdminSupabase();
  const profiles = await getWhoAreWe(supabase);

  return (
    <AdminPageShell
      label="Profiles"
      title="Who Are We"
      subtitle='Edit William and Esther&apos;s profiles shown in the "Who Are We" section on the home page.'
    >
      <WhoAreWeEditor profiles={profiles} />
    </AdminPageShell>
  );
}
