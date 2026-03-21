"use client";

import { useState } from "react";

const ADVERBS = [
  "quickly","slowly","very","really","actually","basically","literally",
  "definitely","absolutely","certainly","obviously","clearly","suddenly",
  "extremely","highly","totally","completely","entirely","simply","just",
  "quite","rather","fairly","pretty","nearly","almost","always","never",
  "usually","often","sometimes","rarely","hardly","barely","merely",
  "deeply","strongly","greatly","easily","freely","naturally","perfectly",
];

export default function AdverbChecker() {
  const [text, setText] = useState("");

  const words = text.match(/\b\w+\b/g) || [];
  const found = words.filter((w) => ADVERBS.includes(w.toLowerCase()));
  const unique = [...new Set(found.map((w) => w.toLowerCase()))];
  const pct = words.length > 0 ? Math.round((found.length / words.length) * 100) : 0;

  const highlighted = text.replace(/\b(\w+)\b/g, (match) =>
    ADVERBS.includes(match.toLowerCase())
      ? `<mark class="bg-yellow-200 dark:bg-yellow-800 rounded px-0.5">${match}</mark>`
      : match
  );

  return (
    <div className="space-y-5">
      <textarea value={text} onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here to detect adverbs..."
        className="h-40 w-full resize-y rounded-xl border border-border bg-muted p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Adverbs Found", value: found.length, color: found.length === 0 ? "text-green-500" : "text-yellow-500" },
          { label: "Unique Adverbs", value: unique.length, color: "text-foreground" },
          { label: "Adverb %", value: `${pct}%`, color: pct > 10 ? "text-red-500" : "text-green-500" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {text.trim() && (
        <div className="rounded-xl border border-border bg-muted p-4">
          <p className="text-sm font-medium text-foreground mb-3">Highlighted Text</p>
          <div className="text-sm text-foreground leading-7"
            dangerouslySetInnerHTML={{ __html: highlighted || "<span class='text-muted-foreground'>Start typing above...</span>" }} />
        </div>
      )}

      {unique.length > 0 && (
        <div className="rounded-xl border border-border bg-muted p-4">
          <p className="text-sm font-medium text-foreground mb-2">Adverbs Detected</p>
          <div className="flex flex-wrap gap-2">
            {unique.map((w) => (
              <span key={w} className="rounded-full bg-yellow-100 dark:bg-yellow-900 px-3 py-1 text-xs font-medium text-yellow-800 dark:text-yellow-200">
                {w}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
