"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
const buttonClass =
  "rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90";
const cardClass = "rounded-xl border border-border bg-muted p-4 text-center";

interface CityExpenses {
  rent: string;
  groceries: string;
  transport: string;
  utilities: string;
  entertainment: string;
}

const emptyCity: CityExpenses = {
  rent: "",
  groceries: "",
  transport: "",
  utilities: "",
  entertainment: "",
};

const categories: { key: keyof CityExpenses; label: string }[] = [
  { key: "rent", label: "Rent / Housing" },
  { key: "groceries", label: "Groceries" },
  { key: "transport", label: "Transportation" },
  { key: "utilities", label: "Utilities" },
  { key: "entertainment", label: "Entertainment" },
];

export default function CostOfLivingCalculator() {
  const [cityAName, setCityAName] = useState("City A");
  const [cityBName, setCityBName] = useState("City B");
  const [cityA, setCityA] = useState<CityExpenses>({ ...emptyCity });
  const [cityB, setCityB] = useState<CityExpenses>({ ...emptyCity });
  const [compared, setCompared] = useState(false);

  const updateCity = (
    city: "A" | "B",
    key: keyof CityExpenses,
    value: string
  ) => {
    if (city === "A") setCityA((prev) => ({ ...prev, [key]: value }));
    else setCityB((prev) => ({ ...prev, [key]: value }));
  };

  const getTotal = (city: CityExpenses) =>
    Object.values(city).reduce((sum, v) => sum + (parseFloat(v) || 0), 0);

  const pctDiff = (a: number, b: number) => {
    if (a === 0 && b === 0) return 0;
    if (a === 0) return 100;
    return ((b - a) / a) * 100;
  };

  const totalA = getTotal(cityA);
  const totalB = getTotal(cityB);
  const overallDiff = pctDiff(totalA, totalB);

  const formatCurrency = (n: number) =>
    n.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  const formatPct = (n: number) => {
    const sign = n > 0 ? "+" : "";
    return `${sign}${n.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* City A */}
        <div className="space-y-3">
          <input
            className={inputClass + " font-semibold"}
            value={cityAName}
            onChange={(e) => setCityAName(e.target.value)}
            placeholder="City A Name"
          />
          {categories.map((cat) => (
            <div key={cat.key}>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                {cat.label} ($/month)
              </label>
              <input
                type="number"
                className={inputClass}
                placeholder="0"
                value={cityA[cat.key]}
                onChange={(e) => updateCity("A", cat.key, e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* City B */}
        <div className="space-y-3">
          <input
            className={inputClass + " font-semibold"}
            value={cityBName}
            onChange={(e) => setCityBName(e.target.value)}
            placeholder="City B Name"
          />
          {categories.map((cat) => (
            <div key={cat.key}>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                {cat.label} ($/month)
              </label>
              <input
                type="number"
                className={inputClass}
                placeholder="0"
                value={cityB[cat.key]}
                onChange={(e) => updateCity("B", cat.key, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => setCompared(true)} className={buttonClass}>
        Compare Costs
      </button>

      {compared && (
        <div className="space-y-4">
          <div className={cardClass}>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Overall Difference
            </p>
            <p
              className={`mt-1 text-3xl font-bold ${
                overallDiff > 0 ? "text-red-500" : overallDiff < 0 ? "text-green-500" : "text-foreground"
              }`}
            >
              {formatPct(overallDiff)}
            </p>
            <p className="text-sm text-muted-foreground">
              {cityBName} is{" "}
              {overallDiff > 0
                ? `${Math.abs(overallDiff).toFixed(1)}% more expensive`
                : overallDiff < 0
                ? `${Math.abs(overallDiff).toFixed(1)}% cheaper`
                : "the same cost"}{" "}
              than {cityAName}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => {
              const a = parseFloat(cityA[cat.key]) || 0;
              const b = parseFloat(cityB[cat.key]) || 0;
              const diff = pctDiff(a, b);
              return (
                <div key={cat.key} className={cardClass}>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {cat.label}
                  </p>
                  <div className="mt-2 flex items-center justify-center gap-3 text-sm">
                    <span className="text-foreground">
                      {formatCurrency(a)}
                    </span>
                    <span className="text-muted-foreground">vs</span>
                    <span className="text-foreground">
                      {formatCurrency(b)}
                    </span>
                  </div>
                  <p
                    className={`mt-1 text-sm font-semibold ${
                      diff > 0
                        ? "text-red-500"
                        : diff < 0
                        ? "text-green-500"
                        : "text-muted-foreground"
                    }`}
                  >
                    {formatPct(diff)}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className={cardClass}>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {cityAName} Total
              </p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {formatCurrency(totalA)}
              </p>
              <p className="text-xs text-muted-foreground">per month</p>
            </div>
            <div className={cardClass}>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {cityBName} Total
              </p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {formatCurrency(totalB)}
              </p>
              <p className="text-xs text-muted-foreground">per month</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
