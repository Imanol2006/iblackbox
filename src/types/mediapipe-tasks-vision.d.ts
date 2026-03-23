declare module "@blackbox/mediapipe-vision" {
  export const FilesetResolver: {
    forVisionTasks(basePath: string): Promise<unknown>;
  };

  export const FaceLandmarker: {
    createFromOptions(
      filesetResolver: unknown,
      options: {
        baseOptions: { modelAssetPath: string };
        runningMode: "VIDEO";
        numFaces: number;
        outputFaceBlendshapes?: boolean;
      }
    ): Promise<{
      detectForVideo(video: HTMLVideoElement, timestamp: number): unknown;
    }>;
  };

  export const PoseLandmarker: {
    createFromOptions(
      filesetResolver: unknown,
      options: {
        baseOptions: { modelAssetPath: string };
        runningMode: "VIDEO";
        numPoses: number;
      }
    ): Promise<{
      detectForVideo(video: HTMLVideoElement, timestamp: number): unknown;
    }>;
  };
}
