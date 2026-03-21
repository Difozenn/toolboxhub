"use client";
import { useState } from "react";

export default function ExponentCalculator() {
  const [base, setBase] = useState("");
  const [exp, setExp] = useState("");

  const b = parseFloat(base), e = parseFloat(exp);
  const valid = !isNaN(b) && !isNaN(e) && !(b < 0 && !Number.isInteger(e));
  const result = valid ? Math.pow(b, e) : null;
  const scientific = result !== null ? result.toExponential(4) : null;
  const isLarge = result !== null && (Math.abs(result) > 1e9 || (Math.abs(result) < 1e-4 && result !== 0));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground">Base (x)</label>
          <input type="number" value={base} onChange={e=>setBase(e.target.value)} placeholder="e.g. 2"
            className="w-full mt-1 p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Exponent (n)</label>
          <input type="number" value={exp} onChange={e=>setExp(e.target.value)} placeholder="e.g. 8"
            className="w-full mt-1 p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {[["Square","2"],["Cube","3"],["Sqrt","0.5"],["Cube Root","0.333"],["Reciprocal","-1"]].map(([label,v]) => (
          <button key={label} onClick={() => setExp(v)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-muted border border-border text-foreground hover:bg-muted/80 transition-colors">
            {label}
          </button>
        ))}
      </div>
      {result !== null && (
        <div className="p-4 rounded-xl bg-muted border border-border space-y-1">
          <p className="text-xs text-muted-foreground font-mono">{b}^{e} =</p>
          <p className="text-2xl font-bold text-primary">{isLarge ? scientific : result.toLocaleString(undefined,{maximumFractionDigits:8})}</p>
          {isLarge && <p className="text-xs text-muted-foreground">Standard: {result.toLocaleString(undefined,{maximumFractionDigits:2})}</p>}
        </div>
      )}
      {!valid && base && exp && <p className="text-sm text-red-500">Negative base with fractional exponent produces complex numbers.</p>}
    </div>
  );
}
