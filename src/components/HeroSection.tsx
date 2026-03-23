export function HeroSection() {
  return (
    <section className="hero panel">
      <div className="hero-copy">
        <span className="eyebrow">AI-powered feedback for actors practicing alone</span>
        <h1>Practice alone. Improve with structure.</h1>
        <p>
          Most actors spend hours rehearsing without anyone telling them what is working or what needs to change.
          Black Box gives solo practice a clear loop: understand the scene, rehearse it, record it, review it, and
          improve the next take.
        </p>
        <div className="hero-actions">
          <a href="#scene-analysis" className="button button-primary">Analyze a Scene</a>
          <a href="#script-practice" className="button button-secondary">Open Practice Studio</a>
        </div>
        <div className="hero-proof">
          <div>
            <strong>Understand the scene</strong>
            <span>Get a quick breakdown of the moment before you start memorizing or recording.</span>
          </div>
          <div>
            <strong>Get useful notes</strong>
            <span>Review delivery, presence, posture, pacing, and what to fix in the next pass.</span>
          </div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="stage-frame">
          <div className="stage-screen">
            <div className="stage-topline stage-topline-label">
              <span>Black Box studio loop</span>
              <strong>Understand - Practice - Perform - Analyze - Improve</strong>
            </div>
            <div className="studio-metric">
              <label>Current focus</label>
              <strong>Scene prep</strong>
            </div>
            <div className="studio-callout">
              <p>Built for actors who usually rehearse on their own</p>
              <h3>Feedback when no coach is in the room.</h3>
            </div>
            <div className="studio-grid">
              <div>
                <span>Scene analysis</span>
                <strong>Objectives and beats</strong>
              </div>
              <div>
                <span>Practice</span>
                <strong>Memorization and cues</strong>
              </div>
              <div>
                <span>Review</span>
                <strong>Notes you can use</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
