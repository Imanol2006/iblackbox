export type MotionSignal = "stable" | "moderate" | "elevated";

export type VisionMetric = {
  label: string;
  value: number;
  summary: string;
};

export type VisionSnapshot = {
  faceDetected: boolean;
  poseDetected: boolean;
  gazeSignal: MotionSignal;
  movementSignal: MotionSignal;
  postureSignal: MotionSignal;
  metrics: VisionMetric[];
  observations: string[];
};

export type VisionSessionState = "idle" | "loading" | "ready" | "error";

export type VisionRuntime = {
  faceLandmarker: {
    detectForVideo: (video: HTMLVideoElement, timestamp: number) => unknown;
  };
  poseLandmarker: {
    detectForVideo: (video: HTMLVideoElement, timestamp: number) => unknown;
  };
};
