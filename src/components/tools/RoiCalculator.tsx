"use client";

import { useState } from "react";

export default function RoiCalculator() {
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [returnAmount, setReturnAmount] = useState("");
  const [result, setResult] = useState<{
    netProfit: number;
    roi: number;
    multiplier: number;
  } | null>(null);

  const inputClass =
    "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  const calculate = () => {
    const invested = parseFloat(investmentAmount);
    const returned = parseFloat(returnAmount);
    if (!invested || invested <= 0 || isNaN(returned)) return;
    const netProfit = returned - invested;
    const roi = (netProfit / invested) * 100;
    const multiplier = returned / invested;
    setResult({ netProfit, roi, multiplier });
  };

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Investment Amount ($)</label>
          <input type="number" value={investmentAmount} onChange={(e) => setInvestmentAmount(e.target.value)} placeholder="10000" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Return Amount ($)</label>
          <input type="number" value={returnAmount} onChange={(e) => setReturnAmount(e.target.value)} placeholder="15000" className={inputClass} />
        </div>
      </div>
      <button onClick={calculate} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
        Calculate ROI
      </button>
      {result && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">ROI</p>
            <p className={`text-2xl font-bold ${result.roi >= 0 ? "text-green-500" : "text-red-500"}`}>
              {result.roi >= 0 ? "+" : ""}{result.roi.toFixed(2)}%
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Net Profit / Loss</p>
            <p className={`text-2xl font-bold ${result.netProfit >= 0 ? "text-green-500" : "text-red-500"}`}>
              {result.netProfit >= 0 ? "+" : ""}${fmt(result.netProfit)}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Return Multiplier</p>
            <p className="text-2xl font-bold text-primary">{result.multiplier.toFixed(2)}x</p>
          </div>
        </div>
      )}
    </div>
  );
}
