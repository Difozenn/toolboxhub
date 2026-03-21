"use client";

import { useState, useEffect } from "react";

export default function AgeInDays() {
  const [birthdate, setBirthdate] = useState("");
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const result = (() => {
    if (!birthdate) return null;
    const birth = new Date(birthdate + "T00:00:00");
    if (isNaN(birth.getTime()) || birth > now) return null;
    const diffMs = now.getTime() - birth.getTime();
    const days = Math.floor(diffMs / 86400000);
    const hours = Math.floor(diffMs / 3600000);
    const minutes = Math.floor(diffMs / 60000);
    const seconds = Math.floor(diffMs / 1000);
    return { days, hours, minutes, seconds };
  })();

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5 space-y-3">
        <label className="block text-sm font-medium text-foreground">Date of Birth</label>
        <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)}
          max={now.toISOString().split("T")[0]}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      {result ? (
        <>
          <div className="rounded-xl border border-border bg-muted p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">You are</p>
            <p className="text-5xl font-bold text-primary tabular-nums">{result.days.toLocaleString()}</p>
            <p className="text-lg font-semibold text-foreground mt-1">days old</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Total Hours", value: result.hours.toLocaleString() },
              { label: "Total Minutes", value: result.minutes.toLocaleString() },
              { label: "Total Seconds", value: result.seconds.toLocaleString() },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl border border-border bg-muted p-4 text-center">
                <p className="text-lg font-bold text-foreground tabular-nums">{value}</p>
                <p className="text-xs text-muted-foreground mt-1">{label}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-xl border border-border bg-muted p-10 text-center">
          <p className="text-muted-foreground">Enter your birthdate to see your age in days.</p>
        </div>
      )}
    </div>
  );
}
