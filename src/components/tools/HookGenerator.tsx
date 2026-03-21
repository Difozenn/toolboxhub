"use client";

import { useState } from "react";

const HOOK_TYPES = [
  { value: "question", label: "Rhetorical Question", icon: "❓" },
  { value: "statistic", label: "Startling Statistic", icon: "📊" },
  { value: "anecdote", label: "Vivid Anecdote", icon: "📖" },
  { value: "bold", label: "Bold Statement", icon: "💥" },
  { value: "quote", label: "Relevant Quote", icon: "💬" },
];

const generateHook = (topic: string, type: string): string => {
  const t = topic.trim() || "this topic";
  const hooks: Record<string, string[]> = {
    question: [
      `What if everything you thought you knew about ${t} was wrong?`,
      `Have you ever stopped to consider the true impact of ${t} on your daily life?`,
      `Why do so many people overlook the critical importance of ${t}?`,
    ],
    statistic: [
      `Studies show that over 60% of people will encounter ${t} at some point in their lives, yet most remain unprepared.`,
      `Every year, billions of dollars are spent on ${t} — yet the most important facts remain misunderstood by the majority.`,
      `Research reveals that ${t} affects more individuals globally than any other comparable issue of our time.`,
    ],
    anecdote: [
      `On a quiet Tuesday morning, Sarah realized that ${t} had changed everything she thought she understood about the world around her.`,
      `The moment he encountered ${t} firsthand, nothing in his life would ever be quite the same again.`,
      `It was an ordinary day until ${t} made it anything but — and from that moment forward, the lesson was unforgettable.`,
    ],
    bold: [
      `${t.charAt(0).toUpperCase() + t.slice(1)} is not simply an issue — it is the defining challenge of our generation.`,
      `The way we think about ${t} is fundamentally, irrevocably wrong.`,
      `Everything changes when we take ${t} seriously — and it is long past time that we did.`,
    ],
    quote: [
      `As the philosopher once observed, "The unexamined life is not worth living" — a truth that speaks directly to the heart of ${t}.`,
      `"Change is the only constant," a sentiment that perfectly captures the evolving landscape of ${t}.`,
      `"The greatest danger is not that we aim too high and miss, but that we aim too low and hit" — nowhere is this truer than in the context of ${t}.`,
    ],
  };
  const options = hooks[type] || hooks.bold;
  return options[Math.floor(Math.random() * options.length)];
};

export default function HookGenerator() {
  const [topic, setTopic] = useState("");
  const [hookType, setHookType] = useState("question");
  const [hook, setHook] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => setHook(generateHook(topic, hookType));
  const copy = () => { navigator.clipboard.writeText(hook); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Essay Topic</label>
        <input value={topic} onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., climate change, social media addiction, education reform"
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Hook Style</label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {HOOK_TYPES.map((h) => (
            <button key={h.value} onClick={() => setHookType(h.value)}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${hookType === h.value ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-foreground hover:bg-muted"}`}>
              <span>{h.icon}</span> {h.label}
            </button>
          ))}
        </div>
      </div>

      <button onClick={generate}
        className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
        Generate Hook
      </button>

      {hook && (
        <div className="rounded-xl border border-border bg-muted p-4 space-y-3">
          <p className="text-sm font-semibold text-foreground">Your Opening Hook</p>
          <p className="text-sm leading-7 text-foreground italic">"{hook}"</p>
          <div className="flex gap-2">
            <button onClick={copy} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
              {copied ? "Copied!" : "Copy Hook"}
            </button>
            <button onClick={generate} className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">
              Regenerate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
