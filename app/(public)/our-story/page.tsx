import { createClient } from '@/lib/supabase/server';
import { getOurStory } from '@/lib/supabase/queries';

export default async function OurStoryPage() {
  const supabase = await createClient();
  const sections = await getOurStory(supabase);

  return (
    <main>
      <section className="section section--story">
        <div className="container">
          <h1 className="section__title">Our Story</h1>
          <div className="story-content">
            {sections.length > 0 ? (
              sections.map((section) => (
                <article key={section.id} className="story-section">
                  {section.title && (
                    <h2 className="story-section__title">{section.title}</h2>
                  )}
                  {section.body && (
                    <div
                      className="story-section__body"
                      dangerouslySetInnerHTML={{ __html: section.body }}
                    />
                  )}
                </article>
              ))
            ) : (
              <p className="story-placeholder">
                Our story is being written. Check back soon.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
