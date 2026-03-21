"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
const buttonClass =
  "rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90";
const cardClass = "rounded-xl border border-border bg-muted p-4 text-center";

export default function DividendCalculator() {
  const [investment, setInvestment] = useState("");
  const [yieldPct, setYieldPct] = useState("");
  const [years, setYears] = useState("");
  const [reinvest, setReinvest] = useState(true);
  const [results, setResults] = useState<{
    annualDividend: number;
    monthlyDividend: number;
    totalDividends: number;
    finalValue: number;
    totalReturn: number;
  } | null>(null);

  const calculate = () => {
    const principal = parseFloat(investment) || 0;
    const rate = (parseFloat(yieldPct) || 0) / 100;
    const n = parseFloat(years) || 0;

    if (reinvest) {
      // DRIP: compound annually
      let balance = principal;
      let totalDiv = 0;
      for (let y = 0; y < n; y++) {
        const dividend = balance * rate;
        totalDiv += dividend;
        balance += dividend;
      }
      const annualDividend = principal * rate;
      setResults({
        annualDividend,
        monthlyDividend: annualDividend / 12,
        totalDividends: totalDiv,
        finalValue: balance,
        totalReturn: ((balance - principal) / principal) * 100,
      });
    } else {
      const annualDividend = principal * rate;
      const totalDividends = annualDividend * n;
      setResults({
        annualDividend,
        monthlyDividend: annualDividend / 12,
        totalDividends,
        finalValue: principal + totalDividends,
        totalReturn: (totalDividends / principal) * 100,
      });
    }
  };

  const formatCurrency = (n: number) =>
    n.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Investment Amount ($)
          </label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 10000"
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Dividend Yield (%)
          </label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 4"
            step="0.1"
            value={yieldPct}
            onChange={(e) => setYieldPct(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Investment Period (years)
          </label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 10"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
        </div>

        <div className="flex items-end">
          <label className="flex cursor-pointer items-center gap-3">
            <div className="relative">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={reinvest}
                onChange={(e) => setReinvest(e.target.checked)}
              />
              <div className="h-6 w-11 rounded-full bg-border transition-colors peer-checked:bg-primary" />
              <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform peer-checked:translate-x-5" />
            </div>
            <span className="text-sm font-medium text-foreground">
              Reinvest Dividends (DRIP)
            </span>
          </label>
        </div>
      </div>

      <button onClick={calculate} className={buttonClass}>
        Calculate Dividends
      </button>

      {results && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className={cardClass}>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Annual Dividend
              </p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {formatCurrency(results.annualDividend)}
              </p>
              <p className="text-xs text-muted-foreground">first year</p>
            </div>

            <div className={cardClass}>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Monthly Dividend
              </p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {formatCurrency(results.monthlyDividend)}
              </p>
              <p className="text-xs text-muted-foreground">first year</p>
            </div>

            <div className={cardClass}>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Total Dividends Earned
              </p>
              <p className="mt-1 text-2xl font-bold text-green-500">
                {formatCurrency(results.totalDividends)}
              </p>
              <p className="text-xs text-muted-foreground">
                over {years} year{parseFloat(years) !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className={cardClass}>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Final Portfolio Value
              </p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {formatCurrency(results.finalValue)}
              </p>
              <p className="text-xs text-muted-foreground">
                {reinvest ? "with DRIP reinvestment" : "without reinvestment"}
              </p>
            </div>

            <div className={cardClass}>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Total Return
              </p>
              <p className="mt-1 text-2xl font-bold text-green-500">
                {results.totalReturn.toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground">on initial investment</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
