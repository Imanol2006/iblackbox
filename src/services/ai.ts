import { performanceReview } from "../data/mockData";

type SceneAnalysisInput = {
  sceneText: string;
  characterName: string;
  context: string;
  intention: string;
};

export async function analyzeScene(input: SceneAnalysisInput) {
  let response: Response;

  try {
    response = await fetch("http://localhost:3001/api/scene-analysis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    });
  } catch {
    throw new Error("Black Box backend is offline. Start the server at http://localhost:3001 and try again.");
  }

  if (!response.ok) {
    let message = `Scene analysis request failed with status ${response.status}`;

    try {
      const errorBody = await response.json();
      if (typeof errorBody?.error === "string") {
        message = errorBody.error;
      }
    } catch {
      // Ignore parse failures and keep the default message.
    }

    throw new Error(message);
  }

  return await response.json();
}

export async function getCoachReply(prompt: string) {
  // Future integration point:
  // replace this mock with a chat endpoint backed by the OpenAI API.
  await delay(700);

  const normalized = prompt.toLowerCase();

  if (normalized.includes("confidence")) {
    return "Treat confidence as preparation made visible. Narrow your focus to one playable action, lower your shoulders, and repeat the piece until the first ten seconds feel settled rather than impressive.";
  }

  if (normalized.includes("delivery")) {
    return "Check where the thought actually turns. Your delivery improves when each sentence is aimed at changing the other person, not when it is aimed at sounding emotional.";
  }

  if (normalized.includes("scene")) {
    return "Start with the event just before the first line. If you know what happened one minute earlier, the scene begins with pressure instead of explanation.";
  }

  return "Focus on one adjustment for the next take. Choose either breath, eye line, or pacing. If you try to correct everything at once, the work becomes self-conscious.";
}

export async function analyzePerformanceMock(fileName?: string) {
  // Future integration point:
  // upload the video to a backend service, run MediaPipe and other computer
  // vision passes for posture / face / body tracking, then combine that with
  // an OpenAI coaching summary before returning structured review data.
  await delay(1100);

  return {
    ...performanceReview,
    title: fileName ? `${performanceReview.title} - ${fileName}` : performanceReview.title
  };
}

function delay(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
