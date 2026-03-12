'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const PUBLIC_PATHS = ['/', '/gallery', '/our-story', '/rsvp'];

interface FooterLink {
  id: string;
  label: string;
  url: string;
  sort_order: number;
}

interface PublicShellProps {
  children: React.ReactNode;
  footerLinks: FooterLink[];
}

export function PublicShell({ children, footerLinks }: PublicShellProps) {
  const pathname = usePathname();
  const isPublic = pathname !== null && PUBLIC_PATHS.includes(pathname);

  if (isPublic) {
    return (
      <>
        <Header />
        {children}
        <Footer links={footerLinks} />
      </>
    );
  }

  return <>{children}</>;
}
