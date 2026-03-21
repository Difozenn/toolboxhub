"use client";

import { useState } from "react";

const TEMPLATES = [
  (t: string) => `How to ${t} in 5 Easy Steps`,
  (t: string) => `The Ultimate Guide to ${t}`,
  (t: string) => `10 ${t} Tips That Actually Work`,
  (t: string) => `Why ${t} Matters More Than You Think`,
  (t: string) => `The Beginner's Guide to ${t}`,
  (t: string) => `7 Secrets to Mastering ${t}`,
  (t: string) => `${t}: Everything You Need to Know`,
  (t: string) => `The Complete ${t} Checklist`,
  (t: string) => `5 Common ${t} Mistakes and How to Avoid Them`,
  (t: string) => `How I Learned ${t} in 30 Days`,
  (t: string) => `The Truth About ${t} Nobody Tells You`,
  (t: string) => `${t} for Beginners: A Step-by-Step Guide`,
  (t: string) => `Top 15 ${t} Strategies for 2024`,
  (t: string) => `What Nobody Tells You About ${t}`,
  (t: string) => `Master ${t}: Proven Methods That Work`,
];

export default function TitleGenerator() {
  const [topic, setTopic] = useState("");
  const [titles, setTitles] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const generate = () => {
    if (!topic.trim()) return;
    setTitles(TEMPLATES.map((fn) => fn(topic.trim())));
  };

  const copy = async (title: string, i: number) => {
    await navigator.clipboard.writeText(title);
    setCopied(i);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5 space-y-3">
        <label className="block text-sm font-medium text-foreground">Topic / Keyword</label>
        <div className="flex gap-2">
          <input value={topic} onChange={(e) => setTopic(e.target.value)} onKeyDown={(e) => e.key === "Enter" && generate()}
            placeholder="e.g. SEO, email marketing, productivity..."
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          <button onClick={generate} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors">Generate</button>
        </div>
      </div>

      {titles.length > 0 && (
        <div className="space-y-2">
          {titles.map((title, i) => (
            <div key={i} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted p-3">
              <p className="text-sm text-foreground flex-1">{title}</p>
              <button onClick={() => copy(title, i)} className="shrink-0 rounded-lg border border-border bg-background px-3 py-1 text-xs font-medium text-foreground hover:bg-primary hover:text-white transition-colors">
                {copied === i ? "Copied!" : "Copy"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
