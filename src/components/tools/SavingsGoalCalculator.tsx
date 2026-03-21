"use client";

import { useState } from "react";

export default function SavingsGoalCalculator() {
  const [goalAmount, setGoalAmount] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [result, setResult] = useState<{
    months: number;
    years: number;
    remainingMonths: number;
    totalContributions: number;
    interestEarned: number;
  } | null>(null);

  const inputClass =
    "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  const calculate = () => {
    const goal = parseFloat(goalAmount);
    const current = parseFloat(currentSavings) || 0;
    const monthly = parseFloat(monthlyContribution);
    const rate = parseFloat(interestRate) || 0;
    if (!goal || !monthly || goal <= current) return;
    const monthlyRate = rate / 100 / 12;
    let balance = current;
    let months = 0;
    const maxMonths = 1200;
    while (balance < goal && months < maxMonths) {
      balance = balance * (1 + monthlyRate) + monthly;
      months++;
    }
    if (months >= maxMonths) return;
    const totalContributions = current + monthly * months;
    setResult({
      months,
      years: Math.floor(months / 12),
      remainingMonths: months % 12,
      totalContributions,
      interestEarned: goal - totalContributions,
    });
  };

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Goal Amount ($)</label>
          <input type="number" value={goalAmount} onChange={(e) => setGoalAmount(e.target.value)} placeholder="50000" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Current Savings ($)</label>
          <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} placeholder="5000" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Monthly Contribution ($)</label>
          <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} placeholder="500" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Annual Interest Rate (%)</label>
          <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="4.5" step="0.1" className={inputClass} />
        </div>
      </div>
      <button onClick={calculate} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
        Calculate
      </button>
      {result && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Time to Goal</p>
            <p className="text-2xl font-bold text-primary">
              {result.years > 0 ? `${result.years}y ` : ""}{result.remainingMonths}m
            </p>
            <p className="text-xs text-muted-foreground mt-1">{result.months} total months</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Total Contributions</p>
            <p className="text-2xl font-bold text-foreground">${fmt(result.totalContributions)}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Interest Earned</p>
            <p className="text-2xl font-bold text-green-500">${fmt(Math.max(0, result.interestEarned))}</p>
          </div>
        </div>
      )}
    </div>
  );
}
