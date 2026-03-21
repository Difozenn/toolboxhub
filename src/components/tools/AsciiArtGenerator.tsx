"use client";
import { useState } from "react";
const CHARS: Record<string, string[]> = {
  A: [" _ ", "/ \\", "\\_/", "| |", "|_|"],
  B: ["| \\", "| \\", "|_/", "| \\", "|_/"],
  C: [" _", "/ ", "|  ", "\\ ", " _/"],
  default: ["   ", " _ ", "|_|", "| |", "|_|"],
};
function textToAscii(text: string): string {
  const rows = 5;
  const lines: string[] = Array(rows).fill("");
  for (const ch of text.toUpperCase()) {
    const art = CHARS[ch] || [" _ ", "| |", "|_|", "| |", "|_|"];
    const pad = Math.max(...art.map(r => r.length));
    for (let i = 0; i < rows; i++) lines[i] += (art[i] || "").padEnd(pad + 1, " ");
  }
  return lines.join("\n");
}
const BLOCK_CHARS: Record<string, string> = { A: "A", B: "B", C: "C", D: "D", E: "E", F: "F", G: "G", H: "H", I: "I", J: "J", K: "K", L: "L", M: "M", N: "N", O: "O", P: "P", Q: "Q", R: "R", S: "S", T: "T", U: "U", V: "V", W: "W", X: "X", Y: "Y", Z: "Z", " ": "   " };
function textToBlock(text: string, char = "#"): string {
  return text.toUpperCase().split("").map(c => {
    if (c === " ") return "   ";
    return char.repeat(3);
  }).join(" ");
}
export default function AsciiArtGenerator() {
  const [text, setText] = useState("HELLO");
  const [style, setStyle] = useState<"block" | "banner">("banner");
  const [fillChar, setFillChar] = useState("#");
  const output = style === "banner" ? textToAscii(text) : textToBlock(text, fillChar);
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-2"><label className="mb-1.5 block text-sm font-medium text-foreground">Text</label><input value={text} onChange={e => setText(e.target.value)} maxLength={20} className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Style</label><select value={style} onChange={e => setStyle(e.target.value as "block"|"banner")} className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"><option value="banner">Banner</option><option value="block">Block</option></select></div>
      </div>
      {style === "block" && <div><label className="mb-1.5 block text-sm font-medium text-foreground">Fill Character</label><input value={fillChar} onChange={e => setFillChar(e.target.value.slice(-1) || "#")} maxLength={1} className="w-20 rounded-lg border border-border bg-muted px-4 py-2 text-center font-mono text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">ASCII Art Output</label>
          <button onClick={() => navigator.clipboard.writeText(output)} className="text-xs text-muted-foreground hover:text-foreground">Copy</button>
        </div>
        <pre className="overflow-auto rounded-lg border border-border bg-muted p-4 font-mono text-sm text-foreground">{output}</pre>
      </div>
    </div>
  );
}
