"use client";
import { useState } from "react";

const namedEntities: Record<string, string> = {
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  "\u00A9": "&copy;", "\u00AE": "&reg;", "\u2122": "&trade;",
  "\u00A3": "&pound;", "\u00A5": "&yen;", "\u20AC": "&euro;",
};
const reverseEntities: Record<string, string> = {};
for (const [k, v] of Object.entries(namedEntities)) reverseEntities[v] = k;

function encode(text: string): string {
  return text.replace(/[&<>"'\u00A0-\uFFFF]/g, (ch) => {
    if (namedEntities[ch]) return namedEntities[ch];
    return `&#${ch.charCodeAt(0)};`;
  });
}

function decode(text: string): string {
  return text.replace(/&[#a-zA-Z0-9]+;/g, (entity) => {
    if (reverseEntities[entity]) return reverseEntities[entity];
    const m = entity.match(/^&#(\d+);$/);
    if (m) return String.fromCharCode(parseInt(m[1], 10));
    const mx = entity.match(/^&#x([0-9a-fA-F]+);$/);
    if (mx) return String.fromCharCode(parseInt(mx[1], 16));
    return entity;
  });
}

export default function HtmlEntityEncoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1200); };

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">Input</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={5} placeholder="Enter text or HTML entities..."
          className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground font-mono placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>
      <div className="flex gap-2">
        <button onClick={() => setOutput(encode(input))} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">Encode</button>
        <button onClick={() => setOutput(decode(input))} className="rounded-lg border border-border bg-muted px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/80">Decode</button>
      </div>
      {output && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-foreground">Result</label>
            <button onClick={copy} className="text-xs text-primary hover:underline">{copied ? "Copied!" : "Copy"}</button>
          </div>
          <pre className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground font-mono whitespace-pre-wrap break-all">{output}</pre>
        </div>
      )}
    </div>
  );
}
