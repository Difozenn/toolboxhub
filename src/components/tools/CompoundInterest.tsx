"use client";

import { useState, useMemo } from "react";

interface YearRow {
  year: number;
  contributions: number;
  interest: number;
  balance: number;
}

export default function CompoundInterest() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [compounds, setCompounds] = useState("12");
  const [years, setYears] = useState("");
  const [monthly, setMonthly] = useState("");

  const result = useMemo(() => {
    const p = parseFloat(principal) || 0;
    const r = parseFloat(rate);
    const n = parseFloat(compounds);
    const t = parseFloat(years);
    const m = parseFloat(monthly) || 0;

    if (isNaN(r) || !n || n <= 0 || !t || t <= 0) return null;
    if (p <= 0 && m <= 0) return null;

    const rateDecimal = r / 100;
    const ratePerPeriod = rateDecimal / n;

    // Year-by-year breakdown
    const schedule: YearRow[] = [];
    let balance = p;
    let totalContributions = p;

    for (let year = 1; year <= t; year++) {
      const startBalance = balance;
      // Each compounding period within the year
      for (let period = 0; period < n; period++) {
        balance *= 1 + ratePerPeriod;
        // Add monthly contributions (spread across compounding periods)
        balance += m * (12 / n);
        totalContributions += m * (12 / n);
      }
      const yearInterest = balance - startBalance - m * 12;
      schedule.push({
        year,
        contributions: totalContributions,
        interest: balance - totalContributions,
        balance,
      });
    }

    const finalAmount = balance;
    const totalInterest = finalAmount - totalContributions;

    return { finalAmount, totalContributions, totalInterest, schedule };
  }, [principal, rate, compounds, years, monthly]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: "Principal ($)", value: principal, setter: setPrincipal, ph: "10000" },
          { label: "Annual Rate (%)", value: rate, setter: setRate, ph: "7" },
          { label: "Compounds/Year", value: compounds, setter: setCompounds, ph: "12" },
          { label: "Years", value: years, setter: setYears, ph: "10" },
          { label: "Monthly Contribution ($)", value: monthly, setter: setMonthly, ph: "500" },
        ].map((field) => (
          <div key={field.label}>
            <label className="mb-1 block text-sm font-medium text-foreground">{field.label}</label>
            <input
              type="number"
              step="any"
              value={field.value}
              onChange={(e) => field.setter(e.target.value)}
              placeholder={field.ph}
              className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        ))}
      </div>

      {result && (
        <>
          {/* Summary */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-sm text-muted-foreground">Final Amount</p>
              <p className="text-2xl font-bold text-primary">${fmt(result.finalAmount)}</p>
            </div>
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-sm text-muted-foreground">Total Contributions</p>
              <p className="text-2xl font-bold text-foreground">${fmt(result.totalContributions)}</p>
            </div>
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-sm text-muted-foreground">Total Interest Earned</p>
              <p className="text-2xl font-bold text-green-500">${fmt(result.totalInterest)}</p>
            </div>
          </div>

          {/* Year-by-year table */}
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-muted">
                  <tr className="border-b border-border">
                    <th className="px-3 py-2 text-left text-muted-foreground font-medium">Year</th>
                    <th className="px-3 py-2 text-right text-muted-foreground font-medium">Contributions</th>
                    <th className="px-3 py-2 text-right text-muted-foreground font-medium">Interest</th>
                    <th className="px-3 py-2 text-right text-muted-foreground font-medium">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {result.schedule.map((row) => (
                    <tr key={row.year} className="border-b border-border/50 hover:bg-primary/5">
                      <td className="px-3 py-2 text-foreground">{row.year}</td>
                      <td className="px-3 py-2 text-right font-mono text-foreground">${fmt(row.contributions)}</td>
                      <td className="px-3 py-2 text-right font-mono text-green-500">${fmt(row.interest)}</td>
                      <td className="px-3 py-2 text-right font-mono font-medium text-foreground">${fmt(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
