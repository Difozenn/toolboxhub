"use client";

import { useState } from "react";

const POWER_WORDS = ["free","new","proven","secret","guaranteed","instant","exclusive","limited","ultimate","best","amazing","discover","revealed","powerful","simple","easy","fast","now","save","win"];
const EMOTIONAL_WORDS = ["love","fear","angry","happy","sad","excited","surprised","worried","curious","brave","inspired","shocked","grateful","proud","frustrated","hopeful","lonely","confident","nervous","calm"];

function scoreHeadline(text: string) {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const wordCount = words.length;
  const charCount = text.length;
  const powerFound = words.filter((w) => POWER_WORDS.includes(w));
  const emotionalFound = words.filter((w) => EMOTIONAL_WORDS.includes(w));
  const hasNumber = /\d/.test(text);
  const hasQuestion = text.includes("?");

  let score = 0;
  if (wordCount >= 6 && wordCount <= 10) score += 20;
  else if (wordCount >= 5 && wordCount <= 12) score += 10;
  if (charCount >= 40 && charCount <= 70) score += 20;
  else if (charCount >= 30 && charCount <= 80) score += 10;
  score += Math.min(powerFound.length * 10, 25);
  score += Math.min(emotionalFound.length * 10, 20);
  if (hasNumber) score += 10;
  if (hasQuestion) score += 5;

  return { wordCount, charCount, powerFound, emotionalFound, hasNumber, hasQuestion, score: Math.min(score, 100) };
}

export default function HeadlineAnalyzer() {
  const [headline, setHeadline] = useState("");

  const result = headline.trim() ? scoreHeadline(headline) : null;
  const scoreColor = !result ? "" : result.score >= 70 ? "text-green-500" : result.score >= 40 ? "text-yellow-500" : "text-red-500";

  return (
    <div className="space-y-6">
      <input value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="Enter your headline here..."
        className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />

      {result && (
        <>
          <div className="rounded-xl border border-border bg-muted p-5 flex flex-col items-center gap-2">
            <p className="text-sm text-muted-foreground">Headline Score</p>
            <p className={`text-6xl font-bold ${scoreColor}`}>{result.score}</p>
            <p className="text-xs text-muted-foreground">out of 100</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { label: "Words", value: result.wordCount, note: "6-10 ideal" },
              { label: "Characters", value: result.charCount, note: "40-70 ideal" },
              { label: "Power Words", value: result.powerFound.length, note: result.powerFound.join(", ") || "none" },
              { label: "Emotional Words", value: result.emotionalFound.length, note: result.emotionalFound.join(", ") || "none" },
              { label: "Has Number", value: result.hasNumber ? "Yes" : "No", note: "+10 pts" },
              { label: "Has Question", value: result.hasQuestion ? "Yes" : "No", note: "+5 pts" },
            ].map(({ label, value, note }) => (
              <div key={label} className="rounded-lg border border-border bg-muted p-3 text-center">
                <p className="text-lg font-bold text-foreground">{value}</p>
                <p className="text-xs font-medium text-muted-foreground">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{note}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
