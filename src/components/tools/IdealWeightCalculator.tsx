"use client";

import { useState } from "react";

export default function IdealWeightCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<{ devine: number; robinson: number; miller: number; hamwi: number } | null>(null);

  function calculate() {
    const h = parseFloat(height);
    if (!h || h < 152) return;
    const inches = h / 2.54;
    const over60 = inches - 60;
    if (gender === "male") {
      setResult({
        devine: 50 + 2.3 * over60,
        robinson: 52 + 1.9 * over60,
        miller: 56.2 + 1.41 * over60,
        hamwi: 48 + 2.7 * over60,
      });
    } else {
      setResult({
        devine: 45.5 + 2.3 * over60,
        robinson: 49 + 1.7 * over60,
        miller: 53.1 + 1.36 * over60,
        hamwi: 45.5 + 2.2 * over60,
      });
    }
  }

  const inputCls = "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  const formulas = result
    ? [
        { name: "Devine", value: result.devine, note: "Most widely used" },
        { name: "Robinson", value: result.robinson, note: "Modified Devine" },
        { name: "Miller", value: result.miller, note: "Conservative estimate" },
        { name: "Hamwi", value: result.hamwi, note: "Frame-based" },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Gender</label>
          <select value={gender} onChange={e => setGender(e.target.value as "male" | "female")} className={inputCls}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Height (cm)</label>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="175" className={inputCls} />
        </div>
      </div>

      <button onClick={calculate} className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-white hover:bg-primary/90 transition-colors cursor-pointer">
        Calculate Ideal Weight
      </button>

      {result && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Ideal weight estimates using 4 clinical formulas:</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {formulas.map(({ name, value, note }) => (
              <div key={name} className="rounded-xl border border-border bg-muted p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{name} Formula</p>
                    <p className="text-xs text-muted-foreground">{note}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary">{value.toFixed(1)}</p>
                    <p className="text-xs text-muted-foreground">kg</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 text-sm text-muted-foreground">
            Average across formulas: <span className="font-semibold text-foreground">
              {((result.devine + result.robinson + result.miller + result.hamwi) / 4).toFixed(1)} kg
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
