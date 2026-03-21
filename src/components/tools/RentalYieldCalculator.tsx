"use client";

import { useState } from "react";

export default function RentalYieldCalculator() {
  const [propertyValue, setPropertyValue] = useState("");
  const [annualRental, setAnnualRental] = useState("");
  const [annualExpenses, setAnnualExpenses] = useState("");
  const [result, setResult] = useState<{
    grossYield: number;
    netYield: number;
    annualNetIncome: number;
    monthlyNetIncome: number;
  } | null>(null);

  const inputClass =
    "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  const calculate = () => {
    const pv = parseFloat(propertyValue);
    const ar = parseFloat(annualRental);
    const ae = parseFloat(annualExpenses) || 0;
    if (!pv || !ar || pv <= 0 || ar <= 0) return;
    const grossYield = (ar / pv) * 100;
    const annualNetIncome = ar - ae;
    const netYield = (annualNetIncome / pv) * 100;
    setResult({ grossYield, netYield, annualNetIncome, monthlyNetIncome: annualNetIncome / 12 });
  };

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Property Value ($)</label>
          <input type="number" value={propertyValue} onChange={(e) => setPropertyValue(e.target.value)} placeholder="300000" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Annual Rental Income ($)</label>
          <input type="number" value={annualRental} onChange={(e) => setAnnualRental(e.target.value)} placeholder="18000" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Annual Expenses ($)</label>
          <input type="number" value={annualExpenses} onChange={(e) => setAnnualExpenses(e.target.value)} placeholder="3600" className={inputClass} />
        </div>
      </div>
      <button onClick={calculate} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
        Calculate Yield
      </button>
      {result && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Gross Yield</p>
            <p className="text-2xl font-bold text-primary">{result.grossYield.toFixed(2)}%</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Net Yield</p>
            <p className={`text-2xl font-bold ${result.netYield >= 0 ? "text-green-500" : "text-red-500"}`}>
              {result.netYield.toFixed(2)}%
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Annual Net Income</p>
            <p className="text-2xl font-bold text-foreground">${fmt(result.annualNetIncome)}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Monthly Net Income</p>
            <p className="text-2xl font-bold text-foreground">${fmt(result.monthlyNetIncome)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
