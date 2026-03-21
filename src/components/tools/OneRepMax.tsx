"use client";

import { useState } from "react";

const PERCENTAGES = [
  { label: "1 Rep Max (100%)", pct: 1.0, rms: "1RM" },
  { label: "3 Rep Max (93%)", pct: 0.93, rms: "3RM" },
  { label: "5 Rep Max (87%)", pct: 0.87, rms: "5RM" },
  { label: "8 Rep Max (80%)", pct: 0.80, rms: "8RM" },
  { label: "10 Rep Max (75%)", pct: 0.75, rms: "10RM" },
];

export default function OneRepMax() {
  const [weightLifted, setWeightLifted] = useState("");
  const [reps, setReps] = useState("");
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");
  const [oneRM, setOneRM] = useState<number | null>(null);

  function calculate() {
    const w = parseFloat(weightLifted);
    const r = parseFloat(reps);
    if (!w || !r || w <= 0 || r <= 0) return;
    // Epley formula
    setOneRM(w * (1 + r / 30));
  }

  const inputCls = "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Weight Lifted</label>
          <div className="flex gap-2">
            <input type="number" step="any" value={weightLifted} onChange={e => setWeightLifted(e.target.value)} placeholder="100" className={`${inputCls} flex-1`} />
            <div className="flex rounded-lg border border-border overflow-hidden">
              <button onClick={() => setUnit("kg")} className={`px-3 py-2 text-sm font-medium transition-colors ${unit === "kg" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-primary/10"}`}>kg</button>
              <button onClick={() => setUnit("lbs")} className={`px-3 py-2 text-sm font-medium transition-colors ${unit === "lbs" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-primary/10"}`}>lbs</button>
            </div>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Reps Performed</label>
          <input type="number" value={reps} onChange={e => setReps(e.target.value)} placeholder="5" className={inputCls} />
        </div>
      </div>

      <button onClick={calculate} className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-white hover:bg-primary/90 transition-colors cursor-pointer">
        Calculate 1RM
      </button>

      {oneRM !== null && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-muted p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Estimated 1 Rep Max</p>
            <p className="text-5xl font-bold text-primary">{Math.round(oneRM)}</p>
            <p className="text-sm text-muted-foreground mt-1">{unit} (Epley formula)</p>
          </div>
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted border-b border-border">
                  <th className="px-4 py-2.5 text-left text-muted-foreground font-medium">Rep Range</th>
                  <th className="px-4 py-2.5 text-right text-muted-foreground font-medium">Weight ({unit})</th>
                  <th className="px-4 py-2.5 text-right text-muted-foreground font-medium">% of 1RM</th>
                </tr>
              </thead>
              <tbody>
                {PERCENTAGES.map(({ label, pct, rms }) => (
                  <tr key={rms} className={`border-b border-border/50 ${rms === "1RM" ? "bg-primary/5" : "hover:bg-muted/50"}`}>
                    <td className="px-4 py-3 font-medium text-foreground">{label}</td>
                    <td className="px-4 py-3 text-right font-mono font-semibold text-foreground">{Math.round(oneRM * pct)}</td>
                    <td className="px-4 py-3 text-right text-muted-foreground">{(pct * 100).toFixed(0)}%</td>
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
