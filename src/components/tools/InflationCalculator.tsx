"use client";

import { useState } from "react";

export default function InflationCalculator() {
  const [amount, setAmount] = useState("");
  const [years, setYears] = useState("");
  const [inflationRate, setInflationRate] = useState("3");
  const [result, setResult] = useState<{
    futureValue: number;
    purchasingPower: number;
    totalInflation: number;
    lostValue: number;
  } | null>(null);

  const inputClass =
    "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  const calculate = () => {
    const a = parseFloat(amount);
    const y = parseFloat(years);
    const r = parseFloat(inflationRate);
    if (!a || !y || isNaN(r) || y <= 0) return;
    const futureValue = a * Math.pow(1 + r / 100, y);
    const purchasingPower = a / Math.pow(1 + r / 100, y);
    const totalInflation = ((futureValue - a) / a) * 100;
    setResult({ futureValue, purchasingPower, totalInflation, lostValue: a - purchasingPower });
  };

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Amount ($)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="1000" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Years</label>
          <input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="10" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Annual Inflation Rate (%)</label>
          <input type="number" value={inflationRate} onChange={(e) => setInflationRate(e.target.value)} placeholder="3" step="0.1" className={inputClass} />
        </div>
      </div>
      <button onClick={calculate} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
        Calculate
      </button>
      {result && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Future Cost</p>
            <p className="text-2xl font-bold text-primary">${fmt(result.futureValue)}</p>
            <p className="text-xs text-muted-foreground mt-1">Same item will cost this much</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Purchasing Power</p>
            <p className="text-2xl font-bold text-red-500">${fmt(result.purchasingPower)}</p>
            <p className="text-xs text-muted-foreground mt-1">Today's equivalent in {years} yrs</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Total Inflation</p>
            <p className="text-2xl font-bold text-foreground">{result.totalInflation.toFixed(1)}%</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Lost Value</p>
            <p className="text-2xl font-bold text-red-500">${fmt(result.lostValue)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
