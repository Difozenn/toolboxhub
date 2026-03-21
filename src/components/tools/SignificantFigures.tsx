"use client";

import { useState } from "react";

function countSigFigs(s: string): number {
  const n = s.replace(/[+-]/, "").replace(/e.*/i, "");
  const [intPart, decPart] = n.split(".");
  if (decPart !== undefined) {
    return (intPart.replace(/^0+/, "") + decPart).replace(/^0+/, "").length;
  }
  const stripped = intPart.replace(/^0+/, "");
  const noTrailing = stripped.replace(/0+$/, "");
  return stripped.includes(".") ? stripped.length : noTrailing.length || 1;
}

export default function SignificantFigures() {
  const [input, setInput] = useState("");
  const [sigFigsTo, setSigFigsTo] = useState(3);
  const [result, setResult] = useState<{ count: number; rounded: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    const n = parseFloat(input);
    if (isNaN(n)) { setError("Please enter a valid number"); return; }
    const count = countSigFigs(input);
    const rounded = n.toPrecision(sigFigsTo);
    setResult({ count, rounded });
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Number</label>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && calculate()}
            placeholder="e.g. 0.00340 or 12300"
            className="w-full rounded-xl border border-border bg-muted px-4 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Round to sig figs</label>
          <input type="number" min={1} max={15} value={sigFigsTo} onChange={(e) => setSigFigsTo(Number(e.target.value))}
            className="w-full rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
      </div>
      <button onClick={calculate} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Calculate</button>
      {error && <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">{error}</div>}
      {result && (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-xs text-muted-foreground">Significant Figures in "{input}"</p>
            <p className="text-4xl font-bold text-primary">{result.count}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-xs text-muted-foreground">Rounded to {sigFigsTo} sig figs</p>
            <p className="text-2xl font-bold font-mono text-primary">{result.rounded}</p>
          </div>
        </div>
      )}
      <div className="rounded-xl border border-border bg-muted p-3 text-xs text-muted-foreground space-y-1">
        <p className="font-semibold">Rules for Significant Figures:</p>
        <ul className="list-disc list-inside space-y-0.5">
          <li>All non-zero digits are significant</li>
          <li>Zeros between non-zero digits are significant</li>
          <li>Leading zeros are NOT significant</li>
          <li>Trailing zeros after decimal ARE significant</li>
        </ul>
      </div>
    </div>
  );
}
