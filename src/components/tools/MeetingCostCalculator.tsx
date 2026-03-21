"use client";

import { useState } from "react";

export default function MeetingCostCalculator() {
  const [attendees, setAttendees] = useState(5);
  const [salary, setSalary] = useState(75000);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(60);

  const totalMinutes = hours * 60 + minutes;
  const hourlyRate = salary / 2080;
  const durationHours = totalMinutes / 60;
  const costPerMinute = attendees * (hourlyRate / 60);
  const totalCost = attendees * hourlyRate * durationHours;

  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Number of Attendees</label>
          <input type="number" min={1} max={1000} value={attendees} onChange={(e) => setAttendees(Number(e.target.value))}
            className="w-full rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Average Annual Salary ($)</label>
          <input type="number" min={0} value={salary} onChange={(e) => setSalary(Number(e.target.value))}
            className="w-full rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Duration — Hours</label>
          <input type="number" min={0} value={hours} onChange={(e) => setHours(Number(e.target.value))}
            className="w-full rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Duration — Minutes</label>
          <input type="number" min={0} max={59} value={minutes} onChange={(e) => setMinutes(Number(e.target.value))}
            className="w-full rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-muted p-4 text-center">
          <p className="text-xs text-muted-foreground">Cost Per Minute</p>
          <p className="text-2xl font-bold text-primary">${fmt(costPerMinute)}</p>
        </div>
        <div className="rounded-xl border border-border bg-muted p-4 text-center">
          <p className="text-xs text-muted-foreground">Hourly Rate (Total)</p>
          <p className="text-2xl font-bold text-primary">${fmt(attendees * hourlyRate)}</p>
        </div>
        <div className="rounded-xl border border-primary bg-primary/5 p-4 text-center">
          <p className="text-xs text-muted-foreground">Total Meeting Cost</p>
          <p className="text-2xl font-bold text-primary">${fmt(totalCost)}</p>
          <p className="text-xs text-muted-foreground mt-1">{attendees} people × {hours}h {minutes}m</p>
        </div>
      </div>
    </div>
  );
}
