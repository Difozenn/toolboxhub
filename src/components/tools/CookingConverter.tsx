"use client";

import { useState, useMemo, useCallback } from "react";

type Category = "volume" | "weight";

interface UnitDef {
  label: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

const UNITS: Record<Category, { label: string; units: Record<string, UnitDef> }> = {
  volume: {
    label: "Volume",
    units: {
      cup: { label: "Cups", toBase: (v) => v * 236.588, fromBase: (v) => v / 236.588 },
      tbsp: { label: "Tablespoons (tbsp)", toBase: (v) => v * 14.787, fromBase: (v) => v / 14.787 },
      tsp: { label: "Teaspoons (tsp)", toBase: (v) => v * 4.929, fromBase: (v) => v / 4.929 },
      ml: { label: "Milliliters (mL)", toBase: (v) => v, fromBase: (v) => v },
      l: { label: "Liters (L)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      floz: { label: "Fluid Ounces (fl oz)", toBase: (v) => v * 29.574, fromBase: (v) => v / 29.574 },
    },
  },
  weight: {
    label: "Weight",
    units: {
      g: { label: "Grams (g)", toBase: (v) => v, fromBase: (v) => v },
      kg: { label: "Kilograms (kg)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      oz: { label: "Ounces (oz)", toBase: (v) => v * 28.3495, fromBase: (v) => v / 28.3495 },
      lb: { label: "Pounds (lb)", toBase: (v) => v * 453.592, fromBase: (v) => v / 453.592 },
    },
  },
};

const QUICK_REFS = [
  { from: "1 cup", to: "16 tbsp / 48 tsp / 236.6 mL / 8 fl oz" },
  { from: "1 tbsp", to: "3 tsp / 14.8 mL / 0.5 fl oz" },
  { from: "1 tsp", to: "4.9 mL" },
  { from: "1 fl oz", to: "29.6 mL / 2 tbsp" },
  { from: "1 L", to: "4.23 cups / 33.8 fl oz" },
  { from: "1 oz", to: "28.35 g" },
  { from: "1 lb", to: "16 oz / 453.6 g" },
  { from: "1 kg", to: "2.205 lb / 35.27 oz" },
];

export default function CookingConverter() {
  const [category, setCategory] = useState<Category>("volume");
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [copied, setCopied] = useState(false);

  const catData = UNITS[category];
  const unitKeys = Object.keys(catData.units);
  const effectiveFrom = fromUnit && catData.units[fromUnit] ? fromUnit : unitKeys[0];
  const effectiveTo = toUnit && catData.units[toUnit] ? toUnit : unitKeys[1] ?? unitKeys[0];

  const result = useMemo(() => {
    const num = parseFloat(inputValue);
    if (isNaN(num)) return "";
    const baseVal = catData.units[effectiveFrom].toBase(num);
    const converted = catData.units[effectiveTo].fromBase(baseVal);
    return parseFloat(converted.toPrecision(8)).toString();
  }, [inputValue, effectiveFrom, effectiveTo, catData]);

  const swap = useCallback(() => {
    setFromUnit(effectiveTo);
    setToUnit(effectiveFrom);
    if (result) setInputValue(result);
  }, [effectiveFrom, effectiveTo, result]);

  const copyResult = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, [result]);

  return (
    <div className="space-y-6">
      {/* Category */}
      <div className="flex gap-2">
        {(Object.keys(UNITS) as Category[]).map((key) => (
          <button
            key={key}
            onClick={() => {
              setCategory(key);
              setFromUnit("");
              setToUnit("");
              setInputValue("");
            }}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              category === key
                ? "bg-primary text-white"
                : "border border-border bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            {UNITS[key].label}
          </button>
        ))}
      </div>

      {/* Converter */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr]">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">From</label>
          <select
            value={effectiveFrom}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {unitKeys.map((key) => (
              <option key={key} value={key}>{catData.units[key].label}</option>
            ))}
          </select>
          <input
            type="number"
            step="any"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter amount..."
            className="w-full rounded-lg border border-border bg-muted px-3 py-2.5 text-lg font-mono text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={swap}
            className="rounded-full border border-border bg-muted p-3 text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            aria-label="Swap units"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 16l-4-4 4-4" />
              <path d="M17 8l4 4-4 4" />
              <path d="M3 12h18" />
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">To</label>
          <select
            value={effectiveTo}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {unitKeys.map((key) => (
              <option key={key} value={key}>{catData.units[key].label}</option>
            ))}
          </select>
          <div className="flex gap-2">
            <div className="flex-1 rounded-lg border border-border bg-muted px-3 py-2.5 text-lg font-mono text-foreground min-h-[44px]">
              {result || <span className="text-muted-foreground">Result</span>}
            </div>
            <button
              onClick={copyResult}
              disabled={!result}
              className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>

      {/* Formula */}
      {result && inputValue && (
        <div className="rounded-xl border border-border bg-muted p-4 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-mono font-medium text-foreground">
              {inputValue} {catData.units[effectiveFrom].label}
            </span>
            {" = "}
            <span className="font-mono font-medium text-primary">
              {result} {catData.units[effectiveTo].label}
            </span>
          </p>
        </div>
      )}

      {/* Quick reference */}
      <div className="rounded-xl border border-border bg-muted p-5">
        <h3 className="text-sm font-medium text-foreground mb-3">Quick Reference</h3>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {QUICK_REFS.map((ref, idx) => (
            <div key={idx} className="flex gap-2 text-sm">
              <span className="font-medium text-foreground whitespace-nowrap">{ref.from}</span>
              <span className="text-muted-foreground">=</span>
              <span className="text-muted-foreground">{ref.to}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
