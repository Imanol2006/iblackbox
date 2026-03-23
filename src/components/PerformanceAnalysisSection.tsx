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
            title="Review the take and see what to fix next."
            description="Upload a take or test the camera flow, then get structured notes on delivery, clarity, presence, posture, body language, facial expression, and pacing."
          />
          <div className="upload-grid">
            <label className="upload-card">
              <span>Upload video</span>
              <strong>{selectedFile || "Select a rehearsal take"}</strong>
              <input type="file" accept="video/*" onChange={handleFileChange} />
            </label>
            <div className="upload-card webcam-card">
              <span>Live capture path</span>
              <strong>Camera workflow ready</strong>
              <p>This is the handoff point for webcam capture, computer vision, and later full session analysis.</p>
            </div>
          </div>
          <div className="system-note">
            <span className="eyebrow">Tech note</span>
            <p>
              MediaPipe can measure visible body and face signals. OpenAI can turn those signals into clear acting
              notes. The MVP keeps that flow visible without pretending the analysis is finished.
            </p>
          </div>
          <button type="button" className="button button-primary" onClick={handleAnalyze} disabled={loading}>
            {loading ? "Reviewing performance..." : "Generate Performance Review"}
          </button>
        </div>

        <div className="panel">
          <SectionHeader
            eyebrow="Review"
            title="A report built around the next take."
            description="Scores help you scan the take. The useful part is the note attached to each category."
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
