"use client";
import { useState } from "react";

const CATEGORIES = ["Added","Changed","Deprecated","Removed","Fixed","Security"] as const;
type Category = typeof CATEGORIES[number];

export default function ChangelogGenerator() {
  const [version, setVersion] = useState("1.0.0");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [entries, setEntries] = useState<{cat: Category; text: string}[]>([{cat:"Added",text:""}]);
  const [output, setOutput] = useState("");

  function addEntry() { setEntries([...entries,{cat:"Added",text:""}]); }
  function updateEntry(i: number, key: "cat"|"text", val: string) {
    const next = [...entries];
    next[i] = {...next[i], [key]: val as Category};
    setEntries(next);
  }

  function generate() {
    const grouped: Partial<Record<Category, string[]>> = {};
    for (const {cat,text} of entries) {
      if (text.trim()) (grouped[cat] = grouped[cat] ?? []).push(text.trim());
    }
    let md = `## [${version}] — ${date}\n`;
    for (const cat of CATEGORIES) {
      if (grouped[cat]?.length) {
        md += `\n### ${cat}\n${grouped[cat]!.map(l=>`- ${l}`).join("\n")}\n`;
      }
    }
    setOutput(md);
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground">Version</label>
          <input value={version} onChange={e=>setVersion(e.target.value)} placeholder="1.0.0"
            className="w-full mt-1 p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Date</label>
          <input type="date" value={date} onChange={e=>setDate(e.target.value)}
            className="w-full mt-1 p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
      </div>
      <div className="space-y-2">
        {entries.map((e,i) => (
          <div key={i} className="flex gap-2">
            <select value={e.cat} onChange={ev=>updateEntry(i,"cat",ev.target.value)}
              className="px-2 py-2 rounded-lg border border-border bg-muted text-foreground text-sm focus:outline-none shrink-0">
              {CATEGORIES.map(c=><option key={c}>{c}</option>)}
            </select>
            <input value={e.text} onChange={ev=>updateEntry(i,"text",ev.target.value)} placeholder="Describe the change..."
              className="flex-1 p-2 rounded-lg border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
            <button onClick={()=>setEntries(entries.filter((_,j)=>j!==i))} className="px-2 py-1 rounded-lg bg-muted border border-border text-muted-foreground text-sm">✕</button>
          </div>
        ))}
        <button onClick={addEntry} className="text-sm text-primary hover:underline">+ Add entry</button>
      </div>
      <button onClick={generate} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
        Generate Changelog
      </button>
      {output && (
        <div className="relative">
          <pre className="p-3 rounded-xl bg-muted border border-border text-foreground font-mono text-sm whitespace-pre">{output}</pre>
          <button onClick={() => navigator.clipboard.writeText(output)}
            className="absolute top-2 right-2 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium">Copy</button>
        </div>
      )}
    </div>
  );
}
