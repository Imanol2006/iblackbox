import { FormEvent, useState } from "react";
import { defaultSceneText } from "../data/mockData";
import { analyzeScene } from "../services/ai";
import { SectionHeader } from "./SectionHeader";

type AnalysisResult = Awaited<ReturnType<typeof analyzeScene>> | null;

export function SceneAnalysisSection() {
  const [sceneText, setSceneText] = useState(defaultSceneText);
  const [characterName, setCharacterName] = useState("Mara");
  const [context, setContext] = useState("A private reunion after a betrayal that neither person has fully named.");
  const [intention, setIntention] = useState("Push the other person into speaking honestly.");
  const [analysis, setAnalysis] = useState<AnalysisResult>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await analyzeScene({ sceneText, characterName, context, intention });
      setAnalysis(result);
    } catch (submissionError) {
      setAnalysis(null);
      setError(submissionError instanceof Error ? submissionError.message : "Scene analysis failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="scene-analysis" className="feature-layout">
      <div className="panel">
        <SectionHeader
          eyebrow="Scene Analysis"
          title="Break down the scene before rehearsal."
          description="Paste a script or monologue, add the situation, and get a clear breakdown of the scene."
        />
        <form className="stack-lg" onSubmit={handleSubmit}>
          <label className="field">
            <span>Scene or monologue</span>
            <textarea value={sceneText} onChange={(event) => setSceneText(event.target.value)} rows={10} />
          </label>
          <div className="field-grid">
            <label className="field">
              <span>Character name</span>
              <input value={characterName} onChange={(event) => setCharacterName(event.target.value)} />
            </label>
            <label className="field">
              <span>Scene context</span>
              <input value={context} onChange={(event) => setContext(event.target.value)} />
            </label>
          </div>
          <label className="field">
            <span>Primary intention</span>
            <input value={intention} onChange={(event) => setIntention(event.target.value)} />
          </label>
          <div className="inline-actions">
            <button type="submit" className="button button-primary" disabled={loading}>
              {loading ? "Analyzing..." : "Analyze Scene"}
            </button>
            <p className="support-copy">Start here before memorization or camera work.</p>
          </div>
          {error ? <p className="error-copy">{error}</p> : null}
        </form>
      </div>

      <div className="panel analysis-panel">
        <SectionHeader
          eyebrow="Output"
          title="A breakdown you can use in rehearsal."
          description="The response is organized so you can move straight into practice."
        />
        {analysis ? (
          <div className="analysis-grid">
            <article className="analysis-card">
              <h3>Scene Summary</h3>
              <p>{analysis.summary}</p>
            </article>
            <article className="analysis-card">
              <h3>Character Objective</h3>
              <p>{analysis.objective}</p>
            </article>
            <article className="analysis-card">
              <h3>Emotional Beats</h3>
              <ul>
                {analysis.emotionalBeats.map((beat: string) => (
                  <li key={beat}>{beat}</li>
                ))}
              </ul>
            </article>
            <article className="analysis-card">
              <h3>Conflict / Tension</h3>
              <p>{analysis.tension}</p>
            </article>
            <article className="analysis-card">
              <h3>Interpretation Questions</h3>
              <ul>
                {analysis.questions.map((question: string) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
            </article>
            <article className="analysis-card">
              <h3>Suggested Acting Choices</h3>
              <ul>
                {analysis.choices.map((choice: string) => (
                  <li key={choice}>{choice}</li>
                ))}
              </ul>
            </article>
          </div>
        ) : (
          <div className="empty-state">
            <h3>Run a scene analysis</h3>
            <p>Get a summary, objective, emotional beats, tension, questions, and acting choices.</p>
          </div>
        )}
      </div>
    </section>
  );
}
