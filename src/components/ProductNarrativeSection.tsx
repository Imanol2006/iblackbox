import { SectionHeader } from "./SectionHeader";

const loopSteps = ["Understand", "Practice", "Perform", "Analyze", "Improve"];

export function ProductNarrativeSection() {
  return (
    <section className="landing-story">
      <div className="panel story-panel">
        <SectionHeader
          eyebrow="Problem"
          title="Most actors practice alone and get little feedback."
          description="Repetition helps with memory, but it does not tell an actor whether the scene is clear, the objective is playable, or the performance is improving."
        />
        <div className="story-grid">
          <article className="story-card">
            <span className="eyebrow">What is missing</span>
            <h3>Memorizing lines is not the same as improving a performance.</h3>
            <p>Most tools stop at scripts and self-tapes. They do not help actors break down the work, notice patterns, or adjust between takes.</p>
          </article>
          <article className="story-card">
            <span className="eyebrow">What Black Box does</span>
            <h3>Black Box gives actors a simple practice loop.</h3>
            <p>Scene analysis, script study, performance review, and coaching stay in one flow so the actor can understand the scene, rehearse with intent, and improve over time.</p>
          </article>
        </div>
      </div>

      <div className="panel loop-panel">
        <SectionHeader
          eyebrow="How it works"
          title="Understand -> Practice -> Perform -> Analyze -> Improve"
          description="This is the core product loop. Each step leads to the next."
        />
        <div className="loop-grid">
          {loopSteps.map((step, index) => (
            <article key={step} className="flow-step">
              <span>0{index + 1}</span>
              <strong>{step}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
