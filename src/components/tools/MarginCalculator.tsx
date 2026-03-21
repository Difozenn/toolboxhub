"use client";

import { useState } from "react";

export default function MarginCalculator() {
  const [cost, setCost] = useState("");
  const [revenue, setRevenue] = useState("");
  const [result, setResult] = useState<{
    profit: number;
    margin: number;
    markup: number;
  } | null>(null);

  const inputClass =
    "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  const calculate = () => {
    const c = parseFloat(cost);
    const r = parseFloat(revenue);
    if (!c || c <= 0 || !r || r <= 0) return;
    const profit = r - c;
    const margin = (profit / r) * 100;
    const markup = (profit / c) * 100;
    setResult({ profit, margin, markup });
  };

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Cost ($)</label>
          <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} placeholder="50" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Revenue / Selling Price ($)</label>
          <input type="number" value={revenue} onChange={(e) => setRevenue(e.target.value)} placeholder="100" className={inputClass} />
        </div>
      </div>
      <button onClick={calculate} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
        Calculate
      </button>
      {result && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Gross Profit</p>
            <p className={`text-2xl font-bold ${result.profit >= 0 ? "text-green-500" : "text-red-500"}`}>
              ${fmt(result.profit)}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Profit Margin</p>
            <p className={`text-2xl font-bold ${result.margin >= 0 ? "text-primary" : "text-red-500"}`}>
              {result.margin.toFixed(2)}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">Profit / Revenue</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Markup</p>
            <p className={`text-2xl font-bold ${result.markup >= 0 ? "text-foreground" : "text-red-500"}`}>
              {result.markup.toFixed(2)}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">Profit / Cost</p>
          </div>
        </div>
      )}
    </div>
  );
}
