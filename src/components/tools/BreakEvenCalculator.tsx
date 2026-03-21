"use client";

import { useState } from "react";

export default function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState("");
  const [variableCostPerUnit, setVariableCostPerUnit] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [result, setResult] = useState<{
    breakEvenUnits: number;
    breakEvenRevenue: number;
    contributionMargin: number;
    contributionMarginRatio: number;
  } | null>(null);

  const inputClass =
    "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  const calculate = () => {
    const fc = parseFloat(fixedCosts);
    const vc = parseFloat(variableCostPerUnit);
    const price = parseFloat(pricePerUnit);
    if (!fc || isNaN(vc) || !price || price <= vc) return;
    const contributionMargin = price - vc;
    const breakEvenUnits = fc / contributionMargin;
    const breakEvenRevenue = breakEvenUnits * price;
    const contributionMarginRatio = (contributionMargin / price) * 100;
    setResult({ breakEvenUnits, breakEvenRevenue, contributionMargin, contributionMarginRatio });
  };

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Fixed Costs ($)</label>
          <input type="number" value={fixedCosts} onChange={(e) => setFixedCosts(e.target.value)} placeholder="10000" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Variable Cost per Unit ($)</label>
          <input type="number" value={variableCostPerUnit} onChange={(e) => setVariableCostPerUnit(e.target.value)} placeholder="15" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Price per Unit ($)</label>
          <input type="number" value={pricePerUnit} onChange={(e) => setPricePerUnit(e.target.value)} placeholder="25" className={inputClass} />
        </div>
      </div>
      <button onClick={calculate} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
        Calculate
      </button>
      {result && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Break-Even Units</p>
            <p className="text-2xl font-bold text-primary">{Math.ceil(result.breakEvenUnits).toLocaleString()}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Break-Even Revenue</p>
            <p className="text-2xl font-bold text-foreground">${fmt(result.breakEvenRevenue)}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Contribution Margin</p>
            <p className="text-2xl font-bold text-green-500">${fmt(result.contributionMargin)}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Contribution Margin Ratio</p>
            <p className="text-2xl font-bold text-foreground">{result.contributionMarginRatio.toFixed(1)}%</p>
          </div>
        </div>
      )}
    </div>
  );
}
