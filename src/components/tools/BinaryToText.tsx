"use client";
import { useState } from "react";

function binToText(bin: string): string {
  const clean = bin.replace(/[^01]/g, "");
  if (clean.length % 8 !== 0) return "[invalid: must be multiple of 8 bits]";
  let result = "";
  for (let i = 0; i < clean.length; i += 8) {
    result += String.fromCharCode(parseInt(clean.slice(i, i + 8), 2));
  }
  return result;
}

function textToBin(text: string): string {
  return text.split("").map(c => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");
}

export default function BinaryToText() {
  const [mode, setMode] = useState<"decode"|"encode">("decode");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const output = input.trim() ? (mode === "decode" ? binToText(input) : textToBin(input)) : "";
  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1200); };
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["decode","encode"] as const).map(m => (
          <button key={m} onClick={() => { setMode(m); setInput(""); }}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${mode===m?"bg-primary text-primary-foreground":"bg-muted border border-border text-foreground hover:bg-muted/80"}`}>
            {m === "decode" ? "Binary → Text" : "Text → Binary"}
          </button>
        ))}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">{mode === "decode" ? "Binary Input" : "Text Input"}</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={4}
          placeholder={mode === "decode" ? "01001000 01101001" : "Type text here..."}
          className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground font-mono placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>
      {output && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-foreground">Result</label>
            <button onClick={copy} className="text-xs text-primary hover:underline">{copied ? "Copied!" : "Copy"}</button>
          </div>
          <pre className="w-full rounded-lg border border-border bg-muted px-3 py-3 text-sm text-foreground font-mono whitespace-pre-wrap break-all">{output}</pre>
        </div>
      )}
    </div>
  );
}
