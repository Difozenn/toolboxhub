"use client";

import { useState } from "react";

export default function EmiCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [result, setResult] = useState<{
    emi: number;
    totalInterest: number;
    totalPayment: number;
    interestPct: number;
  } | null>(null);

  const inputClass =
    "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const n = parseFloat(tenure);
    if (!p || isNaN(r) || !n || p <= 0 || n <= 0) return;
    const monthlyRate = r / 100 / 12;
    let emi: number;
    if (monthlyRate === 0) {
      emi = p / n;
    } else {
      emi = (p * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    }
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;
    const interestPct = (totalInterest / totalPayment) * 100;
    setResult({ emi, totalInterest, totalPayment, interestPct });
  };

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Principal Amount ($)</label>
          <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="500000" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Annual Interest Rate (%)</label>
          <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="8.5" step="0.1" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Tenure (months)</label>
          <input type="number" value={tenure} onChange={(e) => setTenure(e.target.value)} placeholder="240" className={inputClass} />
        </div>
      </div>
      <button onClick={calculate} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
        Calculate EMI
      </button>
      {result && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Monthly EMI</p>
            <p className="text-2xl font-bold text-primary">${fmt(result.emi)}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Total Interest</p>
            <p className="text-2xl font-bold text-red-500">${fmt(result.totalInterest)}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Total Payment</p>
            <p className="text-2xl font-bold text-foreground">${fmt(result.totalPayment)}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center col-span-full sm:col-span-1">
            <p className="text-sm text-muted-foreground">Interest Portion</p>
            <p className="text-2xl font-bold text-foreground">{result.interestPct.toFixed(1)}%</p>
          </div>
        </div>
      )}
    </div>
  );
}
