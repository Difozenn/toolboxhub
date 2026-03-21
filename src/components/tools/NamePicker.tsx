"use client";

import { useState } from "react";

export default function NamePicker() {
  const [input, setInput] = useState("Alice\nBob\nCharlie\nDiana\nEve");
  const [picked, setPicked] = useState<string | null>(null);
  const [removeAfterPick, setRemoveAfterPick] = useState(false);
  const [removedNames, setRemovedNames] = useState<string[]>([]);

  const names = input.split("\n").map(n => n.trim()).filter(Boolean);

  const pick = () => {
    if (names.length === 0) return;
    const idx = Math.floor(Math.random() * names.length);
    const name = names[idx];
    setPicked(name);
    if (removeAfterPick) {
      setRemovedNames(prev => [...prev, name]);
      setInput(input.split("\n").filter((n, i) => {
        const trimmed = n.trim();
        if (trimmed === name && !removedNames.includes(trimmed)) {
          return false;
        }
        return true;
      }).join("\n"));
    }
  };

  const reset = () => { setPicked(null); setRemovedNames([]); };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5 space-y-3">
        <label className="block text-sm font-medium text-foreground">Names (one per line)</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={6}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none font-mono text-sm" />
        <div className="flex items-center gap-2">
          <input type="checkbox" id="remove" checked={removeAfterPick} onChange={(e) => setRemoveAfterPick(e.target.checked)}
            className="rounded border-border" />
          <label htmlFor="remove" className="text-sm text-foreground">Remove picked name from list</label>
        </div>
        <div className="flex gap-2">
          <button onClick={pick} disabled={names.length === 0}
            className="flex-1 rounded-lg bg-primary px-6 py-2.5 font-semibold text-white transition-colors hover:opacity-90 disabled:opacity-50">
            Pick Random
          </button>
          <button onClick={reset} className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground hover:bg-primary/10 transition-colors">
            Reset
          </button>
        </div>
      </div>

      {picked ? (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-8 text-center">
          <p className="text-sm text-muted-foreground mb-2">Selected!</p>
          <p className="text-4xl font-bold text-primary">{picked}</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-muted p-6 text-center">
          <p className="text-muted-foreground">{names.length} name{names.length !== 1 ? "s" : ""} in pool. Click Pick Random!</p>
        </div>
      )}
    </div>
  );
}
