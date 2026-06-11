import { createClient } from '@/lib/supabase/server';
import { getOurStory } from '@/lib/supabase/queries';
import { StoryContent } from '@/components/StoryContent';

export default async function OurStoryPage() {
  const supabase = await createClient();
  const sections = await getOurStory(supabase);

  return <StoryContent sections={sections} />;
}
