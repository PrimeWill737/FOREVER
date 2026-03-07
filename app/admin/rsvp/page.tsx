import { getAdminSupabase } from '@/app/actions/admin-auth';
import { getRsvpList } from '@/lib/supabase/queries-admin';

export default async function AdminRsvpPage() {
  const supabase = await getAdminSupabase();
  const list = await getRsvpList(supabase);

  return (
    <div className="admin-page">
      <h1 className="admin-page__title">RSVP</h1>
      <p className="admin-page__subtitle">View responses. Export or copy as needed.</p>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Attending</th>
              <th>Plus one</th>
              <th>Plus one name</th>
              <th>Dietary</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan={8} className="admin-table__empty">
                  No RSVPs yet.
                </td>
              </tr>
            ) : (
              list.map((r) => (
                <tr key={r.id}>
                  <td>{r.guest_name}</td>
                  <td>{r.email ?? '—'}</td>
                  <td>{r.attending ? 'Yes' : 'No'}</td>
                  <td>{r.plus_one ? 'Yes' : 'No'}</td>
                  <td>{r.plus_one_name ?? '—'}</td>
                  <td>{r.dietary ?? '—'}</td>
                  <td>{r.message ?? '—'}</td>
                  <td>{new Date(r.created_at).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
