import { getAdminSupabase } from '@/app/actions/admin-auth';
import { getFooterLinks } from '@/lib/supabase/queries';
import { FooterEditor } from '@/components/admin/FooterEditor';

export default async function AdminFooterPage() {
  const supabase = await getAdminSupabase();
  const links = await getFooterLinks(supabase);

  return (
    <div className="admin-page">
      <h1 className="admin-page__title">Footer</h1>
      <p className="admin-page__subtitle">Edit footer links (e.g. social media).</p>
      <FooterEditor initialLinks={links} />
    </div>
  );
}
