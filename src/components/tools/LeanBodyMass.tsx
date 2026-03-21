"use client";

import { useState } from "react";

export default function LeanBodyMass() {
  const [weight, setWeight] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [unit, setUnit] = useState<"lbs" | "kg">("lbs");

  const w = parseFloat(weight);
  const bf = parseFloat(bodyFat);
  const valid = !isNaN(w) && !isNaN(bf) && w > 0 && bf > 0 && bf < 100;

  const fatMass = valid ? w * (bf / 100) : null;
  const lbm = valid ? w - fatMass! : null;

  const toKg = (v: number) => unit === "lbs" ? (v * 0.453592).toFixed(1) : v.toFixed(1);
  const toLbs = (v: number) => unit === "lbs" ? v.toFixed(1) : (v * 2.20462).toFixed(1);

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {(["lbs","kg"] as const).map((u) => (
          <button key={u} onClick={() => setUnit(u)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${unit === u ? "bg-primary text-white" : "border border-border bg-background text-foreground hover:bg-muted"}`}>
            {u}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Total Body Weight ({unit})</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder={unit === "lbs" ? "e.g., 180" : "e.g., 82"}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Body Fat Percentage (%)</label>
          <input type="number" value={bodyFat} onChange={(e) => setBodyFat(e.target.value)} placeholder="e.g., 18" min="1" max="60"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
      </div>

      {lbm !== null && fatMass !== null && (
        <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-border bg-background p-4 text-center">
              <p className="text-3xl font-bold text-primary">{lbm.toFixed(1)}</p>
              <p className="text-xs text-muted-foreground mt-1">Lean Mass ({unit})</p>
            </div>
            <div className="rounded-lg border border-border bg-background p-4 text-center">
              <p className="text-3xl font-bold text-orange-500">{fatMass.toFixed(1)}</p>
              <p className="text-xs text-muted-foreground mt-1">Fat Mass ({unit})</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Lean Mass</span><span>Fat Mass</span>
            </div>
            <div className="h-4 w-full rounded-full overflow-hidden bg-orange-200 dark:bg-orange-900">
              <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${100 - bf}%` }} />
            </div>
            <div className="flex justify-between text-xs font-medium">
              <span className="text-primary">{(100 - bf).toFixed(1)}%</span>
              <span className="text-orange-500">{bf}%</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Suggested daily protein: <strong>{Math.round(lbm * (unit === "lbs" ? 1 : 2.2) * 0.82)} – {Math.round(lbm * (unit === "lbs" ? 1 : 2.2))} g</strong> (based on lean mass)
          </p>
        </div>
      )}
    </div>
  );
}
