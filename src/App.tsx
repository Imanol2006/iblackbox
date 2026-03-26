import { BrainCircuit, ChartColumnIncreasing, Clapperboard, MessageSquareText, PenSquare, Users } from "lucide-react";
import { AICoachSection } from "./components/AICoachSection";
import { CommunitySection } from "./components/CommunitySection";
import { HeroSection } from "./components/HeroSection";
import { PerformanceAnalysisSection } from "./components/PerformanceAnalysisSection";
import { ProductNarrativeSection } from "./components/ProductNarrativeSection";
import { ProgressSection } from "./components/ProgressSection";
import { SceneAnalysisSection } from "./components/SceneAnalysisSection";
import { ScriptPracticeSection } from "./components/ScriptPracticeSection";
import { VisionArchitectureSection } from "./features/performance-vision/VisionArchitectureSection";

const navItems = [
  { id: "scene-analysis", label: "Scene Analysis", icon: PenSquare },
  { id: "script-practice", label: "Script Practice", icon: Clapperboard },
  { id: "performance-analysis", label: "Performance Review", icon: BrainCircuit },
  { id: "ai-coach", label: "Coach", icon: MessageSquareText },
  { id: "progress", label: "Progress", icon: ChartColumnIncreasing },
  { id: "community", label: "Community", icon: Users }
];

const featurePreview = [
  {
    title: "Read the scene first",
    body: "Paste the scene, add the context, and get a clear breakdown of objective, beats, tension, and choices."
  },
  {
    title: "Practice in one place",
    body: "Study the script, hide lines, run cues, and repeat the scene without jumping between tools."
  },
  {
    title: "Review the take",
    body: "Record a take, review the notes, and track progress so each session ends with a clear next step."
  }
];

export default function App() {
  return (
    <div className="app-shell">
      <div className="app-backdrop" />
      <header className="topbar">
        <div>
          <span className="brand-mark">Black Box</span>
          <p>Acting studio for solo practice</p>
        </div>
        <nav className="topnav">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              <item.icon size={15} />
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="page">
        <HeroSection />
        <ProductNarrativeSection />

        <section className="feature-preview">
          {featurePreview.map((item) => (
            <article key={item.title} className="panel preview-card">
              <span className="eyebrow">Feature</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </section>

        <SceneAnalysisSection />
        <ScriptPracticeSection />
        <VisionArchitectureSection />
        <PerformanceAnalysisSection />
        <AICoachSection />
        <ProgressSection />
        <CommunitySection />
      </main>
    </div>
  );
}
