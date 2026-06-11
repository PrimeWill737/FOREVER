import { getAdminSupabase } from '@/app/actions/admin-auth';
import { getRsvpList } from '@/lib/supabase/queries-admin';
import { AdminRsvpContent } from '@/components/admin/AdminRsvpContent';

export default async function AdminRsvpPage() {
  const supabase = await getAdminSupabase();
  const list = await getRsvpList(supabase);

  return <AdminRsvpContent list={list} />;
}
