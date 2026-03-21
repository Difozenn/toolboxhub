"use client";

import { useState } from "react";

export default function TextTruncator() {
  const [input, setInput] = useState("");
  const [limit, setLimit] = useState(100);
  const [mode, setMode] = useState<"characters" | "words">("characters");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const truncate = () => {
    if (mode === "characters") {
      if (input.length <= limit) { setOutput(input); return; }
      setOutput(input.slice(0, limit).trimEnd() + "...");
    } else {
      const words = input.trim().split(/\s+/);
      if (words.length <= limit) { setOutput(input); return; }
      setOutput(words.slice(0, limit).join(" ") + "...");
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const charCount = input.length;
  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Limit</label>
          <input type="number" min={1} value={limit} onChange={(e) => setLimit(Math.max(1, Number(e.target.value)))}
            className="w-24 rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Mode</label>
          <div className="flex gap-1">
            {(["characters", "words"] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${mode === m ? "bg-primary text-white" : "border border-border bg-background text-foreground hover:bg-muted"}`}>
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <button onClick={truncate} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Truncate</button>
        {output && <button onClick={copy} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">{copied ? "Copied!" : "Copy"}</button>}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-muted-foreground">Input Text</label>
            <span className="text-xs text-muted-foreground">{charCount} chars, {wordCount} words</span>
          </div>
          <textarea value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to truncate..."
            className="h-52 w-full resize-y rounded-xl border border-border bg-muted p-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="space-y-1">
          <div className="flex justify-between">
            <label className="text-sm font-medium text-muted-foreground">Truncated Output</label>
            <span className="text-xs text-muted-foreground">{output.length} chars</span>
          </div>
          <textarea readOnly value={output}
            placeholder="Truncated text will appear here..."
            className="h-52 w-full resize-y rounded-xl border border-border bg-muted p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" />
        </div>
      </div>
    </div>
  );
}
