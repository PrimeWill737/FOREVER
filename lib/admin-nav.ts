/** Central config for admin sidebar. Add new pages here to keep nav in sync. */
export const ADMIN_NAV: { href: string; label: string; exact?: boolean }[] = [
  { href: '/admin', label: 'Home', exact: true },
  { href: '/admin/home', label: 'Home Page' },
  { href: '/admin/who-are-we', label: 'Who Are We' },
  { href: '/admin/gallery', label: 'Gallery' },
  { href: '/admin/footer', label: 'Footer' },
  { href: '/admin/wedding-card', label: 'Wedding Card' },
  { href: '/admin/rsvp', label: 'RSVP' },
];
