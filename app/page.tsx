import { createClient } from '@/lib/supabase/server';
import { getGallery, getWeddingCard, getSiteSetting, getOurStory, getWhoAreWe } from '@/lib/supabase/queries';
import { HomeContent } from '@/components/HomeContent';

const HERO_IMAGE = '/img/IMG_2527.JPG';

export default async function HomePage() {
  const supabase = await createClient();
  const [gallery, weddingCard, heroSetting, ourStory, whoAreWe] = await Promise.all([
    getGallery(supabase),
    getWeddingCard(supabase),
    getSiteSetting(supabase, 'hero'),
    getOurStory(supabase),
    getWhoAreWe(supabase),
  ]);

  const heroImage = gallery.find((i) => i.is_hero) ?? gallery[0];
  const heroSrc = heroImage?.url || HERO_IMAGE;
  const galleryForGrid = heroImage
    ? gallery.filter((i) => i.id !== heroImage.id)
    : gallery;
  const heroText = (heroSetting?.value as { title?: string; subtitle?: string } | null) ?? {};
  const heroTitle = heroText.title ?? 'William & Esther';
  const heroSubtitle = heroText.subtitle ?? 'Forever';

  return (
    <HomeContent
      heroSrc={heroSrc}
      heroTitle={heroTitle}
      heroSubtitle={heroSubtitle}
      galleryForGrid={galleryForGrid}
      ourStory={ourStory}
      whoAreWe={whoAreWe}
      weddingCard={weddingCard}
      fallbackImage={HERO_IMAGE}
    />
  );
}
