"use client";

import { useState } from "react";

const ACTIVITY_LEVELS = [
  { label: "Sedentary (little/no exercise)", extra: 0 },
  { label: "Light (1-3 days/week)", extra: 0.35 },
  { label: "Moderate (3-5 days/week)", extra: 0.5 },
  { label: "Very Active (6-7 days/week)", extra: 0.6 },
  { label: "Extra Active (athlete/physical job)", extra: 0.7 },
];

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState(0);
  const [result, setResult] = useState<{ liters: number; glasses: number; base: number } | null>(null);

  function calculate() {
    const w = parseFloat(weight);
    if (!w || w <= 0) return;
    const base = w * 0.033;
    const total = base + activity;
    setResult({ liters: total, glasses: Math.round(total / 0.25), base });
  }

  const inputCls = "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Weight (kg)</label>
          <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="70" className={inputCls} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Activity Level</label>
          <select
            value={activity}
            onChange={e => setActivity(parseFloat(e.target.value))}
            className={inputCls}
          >
            {ACTIVITY_LEVELS.map(l => (
              <option key={l.extra} value={l.extra}>{l.label}</option>
            ))}
          </select>
        </div>
      </div>

      <button onClick={calculate} className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-white hover:bg-primary/90 transition-colors cursor-pointer">
        Calculate Water Intake
      </button>

      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-muted p-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Daily Water Intake</p>
              <p className="text-5xl font-bold text-primary">{result.liters.toFixed(1)}</p>
              <p className="text-sm text-muted-foreground mt-1">liters / day</p>
            </div>
            <div className="rounded-xl border border-border bg-muted p-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">In Glasses (250mL)</p>
              <p className="text-5xl font-bold text-blue-500">{result.glasses}</p>
              <p className="text-sm text-muted-foreground mt-1">glasses / day</p>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 space-y-2">
            <p className="text-sm font-medium text-foreground">Breakdown</p>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Base intake (weight × 0.033L)</span>
              <span className="font-medium text-foreground">{result.base.toFixed(2)} L</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Activity bonus</span>
              <span className="font-medium text-foreground">+{activity.toFixed(2)} L</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between text-sm font-semibold">
              <span className="text-foreground">Total</span>
              <span className="text-primary">{result.liters.toFixed(2)} L</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
