import { performanceReview, sampleAnalysis } from "../data/mockData";

type SceneAnalysisInput = {
  sceneText: string;
  characterName: string;
  context: string;
  intention: string;
};

export async function analyzeScene(input: SceneAnalysisInput) {
  await delay(850);

  const cleanedCharacter = input.characterName.trim() || "The character";
  const cleanedContext = input.context.trim() || "No scene context provided.";
  const cleanedIntention = input.intention.trim() || "No clear intention provided yet.";
  const rawLines = input.sceneText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const lineCount = rawLines.length;
  const firstLine = rawLines[0] ?? "";
  const firstContent = firstLine.includes(":") ? firstLine.split(":").slice(1).join(":").trim() : firstLine;
  const alternateSpeakers = Array.from(
    new Set(
      rawLines
        .map((line) => line.split(":")[0]?.trim())
        .filter((speaker) => speaker && speaker.length > 0)
    )
  ).filter((speaker) => speaker.toLowerCase() !== cleanedCharacter.toLowerCase());
  const counterpart = alternateSpeakers[0] ?? "the other person";

  return {
    summary:
      lineCount <= 2
        ? `${cleanedCharacter} opens the moment directly and simply. The scene reads as a brief attempt to make contact in the context of: ${cleanedContext}.`
        : `${cleanedCharacter} enters a scene shaped by pressure, response, and subtext. The exchange suggests that what matters is not only what is said, but how directly each person is willing to say it within: ${cleanedContext}.`,
    objective:
      `${cleanedCharacter} is trying to ${cleanedIntention.toLowerCase()}. The playable objective should stay active through the whole moment instead of stopping at the first line.`,
    emotionalBeats:
      lineCount <= 2
        ? [
            "Direct opening with a clear attempt to get attention.",
            "The moment depends on whether the greeting is casual, urgent, warm, or testing.",
            "The actor needs to decide what response is being hoped for from the other person."
          ]
        : sampleAnalysis.emotionalBeats.map((beat, index) =>
            index === 0 ? `${beat} Context note: ${cleanedContext}.` : beat
          ),
    tension:
      lineCount <= 2
        ? `The tension is low on the page, so the performance has to define it. Ask what makes this greeting matter right now, and what changes if ${counterpart} does not respond.`
        : `${sampleAnalysis.tension} Keep the stated intention in play: ${cleanedIntention}.`,
    questions: [
      `Why is ${cleanedCharacter} saying this now and not earlier?`,
      `What response does ${cleanedCharacter} want from ${counterpart}?`,
      firstContent
        ? `What changes in the body right before the line "${firstContent}" is spoken?`
        : `What physical change should happen the moment the line begins?`
    ],
    choices: [
      `Anchor the scene in this intention: ${cleanedIntention}.`,
      lineCount <= 2
        ? "Try three versions of the moment: open, guarded, and urgent. Keep the words the same and change the need underneath them."
        : sampleAnalysis.choices[0],
      lineCount <= 2
        ? "Decide whether the first line is meant to connect, interrupt, test, or disarm the other person."
        : sampleAnalysis.choices[1]
    ]
  };
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
