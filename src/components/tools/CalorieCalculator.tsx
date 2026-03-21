"use client";

import { useState } from "react";

const ACTIVITY = [
  { label: "Sedentary (little/no exercise)", value: 1.2 },
  { label: "Light (1-3 days/week)", value: 1.375 },
  { label: "Moderate (3-5 days/week)", value: 1.55 },
  { label: "Very Active (6-7 days/week)", value: 1.725 },
  { label: "Extra Active (physical job)", value: 1.9 },
];

export default function CalorieCalculator() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState(1.2);
  const [result, setResult] = useState<{ bmr: number; maintenance: number; loss: number; gain: number } | null>(null);

  function calculate() {
    const a = parseFloat(age), w = parseFloat(weight), h = parseFloat(height);
    if (!a || !w || !h || a <= 0 || w <= 0 || h <= 0) return;
    const bmr = gender === "male"
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;
    const maintenance = bmr * activity;
    setResult({ bmr, maintenance, loss: maintenance - 500, gain: maintenance + 500 });
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
          <select value={activity} onChange={e => setActivity(parseFloat(e.target.value))} className={inputCls}>
            {ACTIVITY.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
          </select>
        </div>
      </div>

      <button onClick={calculate} className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-white hover:bg-primary/90 transition-colors cursor-pointer">
        Calculate Calories
      </button>

      {result && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "BMR", value: result.bmr, color: "text-primary" },
            { label: "Maintenance", value: result.maintenance, color: "text-green-500" },
            { label: "Weight Loss", value: result.loss, color: "text-blue-500" },
            { label: "Weight Gain", value: result.gain, color: "text-orange-500" },
          ].map(({ label, value, color }) => (
            <div key={label} className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">{label}</p>
              <p className={`text-xl font-bold ${color}`}>{Math.round(value)}</p>
              <p className="text-xs text-muted-foreground">kcal/day</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
