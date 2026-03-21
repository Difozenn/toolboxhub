"use client";

import { useState } from "react";

type Compounding = "annually" | "semiannually" | "quarterly" | "monthly" | "daily";

export default function PresentValueCalculator() {
  const [futureValue, setFutureValue] = useState("10000");
  const [discountRate, setDiscountRate] = useState("5");
  const [years, setYears] = useState("10");
  const [compounding, setCompounding] = useState<Compounding>("annually");

  const getPeriodsPerYear = (c: Compounding): number => {
    switch (c) {
      case "annually": return 1;
      case "semiannually": return 2;
      case "quarterly": return 4;
      case "monthly": return 12;
      case "daily": return 365;
    }
  };

  const calculate = () => {
    const fv = parseFloat(futureValue);
    const r = parseFloat(discountRate) / 100;
    const n = parseFloat(years);
    const m = getPeriodsPerYear(compounding);

    if (isNaN(fv) || isNaN(r) || isNaN(n) || r <= 0 || n <= 0 || fv <= 0) return null;

    const totalPeriods = n * m;
    const ratePerPeriod = r / m;
    const discountFactor = 1 / Math.pow(1 + ratePerPeriod, totalPeriods);
    const presentValue = fv * discountFactor;
    const discountAmount = fv - presentValue;

    return {
      presentValue,
      discountAmount,
      discountFactor,
      totalPeriods,
      effectiveRate: Math.pow(1 + ratePerPeriod, m) - 1,
    };
  };

  const result = calculate();

  const fmt = (v: number) =>
    v.toLocaleString("en-US", { style: "currency", currency: "USD" });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Future Value ($)
          </label>
          <input
            type="number"
            value={futureValue}
            onChange={(e) => setFutureValue(e.target.value)}
            placeholder="10000"
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Discount Rate (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={discountRate}
            onChange={(e) => setDiscountRate(e.target.value)}
            placeholder="5"
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Number of Years
          </label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            placeholder="10"
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Compounding
          </label>
          <select
            value={compounding}
            onChange={(e) => setCompounding(e.target.value as Compounding)}
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="annually">Annually</option>
            <option value="semiannually">Semi-Annually</option>
            <option value="quarterly">Quarterly</option>
            <option value="monthly">Monthly</option>
            <option value="daily">Daily</option>
          </select>
        </div>
      </div>

      {result ? (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-xs text-muted-foreground">Present Value</p>
            <p className="mt-1 text-3xl font-bold text-foreground">
              {fmt(result.presentValue)}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">Discount Amount</p>
              <p className="mt-1 text-xl font-bold text-foreground">
                {fmt(result.discountAmount)}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">Discount Factor</p>
              <p className="mt-1 text-xl font-bold text-foreground">
                {result.discountFactor.toFixed(6)}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">Effective Annual Rate</p>
              <p className="mt-1 text-xl font-bold text-foreground">
                {(result.effectiveRate * 100).toFixed(4)}%
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-muted p-4">
            <h3 className="mb-2 text-sm font-semibold text-foreground">Formula</h3>
            <p className="text-sm text-muted-foreground">
              PV = FV / (1 + r/m)<sup>m*n</sup> = {fmt(parseFloat(futureValue))} / (1 +{" "}
              {(parseFloat(discountRate) / 100).toFixed(4)}/{getPeriodsPerYear(compounding)})
              <sup>{result.totalPeriods}</sup> ={" "}
              <span className="font-semibold text-foreground">{fmt(result.presentValue)}</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-muted p-8 text-center text-muted-foreground">
          Enter valid values to calculate present value
        </div>
      )}
    </div>
  );
}
