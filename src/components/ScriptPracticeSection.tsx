import { useMemo, useState } from "react";
import { practiceScript } from "../data/mockData";
import { SectionHeader } from "./SectionHeader";

type StudyMode = "full" | "memorization" | "cue";

export function ScriptPracticeSection() {
  const [scriptText, setScriptText] = useState(
    practiceScript.map((entry) => `${entry.speaker}: ${entry.line}`).join("\n")
  );
  const [studyMode, setStudyMode] = useState<StudyMode>("full");
  const [hiddenLines, setHiddenLines] = useState<number[]>([]);
  const [currentCue, setCurrentCue] = useState(0);
  const [roundCount, setRoundCount] = useState(3);

  const parsedScript = useMemo(
    () =>
      scriptText
        .split("\n")
        .filter((line) => line.trim().length > 0)
        .map((line, index) => {
          const [speaker, ...rest] = line.split(":");
          return {
            id: `${index}-${speaker}`,
            speaker: speaker?.trim() || "LINE",
            line: rest.join(":").trim() || line.trim()
          };
        }),
    [scriptText]
  );

  function toggleLine(index: number) {
    setHiddenLines((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index]
    );
  }

  function advanceCue() {
    setCurrentCue((current) => (current + 1) % parsedScript.length);
  }

  return (
    <section id="script-practice" className="feature-layout">
      <div className="panel">
        <SectionHeader
          eyebrow="Script Practice"
          title="Practice the script without distractions."
          description="Use one workspace for reading, memorization, cue work, and repeat runs."
        />
        <label className="field">
          <span>Practice script</span>
          <textarea value={scriptText} onChange={(event) => setScriptText(event.target.value)} rows={9} />
        </label>
        <div className="tool-row">
          <div className="toggle-group">
            {(["full", "memorization", "cue"] as StudyMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                className={`pill ${studyMode === mode ? "pill-active" : ""}`}
                onClick={() => setStudyMode(mode)}
              >
                {mode === "full" ? "Full script" : mode === "memorization" ? "Memorization mode" : "Cue mode"}
              </button>
            ))}
          </div>
          <div className="repeat-badge">Repeat practice: {roundCount} rounds</div>
        </div>
      </div>

      <div className="panel script-panel">
        <SectionHeader
          eyebrow="Practice mode"
          title="Keep the work simple and repeatable."
          description="Hide lines, reveal them when needed, and use cues to rehearse transitions instead of just reciting the page."
        />
        <div className="script-actions">
          <button type="button" className="button button-secondary" onClick={() => setRoundCount((value) => value + 1)}>
            Add round
          </button>
          <button type="button" className="button button-secondary" onClick={advanceCue}>
            Next cue
          </button>
        </div>
        <div className="script-reader">
          {parsedScript.map((entry, index) => {
            const isHidden = studyMode === "memorization" && hiddenLines.includes(index);
            const isCue = studyMode === "cue" && currentCue === index;

            return (
              <article key={entry.id} className={`script-line ${isCue ? "script-line-active" : ""}`}>
                <button type="button" className="line-control" onClick={() => toggleLine(index)}>
                  {hiddenLines.includes(index) ? "Reveal" : "Hide"}
                </button>
                <div>
                  <p className="line-speaker">{entry.speaker}</p>
                  <p className="line-text">
                    {isHidden ? "........ ........ ........" : entry.line}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
