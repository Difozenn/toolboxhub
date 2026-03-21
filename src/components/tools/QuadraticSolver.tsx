"use client";

import { useState } from "react";

export default function QuadraticSolver() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [result, setResult] = useState<{ type: string; roots: string[]; vertex: string; discriminant: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const solve = () => {
    const av = parseFloat(a), bv = parseFloat(b), cv = parseFloat(c);
    if (isNaN(av) || isNaN(bv) || isNaN(cv)) { setError("Please enter valid numbers"); return; }
    if (av === 0) { setError("'a' cannot be zero (not a quadratic)"); return; }
    const d = bv * bv - 4 * av * cv;
    const vx = (-bv / (2 * av)).toFixed(4).replace(/\.?0+$/, "");
    const vy = (cv - (bv * bv) / (4 * av)).toFixed(4).replace(/\.?0+$/, "");
    let roots: string[] = [];
    let type = "";
    if (d > 0) {
      type = "Two real roots";
      const r1 = ((-bv + Math.sqrt(d)) / (2 * av)).toFixed(6).replace(/\.?0+$/, "");
      const r2 = ((-bv - Math.sqrt(d)) / (2 * av)).toFixed(6).replace(/\.?0+$/, "");
      roots = [r1, r2];
    } else if (d === 0) {
      type = "One real root (repeated)";
      roots = [(-bv / (2 * av)).toFixed(6).replace(/\.?0+$/, "")];
    } else {
      type = "Two complex roots";
      const re = (-bv / (2 * av)).toFixed(4).replace(/\.?0+$/, "");
      const im = (Math.sqrt(-d) / (2 * av)).toFixed(4).replace(/\.?0+$/, "");
      roots = [`${re} + ${im}i`, `${re} - ${im}i`];
    }
    setResult({ type, roots, vertex: `(${vx}, ${vy})`, discriminant: d });
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-4 text-center font-mono text-lg text-foreground">
        ax² + bx + c = 0
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[{ label: "a", value: a, set: setA }, { label: "b", value: b, set: setB }, { label: "c", value: c, set: setC }].map(({ label, value, set }) => (
          <div key={label} className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">{label}</label>
            <input type="number" value={value} onChange={(e) => set(e.target.value)}
              placeholder="0"
              className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-center text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        ))}
      </div>
      <button onClick={solve} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Solve</button>
      {error && <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">{error}</div>}
      {result && (
        <div className="rounded-xl border border-border bg-muted p-4 space-y-3">
          <p className="font-semibold text-foreground">{result.type}</p>
          <div className="space-y-1">
            {result.roots.map((r, i) => (
              <div key={i} className="flex items-center gap-2 font-mono">
                <span className="text-muted-foreground">x{result.roots.length > 1 ? `${i+1}` : ""} =</span>
                <span className="text-lg font-bold text-primary">{r}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Discriminant: <span className="font-semibold text-foreground">{result.discriminant}</span></p>
          <p className="text-sm text-muted-foreground">Vertex: <span className="font-semibold text-foreground">{result.vertex}</span></p>
        </div>
      )}
    </div>
  );
}
