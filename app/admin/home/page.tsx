import { getAdminSupabase } from '@/app/actions/admin-auth';
import { getSiteSetting } from '@/lib/supabase/queries';
import { HomePageEditor, type HeroSettings } from '@/components/admin/HomePageEditor';

export default async function AdminHomePage() {
  const supabase = await getAdminSupabase();
  const heroSetting = await getSiteSetting(supabase, 'hero');
  const heroValue = heroSetting?.value as HeroSettings | null | undefined;

  return (
    <div className="admin-page">
      <h1 className="admin-page__title">Home Page</h1>
      <p className="admin-page__subtitle">Hero image is set from Gallery (set one photo as &quot;Hero&quot;). Optional custom title/subtitle below.</p>
      <HomePageEditor initialHero={heroValue ?? null} />
    </div>
  );
}
