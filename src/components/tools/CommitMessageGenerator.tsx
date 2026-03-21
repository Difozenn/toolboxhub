"use client";
import { useState } from "react";

const TYPES = [
  {type:"feat",emoji:"✨",desc:"New feature"},
  {type:"fix",emoji:"🐛",desc:"Bug fix"},
  {type:"docs",emoji:"📚",desc:"Documentation"},
  {type:"style",emoji:"💅",desc:"Formatting"},
  {type:"refactor",emoji:"♻️",desc:"Code restructure"},
  {type:"perf",emoji:"⚡",desc:"Performance"},
  {type:"test",emoji:"✅",desc:"Tests"},
  {type:"build",emoji:"🔨",desc:"Build system"},
  {type:"ci",emoji:"👷",desc:"CI/CD"},
  {type:"chore",emoji:"🔧",desc:"Maintenance"},
];

export default function CommitMessageGenerator() {
  const [type, setType] = useState("feat");
  const [scope, setScope] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [breaking, setBreaking] = useState("");

  const header = `${type}${scope?`(${scope})`:""}: ${description}`;
  const message = [header, body.trim(), breaking ? `BREAKING CHANGE: ${breaking}` : ""].filter(Boolean).join("\n\n");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {TYPES.map(t => (
          <button key={t.type} onClick={() => setType(t.type)} title={t.desc}
            className={`px-3 py-1.5 rounded-lg text-sm font-mono font-medium transition-colors ${type===t.type?"bg-primary text-primary-foreground":"bg-muted border border-border text-foreground hover:bg-muted/80"}`}>
            {t.emoji} {t.type}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground">Scope (optional)</label>
          <input value={scope} onChange={e=>setScope(e.target.value)} placeholder="auth, api, ui..."
            className="w-full mt-1 p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Breaking change (optional)</label>
          <input value={breaking} onChange={e=>setBreaking(e.target.value)} placeholder="Describe breaking change"
            className="w-full mt-1 p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
      </div>
      <input value={description} onChange={e=>setDescription(e.target.value)} placeholder="Short imperative description (e.g. add OAuth2 login)"
        className="w-full p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
      <textarea value={body} onChange={e=>setBody(e.target.value)} rows={2} placeholder="Optional body..."
        className="w-full p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary" />
      <div className="p-3 rounded-xl bg-muted border border-border font-mono text-sm text-foreground whitespace-pre">
        {message || <span className="text-muted-foreground">Commit message preview...</span>}
      </div>
      <button onClick={() => navigator.clipboard.writeText(message)} disabled={!description}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
        Copy Commit Message
      </button>
    </div>
  );
}
