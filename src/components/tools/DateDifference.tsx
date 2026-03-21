"use client";

import { useState } from "react";

export default function DateDifference() {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");

  const result = (() => {
    if (!date1 || !date2) return null;
    const d1 = new Date(date1 + "T00:00:00");
    const d2 = new Date(date2 + "T00:00:00");
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;
    const start = d1 < d2 ? d1 : d2;
    const end = d1 < d2 ? d2 : d1;
    const diffMs = end.getTime() - start.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();
    if (days < 0) { months--; days += new Date(end.getFullYear(), end.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }

    return { years, months, days, totalDays, totalWeeks, totalHours };
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
          <div className="rounded-xl border border-border bg-muted p-5 text-center">
            <p className="text-sm text-muted-foreground mb-3">Exact Difference</p>
            <div className="flex justify-center gap-3 flex-wrap">
              {[{ v: result.years, l: "Years" }, { v: result.months, l: "Months" }, { v: result.days, l: "Days" }].map(({ v, l }) => (
                <div key={l} className="rounded-lg bg-primary/10 px-4 py-3 min-w-[80px]">
                  <p className="text-3xl font-bold text-primary">{v}</p>
                  <p className="text-xs text-muted-foreground">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Total Days", value: result.totalDays.toLocaleString() },
              { label: "Total Weeks", value: result.totalWeeks.toLocaleString() },
              { label: "Total Hours", value: result.totalHours.toLocaleString() },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-border bg-muted p-4 text-center">
                <p className="text-xl font-bold text-foreground">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-xl border border-border bg-muted p-10 text-center">
          <p className="text-muted-foreground">Select two dates to calculate the difference.</p>
        </div>
      )}
    </div>
  );
}
