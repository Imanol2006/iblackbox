import { progressMetrics } from "../data/mockData";
import { SectionHeader } from "./SectionHeader";

const trendLabels = ["W1", "W2", "W3", "W4", "W5", "W6", "W7"];

function TrendChart({ values, label }: { values: number[]; label: string }) {
  return (
    <div className="trend-card">
      <div className="trend-head">
        <span>{label}</span>
        <strong>{values[values.length - 1]}%</strong>
      </div>
      <div className="trend-bars">
        {values.map((value, index) => (
          <div key={`${label}-${trendLabels[index]}`} className="trend-bar-wrap">
            <div className="trend-bar" style={{ height: `${value}%` }} />
            <span>{trendLabels[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProgressSection() {
  return (
    <section id="progress" className="feature-layout">
      <div className="panel">
        <SectionHeader
          eyebrow="Progress Dashboard"
          title="See what is improving."
          description="The dashboard shows how much work is getting done and what is starting to improve."
        />
        <div className="metrics-grid metrics-grid-wide">
          <article className="metric-card">
            <span>Sessions completed</span>
            <strong>{progressMetrics.sessionsCompleted}</strong>
          </article>
          <article className="metric-card">
            <span>Scenes analyzed</span>
            <strong>{progressMetrics.scenesAnalyzed}</strong>
          </article>
          <article className="metric-card">
            <span>Practice streak</span>
            <strong>{progressMetrics.practiceStreak} days</strong>
          </article>
          <article className="metric-card">
            <span>Consistency</span>
            <strong>{progressMetrics.consistencyScore}%</strong>
          </article>
        </div>
        <div className="focus-card">
          <span>Recent focus areas</span>
          <div className="focus-tags">
            {progressMetrics.recentFocus.map((item) => (
              <span key={item} className="pill pill-active">{item}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="panel">
        <SectionHeader
          eyebrow="Trends"
          title="Confidence, posture, and consistency over time."
          description="These are mock metrics for now. Later this can show real session history."
        />
        <div className="trend-grid">
          <TrendChart values={progressMetrics.confidenceTrend} label="Confidence" />
          <TrendChart values={progressMetrics.postureTrend} label="Posture" />
          <TrendChart values={progressMetrics.consistencyTrend} label="Consistency" />
        </div>
      </div>
    </section>
  );
}
