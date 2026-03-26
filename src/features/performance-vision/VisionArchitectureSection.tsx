const layers = [
  {
    title: "Capture",
    body: "Face and pose landmarkers read the actor's visible physical signals in real time."
  },
  {
    title: "Measure",
    body: "Those landmarks become rehearsal metrics like posture stability, gaze steadiness, facial activity, and movement control."
  },
  {
    title: "Coach",
    body: "The measured signals become practical notes that can later be expanded with OpenAI into personalized coaching."
  }
];

export function VisionArchitectureSection() {
  return (
    <section className="vision-architecture panel">
      <div className="section-header">
        <span className="eyebrow">Vision architecture</span>
        <h2>Use computer vision for visible signals only.</h2>
        <p>
          Black Box uses face and body tracking to measure physical rehearsal behavior. That gives the actor useful
          signals without pretending the system can judge everything.
        </p>
      </div>
      <div className="vision-layer-grid">
        {layers.map((layer) => (
          <article key={layer.title} className="vision-layer-card">
            <span className="eyebrow">{layer.title}</span>
            <p>{layer.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
