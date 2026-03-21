"use client";

import { useState } from "react";

const SUFFIXES = ["ify","ly","hub","io","wise","ai","lab","hq","app","co","zone","nest","forge","works","pro"];
const PREFIXES = ["Smart","Fast","Quick","Simple","Easy","Prime","Pure","True","Bold","Clear"];
const COMPOUNDS = ["Tech","Link","Flow","Drive","Core","Base","Pulse","Edge","Spark","Peak"];

export default function BusinessNameGenerator() {
  const [keyword, setKeyword] = useState("");
  const [names, setNames] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const generate = () => {
    if (!keyword.trim()) return;
    const kw = keyword.trim();
    const cap = kw.charAt(0).toUpperCase() + kw.slice(1).toLowerCase();
    const suggestions = new Set<string>();
    SUFFIXES.forEach((s) => suggestions.add(cap + s));
    PREFIXES.slice(0, 5).forEach((p) => suggestions.add(p + cap));
    COMPOUNDS.slice(0, 5).forEach((c) => suggestions.add(cap + c));
    suggestions.add(cap + "360");
    suggestions.add(cap + "Pro");
    suggestions.add("The" + cap + "Co");
    suggestions.add(cap + "HQ");
    setNames([...suggestions].slice(0, 15));
  };

  const copy = async (name: string) => {
    await navigator.clipboard.writeText(name);
    setCopied(name);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && generate()}
          placeholder="Enter industry keyword (e.g. coffee, design, legal)"
          className="flex-1 rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        <button onClick={generate} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Generate</button>
      </div>
      {names.length > 0 && (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {names.map((name) => (
            <div key={name} className="flex items-center justify-between rounded-xl border border-border bg-muted px-4 py-3 hover:border-primary transition-colors">
              <span className="font-semibold text-foreground">{name}</span>
              <button onClick={() => copy(name)} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                {copied === name ? "Copied!" : "Copy"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
