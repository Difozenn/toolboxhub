"use client";

import { useState } from "react";

function getISOWeek(date: Date): { week: number; year: number } {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return { week, year: d.getUTCFullYear() };
}

export default function WeekNumber() {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);

  const result = (() => {
    if (!date) return null;
    const d = new Date(date + "T00:00:00");
    if (isNaN(d.getTime())) return null;
    const { week, year } = getISOWeek(d);
    const dayOfYear = Math.floor((d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 86400000);
    const quarter = Math.ceil((d.getMonth() + 1) / 3);
    const weekday = d.toLocaleDateString("en-US", { weekday: "long" });
    return { week, year, dayOfYear, quarter, weekday };
  })();

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5 space-y-3">
        <label className="block text-sm font-medium text-foreground">Select Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      {result && (
        <>
          <div className="rounded-xl border border-border bg-muted p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">ISO Week Number</p>
            <p className="text-6xl font-bold text-primary">W{String(result.week).padStart(2, "0")}</p>
            <p className="text-sm text-muted-foreground mt-1">of {result.year} &bull; {result.weekday}</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Day of Year", value: result.dayOfYear },
              { label: "Quarter", value: `Q${result.quarter}` },
              { label: "Weeks Remaining", value: 52 - result.week },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl border border-border bg-muted p-4 text-center">
                <p className="text-xl font-bold text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground mt-1">{label}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
