"use client";

import { useState } from "react";

export default function CagrCalculator() {
  const [initialValue, setInitialValue] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<{
    cagr: number;
    totalReturn: number;
    totalReturnPct: number;
    multiple: number;
  } | null>(null);

  const inputClass =
    "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  const calculate = () => {
    const iv = parseFloat(initialValue);
    const fv = parseFloat(finalValue);
    const n = parseFloat(years);
    if (!iv || !fv || !n || iv <= 0 || n <= 0) return;
    const cagr = (Math.pow(fv / iv, 1 / n) - 1) * 100;
    const totalReturn = fv - iv;
    const totalReturnPct = ((fv - iv) / iv) * 100;
    const multiple = fv / iv;
    setResult({ cagr, totalReturn, totalReturnPct, multiple });
  };

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Initial Value ($)</label>
          <input type="number" value={initialValue} onChange={(e) => setInitialValue(e.target.value)} placeholder="10000" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Final Value ($)</label>
          <input type="number" value={finalValue} onChange={(e) => setFinalValue(e.target.value)} placeholder="20000" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Number of Years</label>
          <input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="5" className={inputClass} />
        </div>
      </div>
      <button onClick={calculate} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
        Calculate CAGR
      </button>
      {result && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">CAGR</p>
            <p className={`text-2xl font-bold ${result.cagr >= 0 ? "text-primary" : "text-red-500"}`}>
              {result.cagr >= 0 ? "+" : ""}{result.cagr.toFixed(2)}%
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Total Return</p>
            <p className={`text-2xl font-bold ${result.totalReturn >= 0 ? "text-green-500" : "text-red-500"}`}>
              {result.totalReturn >= 0 ? "+" : ""}${fmt(result.totalReturn)}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Total Return %</p>
            <p className={`text-2xl font-bold ${result.totalReturnPct >= 0 ? "text-green-500" : "text-red-500"}`}>
              {result.totalReturnPct >= 0 ? "+" : ""}{result.totalReturnPct.toFixed(2)}%
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Growth Multiple</p>
            <p className="text-2xl font-bold text-foreground">{result.multiple.toFixed(2)}x</p>
          </div>
        </div>
      )}
    </div>
  );
}
