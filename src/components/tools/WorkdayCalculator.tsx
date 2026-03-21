"use client";

import { useState } from "react";

function addWorkdays(start: Date, days: number): { result: Date; skipped: number } {
  const cur = new Date(start);
  let added = 0;
  let skipped = 0;
  const direction = days >= 0 ? 1 : -1;
  const target = Math.abs(days);
  while (added < target) {
    cur.setDate(cur.getDate() + direction);
    const day = cur.getDay();
    if (day !== 0 && day !== 6) added++;
    else skipped++;
  }
  return { result: cur, skipped };
}

export default function WorkdayCalculator() {
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [days, setDays] = useState("10");
  const [result, setResult] = useState<{ date: Date; skipped: number } | null>(null);

  const calculate = () => {
    const n = parseInt(days, 10);
    if (isNaN(n)) return;
    const start = new Date(startDate + "T00:00:00");
    const { result: r, skipped } = addWorkdays(start, n);
    setResult({ date: r, skipped });
  };

  const fmt = (d: Date) => d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Start Date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Business Days to Add/Subtract</label>
          <input type="number" value={days} onChange={(e) => setDays(e.target.value)}
            placeholder="e.g., 30 or -5"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
      </div>

      <p className="text-xs text-muted-foreground">Use a negative number to go backward in time.</p>

      <button onClick={calculate}
        className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
        Calculate Workday
      </button>

      {result && (
        <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Result Date</p>
            <p className="text-xl font-bold text-primary">{fmt(result.date)}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border bg-background p-3 text-center">
              <p className="text-2xl font-bold text-foreground">{Math.abs(parseInt(days))}</p>
              <p className="text-xs text-muted-foreground">Business Days</p>
            </div>
            <div className="rounded-lg border border-border bg-background p-3 text-center">
              <p className="text-2xl font-bold text-foreground">{result.skipped}</p>
              <p className="text-xs text-muted-foreground">Weekend Days Skipped</p>
            </div>
          </div>
          <p className="text-xs text-center text-muted-foreground">
            From {new Date(startDate + "T00:00:00").toLocaleDateString()} + {days} workdays
          </p>
        </div>
      )}
    </div>
  );
}
