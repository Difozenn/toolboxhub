"use client";

import { useState } from "react";

const ZONES = [
  { name: "Zone 1", label: "Very Light", minPct: 50, maxPct: 60, color: "bg-blue-400", text: "text-blue-400", desc: "Recovery, warm-up" },
  { name: "Zone 2", label: "Light", minPct: 60, maxPct: 70, color: "bg-green-400", text: "text-green-400", desc: "Fat burning, base endurance" },
  { name: "Zone 3", label: "Moderate", minPct: 70, maxPct: 80, color: "bg-yellow-400", text: "text-yellow-400", desc: "Aerobic, improve fitness" },
  { name: "Zone 4", label: "Hard", minPct: 80, maxPct: 90, color: "bg-orange-400", text: "text-orange-400", desc: "Speed endurance, lactate threshold" },
  { name: "Zone 5", label: "Maximum", minPct: 90, maxPct: 100, color: "bg-red-500", text: "text-red-500", desc: "Max effort, speed" },
];

export default function HeartRateZones() {
  const [age, setAge] = useState("");
  const [restingHr, setRestingHr] = useState("");
  const [maxHr, setMaxHr] = useState<number | null>(null);

  function calculate() {
    const a = parseFloat(age);
    if (!a || a <= 0) return;
    setMaxHr(220 - a);
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
          <label className="mb-1 block text-sm font-medium text-foreground">Resting HR (optional, bpm)</label>
          <input type="number" value={restingHr} onChange={e => setRestingHr(e.target.value)} placeholder="60" className={inputCls} />
        </div>
      </div>

      <button onClick={calculate} className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-white hover:bg-primary/90 transition-colors cursor-pointer">
        Calculate Heart Rate Zones
      </button>

      {maxHr !== null && (
        <div className="space-y-3">
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Maximum Heart Rate</p>
            <p className="text-4xl font-bold text-primary">{maxHr} <span className="text-xl font-normal text-muted-foreground">bpm</span></p>
            <p className="text-xs text-muted-foreground mt-1">Formula: 220 − age</p>
          </div>
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted border-b border-border">
                  <th className="px-4 py-2.5 text-left text-muted-foreground font-medium">Zone</th>
                  <th className="px-4 py-2.5 text-left text-muted-foreground font-medium">Intensity</th>
                  <th className="px-4 py-2.5 text-right text-muted-foreground font-medium">Range (bpm)</th>
                  <th className="px-4 py-2.5 text-right text-muted-foreground font-medium hidden sm:table-cell">%</th>
                </tr>
              </thead>
              <tbody>
                {ZONES.map(z => {
                  const min = Math.round(maxHr * z.minPct / 100);
                  const max = Math.round(maxHr * z.maxPct / 100);
                  return (
                    <tr key={z.name} className="border-b border-border/50 hover:bg-muted/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${z.color}`} />
                          <span className={`font-semibold ${z.text}`}>{z.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-foreground">{z.label}</td>
                      <td className="px-4 py-3 text-right font-mono text-foreground">{min}–{max}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground hidden sm:table-cell">{z.minPct}–{z.maxPct}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
