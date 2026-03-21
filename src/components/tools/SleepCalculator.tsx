"use client";

import { useState } from "react";

function addMinutes(base: Date, mins: number): string {
  const d = new Date(base.getTime() + mins * 60000);
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
}

function subtractMinutes(base: Date, mins: number): string {
  const d = new Date(base.getTime() - mins * 60000);
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
}

const CYCLES = [5, 6];
const CYCLE_MINS = 90;
const FALL_ASLEEP_MINS = 14;

export default function SleepCalculator() {
  const [mode, setMode] = useState<"bedtime" | "wakeup">("wakeup");
  const [time, setTime] = useState("");
  const [results, setResults] = useState<string[]>([]);

  function calculate() {
    if (!time) return;
    const [rawH, rawM] = time.split(":").map(Number);
    const base = new Date();
    base.setHours(rawH, rawM, 0, 0);
    const times: string[] = [];

    if (mode === "wakeup") {
      // User wants to wake up at X — show optimal bedtimes
      CYCLES.forEach(c => {
        const sleepMins = c * CYCLE_MINS + FALL_ASLEEP_MINS;
        times.push(`${c} cycles (${c * 1.5}h) — Sleep at: ${subtractMinutes(base, sleepMins)}`);
      });
      // Also add 4-cycle option
      const mins4 = 4 * CYCLE_MINS + FALL_ASLEEP_MINS;
      times.unshift(`4 cycles (6h) — Sleep at: ${subtractMinutes(base, mins4)}`);
    } else {
      // User wants to go to bed at X — show optimal wake times
      CYCLES.forEach(c => {
        const sleepMins = c * CYCLE_MINS + FALL_ASLEEP_MINS;
        times.push(`${c} cycles (${c * 1.5}h) — Wake at: ${addMinutes(base, sleepMins)}`);
      });
      const mins4 = 4 * CYCLE_MINS + FALL_ASLEEP_MINS;
      times.unshift(`4 cycles (6h) — Wake at: ${addMinutes(base, mins4)}`);
    }
    setResults(times);
  }

  const inputCls = "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div className="space-y-6">
      <div className="flex rounded-lg border border-border overflow-hidden">
        <button onClick={() => { setMode("wakeup"); setResults([]); }} className={`flex-1 py-2 text-sm font-medium transition-colors ${mode === "wakeup" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-primary/10"}`}>
          I want to wake up at...
        </button>
        <button onClick={() => { setMode("bedtime"); setResults([]); }} className={`flex-1 py-2 text-sm font-medium transition-colors ${mode === "bedtime" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-primary/10"}`}>
          I want to sleep at...
        </button>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">
          {mode === "wakeup" ? "Wake-up Time" : "Bedtime"}
        </label>
        <input type="time" value={time} onChange={e => setTime(e.target.value)} className={inputCls} />
        <p className="mt-1 text-xs text-muted-foreground">Each sleep cycle is 90 minutes. Includes ~14 min to fall asleep.</p>
      </div>

      <button onClick={calculate} className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-white hover:bg-primary/90 transition-colors cursor-pointer">
        Calculate Sleep Times
      </button>

      {results.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">Recommended times (5–6 cycles = optimal):</p>
          {results.map((r, i) => (
            <div key={i} className={`rounded-xl border p-4 ${i === 1 || i === 2 ? "border-primary/40 bg-primary/5" : "border-border bg-muted"}`}>
              <p className={`text-sm font-medium ${i === 1 || i === 2 ? "text-primary" : "text-foreground"}`}>{r}</p>
              {(i === 1 || i === 2) && <p className="text-xs text-muted-foreground mt-0.5">Recommended</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
