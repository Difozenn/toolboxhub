"use client";

import { useState } from "react";

const LIMIT = 2200;

export default function TiktokCharacterCounter() {
  const [text, setText] = useState("");

  const count = text.length;
  const hashtagCount = (text.match(/#\w+/g) || []).length;
  const pct = Math.min((count / LIMIT) * 100, 100);
  const remaining = LIMIT - count;
  const over = count > LIMIT;

  return (
    <div className="space-y-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your TikTok caption here..."
        className="h-40 w-full resize-y rounded-xl border border-border bg-muted p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />

      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-3xl font-bold text-primary">{count.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">characters used</p>
          </div>
          <div className="text-right">
            <p className={`text-2xl font-bold ${over ? "text-red-500" : "text-foreground"}`}>
              {over ? `${(count - LIMIT).toLocaleString()} over` : remaining.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">{over ? "limit exceeded" : "remaining"}</p>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0</span><span>{LIMIT.toLocaleString()}</span>
          </div>
          <div className="h-3 w-full rounded-full bg-border overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-300 ${over ? "bg-red-500" : pct > 80 ? "bg-yellow-500" : "bg-primary"}`}
              style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
          <span className="text-sm text-foreground">Hashtags used</span>
          <span className={`text-lg font-bold ${hashtagCount > 30 ? "text-red-500" : "text-primary"}`}>{hashtagCount}</span>
        </div>
        {hashtagCount > 30 && <p className="text-xs text-red-500">TikTok recommends using fewer than 30 hashtags for best reach.</p>}
      </div>
    </div>
  );
}
