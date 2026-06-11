'use client';

import { AdminPageShell } from '@/components/admin/AdminPageShell';

interface RsvpRow {
  id: string;
  guest_name: string;
  email: string | null;
  attending: boolean;
  plus_one: boolean;
  plus_one_name: string | null;
  dietary: string | null;
  message: string | null;
  created_at: string;
}

interface AdminRsvpContentProps {
  list: RsvpRow[];
}

export function AdminRsvpContent({ list }: AdminRsvpContentProps) {
  return (
    <AdminPageShell
      label="Responses"
      title="RSVP"
      subtitle="View responses. Export or copy as needed."
    >
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
                  <td>
                    <span className={`admin-badge ${r.attending ? 'admin-badge--yes' : 'admin-badge--no'}`}>
                      {r.attending ? 'Yes' : 'No'}
                    </span>
                  </td>
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
    </AdminPageShell>
  );
}
