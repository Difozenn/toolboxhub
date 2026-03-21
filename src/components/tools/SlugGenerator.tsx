"use client";

import { useState } from "react";

export default function SlugGeneratorSeo() {
  const [input, setInput] = useState("");
  const [maxLength, setMaxLength] = useState(60);
  const [copied, setCopied] = useState(false);

  const slug = input
    .toLowerCase()
    .replace(/[àáâãäå]/g, "a").replace(/[èéêë]/g, "e").replace(/[ìíîï]/g, "i")
    .replace(/[òóôõö]/g, "o").replace(/[ùúûü]/g, "u").replace(/[ñ]/g, "n")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, maxLength)
    .replace(/-$/, "");

  const copy = async () => {
    await navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">Input Text</label>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. 10 Best Ways to Grow Your Business in 2025!"
          className="w-full rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-muted-foreground">Max length:</label>
        <input type="number" min={10} max={200} value={maxLength} onChange={(e) => setMaxLength(Number(e.target.value))}
          className="w-20 rounded-lg border border-border bg-muted px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none" />
        <span className="text-xs text-muted-foreground">(recommended: 50-75)</span>
      </div>
      {slug && (
        <div className="rounded-xl border border-border bg-muted p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground mb-1">Generated Slug ({slug.length} chars)</p>
              <p className="font-mono text-foreground break-all">{slug}</p>
            </div>
            <button onClick={copy} className="shrink-0 rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white">
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
      <div className="rounded-xl border border-border bg-muted p-3 text-xs text-muted-foreground space-y-1">
        <p className="font-semibold">SEO Tips for Slugs:</p>
        <ul className="list-disc list-inside space-y-0.5">
          <li>Keep under 75 characters</li>
          <li>Use hyphens (not underscores)</li>
          <li>Include target keywords near the start</li>
          <li>Avoid stop words (a, the, is, etc.)</li>
        </ul>
      </div>
    </div>
  );
}
