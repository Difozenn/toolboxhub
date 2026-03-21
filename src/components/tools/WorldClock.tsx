"use client";

import { useState, useEffect } from "react";

const CITIES = [
  { name: "New York", tz: "America/New_York" },
  { name: "London", tz: "Europe/London" },
  { name: "Paris", tz: "Europe/Paris" },
  { name: "Dubai", tz: "Asia/Dubai" },
  { name: "Mumbai", tz: "Asia/Kolkata" },
  { name: "Singapore", tz: "Asia/Singapore" },
  { name: "Tokyo", tz: "Asia/Tokyo" },
  { name: "Sydney", tz: "Australia/Sydney" },
  { name: "Los Angeles", tz: "America/Los_Angeles" },
  { name: "Chicago", tz: "America/Chicago" },
  { name: "Toronto", tz: "America/Toronto" },
  { name: "Sao Paulo", tz: "America/Sao_Paulo" },
];

export default function WorldClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const fmt = (tz: string) => new Intl.DateTimeFormat("en-US", {
    timeZone: tz, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true,
  }).format(now);

  const fmtDate = (tz: string) => new Intl.DateTimeFormat("en-US", {
    timeZone: tz, weekday: "short", month: "short", day: "numeric",
  }).format(now);

  const isNight = (tz: string) => {
    const h = parseInt(new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", hour12: false }).format(now));
    return h < 7 || h >= 20;
  };

  return (
    <div className="space-y-2">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {CITIES.map(({ name, tz }) => (
          <div key={tz} className={`rounded-xl border border-border p-3 ${isNight(tz) ? "bg-muted/30" : "bg-muted"}`}>
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">{name}</p>
              <span className="text-xs">{isNight(tz) ? "🌙" : "☀️"}</span>
            </div>
            <p className="font-mono text-lg font-semibold text-foreground mt-1">{fmt(tz)}</p>
            <p className="text-xs text-muted-foreground">{fmtDate(tz)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
