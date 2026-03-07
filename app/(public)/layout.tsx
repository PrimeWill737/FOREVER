import { createClient } from '@/lib/supabase/server';
import { getFooterLinks } from '@/lib/supabase/queries';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const footerLinks = await getFooterLinks(supabase);

  return (
    <>
      <Header />
      {children}
      <Footer links={footerLinks} />
    </>
  );
}
