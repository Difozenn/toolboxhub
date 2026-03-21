"use client";

import { useState, useEffect } from "react";

const CITIES = [
  { name: "New York", tz: "America/New_York", flag: "🇺🇸" },
  { name: "Los Angeles", tz: "America/Los_Angeles", flag: "🇺🇸" },
  { name: "Chicago", tz: "America/Chicago", flag: "🇺🇸" },
  { name: "London", tz: "Europe/London", flag: "🇬🇧" },
  { name: "Paris", tz: "Europe/Paris", flag: "🇫🇷" },
  { name: "Berlin", tz: "Europe/Berlin", flag: "🇩🇪" },
  { name: "Dubai", tz: "Asia/Dubai", flag: "🇦🇪" },
  { name: "Mumbai", tz: "Asia/Kolkata", flag: "🇮🇳" },
  { name: "Singapore", tz: "Asia/Singapore", flag: "🇸🇬" },
  { name: "Hong Kong", tz: "Asia/Hong_Kong", flag: "🇭🇰" },
  { name: "Tokyo", tz: "Asia/Tokyo", flag: "🇯🇵" },
  { name: "Sydney", tz: "Australia/Sydney", flag: "🇦🇺" },
];

function getTime(tz: string, now: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: true, timeZone: tz,
  }).format(now);
}

function getOffset(tz: string, now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZoneName: "short", timeZone: tz }).formatToParts(now);
  return parts.find(p => p.type === "timeZoneName")?.value ?? "";
}

export default function TimeZoneMap() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-3">
      <div className="grid gap-2 sm:grid-cols-2">
        {CITIES.map(({ name, tz, flag }) => (
          <div key={name} className="flex items-center justify-between rounded-xl border border-border bg-muted px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">{flag}</span>
              <div>
                <p className="text-sm font-medium text-foreground">{name}</p>
                <p className="text-xs text-muted-foreground">{getOffset(tz, now)}</p>
              </div>
            </div>
            <p className="font-mono text-sm font-semibold text-primary tabular-nums">{getTime(tz, now)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
