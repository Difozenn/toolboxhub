"use client";

import { useState } from "react";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function TeamGenerator() {
  const [input, setInput] = useState("Alice\nBob\nCharlie\nDiana\nEve\nFrank");
  const [numTeams, setNumTeams] = useState("2");
  const [teams, setTeams] = useState<string[][]>([]);

  const generate = () => {
    const names = input.split("\n").map(n => n.trim()).filter(Boolean);
    const n = Math.max(2, Math.min(parseInt(numTeams, 10) || 2, names.length));
    const shuffled = shuffle(names);
    const result: string[][] = Array.from({ length: n }, () => []);
    shuffled.forEach((name, i) => result[i % n].push(name));
    setTeams(result);
  };

  const COLORS = ["bg-primary/10 border-primary/30", "bg-blue-500/10 border-blue-500/30", "bg-green-500/10 border-green-500/30", "bg-orange-500/10 border-orange-500/30", "bg-purple-500/10 border-purple-500/30", "bg-pink-500/10 border-pink-500/30"];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Names (one per line)</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={5}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none font-mono text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Number of Teams</label>
          <input type="number" min="2" max="10" value={numTeams} onChange={(e) => setNumTeams(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <button onClick={generate} className="w-full rounded-lg bg-primary px-6 py-2.5 font-semibold text-white transition-colors hover:opacity-90">
          Generate Teams
        </button>
      </div>

      {teams.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {teams.map((team, i) => (
            <div key={i} className={`rounded-xl border p-4 ${COLORS[i % COLORS.length]}`}>
              <p className="text-sm font-semibold text-foreground mb-2">Team {i + 1} ({team.length})</p>
              <ul className="space-y-1">
                {team.map(name => (
                  <li key={name} className="text-sm text-foreground">{name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
