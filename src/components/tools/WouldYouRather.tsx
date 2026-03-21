"use client";

import { useState } from "react";

const QUESTIONS = [
  ["Be able to fly", "Be able to become invisible"],
  ["Never use social media again", "Never watch TV/movies again"],
  ["Always be 10 minutes late", "Always be 20 minutes early"],
  ["Have unlimited money", "Have unlimited time"],
  ["Be the smartest person in the room", "Be the funniest person in the room"],
  ["Live in the past", "Live in the future"],
  ["Lose all your memories", "Never make new memories"],
  ["Be famous but broke", "Be rich but unknown"],
  ["Only eat sweet food forever", "Only eat salty food forever"],
  ["Have a rewind button for your life", "A pause button for your life"],
  ["Never be able to lie", "Never be able to tell the truth"],
  ["Be too hot", "Be too cold"],
  ["Have no internet for a month", "Have no phone for a month"],
  ["Speak every language", "Play every instrument"],
  ["Know when you'll die", "Know how you'll die"],
  ["Be the hero who's always late", "Be the villain who never wins"],
  ["Live underwater", "Live in space"],
  ["Have a photographic memory", "Be able to forget anything on demand"],
  ["Always say what you think", "Never express your feelings"],
  ["Fight one horse-sized duck", "Fight 100 duck-sized horses"],
];

export default function WouldYouRather() {
  const [idx, setIdx] = useState(0);
  const [choice, setChoice] = useState<0 | 1 | null>(null);

  const next = () => {
    setIdx(i => (i + 1) % QUESTIONS.length);
    setChoice(null);
  };

  const q = QUESTIONS[idx];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Would You Rather...</p>
        <p className="text-sm text-muted-foreground">Question {idx + 1} of {QUESTIONS.length}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {q.map((opt, i) => (
          <button key={i} onClick={() => setChoice(i as 0 | 1)}
            className={`rounded-xl border p-6 text-center text-lg font-semibold transition-colors ${
              choice === i ? "border-primary bg-primary/10 text-primary" :
              choice !== null ? "border-border bg-muted text-muted-foreground opacity-60" :
              "border-border bg-muted text-foreground hover:border-primary hover:bg-primary/5"
            }`}>
            {opt}
          </button>
        ))}
      </div>

      {choice !== null && (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
          <p className="text-sm text-muted-foreground">You chose:</p>
          <p className="text-lg font-bold text-primary">{q[choice]}</p>
        </div>
      )}

      <button onClick={next}
        className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:opacity-90">
        Next Question
      </button>
    </div>
  );
}
