"use client";

import { useState } from "react";

function gcd(a: number, b: number): number { return b === 0 ? Math.abs(a) : gcd(b, a % b); }
function lcm(a: number, b: number): number { return Math.abs(a * b) / gcd(a, b); }

export default function GcdLcmCalculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState<{ gcdVal: number; lcmVal: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    const av = parseInt(a), bv = parseInt(b);
    if (isNaN(av) || isNaN(bv)) { setError("Please enter valid integers"); return; }
    if (av === 0 && bv === 0) { setError("Both numbers cannot be zero"); return; }
    setResult({ gcdVal: gcd(av, bv), lcmVal: av === 0 || bv === 0 ? 0 : lcm(av, bv) });
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2">
        {[{ label: "Number A", value: a, set: setA }, { label: "Number B", value: b, set: setB }].map(({ label, value, set }) => (
          <div key={label} className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">{label}</label>
            <input type="number" value={value} onChange={(e) => set(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && calculate()}
              placeholder="e.g. 12"
              className="w-full rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        ))}
      </div>
      <button onClick={calculate} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Calculate GCD & LCM</button>
      {error && <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">{error}</div>}
      {result && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-muted p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Greatest Common Divisor (GCD)</p>
            <p className="text-4xl font-bold text-primary">{result.gcdVal}</p>
            <p className="text-xs text-muted-foreground mt-2">Largest number that divides both</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Least Common Multiple (LCM)</p>
            <p className="text-4xl font-bold text-primary">{result.lcmVal}</p>
            <p className="text-xs text-muted-foreground mt-2">Smallest common multiple</p>
          </div>
        </div>
      )}
    </div>
  );
}
