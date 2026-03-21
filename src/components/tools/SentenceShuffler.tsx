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

export default function SentenceShuffler() {
  const [input, setInput] = useState("");
  const [lineMode, setLineMode] = useState(false);
  const [output, setOutput] = useState("");

  function doShuffle() {
    if (lineMode) {
      setOutput(shuffle(input.split("\n").filter(l => l.trim())).join("\n"));
    } else {
      const sentences = input.match(/[^.!?]+[.!?]+\s*/g) ?? [input];
      setOutput(shuffle(sentences).join("").trim());
    }
  }

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e=>setInput(e.target.value)} rows={6}
        placeholder="Paste your paragraph or list of sentences here..."
        className="w-full p-3 rounded-xl border border-border bg-muted text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary" />
      <div className="flex items-center justify-between flex-wrap gap-3">
        <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer select-none">
          <input type="checkbox" checked={lineMode} onChange={e=>setLineMode(e.target.checked)} className="accent-primary w-4 h-4" />
          Shuffle by line instead of sentence
        </label>
        <button onClick={doShuffle} disabled={!input.trim()}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
          Shuffle
        </button>
      </div>
      {output && (
        <>
          <div className="p-3 rounded-xl bg-muted border border-border min-h-[80px] text-foreground whitespace-pre-wrap">
            {output}
          </div>
          <button onClick={() => navigator.clipboard.writeText(output)}
            className="px-4 py-2 rounded-lg bg-muted border border-border text-foreground text-sm font-medium hover:bg-muted/80 transition-colors">
            Copy Result
          </button>
        </>
      )}
    </div>
  );
}
