"use client";

import { useState } from "react";

const GOALS = [
  { label: "Sedentary (minimal activity)", value: "sedentary", factor: 0.8, desc: "RDA minimum for basic health" },
  { label: "Active (regular exercise)", value: "active", factor: 1.2, desc: "Supports general fitness" },
  { label: "Muscle Building", value: "muscle", factor: 1.6, desc: "Supports hypertrophy" },
  { label: "Athlete (intense training)", value: "athlete", factor: 2.0, desc: "High-performance demands" },
];

export default function ProteinIntakeCalculator() {
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("active");
  const [result, setResult] = useState<{ grams: number; perMeal: number; factor: number; goalObj: typeof GOALS[0] } | null>(null);

  function calculate() {
    const w = parseFloat(weight);
    if (!w || w <= 0) return;
    const goalObj = GOALS.find(g => g.value === goal)!;
    const grams = w * goalObj.factor;
    setResult({ grams, perMeal: grams / 3, factor: goalObj.factor, goalObj });
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
          <label className="mb-1 block text-sm font-medium text-foreground">Goal</label>
          <select value={goal} onChange={e => setGoal(e.target.value)} className={inputCls}>
            {GOALS.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
          </select>
        </div>
      </div>

      <button onClick={calculate} className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-white hover:bg-primary/90 transition-colors cursor-pointer">
        Calculate Protein Intake
      </button>

      {result && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-muted p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Daily Protein Target</p>
            <p className="text-5xl font-bold text-primary">{Math.round(result.grams)}<span className="text-2xl font-normal text-muted-foreground">g</span></p>
            <p className="text-sm text-muted-foreground mt-1">{result.factor}g per kg bodyweight</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">Per Meal (3 meals)</p>
              <p className="text-2xl font-bold text-foreground">{Math.round(result.perMeal)}g</p>
            </div>
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">As Calories</p>
              <p className="text-2xl font-bold text-foreground">{Math.round(result.grams * 4)}</p>
              <p className="text-xs text-muted-foreground">kcal</p>
            </div>
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">Goal</p>
              <p className="text-sm font-bold text-green-500">{result.goalObj.label.split("(")[0].trim()}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{result.goalObj.desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
