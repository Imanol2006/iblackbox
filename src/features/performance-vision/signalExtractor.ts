import { mockVisionSnapshot } from "./mockVisionReport";
import type { MotionSignal, VisionMetric, VisionSnapshot } from "./types";

type LandmarkPoint = {
  x: number;
  y: number;
  z?: number;
};

type FaceResultShape = {
  faceLandmarks?: LandmarkPoint[][];
} | null;

type PoseResultShape = {
  landmarks?: LandmarkPoint[][];
} | null;

function clamp(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function toSignal(value: number): MotionSignal {
  if (value >= 72) {
    return "stable";
  }

  if (value >= 50) {
    return "moderate";
  }

  return "elevated";
}

function distance(a?: LandmarkPoint, b?: LandmarkPoint) {
  if (!a || !b) {
    return 0;
  }

  return Math.hypot(a.x - b.x, a.y - b.y);
}

function getPoseMetrics(points: LandmarkPoint[] | undefined) {
  if (!points || points.length === 0) {
    return {
      postureScore: mockVisionSnapshot.metrics[0].value,
      movementScore: mockVisionSnapshot.metrics[3].value,
      observations: mockVisionSnapshot.observations.slice(0, 2)
    };
  }

  const leftShoulder = points[11];
  const rightShoulder = points[12];
  const leftHip = points[23];
  const rightHip = points[24];
  const leftWrist = points[15];
  const rightWrist = points[16];

  const shoulderTilt = Math.abs((leftShoulder?.y ?? 0) - (rightShoulder?.y ?? 0));
  const torsoOffset = Math.abs(((leftShoulder?.x ?? 0) + (rightShoulder?.x ?? 0)) / 2 - ((leftHip?.x ?? 0) + (rightHip?.x ?? 0)) / 2);
  const handSpread = distance(leftWrist, rightWrist);

  const postureScore = clamp(92 - shoulderTilt * 260 - torsoOffset * 180);
  const movementScore = clamp(88 - Math.abs(handSpread - 0.3) * 160);

  return {
    postureScore,
    movementScore,
    observations: [
      postureScore < 72 ? "Shoulder line loses symmetry during the take." : "Shoulder line stays mostly grounded.",
      movementScore < 68 ? "Hand activity increases under pressure." : "Gesture amplitude stays measured and controlled."
    ]
  };
}

function getFaceMetrics(points: LandmarkPoint[] | undefined) {
  if (!points || points.length === 0) {
    return {
      gazeScore: mockVisionSnapshot.metrics[1].value,
      faceScore: mockVisionSnapshot.metrics[2].value,
      observations: mockVisionSnapshot.observations.slice(1)
    };
  }

  const leftEyeOuter = points[33];
  const rightEyeOuter = points[263];
  const nose = points[1];
  const mouthLeft = points[61];
  const mouthRight = points[291];
  const browLeft = points[70];
  const browRight = points[300];

  const gazeOffset = Math.abs((((leftEyeOuter?.x ?? 0) + (rightEyeOuter?.x ?? 0)) / 2) - (nose?.x ?? 0));
  const mouthWidth = distance(mouthLeft, mouthRight);
  const browSpread = distance(browLeft, browRight);

  const gazeScore = clamp(94 - gazeOffset * 420);
  const faceScore = clamp(42 + mouthWidth * 120 + browSpread * 40);

  return {
    gazeScore,
    faceScore,
    observations: [
      gazeScore < 70 ? "Eye line drifts away from the imagined partner in transition beats." : "Eye line holds with useful steadiness.",
      faceScore < 65 ? "Facial activity stays a little restrained through the middle section." : "Facial shifts remain readable without overplaying."
    ]
  };
}

export function createVisionSnapshot(faceResult: unknown, poseResult: unknown): VisionSnapshot {
  const faceLandmarks = (faceResult as FaceResultShape)?.faceLandmarks?.[0];
  const poseLandmarks = (poseResult as PoseResultShape)?.landmarks?.[0];

  const poseMetrics = getPoseMetrics(poseLandmarks);
  const faceMetrics = getFaceMetrics(faceLandmarks);

  const metrics: VisionMetric[] = [
    {
      label: "Posture stability",
      value: poseMetrics.postureScore,
      summary: poseMetrics.postureScore < 72
        ? "Body alignment needs more grounding through the highest-stakes phrases."
        : "Posture reads as mostly grounded and usable on camera."
    },
    {
      label: "Gaze steadiness",
      value: faceMetrics.gazeScore,
      summary: faceMetrics.gazeScore < 70
        ? "The gaze slips during transitions and reduces presence."
        : "Eye focus remains mostly stable and helps sustain presence."
    },
    {
      label: "Facial activity",
      value: faceMetrics.faceScore,
      summary: faceMetrics.faceScore < 65
        ? "The face is readable, but expressive range could open further."
        : "Facial movement is active enough to read without becoming noisy."
    },
    {
      label: "Movement control",
      value: poseMetrics.movementScore,
      summary: poseMetrics.movementScore < 68
        ? "Movement rises when the thought gets difficult, which can read as searching."
        : "Gesture intensity stays within a controlled range."
    }
  ];

  return {
    faceDetected: Boolean(faceLandmarks?.length),
    poseDetected: Boolean(poseLandmarks?.length),
    gazeSignal: toSignal(faceMetrics.gazeScore),
    movementSignal: toSignal(poseMetrics.movementScore),
    postureSignal: toSignal(poseMetrics.postureScore),
    metrics,
    observations: [...poseMetrics.observations, ...faceMetrics.observations]
  };
}
