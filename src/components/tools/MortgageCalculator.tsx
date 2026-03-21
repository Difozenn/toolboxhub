"use client";

import { useState } from "react";

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [rate, setRate] = useState("");
  const [term, setTerm] = useState("30");
  const [result, setResult] = useState<{
    monthly: number;
    totalInterest: number;
    totalCost: number;
    principal: number;
  } | null>(null);

  const calculate = () => {
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment);
    const r = parseFloat(rate);
    const n = parseFloat(term) * 12;
    if (!price || !r || !n || isNaN(down)) return;
    const principal = price - (price * down) / 100;
    const monthlyRate = r / 100 / 12;
    let monthly: number;
    if (monthlyRate === 0) {
      monthly = principal / n;
    } else {
      monthly =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) /
        (Math.pow(1 + monthlyRate, n) - 1);
    }
    const totalCost = monthly * n;
    const totalInterest = totalCost - principal;
    setResult({ monthly, totalInterest, totalCost, principal });
  };

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const inputClass =
    "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Home Price ($)</label>
          <input type="number" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} placeholder="400000" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Down Payment (%)</label>
          <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} placeholder="20" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Interest Rate (%)</label>
          <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="6.5" step="0.1" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Loan Term (years)</label>
          <select value={term} onChange={(e) => setTerm(e.target.value)} className={inputClass}>
            <option value="10">10 years</option>
            <option value="15">15 years</option>
            <option value="20">20 years</option>
            <option value="30">30 years</option>
          </select>
        </div>
      </div>
      <button onClick={calculate} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
        Calculate
      </button>
      {result && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Monthly Payment</p>
            <p className="text-2xl font-bold text-primary">${fmt(result.monthly)}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Total Interest</p>
            <p className="text-2xl font-bold text-red-500">${fmt(result.totalInterest)}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Total Cost</p>
            <p className="text-2xl font-bold text-foreground">${fmt(result.totalCost)}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Loan Principal</p>
            <p className="text-2xl font-bold text-foreground">${fmt(result.principal)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
