"use client";

import { useState } from "react";

const POWER_WORDS = ["best","top","ultimate","essential","amazing","powerful","proven","secret","boost","increase","free","new","now","exclusive","guaranteed","easy","quick","fast","simple","effective"];
const EMOTIONAL_WORDS = ["love","fear","angry","happy","amazing","shocking","surprising","incredible","horrible","wonderful","beautiful","terrible"];

export default function HeadingAnalyzerSeo() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ score: number; wordCount: number; charCount: number; powerWords: string[]; hasNumber: boolean; sentiment: string } | null>(null);

  const analyze = () => {
    const words = input.trim().split(/\s+/).filter(Boolean);
    const lower = input.toLowerCase();
    const foundPower = POWER_WORDS.filter((w) => lower.includes(w));
    const foundEmotional = EMOTIONAL_WORDS.filter((w) => lower.includes(w));
    const hasNumber = /\d/.test(input);
    let score = 0;
    if (words.length >= 6 && words.length <= 10) score += 30;
    else if (words.length >= 4 && words.length <= 12) score += 15;
    if (input.length >= 50 && input.length <= 65) score += 20;
    else if (input.length >= 40 && input.length <= 75) score += 10;
    if (hasNumber) score += 20;
    if (foundPower.length > 0) score += Math.min(foundPower.length * 10, 20);
    if (foundEmotional.length > 0) score += Math.min(foundEmotional.length * 5, 10);
    const sentiment = foundEmotional.length > 0 ? "Emotional" : foundPower.length > 0 ? "Positive" : "Neutral";
    setResult({ score: Math.min(score, 100), wordCount: words.length, charCount: input.length, powerWords: [...foundPower, ...foundEmotional], hasNumber, sentiment });
  };

  const scoreColor = result ? (result.score >= 70 ? "text-green-600" : result.score >= 40 ? "text-yellow-600" : "text-red-600") : "";
  const scoreBg = result ? (result.score >= 70 ? "bg-green-500" : result.score >= 40 ? "bg-yellow-500" : "bg-red-500") : "";

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">Heading / Title</label>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && analyze()}
          placeholder="e.g. 10 Proven Ways to Double Your Website Traffic in 2025"
          className="w-full rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>
      <button onClick={analyze} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Analyze</button>
      {result && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Overall Score</p>
            <p className={`text-5xl font-bold ${scoreColor}`}>{result.score}</p>
            <div className="mt-2 h-3 rounded-full bg-border overflow-hidden">
              <div className={`h-full rounded-full transition-all ${scoreBg}`} style={{ width: `${result.score}%` }} />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: "Word Count", value: `${result.wordCount} words`, good: result.wordCount >= 6 && result.wordCount <= 10 },
              { label: "Character Count", value: `${result.charCount} chars`, good: result.charCount >= 50 && result.charCount <= 65 },
              { label: "Contains Number", value: result.hasNumber ? "Yes" : "No", good: result.hasNumber },
              { label: "Sentiment", value: result.sentiment, good: result.sentiment !== "Neutral" },
            ].map(({ label, value, good }) => (
              <div key={label} className={`rounded-xl border p-3 ${good ? "border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-950" : "border-border"}`}>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="font-semibold text-foreground">{value}</p>
              </div>
            ))}
          </div>
          {result.powerWords.length > 0 && (
            <div className="rounded-xl border border-border bg-muted p-3">
              <p className="text-xs text-muted-foreground mb-2">Power / Emotional Words Found:</p>
              <div className="flex flex-wrap gap-1">{result.powerWords.map((w) => <span key={w} className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary capitalize">{w}</span>)}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
