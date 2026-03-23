import type { VisionRuntime } from "./types";

let runtimePromise: Promise<VisionRuntime> | null = null;

export async function loadVisionRuntime(): Promise<VisionRuntime> {
  if (runtimePromise) {
    return runtimePromise;
  }

  runtimePromise = (async () => {
    const vision = await import("@blackbox/mediapipe-vision");
    const filesetResolver = await vision.FilesetResolver.forVisionTasks(
      "/node_modules/@mediapipe/tasks-vision/wasm"
    );

    const faceLandmarker = await vision.FaceLandmarker.createFromOptions(filesetResolver, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task"
      },
      runningMode: "VIDEO",
      numFaces: 1,
      outputFaceBlendshapes: true
    });

    const poseLandmarker = await vision.PoseLandmarker.createFromOptions(filesetResolver, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task"
      },
      runningMode: "VIDEO",
      numPoses: 1
    });

    return { faceLandmarker, poseLandmarker };
  })();

  return runtimePromise;
}
