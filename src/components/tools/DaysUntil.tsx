"use client";

import { useState, useEffect } from "react";

export default function DaysUntil() {
  const [date, setDate] = useState("");
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const result = (() => {
    if (!date) return null;
    const target = new Date(date + "T00:00:00");
    if (isNaN(target.getTime())) return null;
    const diffMs = target.getTime() - now.getTime();
    if (diffMs < 0) return { past: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
    return { past: false, days, hours, minutes, seconds };
  })();

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5 space-y-3">
        <label className="block text-sm font-medium text-foreground">Target Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      {result ? (
        result.past ? (
          <div className="rounded-xl border border-border bg-muted p-8 text-center">
            <p className="text-2xl font-bold text-foreground">That date has already passed.</p>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-muted p-6 space-y-4">
            <p className="text-center text-sm text-muted-foreground">Time until {new Date(date + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
            <div className="flex justify-center gap-3 flex-wrap">
              {[
                { v: result.days, l: "Days" },
                { v: result.hours, l: "Hours" },
                { v: result.minutes, l: "Minutes" },
                { v: result.seconds, l: "Seconds" },
              ].map(({ v, l }) => (
                <div key={l} className="text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-border bg-background">
                    <span className="text-3xl font-bold font-mono text-primary tabular-nums">
                      {String(v).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{l}</p>
                </div>
              ))}
            </div>
          </div>
        )
      ) : (
        <div className="rounded-xl border border-border bg-muted p-10 text-center">
          <p className="text-muted-foreground">Select a future date to start the countdown.</p>
        </div>
      )}
    </div>
  );
}
