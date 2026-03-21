"use client";
import { useState } from "react";

function factorial(n: number): number {
  if (n <= 1) return 1;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

function permutation(n: number, r: number): number {
  if (r > n) return 0;
  return factorial(n) / factorial(n - r);
}

export default function PermutationCalculator() {
  const [n, setN] = useState("10");
  const [r, setR] = useState("3");
  const nv = parseInt(n), rv = parseInt(r);
  const valid = !isNaN(nv) && !isNaN(rv) && nv >= 0 && rv >= 0 && rv <= nv && nv <= 20;
  const result = valid ? permutation(nv, rv) : null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground">n (total items)</label>
          <input type="number" value={n} onChange={e=>setN(e.target.value)} min="0" max="20" placeholder="n"
            className="w-full mt-1 p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">r (items to arrange)</label>
          <input type="number" value={r} onChange={e=>setR(e.target.value)} min="0" max="20" placeholder="r"
            className="w-full mt-1 p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
      </div>
      {valid && (
        <div className="space-y-2">
          <div className="p-4 rounded-xl bg-muted border border-border text-center">
            <p className="text-xs text-muted-foreground">P({nv},{rv}) = {nv}! / ({nv}-{rv})!</p>
            <p className="text-3xl font-bold text-primary mt-2">{result?.toLocaleString()}</p>
          </div>
          <p className="text-xs text-muted-foreground text-center">The number of ordered arrangements of {rv} items from {nv}</p>
        </div>
      )}
      {!valid && (n||r) && <p className="text-sm text-red-500">Ensure 0 ≤ r ≤ n ≤ 20</p>}
    </div>
  );
}
