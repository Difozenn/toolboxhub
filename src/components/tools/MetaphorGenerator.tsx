"use client";

import { useState } from "react";

const DOMAINS = ["nature", "technology", "sport", "cooking", "music", "architecture", "random"];

const METAPHORS: Record<string, (concept: string) => string[]> = {
  nature: (c) => [
    `${c} is a river — constantly moving, carving new paths through even the hardest stone.`,
    `Like a tree in a storm, ${c} bends without breaking, its roots holding firm beneath the chaos.`,
    `${c} is the tide: relentless, cyclic, shaping everything it touches and retreating only to return stronger.`,
  ],
  technology: (c) => [
    `${c} is the source code of experience — invisible to most but powering everything they see.`,
    `Think of ${c} as an algorithm: given the right inputs, it produces predictable and powerful outputs.`,
    `${c} functions like a network: the more nodes connected, the stronger and more resilient the whole becomes.`,
  ],
  sport: (c) => [
    `${c} is the marathon, not the sprint — it demands endurance, pacing, and the will to push through the wall.`,
    `Like a well-trained athlete, ${c} transforms discipline and repetition into something that looks effortless.`,
    `${c} is the team behind the captain — often unseen, always essential, and the true source of every victory.`,
  ],
  cooking: (c) => [
    `${c} is seasoning — a little goes a long way, and its absence leaves everything flat and forgettable.`,
    `Like bread rising in the oven, ${c} requires warmth, time, and patience before it reaches its full potential.`,
    `${c} is the heat under the pan — you cannot see it directly, but its presence transforms everything it touches.`,
  ],
  music: (c) => [
    `${c} is a symphony — a thousand small parts working in precise harmony to create something greater than any single note.`,
    `Like a melody that lingers long after the concert ends, ${c} resonates in ways that outlast its immediate moment.`,
    `${c} is the pause between the notes — the silence that gives the music meaning and makes every sound count.`,
  ],
  architecture: (c) => [
    `${c} is the foundation — unseen beneath the surface, yet everything else depends on its strength.`,
    `Like a well-designed building, ${c} balances form and function, structure and beauty, in ways that endure.`,
    `${c} is the keystone arch — remove it and the entire structure collapses; keep it and nothing can bring the whole down.`,
  ],
};

export default function MetaphorGenerator() {
  const [concept, setConcept] = useState("");
  const [domain, setDomain] = useState("random");
  const [metaphors, setMetaphors] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const generate = () => {
    const selectedDomain = domain === "random"
      ? Object.keys(METAPHORS)[Math.floor(Math.random() * Object.keys(METAPHORS).length)]
      : domain;
    const fn = METAPHORS[selectedDomain];
    setMetaphors(fn ? fn(concept || "this idea") : []);
  };

  const copy = (text: string, i: number) => {
    navigator.clipboard.writeText(text);
    setCopied(i);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Concept or Topic</label>
        <input value={concept} onChange={(e) => setConcept(e.target.value)}
          placeholder="e.g., leadership, grief, innovation, time"
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Metaphor Domain</label>
        <div className="flex flex-wrap gap-2">
          {DOMAINS.map((d) => (
            <button key={d} onClick={() => setDomain(d)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-colors ${domain === d ? "bg-primary text-white" : "border border-border bg-background text-foreground hover:bg-muted"}`}>
              {d}
            </button>
          ))}
        </div>
      </div>

      <button onClick={generate}
        className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
        Generate Metaphors
      </button>

      {metaphors.length > 0 && (
        <div className="space-y-3">
          {metaphors.map((m, i) => (
            <div key={i} className="rounded-xl border border-border bg-muted p-4 space-y-2">
              <p className="text-sm leading-7 text-foreground italic">"{m}"</p>
              <button onClick={() => copy(m, i)}
                className="text-xs text-primary hover:underline">{copied === i ? "Copied!" : "Copy"}</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
