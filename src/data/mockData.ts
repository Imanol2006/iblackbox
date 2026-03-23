export const defaultSceneText = `MARA: You always wait until the room is quiet before saying the real thing.
ELIAS: Maybe I need the quiet so I can hear myself say it.
MARA: No. You need the quiet so no one can interrupt you.
ELIAS: I came here to apologize.
MARA: Then apologize. Don't rehearse the apology in front of me.`;

export const sampleAnalysis = {
  summary:
    "A strained reunion where restraint is doing most of the dramatic work. Both characters are speaking around the wound before they speak directly into it.",
  objective:
    "Mara wants emotional honesty. Elias wants forgiveness without losing control of the conversation.",
  emotionalBeats: [
    "Guarded opening with unresolved history underneath the language.",
    "Mara applies pressure by naming Elias's pattern directly.",
    "Elias shifts toward vulnerability, but still tries to stay composed.",
    "The scene lands on a demand for truth rather than polished language."
  ],
  tension:
    "The conflict lives in timing and avoidance. Elias is trying to manage the moment. Mara is trying to break the performance of control.",
  questions: [
    "What specific past event makes Mara reject polished language here?",
    "Is Elias asking for forgiveness or trying to reduce his own guilt?",
    "What changes physically in the body the moment honesty becomes unavoidable?"
  ],
  choices: [
    "Let silence carry weight instead of filling every pause with intensity.",
    "Play the status shift when Mara interrupts the emotional framing.",
    "Keep the apology active. It should cost something to say it plainly."
  ]
};

export const practiceScript = [
  { speaker: "MARA", line: "You always wait until the room is quiet before saying the real thing." },
  { speaker: "ELIAS", line: "Maybe I need the quiet so I can hear myself say it." },
  { speaker: "MARA", line: "No. You need the quiet so no one can interrupt you." },
  { speaker: "ELIAS", line: "I came here to apologize." },
  { speaker: "MARA", line: "Then apologize. Don't rehearse the apology in front of me." }
];

export const performanceReview = {
  title: "Practice take 04",
  duration: "02:14",
  overview:
    "The take has commitment and a clear point of view. The biggest gain comes from reducing visible preparation and letting key transitions land before the next thought begins.",
  categories: [
    {
      name: "Delivery",
      score: 82,
      strength: "Clear vocal intention and a strong sense of destination in each thought.",
      improve: "Some sentence endings drop in energy before the idea fully lands.",
      nextStep: "Mark the operative word in each beat and sustain the thought through the final phrase."
    },
    {
      name: "Clarity",
      score: 78,
      strength: "Important emotional turns are understandable on first watch.",
      improve: "Consonants soften when the pace increases under pressure.",
      nextStep: "Run the piece once at 80 percent speed while over-articulating key turns."
    },
    {
      name: "Presence",
      score: 86,
      strength: "You hold attention well when your focus stays specific.",
      improve: "Eye focus drifts during transitions between beats.",
      nextStep: "Assign a visual target to each beat change before the next take."
    },
    {
      name: "Posture",
      score: 74,
      strength: "Grounded stance supports moments of authority.",
      improve: "Shoulders rise slightly before emotionally difficult lines.",
      nextStep: "Add a breath-and-release cue before the highest-stakes phrase."
    },
    {
      name: "Body Language",
      score: 76,
      strength: "Gestures become effective when they appear late and sparingly.",
      improve: "Hands become busy when you search for the next thought.",
      nextStep: "Rehearse once with hands resting neutrally to identify unnecessary movement."
    },
    {
      name: "Facial Expression",
      score: 80,
      strength: "Moments of restraint read well and feel cinematic.",
      improve: "Brows engage a little early, telegraphing the emotion.",
      nextStep: "Delay visible reaction by half a beat in the first third of the monologue."
    },
    {
      name: "Pacing",
      score: 77,
      strength: "The piece keeps momentum and rarely stalls.",
      improve: "A few transitions rush past the thought landing.",
      nextStep: "Insert a silent beat after each shift in objective."
    }
  ]
};

export const progressMetrics = {
  sessionsCompleted: 28,
  scenesAnalyzed: 17,
  practiceStreak: 9,
  consistencyScore: 81,
  confidenceTrend: [52, 57, 61, 66, 72, 79, 84],
  postureTrend: [44, 48, 52, 58, 61, 67, 74],
  consistencyTrend: [41, 46, 54, 60, 66, 74, 81],
  recentFocus: ["Grounded posture", "Beat transitions", "Intentional pauses", "Cleaner diction"]
};

export const coachConversation = [
  {
    role: "coach" as const,
    text:
      "Start with what the character is trying to protect. That usually tells you more than the line reading."
  }
];

export const communityCategories = ["Monologues", "Auditions", "Confidence", "Scene Work", "El Paso Community"];

export const communityThreads = [
  {
    title: "How do you keep a monologue alive after 20 repetitions?",
    category: "Monologues",
    meta: "14 actors active",
    excerpt:
      "A discussion about avoiding dead rhythm, using objective changes, and keeping surprise available in repeated practice."
  },
  {
    title: "Warm-up routines before self-tapes",
    category: "Auditions",
    meta: "8 new replies",
    excerpt:
      "Practical warm-ups for breath, articulation, body release, and camera presence before recording alone."
  },
  {
    title: "Confidence when a scene feels emotionally exposed",
    category: "Confidence",
    meta: "Local circle tonight",
    excerpt:
      "Actors sharing ways to stay open in vulnerable material without forcing emotion or losing technique."
  }
];
