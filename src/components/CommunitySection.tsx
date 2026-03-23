import { communityCategories, communityThreads } from "../data/mockData";
import { SectionHeader } from "./SectionHeader";

export function CommunitySection() {
  return (
    <section id="community" className="feature-layout">
      <div className="panel">
        <SectionHeader
          eyebrow="Community"
          title="A space for actors to help each other improve."
          description="This part is lighter in the MVP, but it shows how local groups, forums, and focused discussion can fit into the product."
        />
        <div className="focus-tags">
          {communityCategories.map((category) => (
            <span key={category} className="pill">{category}</span>
          ))}
        </div>
      </div>
      <div className="community-grid">
        {communityThreads.map((thread) => (
          <article key={thread.title} className="panel discussion-card">
            <span className="discussion-meta">{thread.category}</span>
            <h3>{thread.title}</h3>
            <p>{thread.excerpt}</p>
            <div className="discussion-footer">
              <span>{thread.meta}</span>
              <button type="button" className="button button-secondary">Open thread</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
