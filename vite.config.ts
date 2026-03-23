import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@blackbox/mediapipe-vision": fileURLToPath(
        new URL("./node_modules/@mediapipe/tasks-vision/vision_bundle.mjs", import.meta.url)
      ),
      "@blackbox/mediapipe-wasm": path.resolve(
        fileURLToPath(new URL(".", import.meta.url)),
        "node_modules/@mediapipe/tasks-vision/wasm"
      )
    }
  }
});
