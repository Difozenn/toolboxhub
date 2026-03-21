"use client";

import { useState } from "react";

function countBusinessDays(start: Date, end: Date): number {
  const s = start < end ? start : end;
  const e = start < end ? end : start;
  let count = 0;
  const cur = new Date(s);
  while (cur <= e) {
    const day = cur.getDay();
    if (day !== 0 && day !== 6) count++;
    cur.setDate(cur.getDate() + 1);
  }
  return count;
}

export default function BusinessDaysCalculator() {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");

  const result = (() => {
    if (!date1 || !date2) return null;
    const d1 = new Date(date1 + "T00:00:00");
    const d2 = new Date(date2 + "T00:00:00");
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;
    const totalDays = Math.abs(Math.floor((d2.getTime() - d1.getTime()) / 86400000)) + 1;
    const businessDays = countBusinessDays(d1, d2);
    const weekendDays = totalDays - businessDays;
    const weeks = Math.floor(businessDays / 5);
    const remainingDays = businessDays % 5;
    return { businessDays, weekendDays, totalDays, weeks, remainingDays };
  })();

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Start Date</label>
            <input type="date" value={date1} onChange={(e) => setDate1(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">End Date</label>
            <input type="date" value={date2} onChange={(e) => setDate2(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        </div>
      </div>

      {result ? (
        <>
          <div className="rounded-xl border border-border bg-muted p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Business Days (Mon–Fri)</p>
            <p className="text-5xl font-bold text-primary">{result.businessDays}</p>
            <p className="text-sm text-muted-foreground mt-1">{result.weeks}w {result.remainingDays}d</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Total Calendar Days", value: result.totalDays },
              { label: "Weekend Days", value: result.weekendDays },
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
          <p className="text-muted-foreground">Select start and end dates to count business days.</p>
        </div>
      )}
    </div>
  );
}
