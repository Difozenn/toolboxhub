"use client";
import { useState } from "react";

const FONTS: Record<string, Record<string,string[]>> = {
  Block: {
    A:["  A  "," A A ","AAAAA","A   A","A   A"],
    B:["BBBB ","B   B","BBBB ","B   B","BBBB "],
    C:[" CCCC","C    ","C    ","C    "," CCCC"],
  }
};

function toBanner(text: string): string {
  const rows = ["","","","",""];
  for (const ch of text.toUpperCase()) {
    const cols = FONTS.Block[ch] ?? ["  ","  ","  ","  ","  "];
    for (let r=0;r<5;r++) rows[r] += (cols[r]??"     ") + " ";
  }
  return rows.join("\n");
}

export default function TextToAscii() {
  const [input, setInput] = useState("HELLO");
  const [font, setFont] = useState("Block");
  const output = font === "Block" ? toBanner(input) : `=== ${input.toUpperCase()} ===\n${"*".repeat(input.length+8)}`;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <input value={input} onChange={e=>setInput(e.target.value.slice(0,20))} maxLength={20}
          placeholder="Enter text (max 20 chars)"
          className="flex-1 p-3 rounded-xl border border-border bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
        <select value={font} onChange={e=>setFont(e.target.value)}
          className="px-3 py-2 rounded-xl border border-border bg-muted text-foreground focus:outline-none">
          {["Block","Banner","Simple"].map(f=><option key={f}>{f}</option>)}
        </select>
      </div>
      <div className="p-4 rounded-xl bg-muted border border-border overflow-x-auto">
        <pre className="font-mono text-sm text-foreground whitespace-pre">{output || "Type something above..."}</pre>
      </div>
      <button onClick={() => navigator.clipboard.writeText(output)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
        Copy ASCII Art
      </button>
    </div>
  );
}
