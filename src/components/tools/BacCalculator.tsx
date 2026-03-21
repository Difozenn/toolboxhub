"use client";

import { useState } from "react";

const DRINK_TYPES = [
  { label: "Beer (355mL, 5%)", value: "beer", alcoholG: 14 },
  { label: "Wine (148mL, 12%)", value: "wine", alcoholG: 14 },
  { label: "Spirit (44mL, 40%)", value: "spirit", alcoholG: 14 },
];

function getBacStatus(bac: number): { label: string; color: string; desc: string } {
  if (bac < 0.02) return { label: "Sober", color: "text-green-500", desc: "No noticeable effects" };
  if (bac < 0.05) return { label: "Mild Effects", color: "text-green-400", desc: "Slight relaxation, mild impairment" };
  if (bac < 0.08) return { label: "Legally Impaired", color: "text-yellow-500", desc: "Impaired judgment and coordination" };
  if (bac < 0.15) return { label: "Intoxicated", color: "text-orange-500", desc: "Significant impairment — do not drive" };
  return { label: "Heavily Intoxicated", color: "text-red-500", desc: "Dangerous — seek help if needed" };
}

export default function BacCalculator() {
  const [drinks, setDrinks] = useState("");
  const [drinkType, setDrinkType] = useState("beer");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [hours, setHours] = useState("");
  const [result, setResult] = useState<number | null>(null);

  function calculate() {
    const d = parseFloat(drinks), w = parseFloat(weight), h = parseFloat(hours);
    if (!d || !w || d <= 0 || w <= 0) return;
    const drink = DRINK_TYPES.find(t => t.value === drinkType)!;
    const totalAlcohol = d * drink.alcoholG;
    const r = gender === "male" ? 0.68 : 0.55;
    const rawBac = totalAlcohol / (w * 1000 * r) * 100;
    const bac = Math.max(0, rawBac - 0.015 * (h || 0));
    setResult(bac);
  }

  const inputCls = "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
  const status = result !== null ? getBacStatus(result) : null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Number of Drinks</label>
          <input type="number" value={drinks} onChange={e => setDrinks(e.target.value)} placeholder="3" className={inputCls} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Drink Type</label>
          <select value={drinkType} onChange={e => setDrinkType(e.target.value)} className={inputCls}>
            {DRINK_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Weight (kg)</label>
          <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="70" className={inputCls} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Gender</label>
          <select value={gender} onChange={e => setGender(e.target.value as "male" | "female")} className={inputCls}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-foreground">Hours Since First Drink</label>
          <input type="number" step="0.5" value={hours} onChange={e => setHours(e.target.value)} placeholder="2" className={inputCls} />
        </div>
      </div>

      <button onClick={calculate} className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-white hover:bg-primary/90 transition-colors cursor-pointer">
        Estimate BAC
      </button>

      {result !== null && status && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-muted p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Blood Alcohol Content</p>
            <p className="text-5xl font-bold text-primary">{result.toFixed(3)}</p>
            <p className="text-sm text-muted-foreground mt-1">% BAC</p>
            <p className={`text-lg font-semibold mt-2 ${status.color}`}>{status.label}</p>
            <p className="text-sm text-muted-foreground mt-1">{status.desc}</p>
          </div>
          <p className="text-xs text-muted-foreground text-center">This is an estimate only. Never drive after drinking. Legal limit is typically 0.08% BAC.</p>
        </div>
      )}
    </div>
  );
}
