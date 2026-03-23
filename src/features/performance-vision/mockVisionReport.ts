import type { VisionSnapshot } from "./types";

export const mockVisionSnapshot: VisionSnapshot = {
  faceDetected: true,
  poseDetected: true,
  gazeSignal: "moderate",
  movementSignal: "elevated",
  postureSignal: "moderate",
  metrics: [
    {
      label: "Posture stability",
      value: 74,
      summary: "Shoulders are mostly level, but tension rises before higher-stakes phrases."
    },
    {
      label: "Gaze steadiness",
      value: 68,
      summary: "Eye line is usable, though transitions between beats create some drift."
    },
    {
      label: "Facial activity",
      value: 71,
      summary: "The face is readable, but the middle section flattens slightly."
    },
    {
      label: "Movement control",
      value: 63,
      summary: "Hand and torso movement increase when searching for the next thought."
    }
  ],
  observations: [
    "Shoulders lift before difficult lines.",
    "Head movement spikes when the objective changes.",
    "Facial activity stays strongest near moments of direct conflict."
  ]
};
