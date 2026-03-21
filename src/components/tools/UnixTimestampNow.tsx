"use client";

import { useState, useEffect } from "react";

export default function UnixTimestampNow() {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const [input, setInput] = useState("");

  useEffect(() => {
    const id = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(id);
  }, []);

  const converted = (() => {
    const ts = parseInt(input, 10);
    if (!input || isNaN(ts)) return null;
    const ms = ts > 1e10 ? ts : ts * 1000;
    const d = new Date(ms);
    if (isNaN(d.getTime())) return null;
    return d;
  })();

  const inputClass = "w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-6 text-center space-y-2">
        <p className="text-sm text-muted-foreground">Current Unix Timestamp</p>
        <p className="text-4xl font-bold font-mono text-primary tabular-nums">{now}</p>
        <p className="text-sm text-muted-foreground">{new Date().toUTCString()}</p>
      </div>

      <div className="rounded-xl border border-border bg-muted p-5 space-y-3">
        <label className="block text-sm font-medium text-foreground">Convert a Timestamp</label>
        <input type="number" value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="Enter Unix timestamp (seconds or ms)..." className={inputClass} />
      </div>

      {converted ? (
        <div className="rounded-xl border border-border bg-muted p-5 space-y-3">
          <p className="text-sm font-medium text-foreground">Converted Result</p>
          {[
            { label: "UTC", value: converted.toUTCString() },
            { label: "Local", value: converted.toLocaleString() },
            { label: "ISO 8601", value: converted.toISOString() },
            { label: "Date only", value: converted.toISOString().split("T")[0] },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between gap-4 rounded-lg border border-border bg-background px-3 py-2">
              <span className="text-sm text-muted-foreground w-20 shrink-0">{label}</span>
              <span className="text-sm text-foreground font-mono text-right">{value}</span>
            </div>
          ))}
        </div>
      ) : input ? (
        <div className="rounded-xl border border-border bg-muted p-6 text-center">
          <p className="text-muted-foreground">Invalid timestamp.</p>
        </div>
      ) : null}
    </div>
  );
}
