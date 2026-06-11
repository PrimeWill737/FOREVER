import { getAdminSupabase } from '@/app/actions/admin-auth';
import { getSiteSetting } from '@/lib/supabase/queries';
import { HomePageEditor, type HeroSettings } from '@/components/admin/HomePageEditor';
import { AdminPageShell } from '@/components/admin/AdminPageShell';

export default async function AdminHomePage() {
  const supabase = await getAdminSupabase();
  const heroSetting = await getSiteSetting(supabase, 'hero');
  const heroValue = heroSetting?.value as HeroSettings | null | undefined;

  return (
    <AdminPageShell
      label="Landing"
      title="Home Page"
      subtitle='Hero image is set from Gallery (set one photo as "Hero"). Optional custom title/subtitle below.'
    >
      <HomePageEditor initialHero={heroValue ?? null} />
    </AdminPageShell>
  );
}
