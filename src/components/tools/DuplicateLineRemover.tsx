"use client";

import { useState, useMemo, useCallback } from "react";

export default function DuplicateLineRemover() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [caseInsensitive, setCaseInsensitive] = useState(false);
  const [trimWhitespace, setTrimWhitespace] = useState(false);

  const { output, totalLines, uniqueLines, duplicatesRemoved } = useMemo(() => {
    if (!input) {
      return { output: "", totalLines: 0, uniqueLines: 0, duplicatesRemoved: 0 };
    }

    const lines = input.split("\n");
    const total = lines.length;
    const seen = new Set<string>();
    const unique: string[] = [];

    for (const line of lines) {
      let key = trimWhitespace ? line.trim() : line;
      if (caseInsensitive) key = key.toLowerCase();

      if (!seen.has(key)) {
        seen.add(key);
        unique.push(line);
      }
    }

    return {
      output: unique.join("\n"),
      totalLines: total,
      uniqueLines: unique.length,
      duplicatesRemoved: total - unique.length,
    };
  }, [input, caseInsensitive, trimWhitespace]);

  const copy = useCallback(async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [output]);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">
          Input Text
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your text with duplicate lines..."
          className="h-40 w-full resize-y rounded-xl border border-border bg-muted p-4 font-sans text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            checked={caseInsensitive}
            onChange={(e) => setCaseInsensitive(e.target.checked)}
            className="h-4 w-4 rounded border-border accent-primary"
          />
          Case-insensitive comparison
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            checked={trimWhitespace}
            onChange={(e) => setTrimWhitespace(e.target.checked)}
            className="h-4 w-4 rounded border-border accent-primary"
          />
          Trim whitespace
        </label>
      </div>

      {input && (
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{totalLines}</p>
            <p className="mt-1 text-sm text-muted-foreground">Total Lines</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{uniqueLines}</p>
            <p className="mt-1 text-sm text-muted-foreground">Unique Lines</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-2xl font-bold text-foreground">
              {duplicatesRemoved}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Duplicates Removed
            </p>
          </div>
        </div>
      )}

      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-muted-foreground">
              Result
            </label>
            <button
              onClick={copy}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            className="h-40 w-full resize-y rounded-xl border border-border bg-muted p-4 font-sans text-foreground focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}
