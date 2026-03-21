"use client";

import { useState } from "react";

const BRACKETS_SINGLE = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
];

const BRACKETS_MARRIED = [
  { min: 0, max: 23200, rate: 0.10 },
  { min: 23200, max: 94300, rate: 0.12 },
  { min: 94300, max: 201050, rate: 0.22 },
  { min: 201050, max: 383900, rate: 0.24 },
  { min: 383900, max: 487450, rate: 0.32 },
  { min: 487450, max: 731200, rate: 0.35 },
  { min: 731200, max: Infinity, rate: 0.37 },
];

export default function TaxEstimator() {
  const [income, setIncome] = useState("");
  const [status, setStatus] = useState<"single" | "married">("single");
  const [result, setResult] = useState<{
    federalTax: number;
    effectiveRate: number;
    marginalRate: number;
    takeHome: number;
  } | null>(null);

  const inputClass =
    "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  const calculate = () => {
    const gross = parseFloat(income);
    if (!gross || gross <= 0) return;
    const brackets = status === "single" ? BRACKETS_SINGLE : BRACKETS_MARRIED;
    let tax = 0;
    let marginalRate = 0;
    for (const b of brackets) {
      if (gross > b.min) {
        const taxable = Math.min(gross, b.max) - b.min;
        tax += taxable * b.rate;
        marginalRate = b.rate;
      }
    }
    setResult({
      federalTax: tax,
      effectiveRate: (tax / gross) * 100,
      marginalRate: marginalRate * 100,
      takeHome: gross - tax,
    });
  };

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">Estimates 2024 US federal income tax only. Does not include state, FICA, or deductions.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Gross Income ($)</label>
          <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="85000" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Filing Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as "single" | "married")} className={inputClass}>
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>
      </div>
      <button onClick={calculate} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
        Estimate Tax
      </button>
      {result && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Federal Tax</p>
            <p className="text-2xl font-bold text-red-500">${fmt(result.federalTax)}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Effective Rate</p>
            <p className="text-2xl font-bold text-foreground">{result.effectiveRate.toFixed(2)}%</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Marginal Rate</p>
            <p className="text-2xl font-bold text-foreground">{result.marginalRate.toFixed(0)}%</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Take-Home Pay</p>
            <p className="text-2xl font-bold text-green-500">${fmt(result.takeHome)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
