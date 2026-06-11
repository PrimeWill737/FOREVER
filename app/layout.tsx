import type { Metadata, Viewport } from 'next';
import '@/styles/main.scss';
import { PwaBadge } from '@/components/PwaBadge';
import { PublicShell } from '@/components/PublicShell';
import { createClient } from '@/lib/supabase/server';
import { getFooterLinks } from '@/lib/supabase/queries';

export const metadata: Metadata = {
  title: 'William & Esther | Forever',
  description: 'Our story, our gallery, our forever.',
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#0c0b0a',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const footerLinks = await getFooterLinks(supabase);

  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="icon" type="image/svg+xml" href="/icons/icon.svg" />
        <link rel="apple-touch-icon" href="/icons/icon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&family=Outfit:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <PublicShell footerLinks={footerLinks}>
          {children}
        </PublicShell>
        <PwaBadge />
      </body>
    </html>
  );
}
