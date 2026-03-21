"use client";

import { useState } from "react";

const GOALS = [
  { label: "Maintain Weight", value: "maintain", protein: 0.30, carbs: 0.40, fat: 0.30 },
  { label: "Lose Weight", value: "lose", protein: 0.40, carbs: 0.30, fat: 0.30 },
  { label: "Gain Weight / Muscle", value: "gain", protein: 0.25, carbs: 0.50, fat: 0.25 },
];

export default function MacroCalculator() {
  const [calories, setCalories] = useState("");
  const [goal, setGoal] = useState("maintain");
  const [result, setResult] = useState<{ protein: number; carbs: number; fat: number; ratios: typeof GOALS[0] } | null>(null);

  function calculate() {
    const cal = parseFloat(calories);
    if (!cal || cal <= 0) return;
    const ratios = GOALS.find(g => g.value === goal)!;
    setResult({
      protein: (cal * ratios.protein) / 4,
      carbs: (cal * ratios.carbs) / 4,
      fat: (cal * ratios.fat) / 9,
      ratios,
    });
  }

  const inputCls = "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Daily Calories (kcal)</label>
          <input type="number" value={calories} onChange={e => setCalories(e.target.value)} placeholder="2000" className={inputCls} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Goal</label>
          <select value={goal} onChange={e => setGoal(e.target.value)} className={inputCls}>
            {GOALS.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
          </select>
        </div>
      </div>

      <button onClick={calculate} className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-white hover:bg-primary/90 transition-colors cursor-pointer">
        Calculate Macros
      </button>

      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { label: "Protein", grams: result.protein, pct: result.ratios.protein, color: "text-blue-500", bg: "bg-blue-500" },
              { label: "Carbohydrates", grams: result.carbs, pct: result.ratios.carbs, color: "text-orange-500", bg: "bg-orange-500" },
              { label: "Fat", grams: result.fat, pct: result.ratios.fat, color: "text-yellow-500", bg: "bg-yellow-500" },
            ].map(({ label, grams, pct, color, bg }) => (
              <div key={label} className="rounded-xl border border-border bg-muted p-4 text-center">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className={`text-2xl font-bold ${color}`}>{Math.round(grams)}g</p>
                <p className="text-xs text-muted-foreground mt-1">{(pct * 100).toFixed(0)}% of calories</p>
                <div className="mt-2 h-1.5 rounded-full bg-border overflow-hidden">
                  <div className={`h-full rounded-full ${bg}`} style={{ width: `${pct * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-border bg-muted p-4">
            <p className="text-sm font-medium text-foreground mb-3">Calorie Breakdown</p>
            <div className="h-4 rounded-full overflow-hidden flex">
              <div className="bg-blue-500 transition-all" style={{ width: `${result.ratios.protein * 100}%` }} />
              <div className="bg-orange-500 transition-all" style={{ width: `${result.ratios.carbs * 100}%` }} />
              <div className="bg-yellow-500 transition-all" style={{ width: `${result.ratios.fat * 100}%` }} />
            </div>
            <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />Protein</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />Carbs</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500 inline-block" />Fat</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
