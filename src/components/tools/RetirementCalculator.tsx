"use client";

import { useState } from "react";

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("65");
  const [currentSavings, setCurrentSavings] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [returnRate, setReturnRate] = useState("7");
  const [result, setResult] = useState<{
    balance: number;
    totalContributions: number;
    totalGrowth: number;
    years: number;
  } | null>(null);

  const inputClass =
    "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  const calculate = () => {
    const age = parseFloat(currentAge);
    const retAge = parseFloat(retirementAge);
    const savings = parseFloat(currentSavings) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = parseFloat(returnRate);
    if (!age || !retAge || isNaN(rate) || retAge <= age) return;
    const years = retAge - age;
    const months = years * 12;
    const monthlyRate = rate / 100 / 12;
    let balance = savings;
    for (let i = 0; i < months; i++) {
      balance = balance * (1 + monthlyRate) + monthly;
    }
    const totalContributions = savings + monthly * months;
    setResult({ balance, totalContributions, totalGrowth: balance - totalContributions, years });
  };

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Current Age</label>
          <input type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} placeholder="30" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Retirement Age</label>
          <input type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} placeholder="65" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Current Savings ($)</label>
          <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} placeholder="50000" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Monthly Contribution ($)</label>
          <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} placeholder="500" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Expected Return (%)</label>
          <input type="number" value={returnRate} onChange={(e) => setReturnRate(e.target.value)} placeholder="7" step="0.1" className={inputClass} />
        </div>
      </div>
      <button onClick={calculate} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
        Calculate
      </button>
      {result && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Estimated Balance</p>
            <p className="text-2xl font-bold text-primary">${fmt(result.balance)}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Total Contributions</p>
            <p className="text-2xl font-bold text-foreground">${fmt(result.totalContributions)}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Investment Growth</p>
            <p className="text-2xl font-bold text-green-500">${fmt(result.totalGrowth)}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Years to Retirement</p>
            <p className="text-2xl font-bold text-foreground">{result.years} yrs</p>
          </div>
        </div>
      )}
    </div>
  );
}
