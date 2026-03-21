"use client";

import { useState } from "react";

export default function CreditCardPayoff() {
  const [balance, setBalance] = useState("");
  const [apr, setApr] = useState("");
  const [minPayment, setMinPayment] = useState("");
  const [result, setResult] = useState<{
    months: number;
    years: number;
    remainingMonths: number;
    totalInterest: number;
    totalPaid: number;
  } | null>(null);

  const inputClass =
    "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  const calculate = () => {
    const b = parseFloat(balance);
    const r = parseFloat(apr);
    const p = parseFloat(minPayment);
    if (!b || !r || !p || b <= 0 || r <= 0 || p <= 0) return;
    const monthlyRate = r / 100 / 12;
    if (p <= b * monthlyRate) return;
    const months = Math.ceil(-Math.log(1 - (b * monthlyRate) / p) / Math.log(1 + monthlyRate));
    const totalPaid = p * months;
    const totalInterest = totalPaid - b;
    setResult({
      months,
      years: Math.floor(months / 12),
      remainingMonths: months % 12,
      totalInterest,
      totalPaid,
    });
  };

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Credit Card Balance ($)</label>
          <input type="number" value={balance} onChange={(e) => setBalance(e.target.value)} placeholder="5000" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">APR (%)</label>
          <input type="number" value={apr} onChange={(e) => setApr(e.target.value)} placeholder="22.99" step="0.01" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Monthly Payment ($)</label>
          <input type="number" value={minPayment} onChange={(e) => setMinPayment(e.target.value)} placeholder="200" className={inputClass} />
        </div>
      </div>
      <button onClick={calculate} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
        Calculate
      </button>
      {result && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Time to Pay Off</p>
            <p className="text-2xl font-bold text-primary">
              {result.years > 0 ? `${result.years}y ` : ""}{result.remainingMonths}m
            </p>
            <p className="text-xs text-muted-foreground mt-1">{result.months} months total</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Total Interest Paid</p>
            <p className="text-2xl font-bold text-red-500">${fmt(result.totalInterest)}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Total Amount Paid</p>
            <p className="text-2xl font-bold text-foreground">${fmt(result.totalPaid)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
