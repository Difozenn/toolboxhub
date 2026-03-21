"use client";

import { useState } from "react";

const PLATFORMS = [
  { name: "Twitter / X", limit: 280 },
  { name: "Instagram Caption", limit: 2200 },
  { name: "Instagram Bio", limit: 150 },
  { name: "Facebook", limit: 63206 },
  { name: "LinkedIn", limit: 3000 },
  { name: "TikTok", limit: 2200 },
  { name: "YouTube Title", limit: 100 },
  { name: "YouTube Description", limit: 5000 },
];

export default function CharacterCounter() {
  const [text, setText] = useState("");
  const count = text.length;

  return (
    <div className="space-y-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here..."
        className="h-36 w-full resize-y rounded-xl border border-border bg-muted p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <div className="rounded-xl border border-border bg-muted p-2 text-center">
        <span className="text-3xl font-bold text-primary">{count.toLocaleString()}</span>
        <span className="text-sm text-muted-foreground ml-2">characters</span>
      </div>
      <div className="space-y-3">
        {PLATFORMS.map(({ name, limit }) => {
          const pct = Math.min((count / limit) * 100, 100);
          const over = count > limit;
          return (
            <div key={name} className="rounded-lg border border-border bg-muted p-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-foreground">{name}</span>
                <span className={`text-sm font-mono ${over ? "text-red-500" : "text-muted-foreground"}`}>
                  {count.toLocaleString()} / {limit.toLocaleString()}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-border overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${over ? "bg-red-500" : pct > 80 ? "bg-yellow-500" : "bg-primary"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
