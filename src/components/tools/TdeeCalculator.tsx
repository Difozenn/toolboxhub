"use client";

import { useState } from "react";

const ACTIVITY_LEVELS = [
  { label: "Sedentary (desk job, little exercise)", value: 1.2 },
  { label: "Light (1-3 days/week)", value: 1.375 },
  { label: "Moderate (3-5 days/week)", value: 1.55 },
  { label: "Very Active (6-7 days/week)", value: 1.725 },
  { label: "Extra Active (physical job + training)", value: 1.9 },
];

export default function TdeeCalculator() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activityFactor, setActivityFactor] = useState(1.55);
  const [result, setResult] = useState<{ bmr: number; tdee: number; factor: number } | null>(null);

  function calculate() {
    const a = parseFloat(age), w = parseFloat(weight), h = parseFloat(height);
    if (!a || !w || !h || a <= 0 || w <= 0 || h <= 0) return;
    const bmr = gender === "male"
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;
    setResult({ bmr, tdee: bmr * activityFactor, factor: activityFactor });
  }

  const inputCls = "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Age (years)</label>
          <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="30" className={inputCls} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Gender</label>
          <select value={gender} onChange={e => setGender(e.target.value as "male" | "female")} className={inputCls}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Weight (kg)</label>
          <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="70" className={inputCls} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Height (cm)</label>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="175" className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-foreground">Activity Level</label>
          <select value={activityFactor} onChange={e => setActivityFactor(parseFloat(e.target.value))} className={inputCls}>
            {ACTIVITY_LEVELS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
          </select>
        </div>
      </div>

      <button onClick={calculate} className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-white hover:bg-primary/90 transition-colors cursor-pointer">
        Calculate TDEE
      </button>

      {result && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-muted p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Total Daily Energy Expenditure</p>
            <p className="text-5xl font-bold text-primary">{Math.round(result.tdee)}</p>
            <p className="text-sm text-muted-foreground mt-1">kcal/day</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">BMR</p>
              <p className="text-lg font-bold text-foreground">{Math.round(result.bmr)}</p>
              <p className="text-xs text-muted-foreground">kcal</p>
            </div>
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">Activity Factor</p>
              <p className="text-lg font-bold text-foreground">{result.factor}x</p>
            </div>
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">TDEE</p>
              <p className="text-lg font-bold text-green-500">{Math.round(result.tdee)}</p>
              <p className="text-xs text-muted-foreground">kcal</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
