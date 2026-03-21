"use client";

import { useState } from "react";

const TRUTHS = [
  "What is your biggest fear?", "What is the most embarrassing thing that's happened to you?",
  "Have you ever cheated on a test?", "What's the biggest lie you've ever told?",
  "Who was your first crush?", "What is your biggest regret?",
  "Have you ever stolen something?", "What's the weirdest dream you've had?",
  "What's the most childish thing you still do?", "What's a secret you've never told anyone?",
  "Have you ever blamed someone else for your mistake?", "What is your most annoying habit?",
  "What's the worst gift you've ever received?", "Have you ever stood someone up?",
  "What's the most embarrassing song on your playlist?", "Have you ever ghosted someone?",
  "What's a bad habit you can't quit?", "What's the silliest thing you're afraid of?",
  "Have you ever pretended to be sick to avoid something?", "What's your most irrational fear?",
];

const DARES = [
  "Do your best impression of a celebrity.", "Speak in an accent for the next 3 rounds.",
  "Do 10 jumping jacks right now.", "Sing the chorus of your favorite song.",
  "Let someone post a status on your behalf.", "Talk without closing your mouth for 1 minute.",
  "Do your best robot dance.", "Say the alphabet backwards.",
  "Hold a plank for 30 seconds.", "Tell a joke — if no one laughs, do another.",
  "Describe yourself using only animal sounds.", "Moonwalk across the room.",
  "Make up a rap about the person to your left.", "Do your best impression of a baby.",
  "Let someone draw a mustache on your face.", "Try to lick your elbow.",
  "Speak in rhymes for the next 2 minutes.", "Do your funniest walk around the room.",
  "Make a funny face and hold it for 30 seconds.", "Call a random contact and sing Happy Birthday.",
];

export default function TruthOrDare() {
  const [mode, setMode] = useState<"truth" | "dare">("truth");
  const [item, setItem] = useState<string | null>(null);

  const pick = () => {
    const list = mode === "truth" ? TRUTHS : DARES;
    setItem(list[Math.floor(Math.random() * list.length)]);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        <div className="flex gap-2">
          {(["truth", "dare"] as const).map(m => (
            <button key={m} onClick={() => { setMode(m); setItem(null); }}
              className={`flex-1 rounded-lg py-2.5 text-sm font-semibold capitalize transition-colors ${
                mode === m ? "bg-primary text-white" : "border border-border bg-background text-foreground hover:bg-primary/10"
              }`}>
              {m}
            </button>
          ))}
        </div>
        <button onClick={pick}
          className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:opacity-90">
          Random {mode === "truth" ? "Truth" : "Dare"}
        </button>
      </div>

      {item ? (
        <div className={`rounded-xl border p-8 text-center ${mode === "truth" ? "border-primary/30 bg-primary/5" : "border-orange-500/30 bg-orange-500/5"}`}>
          <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${mode === "truth" ? "text-primary" : "text-orange-500"}`}>{mode}</p>
          <p className="text-xl font-semibold text-foreground">{item}</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-muted p-10 text-center">
          <p className="text-muted-foreground">Choose Truth or Dare then click the button!</p>
        </div>
      )}
    </div>
  );
}
