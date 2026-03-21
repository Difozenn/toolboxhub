"use client";

import { useState } from "react";

const CLICHES = [
  "at the end of the day","think outside the box","it is what it is","game changer","low hanging fruit",
  "move the needle","circle back","take it to the next level","hit the ground running","paradigm shift",
  "burning the midnight oil","bite the bullet","the ball is in your court","on the same page","touch base",
  "at the end of the tunnel","bend over backwards","cold turkey","cost an arm and a leg","cut corners",
  "give it 110 percent","go the extra mile","hang in there","in the blink of an eye","kick the bucket",
  "miss the boat","no pain no gain","par for the course","the tip of the iceberg","under the weather",
];

export default function ClicheChecker() {
  const [text, setText] = useState("");

  const lower = text.toLowerCase();
  const found = CLICHES.filter((c) => lower.includes(c));

  const highlighted = text
    ? CLICHES.reduce((acc, cliche) => {
        const re = new RegExp(cliche.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
        return acc.replace(re, (m) => `<mark class="bg-orange-300/60 dark:bg-orange-600/40 rounded px-0.5 font-medium">${m}</mark>`);
      }, text)
    : "";

  return (
    <div className="space-y-6">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste your text to find clichés..."
        className="h-40 w-full resize-y rounded-xl border border-border bg-muted p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />

      {text.trim() && (
        <>
          <div className="flex items-center gap-4 rounded-xl border border-border bg-muted p-4">
            <span className={`text-3xl font-bold ${found.length > 0 ? "text-orange-500" : "text-green-500"}`}>{found.length}</span>
            <div>
              <p className="text-sm font-medium text-foreground">{found.length === 0 ? "No clichés found!" : `Cliché${found.length > 1 ? "s" : ""} detected`}</p>
              <p className="text-xs text-muted-foreground">out of {CLICHES.length} checked</p>
            </div>
          </div>

          {found.length > 0 && (
            <>
              <div className="rounded-xl border border-border bg-muted p-4">
                <p className="text-xs font-semibold text-muted-foreground mb-2">Highlighted text</p>
                <div className="text-sm text-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: highlighted }} />
              </div>
              <div className="flex flex-wrap gap-2">
                {found.map((c) => <span key={c} className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-600 dark:text-orange-400">{c}</span>)}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
