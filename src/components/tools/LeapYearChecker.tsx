"use client";

import { useState } from "react";

function isLeap(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function nextLeapYears(from: number, count: number): number[] {
  const result: number[] = [];
  let y = from + 1;
  while (result.length < count) {
    if (isLeap(y)) result.push(y);
    y++;
  }
  return result;
}

export default function LeapYearChecker() {
  const [year, setYear] = useState(String(new Date().getFullYear()));

  const y = parseInt(year, 10);
  const valid = !isNaN(y) && y > 0;
  const leap = valid && isLeap(y);
  const nextLeaps = valid ? nextLeapYears(y, 5) : [];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5 space-y-3">
        <label className="block text-sm font-medium text-foreground">Enter Year</label>
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)}
          placeholder="e.g. 2024"
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      {valid && (
        <>
          <div className={`rounded-xl border p-6 text-center ${leap ? "border-primary/30 bg-primary/5" : "border-border bg-muted"}`}>
            <p className="text-4xl font-bold text-primary mb-2">{y}</p>
            <p className={`text-xl font-semibold ${leap ? "text-primary" : "text-foreground"}`}>
              {leap ? "Yes, it is a Leap Year!" : "Not a Leap Year"}
            </p>
            {leap && <p className="text-sm text-muted-foreground mt-1">366 days &bull; February has 29 days</p>}
            {!leap && (
              <p className="text-sm text-muted-foreground mt-1">
                {y % 4 !== 0 ? "Not divisible by 4" : y % 100 === 0 && y % 400 !== 0 ? "Divisible by 100 but not 400" : ""}
              </p>
            )}
          </div>
          <div className="rounded-xl border border-border bg-muted p-5">
            <p className="text-sm font-medium text-foreground mb-3">Next 5 Leap Years after {y}</p>
            <div className="flex flex-wrap gap-2">
              {nextLeaps.map((ly) => (
                <span key={ly} className="rounded-lg bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">{ly}</span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
