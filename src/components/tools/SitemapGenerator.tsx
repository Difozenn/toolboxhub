"use client";

import { useState } from "react";

export default function SitemapGenerator() {
  const [urls, setUrls] = useState("");
  const [changefreq, setChangefreq] = useState("weekly");
  const [priority, setPriority] = useState("0.8");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const urlList = urls.split("\n").map((u) => u.trim()).filter(Boolean);
    if (urlList.length === 0) return;
    const today = new Date().toISOString().slice(0, 10);
    const urlEntries = urlList.map((url) => `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join("\n");
    setOutput(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>`);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">URLs (one per line)</label>
        <textarea value={urls} onChange={(e) => setUrls(e.target.value)}
          placeholder={"https://example.com/\nhttps://example.com/about\nhttps://example.com/contact"}
          className="h-36 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Change Frequency</label>
          <select value={changefreq} onChange={(e) => setChangefreq(e.target.value)}
            className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none">
            {["always","hourly","daily","weekly","monthly","yearly","never"].map((v) => <option key={v}>{v}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Priority</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}
            className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none">
            {["1.0","0.9","0.8","0.7","0.6","0.5","0.4","0.3","0.2","0.1"].map((v) => <option key={v}>{v}</option>)}
          </select>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={generate} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Generate Sitemap</button>
        {output && <button onClick={copy} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">{copied ? "Copied!" : "Copy XML"}</button>}
      </div>
      {output && (
        <textarea readOnly value={output}
          className="h-64 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-xs text-foreground focus:outline-none" />
      )}
    </div>
  );
}
