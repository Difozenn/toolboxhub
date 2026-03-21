"use client";

import { useState } from "react";

const FORMATS: Record<string, (d: Date) => string> = {
  "ISO (YYYY-MM-DD)": (d) => d.toISOString().split("T")[0],
  "US (MM/DD/YYYY)": (d) => `${String(d.getMonth()+1).padStart(2,"0")}/${String(d.getDate()).padStart(2,"0")}/${d.getFullYear()}`,
  "EU (DD/MM/YYYY)": (d) => `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()}`,
  "Long form": (d) => d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
};

export default function DateRangeGenerator() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [weekdaysOnly, setWeekdaysOnly] = useState(false);
  const [format, setFormat] = useState("ISO (YYYY-MM-DD)");
  const [dates, setDates] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (!start || !end) return;
    const s = new Date(start + "T00:00:00");
    const e = new Date(end + "T00:00:00");
    if (s > e) return;
    const result: string[] = [];
    const cur = new Date(s);
    const fmt = FORMATS[format];
    while (cur <= e) {
      const day = cur.getDay();
      if (!weekdaysOnly || (day !== 0 && day !== 6)) result.push(fmt(new Date(cur)));
      cur.setDate(cur.getDate() + 1);
    }
    setDates(result);
  };

  const copy = () => {
    navigator.clipboard.writeText(dates.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Start Date</label>
          <input type="date" value={start} onChange={(e) => setStart(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">End Date</label>
          <input type="date" value={end} onChange={(e) => setEnd(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
          <input type="checkbox" checked={weekdaysOnly} onChange={(e) => setWeekdaysOnly(e.target.checked)}
            className="rounded border-border" />
          Weekdays only
        </label>
        <select value={format} onChange={(e) => setFormat(e.target.value)}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none">
          {Object.keys(FORMATS).map((f) => <option key={f}>{f}</option>)}
        </select>
      </div>

      <button onClick={generate}
        className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
        Generate Date Range
      </button>

      {dates.length > 0 && (
        <div className="rounded-xl border border-border bg-muted p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">{dates.length} dates generated</p>
            <button onClick={copy} className="text-xs text-primary hover:underline">{copied ? "Copied!" : "Copy all"}</button>
          </div>
          <div className="max-h-56 overflow-y-auto font-mono text-xs text-foreground space-y-0.5">
            {dates.slice(0, 100).map((d) => <div key={d}>{d}</div>)}
            {dates.length > 100 && <p className="text-muted-foreground">...and {dates.length - 100} more</p>}
          </div>
        </div>
      )}
    </div>
  );
}
