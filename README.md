# Black Box

A polished MVP web app for an AI-powered acting studio focused on solo rehearsal.

## Product focus

- Scene Analysis
- Script Practice
- Performance Analysis
- AI Coach
- Progress Dashboard
- Premium landing page for demo and pitch use
- Computer-vision starter for face and body rehearsal signals

## Stack

- React
- Vite
- TypeScript
- Modular component architecture
- Mock AI service layer ready for backend integration
- Clear future integration points for OpenAI and MediaPipe

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

## Build for production

```bash
npm run build
```

## File structure

- `src/App.tsx`: main single-page product flow
- `src/components/`: product sections and reusable UI blocks
- `src/features/performance-vision/`: MediaPipe starter architecture, signal extraction, and webcam analysis panel
- `src/data/mockData.ts`: believable placeholder content and metrics
- `src/services/ai.ts`: future-ready OpenAI / analysis service stubs
- `src/styles.css`: cinematic visual system and responsive layout

## Future integration notes

- `src/services/ai.ts` shows where scene analysis and coaching can connect to an OpenAI-backed API
- `src/components/PerformanceAnalysisSection.tsx` and `src/services/ai.ts` mark the future MediaPipe / computer-vision handoff for posture, face, and body tracking
- `src/features/performance-vision/WebcamVisionPanel.tsx` is the first live CV starter: webcam input, MediaPipe runtime loading, and rehearsal metrics derived from landmarks
