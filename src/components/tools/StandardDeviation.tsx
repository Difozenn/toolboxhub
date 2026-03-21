"use client";

import { useState } from "react";

export default function StandardDeviation() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Record<string, number> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    const nums = input.split(/[\n,]+/).map((s) => parseFloat(s.trim())).filter((n) => !isNaN(n));
    if (nums.length < 2) { setError("Please enter at least 2 numbers"); return; }
    const n = nums.length;
    const mean = nums.reduce((s, x) => s + x, 0) / n;
    const variance = nums.reduce((s, x) => s + (x - mean) ** 2, 0) / n;
    const sampleVariance = nums.reduce((s, x) => s + (x - mean) ** 2, 0) / (n - 1);
    const min = Math.min(...nums);
    const max = Math.max(...nums);
    const sorted = [...nums].sort((a, b) => a - b);
    const median = n % 2 === 0 ? (sorted[n/2-1] + sorted[n/2]) / 2 : sorted[Math.floor(n/2)];
    setResults({ Count: n, Min: min, Max: max, Mean: mean, Median: median, "Population Variance": variance, "Sample Variance": sampleVariance, "Population Std Dev": Math.sqrt(variance), "Sample Std Dev": Math.sqrt(sampleVariance) });
    setError(null);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">Numbers (comma or newline separated)</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)}
          placeholder={"2, 4, 4, 4, 5, 5, 7, 9"}
          className="h-32 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>
      <button onClick={calculate} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Calculate</button>
      {error && <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">{error}</div>}
      {results && (
        <div className="rounded-xl border border-border bg-muted overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              {Object.entries(results).map(([k, v]) => (
                <tr key={k} className="border-b border-border last:border-0">
                  <td className="px-4 py-2 font-medium text-muted-foreground">{k}</td>
                  <td className="px-4 py-2 font-mono font-semibold text-primary text-right">{typeof v === "number" ? v.toFixed(6).replace(/\.?0+$/, "") : v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
