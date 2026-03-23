import "dotenv/config";
import cors from "cors";
import express from "express";
import OpenAI from "openai";

const app = express();
const port = process.env.PORT || 3001;

if (!process.env.OPENAI_API_KEY) {
  console.warn("OPENAI_API_KEY is missing. Add it to server/.env before using the AI endpoints.");
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(
  cors({
    origin: "http://localhost:5173"
  })
);
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/scene-analysis", async (req, res) => {
  const { sceneText, characterName = "", context = "", intention = "" } = req.body ?? {};

  if (!sceneText || typeof sceneText !== "string") {
    return res.status(400).json({ error: "sceneText is required." });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "OPENAI_API_KEY is not configured." });
  }

  try {
    const response = await client.responses.create({
      model: "gpt-5",
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text:
                "You are a serious acting coach. Analyze scenes for actors practicing alone. Return concise, practical, structured scene guidance."
            }
          ]
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: [
                "Analyze this scene for rehearsal.",
                `Scene text:\n${sceneText}`,
                `Character name: ${characterName || "Not provided"}`,
                `Context: ${context || "Not provided"}`,
                `Intention: ${intention || "Not provided"}`
              ].join("\n\n")
            }
          ]
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "scene_analysis",
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              summary: { type: "string" },
              objective: { type: "string" },
              emotionalBeats: {
                type: "array",
                items: { type: "string" }
              },
              tension: { type: "string" },
              questions: {
                type: "array",
                items: { type: "string" }
              },
              choices: {
                type: "array",
                items: { type: "string" }
              }
            },
            required: ["summary", "objective", "emotionalBeats", "tension", "questions", "choices"]
          }
        }
      }
    });

    return res.json(JSON.parse(response.output_text));
  } catch (error) {
    console.error("Scene analysis failed:", error);
    return res.status(500).json({ error: "Scene analysis failed." });
  }
});

app.listen(port, () => {
  console.log(`Black Box server listening on http://localhost:${port}`);
});
