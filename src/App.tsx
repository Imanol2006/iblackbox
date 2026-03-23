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
    title: "Break down the scene first",
    body: "Paste the material, define the moment, and get a clear read on objective, beats, tension, and playable choices."
  },
  {
    title: "Practice with a simple loop",
    body: "Study the script, hide lines, run cues, and repeat with purpose instead of rehearsing blindly."
  },
  {
    title: "Review what changed",
    body: "Record a take, review the notes, and track progress so each session gives you a concrete next step."
  }
];

export default function App() {
  return (
    <div className="app-shell">
      <div className="app-backdrop" />
      <header className="topbar">
        <div>
          <span className="brand-mark">Black Box</span>
          <p>Solo practice, with feedback</p>
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
              <span className="eyebrow">Core feature</span>
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
