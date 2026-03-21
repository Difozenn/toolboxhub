"use client";

import { useState } from "react";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function getFiscalYear(date: Date, startMonth: number) {
  const m = date.getMonth(); // 0-indexed
  const y = date.getFullYear();
  const fyStart = m >= startMonth ? y : y - 1;
  const fyEnd = fyStart + 1;
  const fyLabel = `FY${fyEnd}`;

  const quarters: { label: string; start: Date; end: Date }[] = [];
  for (let q = 0; q < 4; q++) {
    const qStartMonth = (startMonth + q * 3) % 12;
    const qStartYear = fyStart + Math.floor((startMonth + q * 3) / 12);
    const qStart = new Date(qStartYear, qStartMonth, 1);
    const qEndMonth = (startMonth + q * 3 + 2) % 12;
    const qEndYear = fyStart + Math.floor((startMonth + q * 3 + 2) / 12);
    const qEnd = new Date(qEndYear, qEndMonth + 1, 0);
    quarters.push({ label: `Q${q + 1}`, start: qStart, end: qEnd });
  }

  const currentQ = quarters.findIndex((q) => date >= q.start && date <= q.end) + 1;
  return { fyLabel, fyStart, fyEnd, quarters, currentQ };
}

const fmt = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export default function FiscalYearCalculator() {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [startMonth, setStartMonth] = useState(0);

  const d = new Date(date + "T12:00:00");
  const { fyLabel, quarters, currentQ } = isNaN(d.getTime()) ? { fyLabel: "", quarters: [], currentQ: 0 } : getFiscalYear(d, startMonth);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Fiscal Year Starts In</label>
          <select value={startMonth} onChange={(e) => setStartMonth(Number(e.target.value))}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none">
            {MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}
          </select>
        </div>
      </div>

      {fyLabel && (
        <>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Current Fiscal Year</p>
            <p className="text-3xl font-bold text-primary mt-1">{fyLabel}</p>
            {currentQ > 0 && <p className="text-sm text-foreground mt-1">Quarter Q{currentQ}</p>}
          </div>

          <div className="space-y-2">
            {quarters.map((q, i) => (
              <div key={q.label}
                className={`rounded-lg border px-4 py-3 flex items-center justify-between ${i + 1 === currentQ ? "border-primary bg-primary/5" : "border-border bg-background"}`}>
                <span className={`text-sm font-semibold ${i + 1 === currentQ ? "text-primary" : "text-foreground"}`}>{q.label} {i + 1 === currentQ ? "← current" : ""}</span>
                <span className="text-sm text-muted-foreground">{fmt(q.start)} – {fmt(q.end)}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
