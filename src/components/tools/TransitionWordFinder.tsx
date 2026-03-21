"use client";

import { useState } from "react";

const TRANSITIONS = [
  "however","therefore","moreover","furthermore","additionally","consequently","nevertheless","nonetheless",
  "meanwhile","subsequently","accordingly","alternatively","conversely","likewise","similarly","in contrast",
  "on the other hand","in addition","as a result","for example","for instance","in fact","in conclusion",
  "to summarize","in summary","first","second","third","finally","lastly","next","then","also","besides",
  "hence","thus","yet","still","although","despite","regardless","undoubtedly","certainly","clearly",
];

export default function TransitionWordFinder() {
  const [text, setText] = useState("");

  const lower = text.toLowerCase();
  const found = TRANSITIONS.filter((t) => lower.includes(t));
  const sentences = (text.match(/[^.!?]+[.!?]+/g) || []).length;
  const withTransitions = TRANSITIONS.reduce((acc, t) => {
    const re = new RegExp(`\\b${t}\\b`, "gi");
    return acc + (text.match(re)?.length || 0);
  }, 0);
  const pct = sentences > 0 ? Math.round((Math.min(withTransitions, sentences) / sentences) * 100) : 0;

  const highlighted = TRANSITIONS.reduce((acc, t) => {
    const re = new RegExp(`\\b(${t})\\b`, "gi");
    return acc.replace(re, `<mark class="bg-primary/20 rounded px-0.5 font-semibold text-primary">$1</mark>`);
  }, text);

  return (
    <div className="space-y-6">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste your text to find transition words..."
        className="h-40 w-full resize-y rounded-xl border border-border bg-muted p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />

      {text.trim() && (
        <>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-2xl font-bold text-primary">{found.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Unique transitions</p>
            </div>
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{withTransitions}</p>
              <p className="text-xs text-muted-foreground mt-1">Total uses</p>
            </div>
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className={`text-2xl font-bold ${pct >= 30 ? "text-green-500" : "text-yellow-500"}`}>{pct}%</p>
              <p className="text-xs text-muted-foreground mt-1">Sentences w/ transitions</p>
            </div>
          </div>
          {highlighted && (
            <div className="rounded-xl border border-border bg-muted p-4">
              <p className="text-xs font-semibold text-muted-foreground mb-2">Highlighted transitions</p>
              <div className="text-sm text-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: highlighted }} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
