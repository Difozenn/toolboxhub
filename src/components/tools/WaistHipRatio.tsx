"use client";

import { useState } from "react";

function getRisk(whr: number, gender: "male" | "female"): { label: string; color: string; desc: string } {
  if (gender === "male") {
    if (whr < 0.90) return { label: "Low Risk", color: "text-green-500", desc: "Healthy range for men" };
    if (whr <= 0.99) return { label: "Moderate Risk", color: "text-yellow-500", desc: "Increased cardiovascular risk" };
    return { label: "High Risk", color: "text-red-500", desc: "High cardiovascular risk" };
  }
  if (whr < 0.80) return { label: "Low Risk", color: "text-green-500", desc: "Healthy range for women" };
  if (whr <= 0.84) return { label: "Moderate Risk", color: "text-yellow-500", desc: "Increased cardiovascular risk" };
  return { label: "High Risk", color: "text-red-500", desc: "High cardiovascular risk" };
}

export default function WaistHipRatio() {
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [result, setResult] = useState<{ whr: number; risk: ReturnType<typeof getRisk> } | null>(null);

  function calculate() {
    const w = parseFloat(waist), h = parseFloat(hip);
    if (!w || !h || w <= 0 || h <= 0) return;
    const whr = w / h;
    setResult({ whr, risk: getRisk(whr, gender) });
  }

  const inputCls = "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  const thresholds = gender === "male"
    ? [{ range: "< 0.90", label: "Low Risk", color: "text-green-500" }, { range: "0.90–0.99", label: "Moderate", color: "text-yellow-500" }, { range: "> 1.00", label: "High Risk", color: "text-red-500" }]
    : [{ range: "< 0.80", label: "Low Risk", color: "text-green-500" }, { range: "0.80–0.84", label: "Moderate", color: "text-yellow-500" }, { range: "> 0.85", label: "High Risk", color: "text-red-500" }];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Gender</label>
          <select value={gender} onChange={e => setGender(e.target.value as "male" | "female")} className={inputCls}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Waist (cm)</label>
          <input type="number" step="any" value={waist} onChange={e => setWaist(e.target.value)} placeholder="85" className={inputCls} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Hip (cm)</label>
          <input type="number" step="any" value={hip} onChange={e => setHip(e.target.value)} placeholder="95" className={inputCls} />
        </div>
      </div>

      <button onClick={calculate} className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-white hover:bg-primary/90 transition-colors cursor-pointer">
        Calculate WHR
      </button>

      {result && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-muted p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Waist-to-Hip Ratio</p>
            <p className="text-5xl font-bold text-primary">{result.whr.toFixed(2)}</p>
            <p className={`text-lg font-semibold mt-2 ${result.risk.color}`}>{result.risk.label}</p>
            <p className="text-sm text-muted-foreground mt-1">{result.risk.desc}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4">
            <p className="text-sm font-medium text-foreground mb-3">Reference Ranges ({gender === "male" ? "Male" : "Female"})</p>
            <div className="grid grid-cols-3 gap-2">
              {thresholds.map(t => (
                <div key={t.range} className="rounded-lg border border-border bg-background p-3 text-center">
                  <p className={`text-sm font-semibold ${t.color}`}>{t.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 font-mono">{t.range}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
