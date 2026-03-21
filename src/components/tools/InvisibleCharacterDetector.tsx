"use client";

import { useState } from "react";

const INVISIBLE = [
  { char: "\u200B", name: "Zero Width Space" },
  { char: "\u200C", name: "Zero Width Non-Joiner" },
  { char: "\u200D", name: "Zero Width Joiner" },
  { char: "\uFEFF", name: "Byte Order Mark / Zero Width No-Break Space" },
  { char: "\u00A0", name: "Non-Breaking Space" },
  { char: "\u200E", name: "Left-to-Right Mark" },
  { char: "\u200F", name: "Right-to-Left Mark" },
  { char: "\u2060", name: "Word Joiner" },
];

export default function InvisibleCharacterDetector() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<{ name: string; code: string; count: number; positions: number[] }[]>([]);
  const [cleaned, setCleaned] = useState<string | null>(null);
  const [copiedCleaned, setCopiedCleaned] = useState(false);

  const detect = () => {
    const found = INVISIBLE.map(({ char, name }) => {
      const positions: number[] = [];
      for (let i = 0; i < input.length; i++) if (input[i] === char) positions.push(i);
      return { name, code: `U+${char.codePointAt(0)!.toString(16).toUpperCase().padStart(4, "0")}`, count: positions.length, positions };
    }).filter((r) => r.count > 0);
    setResults(found);
    setCleaned(null);
  };

  const remove = () => {
    let clean = input;
    INVISIBLE.forEach(({ char }) => { clean = clean.split(char).join(""); });
    clean = clean.replace(/\u00A0/g, " ");
    setCleaned(clean);
  };

  const copy = async () => {
    if (cleaned === null) return;
    await navigator.clipboard.writeText(cleaned);
    setCopiedCleaned(true);
    setTimeout(() => setCopiedCleaned(false), 1500);
  };

  const totalFound = results.reduce((s, r) => s + r.count, 0);

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">Input Text</label>
        <textarea value={input} onChange={(e) => { setInput(e.target.value); setResults([]); setCleaned(null); }}
          placeholder="Paste text to scan for invisible characters..."
          className="h-40 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>
      <div className="flex gap-2">
        <button onClick={detect} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Detect</button>
        <button onClick={remove} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">Remove All</button>
        {cleaned !== null && <button onClick={copy} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">{copiedCleaned ? "Copied!" : "Copy Cleaned"}</button>}
      </div>
      {results.length > 0 && (
        <div className="rounded-xl border border-border bg-muted p-4 space-y-2">
          <p className="text-sm font-semibold text-foreground">Found <span className="text-primary">{totalFound}</span> invisible character{totalFound !== 1 ? "s" : ""}:</p>
          {results.map((r) => (
            <div key={r.code} className="rounded-lg border border-border bg-background px-3 py-2 text-sm">
              <span className="font-semibold text-primary">{r.name}</span>
              <span className="ml-2 text-muted-foreground">{r.code}</span>
              <span className="ml-2">— {r.count}x at position{r.count !== 1 ? "s" : ""}: {r.positions.slice(0, 10).join(", ")}{r.positions.length > 10 ? "..." : ""}</span>
            </div>
          ))}
        </div>
      )}
      {results.length === 0 && input && <p className="text-sm text-green-600 dark:text-green-400">No invisible characters detected.</p>}
      {cleaned !== null && (
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Cleaned Text</label>
          <textarea readOnly value={cleaned}
            className="h-32 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground focus:outline-none" />
        </div>
      )}
    </div>
  );
}
