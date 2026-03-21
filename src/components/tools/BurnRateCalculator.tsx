"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
const buttonClass =
  "rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90";
const cardClass = "rounded-xl border border-border bg-muted p-4 text-center";

export default function BurnRateCalculator() {
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [monthlyRevenue, setMonthlyRevenue] = useState("");
  const [cashReserves, setCashReserves] = useState("");
  const [results, setResults] = useState<{
    grossBurn: number;
    netBurn: number;
    runway: number;
  } | null>(null);

  const calculate = () => {
    const expenses = parseFloat(monthlyExpenses) || 0;
    const revenue = parseFloat(monthlyRevenue) || 0;
    const cash = parseFloat(cashReserves) || 0;

    const grossBurn = expenses;
    const netBurn = expenses - revenue;
    const runway = netBurn > 0 ? cash / netBurn : cash > 0 ? Infinity : 0;

    setResults({ grossBurn, netBurn, runway });
  };

  const formatCurrency = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Monthly Expenses ($)
          </label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 50000"
            value={monthlyExpenses}
            onChange={(e) => setMonthlyExpenses(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Monthly Revenue ($)
          </label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 15000"
            value={monthlyRevenue}
            onChange={(e) => setMonthlyRevenue(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Cash Reserves ($)
          </label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 500000"
            value={cashReserves}
            onChange={(e) => setCashReserves(e.target.value)}
          />
        </div>

        <button onClick={calculate} className={buttonClass}>
          Calculate Burn Rate
        </button>
      </div>

      {results && (
        <div className="grid gap-4 sm:grid-cols-3">
          <div className={cardClass}>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Gross Burn Rate
            </p>
            <p className="mt-1 text-2xl font-bold text-foreground">
              {formatCurrency(results.grossBurn)}
            </p>
            <p className="text-xs text-muted-foreground">per month</p>
          </div>

          <div className={cardClass}>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Net Burn Rate
            </p>
            <p
              className={`mt-1 text-2xl font-bold ${
                results.netBurn <= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {results.netBurn <= 0
                ? `+${formatCurrency(Math.abs(results.netBurn))}`
                : formatCurrency(results.netBurn)}
            </p>
            <p className="text-xs text-muted-foreground">per month</p>
          </div>

          <div className={cardClass}>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Runway
            </p>
            <p className="mt-1 text-2xl font-bold text-foreground">
              {results.runway === Infinity
                ? "Infinite"
                : `${results.runway.toFixed(1)} mo`}
            </p>
            <p className="text-xs text-muted-foreground">
              {results.runway === Infinity
                ? "Revenue covers expenses"
                : `~${Math.floor(results.runway / 12)}y ${Math.round(results.runway % 12)}m`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
