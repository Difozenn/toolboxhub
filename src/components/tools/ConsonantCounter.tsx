"use client";
import { useState } from "react";

const VOWELS = new Set("aeiouAEIOU");

export default function ConsonantCounter() {
  const [input, setInput] = useState("");
  const letters = input.replace(/[^a-zA-Z]/g, "");
  const vowels = letters.split("").filter(c => VOWELS.has(c)).length;
  const consonants = letters.length - vowels;
  const freq: Record<string, number> = {};
  for (const c of letters.toLowerCase()) freq[c] = (freq[c] ?? 0) + 1;
  const sorted = Object.entries(freq).sort((a,b) => b[1]-a[1]).slice(0,10);

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e=>setInput(e.target.value)} rows={5}
        placeholder="Paste text to analyse letter composition..."
        className="w-full p-3 rounded-xl border border-border bg-muted text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary" />
      <div className="grid grid-cols-3 gap-3">
        {[["Total Letters", letters.length],["Vowels", vowels],["Consonants", consonants]].map(([label,val]) => (
          <div key={label as string} className="rounded-xl bg-muted border border-border p-3 text-center">
            <div className="text-2xl font-bold text-primary">{val}</div>
            <div className="text-xs text-muted-foreground mt-1">{label}</div>
          </div>
        ))}
      </div>
      {sorted.length > 0 && (
        <div className="rounded-xl bg-muted border border-border p-3">
          <p className="text-xs font-medium text-muted-foreground mb-2">Top Letter Frequency</p>
          <div className="flex flex-wrap gap-2">
            {sorted.map(([ch, n]) => (
              <span key={ch} className="px-2 py-1 rounded-lg bg-background border border-border text-sm text-foreground">
                <span className="font-mono font-bold">{ch.toUpperCase()}</span>: {n}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
