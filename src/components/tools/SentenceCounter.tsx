"use client";

import { useState } from "react";

function analyze(text: string) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  const words = text.trim().split(/\s+/).filter(Boolean);
  const avgWords = sentences.length > 0 ? Math.round(words.length / sentences.length) : 0;

  const sentenceLengths = sentences.map((s) => s.trim().split(/\s+/).filter(Boolean).length);
  const shortest = sentenceLengths.length ? Math.min(...sentenceLengths) : 0;
  const longest = sentenceLengths.length ? Math.max(...sentenceLengths) : 0;
  const shortestSentence = sentences[sentenceLengths.indexOf(shortest)]?.trim() || "";
  const longestSentence = sentences[sentenceLengths.indexOf(longest)]?.trim() || "";

  return { sentenceCount: sentences.length, wordCount: words.length, avgWords, shortest, longest, shortestSentence, longestSentence };
}

export default function SentenceCounter() {
  const [text, setText] = useState("");
  const result = text.trim() ? analyze(text) : null;

  return (
    <div className="space-y-6">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste your text here to analyze sentences..."
        className="h-40 w-full resize-y rounded-xl border border-border bg-muted p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />

      {result && (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Sentences", value: result.sentenceCount },
              { label: "Words", value: result.wordCount },
              { label: "Avg Words/Sentence", value: result.avgWords },
              { label: "Shortest Sentence", value: `${result.shortest} words` },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl border border-border bg-muted p-4 text-center">
                <p className="text-2xl font-bold text-primary">{value}</p>
                <p className="text-xs text-muted-foreground mt-1">{label}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="rounded-lg border border-border bg-muted p-3">
              <p className="text-xs font-semibold text-muted-foreground mb-1">Shortest Sentence ({result.shortest} words)</p>
              <p className="text-sm text-foreground">{result.shortestSentence || "—"}</p>
            </div>
            <div className="rounded-lg border border-border bg-muted p-3">
              <p className="text-xs font-semibold text-muted-foreground mb-1">Longest Sentence ({result.longest} words)</p>
              <p className="text-sm text-foreground">{result.longestSentence || "—"}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
