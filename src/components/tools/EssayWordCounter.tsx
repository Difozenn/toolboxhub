"use client";

import { useState } from "react";

export default function EssayWordCounter() {
  const [text, setText] = useState("");

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
  const paragraphs = text.split(/\n{2,}/).filter((p) => p.trim().length > 0).length || (text.trim() ? 1 : 0);
  const pages = Math.ceil(words / 250);
  const readingTime = Math.ceil(words / 200);
  const speakingTime = Math.ceil(words / 130);

  const stats = [
    { label: "Words", value: words },
    { label: "Characters", value: chars },
    { label: "Sentences", value: sentences },
    { label: "Paragraphs", value: paragraphs },
    { label: "Est. Pages", value: pages, note: "~250 words/page" },
    { label: "Reading Time", value: `${readingTime} min`, note: "~200 WPM" },
    { label: "Speaking Time", value: `${speakingTime} min`, note: "~130 WPM" },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">Essay / Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your essay or text here..."
          className="h-52 w-full resize-y rounded-xl border border-border bg-muted p-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map(({ label, value, note }) => (
          <div key={label} className="rounded-xl border border-border bg-muted p-3 text-center">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-xl font-bold text-primary">{value}</p>
            {note && <p className="text-xs text-muted-foreground">{note}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
