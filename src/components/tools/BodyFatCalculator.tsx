"use client";

import { useState } from "react";

function getCategory(bf: number, gender: "male" | "female"): { label: string; color: string } {
  if (gender === "male") {
    if (bf < 6) return { label: "Essential Fat", color: "text-blue-500" };
    if (bf < 14) return { label: "Athletic", color: "text-green-500" };
    if (bf < 18) return { label: "Fitness", color: "text-green-400" };
    if (bf < 25) return { label: "Average", color: "text-yellow-500" };
    return { label: "Obese", color: "text-red-500" };
  }
  if (bf < 14) return { label: "Essential Fat", color: "text-blue-500" };
  if (bf < 21) return { label: "Athletic", color: "text-green-500" };
  if (bf < 25) return { label: "Fitness", color: "text-green-400" };
  if (bf < 32) return { label: "Average", color: "text-yellow-500" };
  return { label: "Obese", color: "text-red-500" };
}

export default function BodyFatCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [waist, setWaist] = useState("");
  const [neck, setNeck] = useState("");
  const [hip, setHip] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<number | null>(null);

  function calculate() {
    const w = parseFloat(waist), n = parseFloat(neck), h = parseFloat(height);
    if (!w || !n || !h || w <= n) return;
    let bf: number;
    if (gender === "male") {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
    } else {
      const hp = parseFloat(hip);
      if (!hp) return;
      bf = 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.22100 * Math.log10(h)) - 450;
    }
    setResult(Math.max(0, bf));
  }

  const inputCls = "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
  const category = result !== null ? getCategory(result, gender) : null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-foreground">Gender</label>
          <select value={gender} onChange={e => { setGender(e.target.value as "male" | "female"); setResult(null); }} className={inputCls}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Waist (cm)</label>
          <input type="number" value={waist} onChange={e => setWaist(e.target.value)} placeholder="85" className={inputCls} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Neck (cm)</label>
          <input type="number" value={neck} onChange={e => setNeck(e.target.value)} placeholder="38" className={inputCls} />
        </div>
        {gender === "female" && (
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Hip (cm)</label>
            <input type="number" value={hip} onChange={e => setHip(e.target.value)} placeholder="95" className={inputCls} />
          </div>
        )}
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Height (cm)</label>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="175" className={inputCls} />
        </div>
      </div>

      <button onClick={calculate} className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-white hover:bg-primary/90 transition-colors cursor-pointer">
        Calculate Body Fat
      </button>

      {result !== null && category && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-muted p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Body Fat Percentage</p>
            <p className="text-5xl font-bold text-primary">{result.toFixed(1)}%</p>
            <p className={`text-lg font-semibold mt-1 ${category.color}`}>{category.label}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4">
            <p className="text-sm font-medium text-foreground mb-2">Category Reference</p>
            <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
              {(gender === "male"
                ? [{ l: "Essential", r: "< 6%", c: "text-blue-500" }, { l: "Athletic", r: "6–13%", c: "text-green-500" }, { l: "Average", r: "18–24%", c: "text-yellow-500" }, { l: "Obese", r: "> 25%", c: "text-red-500" }]
                : [{ l: "Essential", r: "< 14%", c: "text-blue-500" }, { l: "Athletic", r: "14–20%", c: "text-green-500" }, { l: "Average", r: "25–31%", c: "text-yellow-500" }, { l: "Obese", r: "> 32%", c: "text-red-500" }]
              ).map(({ l, r, c }) => (
                <div key={l} className="rounded-lg border border-border bg-background p-2 text-center">
                  <p className={`font-semibold ${c}`}>{l}</p>
                  <p className="text-muted-foreground font-mono">{r}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">Method: US Navy formula</p>
          </div>
        </div>
      )}
    </div>
  );
}
