import { getAdminSupabase } from '@/app/actions/admin-auth';
import { getFooterLinks } from '@/lib/supabase/queries';
import { FooterEditor } from '@/components/admin/FooterEditor';
import { AdminPageShell } from '@/components/admin/AdminPageShell';

export default async function AdminFooterPage() {
  const supabase = await getAdminSupabase();
  const links = await getFooterLinks(supabase);

  return (
    <AdminPageShell
      label="Links"
      title="Footer"
      subtitle="Edit footer links (e.g. social media)."
    >
      <FooterEditor initialLinks={links} />
    </AdminPageShell>
  );
}
