"use client";

import { useState } from "react";

export default function FindAndReplace() {
  const [input, setInput] = useState("");
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [output, setOutput] = useState("");
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const apply = () => {
    try {
      if (!find) { setOutput(input); setCount(0); return; }
      let pattern: RegExp;
      if (useRegex) {
        pattern = new RegExp(find, caseSensitive ? "g" : "gi");
      } else {
        const escaped = find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        pattern = new RegExp(escaped, caseSensitive ? "g" : "gi");
      }
      let n = 0;
      const result = input.replace(pattern, (m) => { n++; return replace; });
      setOutput(result);
      setCount(n);
      setError(null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
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
          <label className="text-sm font-medium text-muted-foreground">Find</label>
          <input type="text" value={find} onChange={(e) => setFind(e.target.value)}
            placeholder="Text to find..."
            className="w-full rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Replace With</label>
          <input type="text" value={replace} onChange={(e) => setReplace(e.target.value)}
            placeholder="Replacement text..."
            className="w-full rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} className="rounded" />
          <span className="text-muted-foreground">Case sensitive</span>
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={useRegex} onChange={(e) => setUseRegex(e.target.checked)} className="rounded" />
          <span className="text-muted-foreground">Regex mode</span>
        </label>
        <button onClick={apply} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Apply</button>
        {output && <button onClick={copy} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">{copied ? "Copied!" : "Copy"}</button>}
        {count !== null && <span className="text-sm text-muted-foreground ml-auto"><span className="font-semibold text-primary">{count}</span> replacement{count !== 1 ? "s" : ""} made</span>}
      </div>
      {error && <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">{error}</div>}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Input Text</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your text here..."
            className="h-52 w-full resize-y rounded-xl border border-border bg-muted p-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Output</label>
          <textarea readOnly value={output}
            placeholder="Result will appear here..."
            className="h-52 w-full resize-y rounded-xl border border-border bg-muted p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" />
        </div>
      </div>
    </div>
  );
}
