"use client";

import { useState } from "react";

export default function PrefixSuffixAdder() {
  const [input, setInput] = useState("");
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const apply = () => {
    const lines = input.split("\n");
    const result = lines.map((line) => `${prefix}${line}${suffix}`).join("\n");
    setOutput(result);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Prefix</label>
          <input type="text" value={prefix} onChange={(e) => setPrefix(e.target.value)}
            placeholder='e.g. "• " or "<li>'
            className="w-full rounded-xl border border-border bg-muted px-4 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Suffix</label>
          <input type="text" value={suffix} onChange={(e) => setSuffix(e.target.value)}
            placeholder='e.g. ";" or "</li>"'
            className="w-full rounded-xl border border-border bg-muted px-4 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={apply} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Apply</button>
        {output && <button onClick={copy} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">{copied ? "Copied!" : "Copy Output"}</button>}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Input (one item per line)</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)}
            placeholder={"apple\nbanana\ncherry"}
            className="h-52 w-full resize-y rounded-xl border border-border bg-muted p-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Output</label>
          <textarea readOnly value={output}
            placeholder="Result will appear here..."
            className="h-52 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" />
        </div>
      </div>
    </div>
  );
}
