"use client";

import { useState } from "react";

export default function BmrCalculator() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmr, setBmr] = useState<number | null>(null);

  function calculate() {
    const a = parseFloat(age), w = parseFloat(weight), h = parseFloat(height);
    if (!a || !w || !h || a <= 0 || w <= 0 || h <= 0) return;
    const result = gender === "male"
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;
    setBmr(result);
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
      </div>

      <button onClick={calculate} className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-white hover:bg-primary/90 transition-colors cursor-pointer">
        Calculate BMR
      </button>

      {bmr !== null && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-muted p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Basal Metabolic Rate</p>
            <p className="text-5xl font-bold text-primary">{Math.round(bmr)}</p>
            <p className="text-sm text-muted-foreground mt-1">kcal/day</p>
          </div>
          <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">What is BMR?</p>
            Your Basal Metabolic Rate is the number of calories your body burns at complete rest to maintain basic functions like breathing and circulation. Multiply by your activity factor to get your daily calorie needs.
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { label: "Formula", value: "Mifflin-St Jeor" },
              { label: "Gender", value: gender === "male" ? "Male" : "Female" },
              { label: "Result", value: `${Math.round(bmr)} kcal` },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-lg border border-border bg-muted p-3 text-center">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-semibold text-foreground mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
