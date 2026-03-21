"use client";
import { useState } from "react";

function escapeJson(text: string): string {
  return JSON.stringify(text).slice(1, -1);
}

function unescapeJson(text: string): string {
  try { return JSON.parse(`"${text}"`); } catch { return "Invalid JSON string — check for unmatched escape sequences"; }
}

export default function TextToJsonString() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"escape"|"unescape">("escape");
  const output = mode === "escape" ? escapeJson(input) : unescapeJson(input);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["escape","unescape"] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${mode===m?"bg-primary text-primary-foreground":"bg-muted text-foreground hover:bg-muted/80"}`}>
            {m === "escape" ? "Escape → JSON" : "Unescape ← JSON"}
          </button>
        ))}
      </div>
      <textarea value={input} onChange={e=>setInput(e.target.value)} rows={5}
        placeholder={mode==="escape"?'Enter plain text (e.g. Hello "World"\\nLine 2)':'Enter escaped JSON string value...'}
        className="w-full p-3 rounded-xl border border-border bg-muted text-foreground font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary" />
      <div className="p-3 rounded-xl bg-muted border border-border min-h-[80px] font-mono text-sm text-foreground break-all whitespace-pre-wrap">
        {output || <span className="text-muted-foreground">Output appears here...</span>}
      </div>
      <button onClick={() => navigator.clipboard.writeText(output)} disabled={!output}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
        Copy Result
      </button>
    </div>
  );
}
