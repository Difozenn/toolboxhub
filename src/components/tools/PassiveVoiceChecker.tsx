"use client";

import { useState } from "react";

const PASSIVE_PATTERN = /\b(was|were|been|being|is|are|am)\s+(\w+ed|built|done|found|given|gone|had|known|made|put|said|seen|sent|set|shown|told|taken|thought|written|broken|chosen|driven|eaten|fallen|forgotten|frozen|gotten|hidden|kept|led|left|lost|meant|met|paid|proved|risen|run|shut|slept|spent|stood|taught|thrown|understood|won)\b/gi;

export default function PassiveVoiceChecker() {
  const [text, setText] = useState("");

  const matches: Array<{ match: string; index: number }> = [];
  let m: RegExpExecArray | null;
  const re = new RegExp(PASSIVE_PATTERN.source, "gi");
  while ((m = re.exec(text)) !== null) {
    matches.push({ match: m[0], index: m.index });
  }

  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  const pct = sentences.length > 0 ? Math.round((matches.length / sentences.length) * 100) : 0;

  const highlighted = text ? text.replace(new RegExp(PASSIVE_PATTERN.source, "gi"), (match) =>
    `<mark class="bg-yellow-300/60 dark:bg-yellow-600/40 rounded px-0.5">${match}</mark>`) : "";

  return (
    <div className="space-y-6">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste your text to check for passive voice..."
        className="h-40 w-full resize-y rounded-xl border border-border bg-muted p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />

      {text.trim() && (
        <>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-2xl font-bold text-primary">{matches.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Passive instances</p>
            </div>
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{sentences.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Sentences</p>
            </div>
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className={`text-2xl font-bold ${pct > 20 ? "text-red-500" : "text-green-500"}`}>{pct}%</p>
              <p className="text-xs text-muted-foreground mt-1">Passive rate</p>
            </div>
          </div>
          {highlighted && (
            <div className="rounded-xl border border-border bg-muted p-4">
              <p className="text-xs font-semibold text-muted-foreground mb-2">Highlighted passive constructions</p>
              <div className="text-sm text-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: highlighted }} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
