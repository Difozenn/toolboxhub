"use client";

import { useState } from "react";

export default function TimeDurationCalculator() {
  const [time1, setTime1] = useState("09:00");
  const [time2, setTime2] = useState("17:00");

  const result = (() => {
    if (!time1 || !time2) return null;
    const [h1, m1] = time1.split(":").map(Number);
    const [h2, m2] = time2.split(":").map(Number);
    if (isNaN(h1) || isNaN(m1) || isNaN(h2) || isNaN(m2)) return null;
    let totalMinutes = (h2 * 60 + m2) - (h1 * 60 + m1);
    const negative = totalMinutes < 0;
    if (negative) totalMinutes += 24 * 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const decimal = (totalMinutes / 60).toFixed(2);
    return { hours, minutes, totalMinutes, decimal, negative };
  })();

  const inputClass = "w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Start Time</label>
            <input type="time" value={time1} onChange={(e) => setTime1(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">End Time</label>
            <input type="time" value={time2} onChange={(e) => setTime2(e.target.value)} className={inputClass} />
          </div>
        </div>
      </div>

      {result ? (
        <>
          <div className="rounded-xl border border-border bg-muted p-6 text-center">
            {result.negative && <p className="text-xs text-muted-foreground mb-1">(crosses midnight)</p>}
            <p className="text-sm text-muted-foreground mb-2">Duration</p>
            <p className="text-5xl font-bold font-mono text-primary">
              {String(result.hours).padStart(2, "0")}:{String(result.minutes).padStart(2, "0")}
            </p>
            <p className="text-sm text-muted-foreground mt-1">hours : minutes</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Total Minutes", value: result.totalMinutes.toLocaleString() },
              { label: "Decimal Hours", value: result.decimal },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl border border-border bg-muted p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground mt-1">{label}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-xl border border-border bg-muted p-10 text-center">
          <p className="text-muted-foreground">Enter two times to calculate duration.</p>
        </div>
      )}
    </div>
  );
}
