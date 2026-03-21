"use client";

import { useState } from "react";

export default function AutoLoanCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [rate, setRate] = useState("");
  const [term, setTerm] = useState("60");
  const [result, setResult] = useState<{
    monthly: number;
    totalInterest: number;
    totalCost: number;
    loanAmount: number;
  } | null>(null);

  const inputClass =
    "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  const calculate = () => {
    const price = parseFloat(vehiclePrice);
    const down = parseFloat(downPayment) || 0;
    const r = parseFloat(rate);
    const n = parseFloat(term);
    if (!price || isNaN(r) || !n) return;
    const principal = price - down;
    const monthlyRate = r / 100 / 12;
    let monthly: number;
    if (monthlyRate === 0) {
      monthly = principal / n;
    } else {
      monthly = (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    }
    const totalCost = monthly * n;
    setResult({ monthly, totalInterest: totalCost - principal, totalCost, loanAmount: principal });
  };

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Vehicle Price ($)</label>
          <input type="number" value={vehiclePrice} onChange={(e) => setVehiclePrice(e.target.value)} placeholder="35000" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Down Payment ($)</label>
          <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} placeholder="5000" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Interest Rate (% APR)</label>
          <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="5.9" step="0.1" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Loan Term (months)</label>
          <select value={term} onChange={(e) => setTerm(e.target.value)} className={inputClass}>
            <option value="24">24 months (2 yr)</option>
            <option value="36">36 months (3 yr)</option>
            <option value="48">48 months (4 yr)</option>
            <option value="60">60 months (5 yr)</option>
            <option value="72">72 months (6 yr)</option>
            <option value="84">84 months (7 yr)</option>
          </select>
        </div>
      </div>
      <button onClick={calculate} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
        Calculate
      </button>
      {result && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Monthly Payment</p>
            <p className="text-2xl font-bold text-primary">${fmt(result.monthly)}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Loan Amount</p>
            <p className="text-2xl font-bold text-foreground">${fmt(result.loanAmount)}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Total Interest</p>
            <p className="text-2xl font-bold text-red-500">${fmt(result.totalInterest)}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Total Cost</p>
            <p className="text-2xl font-bold text-foreground">${fmt(result.totalCost)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
