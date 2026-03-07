import { getAdminSupabase } from '@/app/actions/admin-auth';
import { getWhoAreWe } from '@/lib/supabase/queries';
import { WhoAreWeEditor } from '@/components/admin/WhoAreWeEditor';

export default async function AdminWhoAreWePage() {
  const supabase = await getAdminSupabase();
  const profiles = await getWhoAreWe(supabase);

  return (
    <div className="admin-page">
      <h1 className="admin-page__title">Who Are We</h1>
      <p className="admin-page__subtitle">
        Edit William and Esther&apos;s profiles shown in the &quot;Who Are We&quot; section on the home page.
      </p>
      <WhoAreWeEditor profiles={profiles} />
    </div>
  );
}
