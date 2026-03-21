"use client";

import { useState } from "react";

export default function DateFormatter() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const formats = (() => {
    if (!date) return null;
    const d = new Date(date + "T00:00:00");
    if (isNaN(d.getTime())) return null;
    const pad = (n: number) => String(n).padStart(2, "0");
    const y = d.getFullYear();
    const m = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    return [
      { label: "ISO 8601", value: d.toISOString().split("T")[0] },
      { label: "US (MM/DD/YYYY)", value: `${m}/${dd}/${y}` },
      { label: "EU (DD/MM/YYYY)", value: `${dd}/${m}/${y}` },
      { label: "Long", value: d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) },
      { label: "Short", value: d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) },
      { label: "Unix Timestamp", value: String(Math.floor(d.getTime() / 1000)) },
      { label: "RFC 2822", value: d.toUTCString() },
      { label: "Ordinal", value: `${d.toLocaleDateString("en-US", { month: "long" })} ${d.getDate()}${["th","st","nd","rd"][Math.min(d.getDate() % 10, d.getDate() > 13 ? 0 : d.getDate() % 10) > 3 ? 0 : Math.min(d.getDate() % 10, 3)]}, ${y}` },
    ];
  })();

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5 space-y-3">
        <label className="block text-sm font-medium text-foreground">Select Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      {formats ? (
        <div className="rounded-xl border border-border bg-muted p-5 space-y-2">
          <p className="text-sm font-medium text-foreground mb-3">All Formats</p>
          {formats.map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between gap-4 rounded-lg border border-border bg-background px-3 py-2.5">
              <span className="text-xs text-muted-foreground w-32 shrink-0">{label}</span>
              <span className="text-sm text-foreground font-mono text-right">{value}</span>
              <button onClick={() => navigator.clipboard.writeText(value)}
                className="shrink-0 rounded px-2 py-1 text-xs text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                Copy
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-muted p-10 text-center">
          <p className="text-muted-foreground">Select a date to see all formats.</p>
        </div>
      )}
    </div>
  );
}
