"use client";

import { useState } from "react";

export default function SalaryToHourly() {
  const [salary, setSalary] = useState("");
  const [hourly, setHourly] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");
  const [result, setResult] = useState<{
    annualSalary: number;
    hourlyRate: number;
    monthly: number;
    weekly: number;
    daily: number;
  } | null>(null);

  const inputClass =
    "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  const calculateFromSalary = () => {
    const s = parseFloat(salary);
    const h = parseFloat(hoursPerWeek);
    const w = parseFloat(weeksPerYear);
    if (!s || !h || !w) return;
    const totalHours = h * w;
    setResult({
      annualSalary: s,
      hourlyRate: s / totalHours,
      monthly: s / 12,
      weekly: s / w,
      daily: s / (w * 5),
    });
  };

  const calculateFromHourly = () => {
    const hr = parseFloat(hourly);
    const h = parseFloat(hoursPerWeek);
    const w = parseFloat(weeksPerYear);
    if (!hr || !h || !w) return;
    const annual = hr * h * w;
    setResult({
      annualSalary: annual,
      hourlyRate: hr,
      monthly: annual / 12,
      weekly: annual / w,
      daily: hr * (h / 5),
    });
  };

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Annual Salary ($)</label>
          <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="75000" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Hourly Rate ($)</label>
          <input type="number" value={hourly} onChange={(e) => setHourly(e.target.value)} placeholder="36.06" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Hours per Week</label>
          <input type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Weeks per Year</label>
          <input type="number" value={weeksPerYear} onChange={(e) => setWeeksPerYear(e.target.value)} className={inputClass} />
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <button onClick={calculateFromSalary} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          Salary → Hourly
        </button>
        <button onClick={calculateFromHourly} className="rounded-lg border border-border bg-muted px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary">
          Hourly → Salary
        </button>
      </div>
      {result && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Annual Salary", value: `$${fmt(result.annualSalary)}` },
            { label: "Hourly Rate", value: `$${fmt(result.hourlyRate)}` },
            { label: "Monthly", value: `$${fmt(result.monthly)}` },
            { label: "Weekly", value: `$${fmt(result.weekly)}` },
            { label: "Daily (5-day week)", value: `$${fmt(result.daily)}` },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="text-2xl font-bold text-primary">{item.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
