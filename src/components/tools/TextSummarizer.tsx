"use client";

import { useState } from "react";

function summarize(text: string, n: number): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  if (sentences.length <= n) return sentences.map((s) => s.trim());

  const wordFreq: Record<string, number> = {};
  const stopWords = new Set(["the","a","an","is","it","in","of","and","to","for","on","at","by","with","that","this","are","was","were","be","been","have","has","had"]);
  sentences.forEach((s) => {
    s.toLowerCase().match(/\b\w+\b/g)?.forEach((w) => {
      if (!stopWords.has(w)) wordFreq[w] = (wordFreq[w] || 0) + 1;
    });
  });

  const scored = sentences.map((s, i) => {
    const words = s.toLowerCase().match(/\b\w+\b/g) || [];
    const score = words.reduce((acc, w) => acc + (wordFreq[w] || 0), 0) / (words.length || 1);
    return { s: s.trim(), score, i };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, n).sort((a, b) => a.i - b.i).map((x) => x.s);
}

export default function TextSummarizer() {
  const [text, setText] = useState("");
  const [n, setN] = useState(3);
  const [copied, setCopied] = useState(false);

  const summary = text.trim() ? summarize(text, n) : [];
  const summaryText = summary.join(" ");

  const copy = async () => {
    await navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste the text you want to summarize..."
        className="h-44 w-full resize-y rounded-xl border border-border bg-muted p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />

      <div className="flex items-center gap-4 rounded-xl border border-border bg-muted p-4">
        <label className="text-sm font-medium text-foreground shrink-0">Summary sentences:</label>
        <input type="range" min="1" max="8" value={n} onChange={(e) => setN(Number(e.target.value))} className="flex-1 accent-primary" />
        <span className="text-sm font-bold text-primary w-4">{n}</span>
      </div>

      {summary.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">Summary ({summary.length} sentences)</p>
            <button onClick={copy} className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-primary hover:text-white transition-colors">{copied ? "Copied!" : "Copy"}</button>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 space-y-2">
            {summary.map((s, i) => (
              <p key={i} className="text-sm text-foreground leading-relaxed">{s}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
