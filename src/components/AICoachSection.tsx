import { FormEvent, useState } from "react";
import { coachConversation } from "../data/mockData";
import { getCoachReply } from "../services/ai";
import { SectionHeader } from "./SectionHeader";

type Message = {
  role: "coach" | "user";
  text: string;
};

export function AICoachSection() {
  const [messages, setMessages] = useState<Message[]>(coachConversation);
  const [prompt, setPrompt] = useState("How can I improve my delivery in this monologue?");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!prompt.trim()) {
      return;
    }

    const nextMessages: Message[] = [...messages, { role: "user", text: prompt.trim() }];
    setMessages(nextMessages);
    setLoading(true);
    const reply = await getCoachReply(prompt);
    setMessages([...nextMessages, { role: "coach", text: reply }]);
    setPrompt("");
    setLoading(false);
  }

  return (
    <section id="ai-coach" className="feature-layout">
      <div className="panel">
        <SectionHeader
          eyebrow="AI Coach"
          title="Ask direct questions about the work."
          description="Use the coach to clarify the scene, the character, or the next rehearsal step."
        />
        <div className="prompt-suggestions">
          <span>Try:</span>
          <button type="button" className="pill" onClick={() => setPrompt("Help me understand this scene")}>
            Scene breakdown
          </button>
          <button type="button" className="pill" onClick={() => setPrompt("Give me exercises to improve confidence")}>
            Confidence work
          </button>
          <button type="button" className="pill" onClick={() => setPrompt("What does my character want in this moment?")}>
            Character objective
          </button>
        </div>
        <form className="coach-form" onSubmit={handleSubmit}>
          <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} rows={4} />
          <button type="submit" className="button button-primary" disabled={loading}>
            {loading ? "Generating..." : "Ask Coach"}
          </button>
        </form>
      </div>
      <div className="panel coach-panel">
        <SectionHeader
          eyebrow="Response"
          title="Short answers you can use."
          description="The coach should sound like a rehearsal note, not a chatbot."
        />
        <div className="message-stack">
          {messages.map((message, index) => (
            <article key={`${message.role}-${index}`} className={`message ${message.role === "coach" ? "message-coach" : "message-user"}`}>
              <span>{message.role === "coach" ? "Coach" : "You"}</span>
              <p>{message.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
