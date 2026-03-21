"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
const buttonClass =
  "rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90";
const cardClass = "rounded-xl border border-border bg-muted p-4 text-center";

type CompoundFrequency = "annually" | "semi-annually" | "quarterly" | "monthly" | "daily";

const frequencyMap: Record<CompoundFrequency, number> = {
  annually: 1,
  "semi-annually": 2,
  quarterly: 4,
  monthly: 12,
  daily: 365,
};

export default function FutureValueCalculator() {
  const [presentValue, setPresentValue] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [years, setYears] = useState("");
  const [frequency, setFrequency] = useState<CompoundFrequency>("annually");
  const [results, setResults] = useState<{
    futureValue: number;
    totalInterest: number;
    effectiveRate: number;
  } | null>(null);

  const calculate = () => {
    const pv = parseFloat(presentValue) || 0;
    const r = (parseFloat(interestRate) || 0) / 100;
    const t = parseFloat(years) || 0;
    const n = frequencyMap[frequency];

    // FV = PV * (1 + r/n)^(n*t)
    const fv = pv * Math.pow(1 + r / n, n * t);
    const totalInterest = fv - pv;
    // Effective annual rate = (1 + r/n)^n - 1
    const effectiveRate = (Math.pow(1 + r / n, n) - 1) * 100;

    setResults({ futureValue: fv, totalInterest, effectiveRate });
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
            Present Value ($)
          </label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 10000"
            value={presentValue}
            onChange={(e) => setPresentValue(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 7"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Time Period (years)
          </label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 10"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Compounding Frequency
          </label>
          <select
            className={inputClass}
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as CompoundFrequency)}
          >
            <option value="annually">Annually</option>
            <option value="semi-annually">Semi-Annually</option>
            <option value="quarterly">Quarterly</option>
            <option value="monthly">Monthly</option>
            <option value="daily">Daily</option>
          </select>
        </div>
      </div>

      <button onClick={calculate} className={buttonClass}>
        Calculate Future Value
      </button>

      {results && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className={cardClass}>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Future Value
              </p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {formatCurrency(results.futureValue)}
              </p>
            </div>

            <div className={cardClass}>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Total Interest Earned
              </p>
              <p className="mt-1 text-2xl font-bold text-green-500">
                {formatCurrency(results.totalInterest)}
              </p>
            </div>

            <div className={cardClass}>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Effective Annual Rate
              </p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {results.effectiveRate.toFixed(3)}%
              </p>
            </div>
          </div>

          <div className={cardClass}>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
              Growth Breakdown
            </p>
            <div className="mx-auto max-w-sm">
              <div className="flex h-8 overflow-hidden rounded-lg">
                <div
                  className="bg-primary flex items-center justify-center text-xs font-medium text-primary-foreground"
                  style={{
                    width: `${
                      (parseFloat(presentValue) /
                        results.futureValue) *
                      100
                    }%`,
                  }}
                >
                  Principal
                </div>
                <div
                  className="bg-green-500 flex items-center justify-center text-xs font-medium text-white"
                  style={{
                    width: `${
                      (results.totalInterest / results.futureValue) * 100
                    }%`,
                  }}
                >
                  Interest
                </div>
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>
                  Principal:{" "}
                  {((parseFloat(presentValue) / results.futureValue) * 100).toFixed(1)}%
                </span>
                <span>
                  Interest:{" "}
                  {((results.totalInterest / results.futureValue) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
