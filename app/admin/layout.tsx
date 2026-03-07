import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getAdminSession } from '@/app/actions/admin-auth';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const adminSession = await getAdminSession();

  const authDisabled = process.env.NEXT_PUBLIC_ADMIN_AUTH_DISABLED === 'true';
  const isLoggedIn = !!user || !!adminSession;
  if (!authDisabled && !isLoggedIn) {
    redirect('/login');
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">{children}</div>
    </div>
  );
}
