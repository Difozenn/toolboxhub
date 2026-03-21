"use client";

import { useState } from "react";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export default function CalendarGenerator() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const today = new Date();

  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  const isToday = (d: number | null) =>
    d !== null && today.getDate() === d && today.getMonth() === month && today.getFullYear() === year;

  const prev = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const next = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-muted p-5">
        <div className="flex items-center justify-between mb-4">
          <button onClick={prev} className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground hover:bg-primary/10 transition-colors">&larr;</button>
          <div className="flex gap-2 items-center">
            <select value={month} onChange={(e) => setMonth(Number(e.target.value))}
              className="rounded-lg border border-border bg-background px-2 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none">
              {MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}
            </select>
            <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))}
              className="w-20 rounded-lg border border-border bg-background px-2 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none text-center" />
          </div>
          <button onClick={next} className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground hover:bg-primary/10 transition-colors">&rarr;</button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {DAYS.map(d => <div key={d} className="text-xs font-semibold text-muted-foreground py-1">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {weeks.flat().map((day, i) => (
            <div key={i} className={`rounded-lg py-2 text-center text-sm transition-colors ${
              day === null ? "" :
              isToday(day) ? "bg-primary text-white font-bold" :
              "bg-background border border-border text-foreground hover:bg-primary/10"
            }`}>
              {day ?? ""}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
