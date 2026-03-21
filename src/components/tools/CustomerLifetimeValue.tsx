"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
const buttonClass =
  "rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90";
const cardClass = "rounded-xl border border-border bg-muted p-4 text-center";

export default function CustomerLifetimeValue() {
  const [avgPurchase, setAvgPurchase] = useState("");
  const [frequency, setFrequency] = useState("");
  const [lifespan, setLifespan] = useState("");
  const [acquisitionCost, setAcquisitionCost] = useState("");
  const [results, setResults] = useState<{
    clv: number;
    netClv: number;
    roi: number;
    annualValue: number;
  } | null>(null);

  const calculate = () => {
    const apv = parseFloat(avgPurchase) || 0;
    const freq = parseFloat(frequency) || 0;
    const years = parseFloat(lifespan) || 0;
    const cac = parseFloat(acquisitionCost) || 0;

    const annualValue = apv * freq;
    const clv = annualValue * years;
    const netClv = clv - cac;
    const roi = cac > 0 ? ((netClv / cac) * 100) : 0;

    setResults({ clv, netClv, roi, annualValue });
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
            Average Purchase Value ($)
          </label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 50"
            value={avgPurchase}
            onChange={(e) => setAvgPurchase(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Purchase Frequency (per year)
          </label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 12"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Customer Lifespan (years)
          </label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 3"
            value={lifespan}
            onChange={(e) => setLifespan(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Customer Acquisition Cost ($)
          </label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 100"
            value={acquisitionCost}
            onChange={(e) => setAcquisitionCost(e.target.value)}
          />
        </div>
      </div>

      <button onClick={calculate} className={buttonClass}>
        Calculate CLV
      </button>

      {results && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className={cardClass}>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Annual Customer Value
              </p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {formatCurrency(results.annualValue)}
              </p>
              <p className="text-xs text-muted-foreground">per year</p>
            </div>

            <div className={cardClass}>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Customer Lifetime Value
              </p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {formatCurrency(results.clv)}
              </p>
              <p className="text-xs text-muted-foreground">gross CLV</p>
            </div>

            <div className={cardClass}>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Net CLV
              </p>
              <p
                className={`mt-1 text-2xl font-bold ${
                  results.netClv >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {formatCurrency(results.netClv)}
              </p>
              <p className="text-xs text-muted-foreground">after acquisition cost</p>
            </div>

            <div className={cardClass}>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                ROI
              </p>
              <p
                className={`mt-1 text-2xl font-bold ${
                  results.roi >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {results.roi.toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground">return on acquisition</p>
            </div>
          </div>

          <div className={cardClass}>
            <p className="text-sm text-muted-foreground">
              Each customer generates{" "}
              <span className="font-semibold text-foreground">
                {formatCurrency(results.annualValue)}
              </span>{" "}
              per year over{" "}
              <span className="font-semibold text-foreground">
                {lifespan} year{parseFloat(lifespan) !== 1 ? "s" : ""}
              </span>
              , resulting in a lifetime value of{" "}
              <span className="font-semibold text-foreground">
                {formatCurrency(results.clv)}
              </span>
              . After subtracting the{" "}
              <span className="font-semibold text-foreground">
                {formatCurrency(parseFloat(acquisitionCost) || 0)}
              </span>{" "}
              acquisition cost, the net value is{" "}
              <span
                className={`font-semibold ${
                  results.netClv >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {formatCurrency(results.netClv)}
              </span>
              .
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
