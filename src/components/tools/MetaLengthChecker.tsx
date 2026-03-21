"use client";

import { useState } from "react";

export default function MetaLengthChecker() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const getStatus = (len: number, min: number, max: number) => {
    if (len === 0) return { label: "Empty", color: "text-muted-foreground", bg: "bg-border" };
    if (len < min) return { label: "Too short", color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-500" };
    if (len > max) return { label: "Too long", color: "text-red-600 dark:text-red-400", bg: "bg-red-500" };
    return { label: "Good", color: "text-green-600 dark:text-green-400", bg: "bg-green-500" };
  };

  const titleStatus = getStatus(title.length, 50, 60);
  const descStatus = getStatus(desc.length, 150, 160);

  const Bar = ({ len, max, bg }: { len: number; max: number; bg: string }) => (
    <div className="h-2 rounded-full bg-border overflow-hidden">
      <div className={`h-full rounded-full transition-all ${bg}`} style={{ width: `${Math.min((len / (max * 1.2)) * 100, 100)}%` }} />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-foreground">Title Tag</label>
          <span className={`text-sm font-semibold ${titleStatus.color}`}>{title.length} / 60 — {titleStatus.label}</span>
        </div>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your page title tag..."
          className="w-full rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        <Bar len={title.length} max={60} bg={titleStatus.bg} />
        <p className="text-xs text-muted-foreground">Recommended: 50–60 characters</p>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-foreground">Meta Description</label>
          <span className={`text-sm font-semibold ${descStatus.color}`}>{desc.length} / 160 — {descStatus.label}</span>
        </div>
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)}
          placeholder="Enter your meta description..."
          className="h-24 w-full resize-none rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        <Bar len={desc.length} max={160} bg={descStatus.bg} />
        <p className="text-xs text-muted-foreground">Recommended: 150–160 characters</p>
      </div>
      {(title || desc) && (
        <div className="rounded-xl border border-border bg-muted p-4 space-y-1">
          <p className="text-xs text-muted-foreground mb-2">SERP Preview:</p>
          <p className="text-blue-600 dark:text-blue-400 font-medium text-sm truncate">{title || "Page Title"}</p>
          <p className="text-xs text-muted-foreground line-clamp-2">{desc || "Meta description will appear here."}</p>
        </div>
      )}
    </div>
  );
}
