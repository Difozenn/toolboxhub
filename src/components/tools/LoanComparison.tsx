"use client";

import { useState } from "react";

function calc(principal: number, annualRate: number, months: number) {
  if (annualRate === 0) return { monthly: principal / months, totalInterest: 0, totalCost: principal };
  const r = annualRate / 100 / 12;
  const monthly = principal * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  const totalCost = monthly * months;
  return { monthly, totalInterest: totalCost - principal, totalCost };
}

interface Loan { amount: number; rate: number; years: number; }

export default function LoanComparison() {
  const [loans, setLoans] = useState<[Loan, Loan]>([
    { amount: 200000, rate: 6.5, years: 30 },
    { amount: 200000, rate: 5.8, years: 15 },
  ]);

  const update = (i: 0 | 1, field: keyof Loan, val: number) => {
    const next: [Loan, Loan] = [...loans] as [Loan, Loan];
    next[i] = { ...next[i], [field]: val };
    setLoans(next);
  };

  const results = loans.map((l) => calc(l.amount, l.rate, l.years * 12));
  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {([0, 1] as const).map((i) => (
          <div key={i} className="rounded-xl border border-border bg-muted p-4 space-y-3">
            <p className="font-semibold text-foreground">Loan {i + 1}</p>
            {[
              { label: "Loan Amount ($)", field: "amount" as const, step: 1000 },
              { label: "Annual Rate (%)", field: "rate" as const, step: 0.1 },
              { label: "Term (years)", field: "years" as const, step: 1 },
            ].map(({ label, field, step }) => (
              <div key={field} className="space-y-1">
                <label className="text-xs text-muted-foreground">{label}</label>
                <input type="number" step={step} value={loans[i][field]} onChange={(e) => update(i, field, Number(e.target.value))}
                  className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none" />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {([0, 1] as const).map((i) => (
          <div key={i} className="rounded-xl border border-border bg-muted p-4 space-y-2">
            <p className="font-semibold text-foreground">Loan {i + 1} Results</p>
            {[
              { label: "Monthly Payment", value: fmt(results[i].monthly) },
              { label: "Total Interest", value: fmt(results[i].totalInterest) },
              { label: "Total Cost", value: fmt(results[i].totalCost) },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-semibold text-foreground">{value}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-primary bg-primary/5 p-4">
        <p className="text-sm font-semibold text-foreground mb-2">Comparison</p>
        <div className="grid gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Monthly Difference</span>
            <span className="font-semibold text-primary">{fmt(Math.abs(results[0].monthly - results[1].monthly))}/mo</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Interest Savings</span>
            <span className="font-semibold text-primary">{fmt(Math.abs(results[0].totalInterest - results[1].totalInterest))}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Loan {results[0].totalCost < results[1].totalCost ? 1 : 2} costs less overall.
          </p>
        </div>
      </div>
    </div>
  );
}
