"use client";
import { useState } from "react";

function addStrikethrough(text: string): string {
  return text.split("").map(c => c === " " ? c : c + "\u0336").join("");
}

export default function StrikethroughText() {
  const [input, setInput] = useState("");
  const output = addStrikethrough(input);

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e=>setInput(e.target.value)} rows={4}
        placeholder="Enter text to add strikethrough..."
        className="w-full p-3 rounded-xl border border-border bg-muted text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary" />
      <div className="rounded-xl bg-muted border border-border p-3 min-h-[60px]">
        <p className="text-foreground break-all text-base whitespace-pre-wrap">
          {output || <span className="text-muted-foreground text-sm">S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶ preview here...</span>}
        </p>
      </div>
      <div className="flex gap-2">
        <button onClick={() => navigator.clipboard.writeText(output)} disabled={!output}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
          Copy Result
        </button>
        <button onClick={() => setInput("")}
          className="px-4 py-2 rounded-lg bg-muted border border-border text-foreground text-sm font-medium hover:bg-muted/80 transition-colors">
          Clear
        </button>
      </div>
    </div>
  );
}
