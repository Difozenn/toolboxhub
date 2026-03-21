"use client";

import { useState } from "react";

const ATOMIC_WEIGHTS: Record<string, number> = {
  H: 1.008, He: 4.003, Li: 6.941, Be: 9.012, B: 10.81, C: 12.01, N: 14.01, O: 15.99,
  F: 19.00, Ne: 20.18, Na: 22.99, Mg: 24.31, Al: 26.98, Si: 28.09, P: 30.97, S: 32.07,
  Cl: 35.45, Ar: 39.95, K: 39.10, Ca: 40.08, Fe: 55.85, Cu: 63.55, Zn: 65.38, Br: 79.90,
  I: 126.9, Ba: 137.3, Pb: 207.2, Ag: 107.9, Au: 197.0, Hg: 200.6, Mn: 54.94, Co: 58.93,
  Ni: 58.69, Cr: 52.00, Ti: 47.87, V: 50.94, Se: 78.97, Mo: 95.95,
};

export default function MolecularWeight() {
  const [formula, setFormula] = useState("");
  const [result, setResult] = useState<{ weight: number; elements: { sym: string; count: number; weight: number }[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    const parsed: Record<string, number> = {};
    const regex = /([A-Z][a-z]?)(\d*)/g;
    let match;
    while ((match = regex.exec(formula)) !== null) {
      if (!match[1]) continue;
      const sym = match[1], cnt = parseInt(match[2] || "1");
      if (!(sym in ATOMIC_WEIGHTS)) { setError(`Unknown element: ${sym}`); return; }
      parsed[sym] = (parsed[sym] || 0) + cnt;
    }
    if (Object.keys(parsed).length === 0) { setError("No valid elements found"); return; }
    const elements = Object.entries(parsed).map(([sym, count]) => ({ sym, count, weight: ATOMIC_WEIGHTS[sym] * count }));
    const totalWeight = elements.reduce((s, e) => s + e.weight, 0);
    setResult({ weight: totalWeight, elements });
    setError(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input type="text" value={formula} onChange={(e) => setFormula(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && calculate()}
          placeholder="e.g. H2O, NaCl, C6H12O6, CH3COOH"
          className="flex-1 rounded-xl border border-border bg-muted px-4 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        <button onClick={calculate} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Calculate</button>
      </div>
      {error && <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">{error}</div>}
      {result && (
        <div className="space-y-3">
          <div className="rounded-xl border border-primary bg-primary/5 p-4 text-center">
            <p className="text-xs text-muted-foreground">Molecular Weight of {formula}</p>
            <p className="text-3xl font-bold text-primary">{result.weight.toFixed(3)} g/mol</p>
          </div>
          <div className="rounded-xl border border-border bg-muted overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border"><th className="px-4 py-2 text-left text-xs text-muted-foreground">Element</th><th className="px-4 py-2 text-right text-xs text-muted-foreground">Count</th><th className="px-4 py-2 text-right text-xs text-muted-foreground">Atomic Weight</th><th className="px-4 py-2 text-right text-xs text-muted-foreground">Total</th></tr></thead>
              <tbody>
                {result.elements.map((e) => (
                  <tr key={e.sym} className="border-b border-border last:border-0">
                    <td className="px-4 py-2 font-semibold text-primary">{e.sym}</td>
                    <td className="px-4 py-2 text-right">{e.count}</td>
                    <td className="px-4 py-2 text-right font-mono">{ATOMIC_WEIGHTS[e.sym]}</td>
                    <td className="px-4 py-2 text-right font-mono">{e.weight.toFixed(3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
