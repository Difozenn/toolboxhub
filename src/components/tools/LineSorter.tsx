"use client";

import { useState, useCallback } from "react";

export default function LineSorter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [caseInsensitive, setCaseInsensitive] = useState(false);
  const [removeBlanks, setRemoveBlanks] = useState(false);

  const getLines = useCallback(() => {
    let lines = input.split("\n");
    if (removeBlanks) {
      lines = lines.filter((l) => l.trim() !== "");
    }
    return lines;
  }, [input, removeBlanks]);

  const sortAZ = useCallback(() => {
    const lines = getLines();
    lines.sort((a, b) => {
      const aa = caseInsensitive ? a.toLowerCase() : a;
      const bb = caseInsensitive ? b.toLowerCase() : b;
      return aa.localeCompare(bb);
    });
    setOutput(lines.join("\n"));
  }, [getLines, caseInsensitive]);

  const sortZA = useCallback(() => {
    const lines = getLines();
    lines.sort((a, b) => {
      const aa = caseInsensitive ? a.toLowerCase() : a;
      const bb = caseInsensitive ? b.toLowerCase() : b;
      return bb.localeCompare(aa);
    });
    setOutput(lines.join("\n"));
  }, [getLines, caseInsensitive]);

  const sortByLength = useCallback(() => {
    const lines = getLines();
    lines.sort((a, b) => a.length - b.length);
    setOutput(lines.join("\n"));
  }, [getLines]);

  const randomize = useCallback(() => {
    const lines = getLines();
    for (let i = lines.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lines[i], lines[j]] = [lines[j], lines[i]];
    }
    setOutput(lines.join("\n"));
  }, [getLines]);

  const sortNumerically = useCallback(() => {
    const lines = getLines();
    lines.sort((a, b) => {
      const numA = parseFloat(a.replace(/[^\d.\-]/g, "")) || 0;
      const numB = parseFloat(b.replace(/[^\d.\-]/g, "")) || 0;
      return numA - numB;
    });
    setOutput(lines.join("\n"));
  }, [getLines]);

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
          Input (one item per line)
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter lines to sort..."
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
          Case-insensitive
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            checked={removeBlanks}
            onChange={(e) => setRemoveBlanks(e.target.checked)}
            className="h-4 w-4 rounded border-border accent-primary"
          />
          Remove blank lines
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={sortAZ}
          className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
        >
          Sort A-Z
        </button>
        <button
          onClick={sortZA}
          className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
        >
          Sort Z-A
        </button>
        <button
          onClick={sortByLength}
          className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
        >
          Sort by Length
        </button>
        <button
          onClick={randomize}
          className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
        >
          Randomize
        </button>
        <button
          onClick={sortNumerically}
          className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
        >
          Sort Numerically
        </button>
      </div>

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
