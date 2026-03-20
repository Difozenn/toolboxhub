"use client";

import { useState, useMemo, useCallback } from "react";

type Separator = "dot" | "colon" | "tab" | "pipe";

const SEPARATORS: { label: string; value: Separator; char: string }[] = [
  { label: "Dot (.)", value: "dot", char: ". " },
  { label: "Colon (:)", value: "colon", char: ": " },
  { label: "Tab", value: "tab", char: "\t" },
  { label: "Pipe (|)", value: "pipe", char: " | " },
];

export default function AddLineNumbers() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [startNumber, setStartNumber] = useState(1);
  const [separator, setSeparator] = useState<Separator>("dot");
  const [padWithZeros, setPadWithZeros] = useState(false);

  const output = useMemo(() => {
    if (!input) return "";

    const lines = input.split("\n");
    const maxNum = startNumber + lines.length - 1;
    const maxDigits = String(maxNum).length;
    const sepChar = SEPARATORS.find((s) => s.value === separator)?.char || ". ";

    return lines
      .map((line, i) => {
        const num = startNumber + i;
        const numStr = padWithZeros
          ? String(num).padStart(maxDigits, "0")
          : String(num);
        return `${numStr}${sepChar}${line}`;
      })
      .join("\n");
  }, [input, startNumber, separator, padWithZeros]);

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
          placeholder="Paste your text here to add line numbers..."
          className="h-40 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">
            Start Number
          </label>
          <input
            type="number"
            value={startNumber}
            onChange={(e) => setStartNumber(parseInt(e.target.value) || 0)}
            className="w-24 rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">
            Separator
          </label>
          <select
            value={separator}
            onChange={(e) => setSeparator(e.target.value as Separator)}
            className="rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {SEPARATORS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-2 pb-2 text-sm text-foreground">
          <input
            type="checkbox"
            checked={padWithZeros}
            onChange={(e) => setPadWithZeros(e.target.checked)}
            className="h-4 w-4 rounded border-border accent-primary"
          />
          Pad with zeros
        </label>
      </div>

      {input && (
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
            className="h-40 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}
