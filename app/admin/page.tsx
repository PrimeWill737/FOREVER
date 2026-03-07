import Link from 'next/link';
import { getAdminSupabase } from '@/app/actions/admin-auth';
import { getGallery } from '@/lib/supabase/queries';
import { getRsvpList } from '@/lib/supabase/queries-admin';

export default async function AdminDashboard() {
  const supabase = await getAdminSupabase();
  const [gallery, rsvpList] = await Promise.all([
    getGallery(supabase),
    getRsvpList(supabase),
  ]);

  return (
    <div className="admin-page">
      <h1 className="admin-page__title">Dashboard</h1>
      <p className="admin-page__subtitle">William & Esther · Forever</p>
      <div className="admin-cards">
        <Link href="/admin/gallery" className="admin-card">
          <span className="admin-card__number">{gallery.length}</span>
          <span className="admin-card__label">Gallery photos</span>
        </Link>
        <Link href="/admin/rsvp" className="admin-card">
          <span className="admin-card__number">{rsvpList.length}</span>
          <span className="admin-card__label">RSVP responses</span>
        </Link>
        <Link href="/admin/home" className="admin-card">
          <span className="admin-card__label">Home page</span>
        </Link>
        <Link href="/admin/wedding-card" className="admin-card">
          <span className="admin-card__label">Wedding card</span>
        </Link>
        <Link href="/admin/footer" className="admin-card">
          <span className="admin-card__label">Footer</span>
        </Link>
      </div>
    </div>
  );
}
