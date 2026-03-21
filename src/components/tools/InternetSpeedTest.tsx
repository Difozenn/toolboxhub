"use client";

import { useState } from "react";

export default function InternetSpeedTest() {
  const [result, setResult] = useState<number | null>(null);
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const test = async () => {
    setTesting(true);
    setResult(null);
    setError(null);
    try {
      const size = 2 * 1024 * 1024;
      const url = `https://httpbin.org/bytes/${size}`;
      const start = performance.now();
      const res = await fetch(url + `?nocache=${Date.now()}`);
      const blob = await res.blob();
      const elapsed = (performance.now() - start) / 1000;
      const bits = blob.size * 8;
      const mbps = bits / elapsed / (1024 * 1024);
      setResult(mbps);
    } catch {
      setError("Test failed — likely due to CORS or network restrictions. Try from a different environment.");
    } finally {
      setTesting(false);
    }
  };

  const speedLabel = result ? (result > 100 ? "Excellent" : result > 25 ? "Good" : result > 10 ? "Fair" : "Slow") : "";
  const speedColor = result ? (result > 100 ? "text-green-600" : result > 25 ? "text-primary" : result > 10 ? "text-yellow-600" : "text-red-600") : "";

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300">
        Approximate only — measures download speed from a test endpoint. Results may vary based on CORS restrictions.
      </div>
      <div className="rounded-xl border border-border bg-muted p-8 text-center space-y-4">
        {result !== null ? (
          <>
            <p className={`text-5xl font-bold ${speedColor}`}>{result.toFixed(1)}</p>
            <p className="text-muted-foreground">Mbps — <span className={`font-semibold ${speedColor}`}>{speedLabel}</span></p>
            <div className="h-3 rounded-full bg-border overflow-hidden mx-auto w-64">
              <div className={`h-full rounded-full ${speedColor.replace("text-", "bg-")}`} style={{ width: `${Math.min((result / 200) * 100, 100)}%` }} />
            </div>
          </>
        ) : testing ? (
          <p className="text-muted-foreground animate-pulse">Testing speed...</p>
        ) : (
          <p className="text-muted-foreground">Click "Start Test" to measure your download speed</p>
        )}
        <button onClick={test} disabled={testing} className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50">
          {testing ? "Testing..." : "Start Test"}
        </button>
      </div>
      {error && <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">{error}</div>}
      <div className="rounded-xl border border-border bg-muted p-3 text-xs text-muted-foreground space-y-1">
        <p className="font-semibold">Speed Reference:</p>
        <p>100+ Mbps — Excellent | 25-100 Mbps — Good | 10-25 Mbps — Fair | &lt;10 Mbps — Slow</p>
      </div>
    </div>
  );
}
