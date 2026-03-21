"use client";

import { useState } from "react";

const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const DAY_ICONS = ["☀️","🌙","🔥","💧","⚡","❤️","⚖️"];

export default function DayOfWeekFinder() {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);

  const d = new Date(date + "T12:00:00");
  const dayIndex = isNaN(d.getTime()) ? -1 : d.getDay();
  const dayName = dayIndex >= 0 ? DAYS[dayIndex] : null;
  const dayIcon = dayIndex >= 0 ? DAY_ICONS[dayIndex] : null;

  const isWeekend = dayIndex === 0 || dayIndex === 6;

  const formatted = dayName
    ? d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
    : "";

  const dayOfYear = dayName ? Math.ceil((d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 86400000) : null;
  const weekNumber = dayName ? Math.ceil(dayOfYear! / 7) : null;

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Select Any Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      {dayName && (
        <div className="rounded-xl border border-border bg-muted p-6 text-center space-y-3">
          <div className="text-5xl">{dayIcon}</div>
          <h2 className="text-3xl font-bold text-primary">{dayName}</h2>
          <p className="text-sm text-muted-foreground">{formatted}</p>
          <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${isWeekend ? "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300" : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"}`}>
            {isWeekend ? "Weekend" : "Weekday"}
          </span>
        </div>
      )}

      {dayName && (
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Day of Year", value: dayOfYear },
            { label: "Week of Year", value: weekNumber },
            { label: "Day Index", value: dayIndex + 1 },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-muted p-3 text-center">
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-7 gap-1">
        {DAYS.map((day, i) => (
          <div key={day}
            className={`rounded-lg p-2 text-center text-xs font-medium transition-colors ${i === dayIndex ? "bg-primary text-white" : "border border-border bg-background text-muted-foreground"}`}>
            {day.slice(0, 3)}
          </div>
        ))}
      </div>
    </div>
  );
}
