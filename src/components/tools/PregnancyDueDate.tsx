"use client";

import { useState } from "react";

function getTrimester(weeks: number): string {
  if (weeks < 0) return "Not yet pregnant";
  if (weeks <= 13) return "First Trimester";
  if (weeks <= 26) return "Second Trimester";
  if (weeks <= 40) return "Third Trimester";
  return "Past due date";
}

export default function PregnancyDueDate() {
  const [lmp, setLmp] = useState("");
  const [result, setResult] = useState<{ dueDate: string; weeksPregnant: number; daysRemaining: number; trimester: string } | null>(null);

  function calculate() {
    if (!lmp) return;
    const lmpDate = new Date(lmp);
    if (isNaN(lmpDate.getTime())) return;
    const dueDate = new Date(lmpDate);
    dueDate.setDate(dueDate.getDate() + 280);
    const today = new Date();
    const diffMs = today.getTime() - lmpDate.getTime();
    const weeksPregnant = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000));
    const daysRemaining = Math.max(0, Math.ceil((dueDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000)));
    setResult({
      dueDate: dueDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
      weeksPregnant: Math.max(0, weeksPregnant),
      daysRemaining,
      trimester: getTrimester(weeksPregnant),
    });
  }

  const inputCls = "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">First Day of Last Menstrual Period</label>
        <input type="date" value={lmp} onChange={e => setLmp(e.target.value)} className={inputCls} />
        <p className="mt-1 text-xs text-muted-foreground">Based on Naegele&apos;s rule: LMP + 280 days (40 weeks)</p>
      </div>

      <button onClick={calculate} className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-white hover:bg-primary/90 transition-colors cursor-pointer">
        Calculate Due Date
      </button>

      {result && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-muted p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Estimated Due Date</p>
            <p className="text-2xl font-bold text-primary">{result.dueDate}</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">Weeks Pregnant</p>
              <p className="text-2xl font-bold text-foreground">{result.weeksPregnant}</p>
              <p className="text-xs text-muted-foreground">weeks</p>
            </div>
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">Days Remaining</p>
              <p className="text-2xl font-bold text-foreground">{result.daysRemaining}</p>
              <p className="text-xs text-muted-foreground">days</p>
            </div>
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">Trimester</p>
              <p className="text-lg font-bold text-green-500">{result.trimester}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center">This is an estimate. Consult your healthcare provider for medical advice.</p>
        </div>
      )}
    </div>
  );
}
