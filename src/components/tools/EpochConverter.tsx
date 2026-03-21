"use client";

import { useState } from "react";

export default function EpochConverter() {
  const [epoch, setEpoch] = useState("");
  const [unit, setUnit] = useState<"s" | "ms">("s");
  const [dateInput, setDateInput] = useState("");
  const [mode, setMode] = useState<"to-date" | "to-epoch">("to-date");

  const epochMs = epoch
    ? unit === "s" ? Number(epoch) * 1000 : Number(epoch)
    : null;

  const date = epochMs ? new Date(epochMs) : null;
  const isValid = date ? !isNaN(date.getTime()) : false;

  const fromDate = dateInput ? new Date(dateInput) : null;
  const fromDateValid = fromDate && !isNaN(fromDate.getTime());

  const now = Date.now();

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {(["to-date", "to-epoch"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${mode === m ? "bg-primary text-white" : "border border-border bg-background text-foreground hover:bg-muted"}`}>
            {m === "to-date" ? "Epoch → Date" : "Date → Epoch"}
          </button>
        ))}
      </div>

      {mode === "to-date" ? (
        <div className="space-y-4">
          <div className="flex gap-3">
            <input value={epoch} onChange={(e) => setEpoch(e.target.value)}
              placeholder={unit === "s" ? "e.g., 1700000000" : "e.g., 1700000000000"}
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            <select value={unit} onChange={(e) => setUnit(e.target.value as "s" | "ms")}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none">
              <option value="s">Seconds</option>
              <option value="ms">Milliseconds</option>
            </select>
          </div>
          <button onClick={() => { setEpoch(String(Math.floor(now / 1000))); setUnit("s"); }}
            className="text-xs text-primary hover:underline">Use current timestamp</button>

          {epoch && isValid && date && (
            <div className="rounded-xl border border-border bg-muted p-4 space-y-2">
              {[
                ["Local Time", date.toLocaleString()],
                ["UTC", date.toUTCString()],
                ["ISO 8601", date.toISOString()],
                ["Unix (seconds)", String(Math.floor(epochMs! / 1000))],
                ["Unix (ms)", String(epochMs)],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-muted-foreground whitespace-nowrap">{label}</span>
                  <span className="font-mono text-foreground text-right break-all">{value}</span>
                </div>
              ))}
            </div>
          )}
          {epoch && !isValid && <p className="text-sm text-red-500">Invalid timestamp</p>}
        </div>
      ) : (
        <div className="space-y-4">
          <input type="datetime-local" value={dateInput} onChange={(e) => setDateInput(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />

          {fromDateValid && fromDate && (
            <div className="rounded-xl border border-border bg-muted p-4 space-y-2">
              {[
                ["Unix (seconds)", String(Math.floor(fromDate.getTime() / 1000))],
                ["Unix (milliseconds)", String(fromDate.getTime())],
                ["ISO 8601", fromDate.toISOString()],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-muted-foreground whitespace-nowrap">{label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-foreground">{value}</span>
                    <button onClick={() => navigator.clipboard.writeText(value)} className="text-xs text-primary hover:underline">Copy</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
