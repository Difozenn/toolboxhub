"use client";

import { useState } from "react";

function getNthWeekday(year: number, month: number, weekday: number, nth: number): Date {
  const d = new Date(year, month, 1);
  let count = 0;
  while (true) {
    if (d.getDay() === weekday) { count++; if (count === nth) return new Date(d); }
    d.setDate(d.getDate() + 1);
  }
}

function getLastWeekday(year: number, month: number, weekday: number): Date {
  const d = new Date(year, month + 1, 0);
  while (d.getDay() !== weekday) d.setDate(d.getDate() - 1);
  return d;
}

function getHolidays(year: number) {
  const fmt = (d: Date) => d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", weekday: "long" });
  return [
    { name: "New Year's Day", date: fmt(new Date(year, 0, 1)) },
    { name: "MLK Jr. Day", date: fmt(getNthWeekday(year, 0, 1, 3)) },
    { name: "Presidents' Day", date: fmt(getNthWeekday(year, 1, 1, 3)) },
    { name: "Memorial Day", date: fmt(getLastWeekday(year, 4, 1)) },
    { name: "Juneteenth", date: fmt(new Date(year, 5, 19)) },
    { name: "Independence Day", date: fmt(new Date(year, 6, 4)) },
    { name: "Labor Day", date: fmt(getNthWeekday(year, 8, 1, 1)) },
    { name: "Columbus Day", date: fmt(getNthWeekday(year, 9, 1, 2)) },
    { name: "Veterans Day", date: fmt(new Date(year, 10, 11)) },
    { name: "Thanksgiving", date: fmt(getNthWeekday(year, 10, 4, 4)) },
    { name: "Christmas Day", date: fmt(new Date(year, 11, 25)) },
  ];
}

export default function HolidayCalculator() {
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const y = parseInt(year, 10);
  const holidays = !isNaN(y) && y > 1900 && y < 2200 ? getHolidays(y) : null;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5 space-y-3">
        <label className="block text-sm font-medium text-foreground">Year</label>
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)}
          placeholder="e.g. 2025"
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      {holidays ? (
        <div className="rounded-xl border border-border bg-muted p-5 space-y-2">
          <p className="text-sm font-medium text-foreground mb-3">US Federal Holidays {y}</p>
          {holidays.map(({ name, date }) => (
            <div key={name} className="flex items-center justify-between gap-4 rounded-lg border border-border bg-background px-3 py-2.5">
              <span className="text-sm font-medium text-foreground">{name}</span>
              <span className="text-xs text-muted-foreground text-right">{date}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-muted p-10 text-center">
          <p className="text-muted-foreground">Enter a valid year to see US federal holidays.</p>
        </div>
      )}
    </div>
  );
}
