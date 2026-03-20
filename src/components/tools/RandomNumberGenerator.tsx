"use client";

import { useState, useCallback } from "react";

export default function RandomNumberGenerator() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("1");
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [sortResults, setSortResults] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const generate = useCallback(() => {
    const lo = parseInt(min);
    const hi = parseInt(max);
    const n = parseInt(count);

    if (isNaN(lo) || isNaN(hi) || isNaN(n)) {
      setError("Please enter valid numbers");
      return;
    }
    if (lo > hi) {
      setError("Min must be less than or equal to Max");
      return;
    }
    if (n < 1 || n > 1000) {
      setError("Count must be between 1 and 1000");
      return;
    }

    const range = hi - lo + 1;
    if (!allowDuplicates && n > range) {
      setError(`Cannot generate ${n} unique numbers in range ${lo}-${hi} (only ${range} possible)`);
      return;
    }

    setError("");
    let nums: number[];

    if (!allowDuplicates) {
      // Fisher-Yates for unique numbers
      const pool: number[] = [];
      for (let i = lo; i <= hi; i++) pool.push(i);
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      nums = pool.slice(0, n);
    } else {
      nums = Array.from({ length: n }, () => Math.floor(Math.random() * range) + lo);
    }

    if (sortResults) nums.sort((a, b) => a - b);
    setResults(nums);
  }, [min, max, count, allowDuplicates, sortResults]);

  const copyAll = useCallback(async () => {
    if (results.length === 0) return;
    try {
      await navigator.clipboard.writeText(results.join(", "));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, [results]);

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Min</label>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Max</label>
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Count (1-1000)</label>
          <input
            type="number"
            min="1"
            max="1000"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Options */}
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={allowDuplicates}
            onChange={(e) => setAllowDuplicates(e.target.checked)}
            className="rounded border-border"
          />
          <span className="text-sm text-foreground">Allow duplicates</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={sortResults}
            onChange={(e) => setSortResults(e.target.checked)}
            className="rounded border-border"
          />
          <span className="text-sm text-foreground">Sort results</span>
        </label>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Generate button */}
      <button
        onClick={generate}
        className="w-full rounded-lg bg-primary px-4 py-3 text-base font-semibold text-white hover:bg-primary/90 transition-colors"
      >
        Generate
      </button>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{results.length} number{results.length > 1 ? "s" : ""} generated</p>
            <button
              onClick={copyAll}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
            >
              {copied ? "Copied!" : "Copy All"}
            </button>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 max-h-[300px] overflow-y-auto">
            <div className="flex flex-wrap gap-2">
              {results.map((num, idx) => (
                <span
                  key={idx}
                  className="inline-block rounded-lg border border-border bg-background px-3 py-1.5 font-mono text-sm text-foreground"
                >
                  {num}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
