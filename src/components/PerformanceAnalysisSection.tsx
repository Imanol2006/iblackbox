import { ChangeEvent, useState } from "react";
import { analyzePerformanceMock } from "../services/ai";
import { WebcamVisionPanel } from "../features/performance-vision/WebcamVisionPanel";
import { SectionHeader } from "./SectionHeader";

type ReviewResult = Awaited<ReturnType<typeof analyzePerformanceMock>> | null;

export function PerformanceAnalysisSection() {
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [review, setReview] = useState<ReviewResult>(null);
  const [loading, setLoading] = useState(false);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setSelectedFile(file?.name ?? "");
  }

  async function handleAnalyze() {
    setLoading(true);
    const result = await analyzePerformanceMock(selectedFile || undefined);
    setReview(result);
    setLoading(false);
  }

  return (
    <section id="performance-analysis" className="performance-stack">
      <div className="feature-layout performance-layout">
        <div className="panel">
          <SectionHeader
            eyebrow="Performance Analysis"
            title="Review the take and decide what to adjust."
            description="Upload a take or test the camera flow, then review notes on delivery, clarity, presence, posture, body language, facial expression, and pacing."
          />
          <div className="upload-grid">
            <label className="upload-card">
              <span>Upload video</span>
              <strong>{selectedFile || "Select a rehearsal take"}</strong>
              <input type="file" accept="video/*" onChange={handleFileChange} />
            </label>
            <div className="upload-card webcam-card">
              <span>Camera input</span>
              <strong>Ready for live capture</strong>
              <p>This is where live capture and analysis will plug into the product.</p>
            </div>
          </div>
          <div className="system-note">
            <span className="eyebrow">Tech note</span>
            <p>
              Computer vision can measure visible face and body signals. That data can later be turned into clearer
              performance notes.
            </p>
          </div>
          <button type="button" className="button button-primary" onClick={handleAnalyze} disabled={loading}>
            {loading ? "Reviewing performance..." : "Generate Review"}
          </button>
        </div>

        <div className="panel">
          <SectionHeader
            eyebrow="Review"
            title="A review organized by category."
            description="Scores help you scan the take. The note under each category is what matters."
          />
          {review ? (
            <div className="review-stack">
              <article className="review-overview">
                <div>
                  <span className="eyebrow">Overview</span>
                  <h3>{review.title}</h3>
                  <p>{review.overview}</p>
                </div>
                <div className="duration-chip">{review.duration}</div>
              </article>
              <div className="review-grid">
                {review.categories.map((category) => (
                  <article key={category.name} className="review-card">
                    <div className="review-score">
                      <span>{category.name}</span>
                      <strong>{category.score}</strong>
                    </div>
                    <div className="progress-track">
                      <div className="progress-bar" style={{ width: `${category.score}%` }} />
                    </div>
                    <p><strong>Strength:</strong> {category.strength}</p>
                    <p><strong>Improve:</strong> {category.improve}</p>
                    <p><strong>Next step:</strong> {category.nextStep}</p>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <h3>Generate a review</h3>
              <p>Upload a take to see the feedback layout across delivery, clarity, presence, posture, body language, facial expression, and pacing.</p>
            </div>
          )}
        </div>
      </div>

      <WebcamVisionPanel />
    </section>
  );
}
