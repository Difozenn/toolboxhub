"use client";

import { useState } from "react";

function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!word) return 0;
  const matches = word.match(/[aeiouy]+/g);
  let count = matches ? matches.length : 1;
  if (word.endsWith("e") && count > 1) count--;
  return Math.max(1, count);
}

function analyze(text: string) {
  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean) : [];
  const sentences = (text.match(/[^.!?]+[.!?]+/g) || []).length;
  const paragraphs = text.trim().split(/\n\s*\n/).filter((p) => p.trim()).length;
  const syllables = words.reduce((acc, w) => acc + countSyllables(w), 0);
  const avgWordLen = words.length ? (words.reduce((a, w) => a + w.replace(/[^a-zA-Z]/g, "").length, 0) / words.length).toFixed(1) : "0";
  const avgSentLen = sentences > 0 ? (words.length / sentences).toFixed(1) : "0";

  let flesch = 0;
  if (words.length > 0 && sentences > 0) {
    const asl = words.length / sentences;
    const asw = syllables / words.length;
    flesch = Math.max(0, Math.min(100, Math.round(206.835 - 1.015 * asl - 84.6 * asw)));
  }

  const fleschLabel = flesch >= 80 ? "Very Easy" : flesch >= 70 ? "Easy" : flesch >= 60 ? "Standard" : flesch >= 50 ? "Fairly Difficult" : flesch >= 30 ? "Difficult" : "Very Difficult";
  return { chars, words: words.length, sentences, paragraphs, syllables, avgWordLen, avgSentLen, flesch, fleschLabel };
}

export default function TextCaseCounter() {
  const [text, setText] = useState("");
  const r = text.trim() ? analyze(text) : null;

  return (
    <div className="space-y-6">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste your text here for detailed statistics..."
        className="h-40 w-full resize-y rounded-xl border border-border bg-muted p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />

      {r && (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Characters", value: r.chars.toLocaleString() },
              { label: "Words", value: r.words.toLocaleString() },
              { label: "Sentences", value: r.sentences.toLocaleString() },
              { label: "Paragraphs", value: r.paragraphs.toLocaleString() },
              { label: "Syllables", value: r.syllables.toLocaleString() },
              { label: "Avg Word Length", value: `${r.avgWordLen} chars` },
              { label: "Avg Sentence Length", value: `${r.avgSentLen} words` },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl border border-border bg-muted p-3 text-center">
                <p className="text-xl font-bold text-primary">{value}</p>
                <p className="text-xs text-muted-foreground mt-1">{label}</p>
              </div>
            ))}
            <div className="rounded-xl border border-border bg-muted p-3 text-center">
              <p className="text-xl font-bold text-foreground">{r.flesch}</p>
              <p className="text-xs text-muted-foreground mt-1">Flesch Score</p>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Reading Ease</p>
            <p className="text-lg font-semibold text-primary">{r.fleschLabel}</p>
            <div className="mt-2 h-2 w-full rounded-full bg-border overflow-hidden">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${r.flesch}%` }} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
