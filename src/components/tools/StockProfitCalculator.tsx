"use client";

import { useState } from "react";

export default function StockProfitCalculator() {
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [shares, setShares] = useState("");
  const [commission, setCommission] = useState("0");
  const [result, setResult] = useState<{
    profitLoss: number;
    returnPct: number;
    totalCost: number;
    totalRevenue: number;
    netProfit: number;
  } | null>(null);

  const inputClass =
    "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  const calculate = () => {
    const buy = parseFloat(buyPrice);
    const sell = parseFloat(sellPrice);
    const qty = parseFloat(shares);
    const comm = parseFloat(commission) || 0;
    if (!buy || !sell || !qty || qty <= 0) return;
    const totalCost = buy * qty + comm;
    const totalRevenue = sell * qty - comm;
    const profitLoss = (sell - buy) * qty;
    const netProfit = totalRevenue - buy * qty;
    const returnPct = ((sell - buy) / buy) * 100;
    setResult({ profitLoss, returnPct, totalCost, totalRevenue, netProfit });
  };

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Buy Price ($)</label>
          <input type="number" value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)} placeholder="50.00" step="0.01" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Sell Price ($)</label>
          <input type="number" value={sellPrice} onChange={(e) => setSellPrice(e.target.value)} placeholder="75.00" step="0.01" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Number of Shares</label>
          <input type="number" value={shares} onChange={(e) => setShares(e.target.value)} placeholder="100" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Total Commission ($)</label>
          <input type="number" value={commission} onChange={(e) => setCommission(e.target.value)} placeholder="0" step="0.01" className={inputClass} />
        </div>
      </div>
      <button onClick={calculate} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
        Calculate
      </button>
      {result && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Profit / Loss</p>
            <p className={`text-2xl font-bold ${result.profitLoss >= 0 ? "text-green-500" : "text-red-500"}`}>
              {result.profitLoss >= 0 ? "+" : ""}${fmt(result.profitLoss)}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Return</p>
            <p className={`text-2xl font-bold ${result.returnPct >= 0 ? "text-green-500" : "text-red-500"}`}>
              {result.returnPct >= 0 ? "+" : ""}{result.returnPct.toFixed(2)}%
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Net Profit (after fees)</p>
            <p className={`text-2xl font-bold ${result.netProfit >= 0 ? "text-primary" : "text-red-500"}`}>
              {result.netProfit >= 0 ? "+" : ""}${fmt(result.netProfit)}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Total Cost</p>
            <p className="text-2xl font-bold text-foreground">${fmt(result.totalCost)}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold text-foreground">${fmt(result.totalRevenue)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
