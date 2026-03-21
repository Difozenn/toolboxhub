"use client";
import { useState } from "react";
export default function TimestampGenerator() {
  const [ts, setTs] = useState<Date>(new Date());
  const [custom, setCustom] = useState("");
  const refresh = () => setTs(new Date());
  const date = custom ? new Date(custom) : ts;
  const valid = !isNaN(date.getTime());
  const formats: [string, string][] = valid ? [
    ["Unix (seconds)", Math.floor(date.getTime() / 1000).toString()],
    ["Unix (milliseconds)", date.getTime().toString()],
    ["ISO 8601", date.toISOString()],
    ["UTC String", date.toUTCString()],
    ["Local String", date.toLocaleString()],
    ["Date Only", date.toISOString().slice(0, 10)],
    ["Time Only (UTC)", date.toISOString().slice(11, 19)],
    ["RFC 2822", date.toUTCString().replace("GMT", "+0000")],
    ["Day of Week", date.toLocaleDateString("en-US", { weekday: "long" })],
    ["Month/Year", date.toLocaleDateString("en-US", { month: "long", year: "numeric" })],
  ] : [];
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Custom Date/Time</label>
          <input type="datetime-local" value={custom} onChange={e => setCustom(e.target.value)} className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="flex items-end">
          <button onClick={refresh} className="rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">Use Current Time</button>
        </div>
      </div>
      {valid && (
        <div className="divide-y divide-border rounded-lg border border-border overflow-hidden">
          {formats.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-muted/50">
              <span className="text-sm text-muted-foreground min-w-[160px]">{label}</span>
              <code className="flex-1 font-mono text-sm text-foreground break-all">{value}</code>
              <button onClick={() => navigator.clipboard.writeText(value)} className="text-xs text-muted-foreground hover:text-foreground flex-shrink-0">Copy</button>
            </div>
          ))}
        </div>
      )}
      {!valid && custom && <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">Invalid date/time value.</p>}
    </div>
  );
}
