"use client";

import { useState, useMemo, useCallback } from "react";

type SeparatorType = "newline" | "space" | "comma" | "custom";

const SEPARATOR_OPTIONS: { label: string; value: SeparatorType }[] = [
  { label: "New Line", value: "newline" },
  { label: "Space", value: "space" },
  { label: "Comma", value: "comma" },
  { label: "Custom", value: "custom" },
];

export default function TextRepeater() {
  const [input, setInput] = useState("");
  const [repeatCount, setRepeatCount] = useState(5);
  const [separatorType, setSeparatorType] = useState<SeparatorType>("newline");
  const [customSeparator, setCustomSeparator] = useState(", ");
  const [copied, setCopied] = useState(false);

  const separator = useMemo(() => {
    switch (separatorType) {
      case "newline":
        return "\n";
      case "space":
        return " ";
      case "comma":
        return ", ";
      case "custom":
        return customSeparator;
    }
  }, [separatorType, customSeparator]);

  const output = useMemo(() => {
    if (!input) return "";
    const count = Math.min(Math.max(1, repeatCount), 1000);
    return Array(count).fill(input).join(separator);
  }, [input, repeatCount, separator]);

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
          Text to Repeat
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to repeat..."
          className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">
            Repeat Count
          </label>
          <input
            type="number"
            value={repeatCount}
            onChange={(e) => {
              const val = parseInt(e.target.value) || 1;
              setRepeatCount(Math.min(Math.max(1, val), 1000));
            }}
            min={1}
            max={1000}
            className="w-28 rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">
            Separator
          </label>
          <select
            value={separatorType}
            onChange={(e) => setSeparatorType(e.target.value as SeparatorType)}
            className="rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {SEPARATOR_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {separatorType === "custom" && (
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">
              Custom Separator
            </label>
            <input
              type="text"
              value={customSeparator}
              onChange={(e) => setCustomSeparator(e.target.value)}
              placeholder="e.g. - or |"
              className="w-32 rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        )}
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
            className="h-40 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}
