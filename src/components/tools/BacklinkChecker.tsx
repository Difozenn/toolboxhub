"use client";

import { useState } from "react";

export default function BacklinkChecker() {
  const [url, setUrl] = useState("");
  const [parsed, setParsed] = useState<{ hostname: string; path: string; protocol: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = () => {
    try {
      const u = new URL(url.startsWith("http") ? url : "https://" + url);
      setParsed({ hostname: u.hostname, path: u.pathname, protocol: u.protocol });
      setError(null);
    } catch {
      setError("Please enter a valid URL");
      setParsed(null);
    }
  };

  const TOOLS = [
    { name: "Ahrefs", url: "https://ahrefs.com/backlink-checker", desc: "Industry standard — shows DR, referring domains, top backlinks" },
    { name: "Moz Link Explorer", url: "https://moz.com/link-explorer", desc: "Free up to 10 queries/month — shows DA, PA, spam score" },
    { name: "SEMrush Backlink Analytics", url: "https://www.semrush.com/analytics/backlinks/", desc: "Comprehensive backlink data with competitive analysis" },
    { name: "Majestic SEO", url: "https://majestic.com", desc: "Trust Flow and Citation Flow metrics" },
    { name: "Google Search Console", url: "https://search.google.com/search-console", desc: "Free — shows actual backlinks Google has found (for your own site)" },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300">
        Backlink checking requires server-side indexing databases. This tool provides URL analysis and links to professional backlink tools.
      </div>
      <div className="flex gap-2">
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && analyze()}
          placeholder="https://example.com"
          className="flex-1 rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        <button onClick={analyze} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Analyze</button>
      </div>
      {error && <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">{error}</div>}
      {parsed && (
        <div className="rounded-xl border border-border bg-muted p-4 space-y-2 text-sm">
          <p className="font-semibold text-foreground">{parsed.hostname}</p>
          <p className="text-muted-foreground">Protocol: {parsed.protocol} | Path: {parsed.path}</p>
        </div>
      )}
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Recommended Backlink Tools:</p>
        {TOOLS.map((t) => (
          <a key={t.name} href={t.url} target="_blank" rel="noopener noreferrer"
            className="flex items-start gap-3 rounded-xl border border-border bg-muted p-3 hover:border-primary transition-colors">
            <div className="flex-1">
              <p className="text-sm font-semibold text-primary">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.desc}</p>
            </div>
            <span className="text-xs text-muted-foreground shrink-0">Visit</span>
          </a>
        ))}
      </div>
    </div>
  );
}
