"use client";

import { useState, useEffect } from "react";

function getNextNewYear() {
  const now = new Date();
  const next = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0, 0);
  return next;
}

export default function CountdownToNewYear() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const target = getNextNewYear();
  const diffMs = target.getTime() - now.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  const units = [
    { v: days, l: "Days" },
    { v: hours, l: "Hours" },
    { v: minutes, l: "Minutes" },
    { v: seconds, l: "Seconds" },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center space-y-4">
        <p className="text-lg font-semibold text-foreground">
          Countdown to January 1, {target.getFullYear()}
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          {units.map(({ v, l }) => (
            <div key={l} className="text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-xl border border-border bg-background">
                <span className="text-4xl font-bold font-mono text-primary tabular-nums">
                  {String(v).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-muted p-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total Days", value: days.toLocaleString() },
          { label: "Total Hours", value: (days * 24 + hours).toLocaleString() },
          { label: "Total Minutes", value: (days * 1440 + hours * 60 + minutes).toLocaleString() },
          { label: "Total Seconds", value: Math.floor(diffMs / 1000).toLocaleString() },
        ].map(({ label, value }) => (
          <div key={label} className="text-center">
            <p className="text-lg font-bold text-foreground tabular-nums">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
