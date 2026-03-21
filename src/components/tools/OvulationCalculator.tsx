"use client";

import { useState } from "react";

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function fmt(d: Date): string {
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

export default function OvulationCalculator() {
  const [lmp, setLmp] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [result, setResult] = useState<{
    ovulation: Date;
    fertileStart: Date;
    fertileEnd: Date;
    nextPeriod: Date;
  } | null>(null);

  function calculate() {
    if (!lmp) return;
    const lmpDate = new Date(lmp);
    if (isNaN(lmpDate.getTime())) return;
    const cycle = parseInt(cycleLength) || 28;
    const ovulation = addDays(lmpDate, cycle - 14);
    const fertileStart = addDays(ovulation, -5);
    const fertileEnd = addDays(ovulation, 1);
    const nextPeriod = addDays(lmpDate, cycle);
    setResult({ ovulation, fertileStart, fertileEnd, nextPeriod });
  }

  const inputCls = "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">First Day of Last Period</label>
          <input type="date" value={lmp} onChange={e => setLmp(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Cycle Length (days)</label>
          <input type="number" value={cycleLength} onChange={e => setCycleLength(e.target.value)} placeholder="28" min="21" max="35" className={inputCls} />
        </div>
      </div>

      <button onClick={calculate} className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-white hover:bg-primary/90 transition-colors cursor-pointer">
        Calculate Ovulation
      </button>

      {result && (
        <div className="space-y-3">
          <div className="rounded-xl border border-primary/40 bg-primary/5 p-4">
            <p className="text-xs font-medium text-primary uppercase tracking-wide mb-1">Ovulation Day</p>
            <p className="text-lg font-bold text-foreground">{fmt(result.ovulation)}</p>
          </div>
          <div className="rounded-xl border border-green-500/40 bg-green-500/5 p-4">
            <p className="text-xs font-medium text-green-600 uppercase tracking-wide mb-1">Fertile Window</p>
            <p className="text-base font-semibold text-foreground">{fmt(result.fertileStart)} — {fmt(result.fertileEnd)}</p>
            <p className="text-xs text-muted-foreground mt-0.5">7-day window (5 days before + ovulation day + 1 after)</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Next Period Expected</p>
            <p className="text-base font-semibold text-foreground">{fmt(result.nextPeriod)}</p>
          </div>
          <p className="text-xs text-muted-foreground text-center">This is an estimate based on a regular cycle. Actual ovulation may vary.</p>
        </div>
      )}
    </div>
  );
}
