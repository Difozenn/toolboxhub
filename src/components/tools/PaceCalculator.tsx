"use client";

import { useState } from "react";

function parseTime(hh: string, mm: string, ss: string): number | null {
  const h = parseInt(hh) || 0;
  const m = parseInt(mm) || 0;
  const s = parseInt(ss) || 0;
  if (h === 0 && m === 0 && s === 0) return null;
  return h * 3600 + m * 60 + s;
}

function fmtPace(secsPerUnit: number): string {
  const mins = Math.floor(secsPerUnit / 60);
  const secs = Math.round(secsPerUnit % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function PaceCalculator() {
  const [distance, setDistance] = useState("");
  const [unit, setUnit] = useState<"km" | "mi">("km");
  const [hh, setHh] = useState("");
  const [mm, setMm] = useState("");
  const [ss, setSs] = useState("");
  const [result, setResult] = useState<{ pace: string; speed: number; paceUnit: string; speedUnit: string } | null>(null);

  function calculate() {
    const dist = parseFloat(distance);
    const totalSecs = parseTime(hh, mm, ss);
    if (!dist || dist <= 0 || !totalSecs) return;
    const secsPerUnit = totalSecs / dist;
    const speed = (dist / totalSecs) * 3600;
    setResult({
      pace: fmtPace(secsPerUnit),
      speed,
      paceUnit: unit === "km" ? "min/km" : "min/mi",
      speedUnit: unit === "km" ? "km/h" : "mph",
    });
  }

  const inputCls = "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">Distance</label>
        <div className="flex gap-2">
          <input type="number" step="any" value={distance} onChange={e => setDistance(e.target.value)} placeholder="10" className={`${inputCls} flex-1`} />
          <div className="flex rounded-lg border border-border overflow-hidden">
            <button onClick={() => setUnit("km")} className={`px-3 py-2 text-sm font-medium transition-colors ${unit === "km" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-primary/10"}`}>km</button>
            <button onClick={() => setUnit("mi")} className={`px-3 py-2 text-sm font-medium transition-colors ${unit === "mi" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-primary/10"}`}>mi</button>
          </div>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">Time (HH : MM : SS)</label>
        <div className="flex gap-2">
          {[
            { val: hh, set: setHh, placeholder: "00", label: "HH" },
            { val: mm, set: setMm, placeholder: "45", label: "MM" },
            { val: ss, set: setSs, placeholder: "00", label: "SS" },
          ].map(({ val, set, placeholder, label }) => (
            <div key={label} className="flex-1">
              <input type="number" min="0" value={val} onChange={e => set(e.target.value)} placeholder={placeholder} className={inputCls} />
              <p className="text-center text-xs text-muted-foreground mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <button onClick={calculate} className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-white hover:bg-primary/90 transition-colors cursor-pointer">
        Calculate Pace
      </button>

      {result && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-muted p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Pace</p>
            <p className="text-4xl font-bold text-primary">{result.pace}</p>
            <p className="text-sm text-muted-foreground mt-1">{result.paceUnit}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Speed</p>
            <p className="text-4xl font-bold text-green-500">{result.speed.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-1">{result.speedUnit}</p>
          </div>
        </div>
      )}
    </div>
  );
}
