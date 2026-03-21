"use client";

import { useState } from "react";

function gcd(a: number, b: number): number { return b === 0 ? a : gcd(b, a % b); }

export default function RatioCalculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [result, setResult] = useState<{ d: number; simplified: string } | null>(null);
  const [simplified, setSimplified] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const solve = () => {
    const av = parseFloat(a), bv = parseFloat(b), cv = parseFloat(c);
    if (isNaN(av) || isNaN(bv) || isNaN(cv)) { setError("Please fill A, B, and C"); return; }
    if (bv === 0) { setError("B cannot be zero"); return; }
    const d = (cv * bv) / av;
    const g = gcd(Math.round(av), Math.round(bv));
    const sA = Math.round(av) / g, sB = Math.round(bv) / g;
    setResult({ d, simplified: `${sA}:${sB}` });
    setError(null);
  };

  const simplifyRatio = () => {
    const av = parseFloat(a), bv = parseFloat(b);
    if (isNaN(av) || isNaN(bv) || av <= 0 || bv <= 0) { setError("Enter valid positive integers for A and B"); return; }
    const g = gcd(Math.round(av), Math.round(bv));
    setSimplified(`${Math.round(av)/g}:${Math.round(bv)/g}`);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Solve for missing value: A : B = C : ?</p>
        <div className="flex flex-wrap items-center gap-2 text-lg font-semibold">
          <input type="number" value={a} onChange={(e) => setA(e.target.value)} placeholder="A"
            className="w-20 rounded-xl border border-border bg-muted px-3 py-2 text-center text-sm text-foreground focus:border-primary focus:outline-none" />
          <span className="text-muted-foreground">:</span>
          <input type="number" value={b} onChange={(e) => setB(e.target.value)} placeholder="B"
            className="w-20 rounded-xl border border-border bg-muted px-3 py-2 text-center text-sm text-foreground focus:border-primary focus:outline-none" />
          <span className="text-muted-foreground">=</span>
          <input type="number" value={c} onChange={(e) => setC(e.target.value)} placeholder="C"
            className="w-20 rounded-xl border border-border bg-muted px-3 py-2 text-center text-sm text-foreground focus:border-primary focus:outline-none" />
          <span className="text-muted-foreground">: ?</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={solve} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Solve</button>
          <button onClick={simplifyRatio} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">Simplify A:B</button>
        </div>
      </div>
      {error && <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">{error}</div>}
      {result && (
        <div className="rounded-xl border border-border bg-muted p-4 space-y-2">
          <p className="text-sm text-muted-foreground">Missing value:</p>
          <p className="text-3xl font-bold text-primary">{result.d.toFixed(4).replace(/\.?0+$/, "")}</p>
          <p className="text-sm text-muted-foreground">Simplified ratio: <span className="font-semibold text-foreground">{result.simplified}</span></p>
        </div>
      )}
      {simplified && (
        <div className="rounded-xl border border-border bg-muted p-4">
          <p className="text-sm text-muted-foreground">Simplified A:B</p>
          <p className="text-2xl font-bold text-primary">{simplified}</p>
        </div>
      )}
    </div>
  );
}
