"use client";

import { useState } from "react";

export default function NumberLineGenerator() {
  const [start, setStart] = useState("-10");
  const [end, setEnd] = useState("10");
  const [step, setStep] = useState("1");
  const [marked, setMarked] = useState("");

  const s = parseFloat(start);
  const e = parseFloat(end);
  const st = parseFloat(step);

  const valid = !isNaN(s) && !isNaN(e) && !isNaN(st) && st > 0 && e > s && (e - s) / st <= 200;

  const ticks: number[] = [];
  if (valid) { for (let v = s; v <= e + 0.0001; v += st) ticks.push(Math.round(v * 1000) / 1000); }

  const markedVals = marked.split(",").map((v) => parseFloat(v.trim())).filter((v) => !isNaN(v));

  return (
    <div className="space-y-5">
      <div className="grid gap-3 grid-cols-3">
        {[["Start", start, setStart], ["End", end, setEnd], ["Interval", step, setStep]].map(([label, val, setter]) => (
          <div key={label as string}>
            <label className="block text-xs font-medium text-muted-foreground mb-1">{label as string}</label>
            <input type="number" value={val as string} onChange={(e) => (setter as (v: string) => void)(e.target.value)} step="any"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Mark specific values (comma-separated)</label>
        <input value={marked} onChange={(e) => setMarked(e.target.value)} placeholder="e.g., -5, 0, 3.5"
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      {!valid && (start || end || step) && (
        <p className="text-sm text-red-500">Please ensure Start &lt; End, Interval &gt; 0, and not more than 200 ticks.</p>
      )}

      {valid && ticks.length > 0 && (
        <div className="rounded-xl border border-border bg-muted p-6 overflow-x-auto">
          <div className="flex items-end gap-0 min-w-max mx-auto">
            {ticks.map((tick, i) => {
              const isMarked = markedVals.some((m) => Math.abs(m - tick) < st * 0.01);
              return (
                <div key={tick} className="flex flex-col items-center" style={{ minWidth: ticks.length > 20 ? 30 : 50 }}>
                  <div className={`w-2 h-2 rounded-full mb-1 ${isMarked ? "bg-red-500 ring-2 ring-red-300" : "bg-primary"}`} />
                  <div className="w-px h-3 bg-foreground/40" />
                  {i === 0 && <div className="absolute -left-4 w-4 h-px bg-foreground/40" />}
                  <p className={`text-xs mt-1 ${isMarked ? "text-red-500 font-bold" : "text-muted-foreground"}`}
                    style={{ fontSize: ticks.length > 30 ? 9 : 11 }}>
                    {tick % 1 === 0 ? tick : tick.toFixed(1)}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="h-px bg-foreground/40 -mt-6 -mx-0 relative -z-10" />
        </div>
      )}
    </div>
  );
}
