"use client";

import { useState, useMemo, useCallback } from "react";

export default function AverageCalculator() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    if (!input.trim()) return null;

    const numbers = input
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter((s) => s !== "")
      .map((s) => parseFloat(s))
      .filter((n) => !isNaN(n));

    if (numbers.length === 0) return null;

    const count = numbers.length;
    const sum = numbers.reduce((a, b) => a + b, 0);
    const mean = sum / count;
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    const range = max - min;

    // Median
    const sorted = [...numbers].sort((a, b) => a - b);
    const median =
      count % 2 === 0
        ? (sorted[count / 2 - 1] + sorted[count / 2]) / 2
        : sorted[Math.floor(count / 2)];

    // Mode
    const freq: Record<number, number> = {};
    for (const n of numbers) freq[n] = (freq[n] || 0) + 1;
    const maxFreq = Math.max(...Object.values(freq));
    const modes = Object.entries(freq)
      .filter(([, f]) => f === maxFreq && f > 1)
      .map(([n]) => parseFloat(n));

    // Standard deviation
    const variance = numbers.reduce((acc, n) => acc + Math.pow(n - mean, 2), 0) / count;
    const stdDev = Math.sqrt(variance);

    return { mean, median, modes, range, min, max, sum, count, stdDev };
  }, [input]);

  const fmt = (n: number) => {
    const rounded = parseFloat(n.toPrecision(10));
    return rounded.toLocaleString("en-US", { maximumFractionDigits: 6 });
  };

  const copyAll = useCallback(async () => {
    if (!stats) return;
    const text = [
      `Count: ${stats.count}`,
      `Sum: ${fmt(stats.sum)}`,
      `Mean: ${fmt(stats.mean)}`,
      `Median: ${fmt(stats.median)}`,
      `Mode: ${stats.modes.length > 0 ? stats.modes.map(fmt).join(", ") : "No mode"}`,
      `Min: ${fmt(stats.min)}`,
      `Max: ${fmt(stats.max)}`,
      `Range: ${fmt(stats.range)}`,
      `Std Dev: ${fmt(stats.stdDev)}`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, [stats]);

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">
          Enter Numbers <span className="text-muted-foreground">(one per line or comma-separated)</span>
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={"10, 20, 30, 40, 50\nor\n10\n20\n30"}
          rows={6}
          className="w-full rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-y"
        />
      </div>

      {/* Results */}
      {stats && (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { label: "Count", value: stats.count.toString() },
              { label: "Sum", value: fmt(stats.sum) },
              { label: "Mean", value: fmt(stats.mean) },
              { label: "Median", value: fmt(stats.median) },
              {
                label: "Mode",
                value: stats.modes.length > 0 ? stats.modes.map(fmt).join(", ") : "No mode",
              },
              { label: "Min", value: fmt(stats.min) },
              { label: "Max", value: fmt(stats.max) },
              { label: "Range", value: fmt(stats.range) },
              { label: "Std Deviation", value: fmt(stats.stdDev) },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-border bg-muted p-4">
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <p className="text-lg font-bold font-mono text-foreground truncate">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              onClick={copyAll}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
            >
              {copied ? "Copied!" : "Copy All Results"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
