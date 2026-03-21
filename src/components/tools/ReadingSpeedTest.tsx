"use client";

import { useState, useRef } from "react";

const PASSAGES = [
  "The quick brown fox jumps over the lazy dog. Reading speed is an important skill for academic and professional success. Studies show that the average adult reads about 200 to 250 words per minute. Speed reading techniques can help you read faster while maintaining comprehension. Practice and regular reading habits are key to improving your reading speed over time.",
  "Technology has transformed the way we communicate and share information. The internet connects billions of people across the globe, enabling instant communication and access to vast repositories of knowledge. Social media platforms have changed how we interact with each other, creating both opportunities and challenges for modern society.",
  "Scientists have discovered that the human brain is remarkably adaptable, a quality known as neuroplasticity. This means that our brains can form new connections and pathways throughout our lives. Learning new skills, reading regularly, and engaging in mentally stimulating activities can all help maintain cognitive health as we age.",
];

export default function ReadingSpeedTest() {
  const [idx, setIdx] = useState(0);
  const [started, setStarted] = useState(false);
  const [wpm, setWpm] = useState<number | null>(null);
  const startRef = useRef<number>(0);
  const passage = PASSAGES[idx];
  const wordCount = passage.split(/\s+/).length;

  const start = () => { startRef.current = Date.now(); setStarted(true); setWpm(null); };
  const done = () => {
    const elapsed = (Date.now() - startRef.current) / 1000 / 60;
    setWpm(Math.round(wordCount / elapsed));
    setStarted(false);
  };
  const next = () => { setIdx((i) => (i + 1) % PASSAGES.length); setStarted(false); setWpm(null); };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{wordCount} words · Passage {idx + 1}/{PASSAGES.length}</p>
        <button onClick={next} className="text-sm text-primary hover:underline">Next passage</button>
      </div>
      <div className="rounded-xl border border-border bg-muted p-6 text-base leading-relaxed text-foreground">
        {passage}
      </div>
      <div className="flex gap-2">
        {!started ? (
          <button onClick={start} className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">
            Start Reading
          </button>
        ) : (
          <button onClick={done} className="rounded-lg bg-green-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">
            Done Reading
          </button>
        )}
      </div>
      {wpm !== null && (
        <div className="rounded-xl border border-border bg-muted p-6 text-center space-y-2">
          <p className="text-4xl font-bold text-primary">{wpm} WPM</p>
          <p className="text-sm text-muted-foreground">
            {wpm < 150 ? "Below average" : wpm < 250 ? "Average (200-250 WPM)" : wpm < 400 ? "Above average" : "Speed reader!"}
          </p>
        </div>
      )}
    </div>
  );
}
