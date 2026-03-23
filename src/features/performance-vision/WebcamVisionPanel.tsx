import { useEffect, useRef, useState } from "react";
import { loadVisionRuntime } from "./mediapipe";
import { mockVisionSnapshot } from "./mockVisionReport";
import { createVisionSnapshot } from "./signalExtractor";
import type { VisionSessionState, VisionSnapshot } from "./types";

export function WebcamVisionPanel() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const frameRef = useRef<number | null>(null);

  const [sessionState, setSessionState] = useState<VisionSessionState>("idle");
  const [snapshot, setSnapshot] = useState<VisionSnapshot>(mockVisionSnapshot);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }

      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  async function startVisionSession() {
    if (!videoRef.current || sessionState === "loading" || sessionState === "ready") {
      return;
    }

    setSessionState("loading");
    setErrorMessage("");

    try {
      const runtime = await loadVisionRuntime();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 960 },
          height: { ideal: 540 },
          facingMode: "user"
        },
        audio: false
      });

      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      setSessionState("ready");

      const loop = () => {
        if (!videoRef.current) {
          return;
        }

        const timestamp = performance.now();
        const faceResult = runtime.faceLandmarker.detectForVideo(videoRef.current, timestamp);
        const poseResult = runtime.poseLandmarker.detectForVideo(videoRef.current, timestamp);
        setSnapshot(createVisionSnapshot(faceResult, poseResult));
        frameRef.current = window.requestAnimationFrame(loop);
      };

      frameRef.current = window.requestAnimationFrame(loop);
    } catch (error) {
      setSessionState("error");
      setSnapshot(mockVisionSnapshot);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Vision runtime could not start. Mock rehearsal metrics are shown instead."
      );
    }
  }

  function stopVisionSession() {
    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setSessionState("idle");
    setSnapshot(mockVisionSnapshot);
    setErrorMessage("");
  }

  return (
    <section className="vision-panel panel">
      <div className="section-header">
        <span className="eyebrow">Live vision starter</span>
        <h2>Track face and body signals during rehearsal.</h2>
        <p>
          This panel is the first CV integration point: webcam capture, MediaPipe landmarks, and rehearsal metrics based on visible behavior rather than guessed emotion labels.
        </p>
      </div>

      <div className="vision-grid">
        <div className="vision-preview">
          <video ref={videoRef} className="vision-video" autoPlay muted playsInline />
          {sessionState !== "ready" ? (
            <div className="vision-overlay">
              <strong>{sessionState === "loading" ? "Starting vision session..." : "Camera preview idle"}</strong>
              <span>Start the session to test face and pose tracking on-device.</span>
            </div>
          ) : null}
        </div>

        <div className="vision-sidebar">
          <div className="vision-actions">
            <button type="button" className="button button-primary" onClick={startVisionSession} disabled={sessionState === "loading" || sessionState === "ready"}>
              {sessionState === "ready" ? "Vision active" : "Start camera session"}
            </button>
            <button type="button" className="button button-secondary" onClick={stopVisionSession}>
              Stop session
            </button>
          </div>

          <div className="vision-status-grid">
            <article className="vision-status-card">
              <span>Face detected</span>
              <strong>{snapshot.faceDetected ? "Yes" : "No"}</strong>
            </article>
            <article className="vision-status-card">
              <span>Pose detected</span>
              <strong>{snapshot.poseDetected ? "Yes" : "No"}</strong>
            </article>
            <article className="vision-status-card">
              <span>Gaze signal</span>
              <strong>{snapshot.gazeSignal}</strong>
            </article>
            <article className="vision-status-card">
              <span>Movement signal</span>
              <strong>{snapshot.movementSignal}</strong>
            </article>
          </div>

          {errorMessage ? <p className="vision-error">{errorMessage}</p> : null}
        </div>
      </div>

      <div className="vision-metric-grid">
        {snapshot.metrics.map((metric) => (
          <article key={metric.label} className="vision-metric-card">
            <div className="review-score">
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </div>
            <div className="progress-track">
              <div className="progress-bar" style={{ width: `${metric.value}%` }} />
            </div>
            <p>{metric.summary}</p>
          </article>
        ))}
      </div>

      <div className="vision-observation-list">
        {snapshot.observations.map((observation) => (
          <div key={observation} className="vision-observation">
            {observation}
          </div>
        ))}
      </div>
    </section>
  );
}
