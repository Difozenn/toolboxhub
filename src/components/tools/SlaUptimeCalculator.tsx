"use client";

import { useState } from "react";

export default function SlaUptimeCalculator() {
  const [sla, setSla] = useState("99.9");

  const uptime = parseFloat(sla);
  const downtime = 100 - uptime;

  const calc = (totalSeconds: number) => {
    const s = (downtime / 100) * totalSeconds;
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = Math.floor(s % 60);
    if (h > 24) { const d = Math.floor(h / 24); const rh = h % 24; return `${d}d ${rh}h ${m}m`; }
    if (h > 0) return `${h}h ${m}m ${sec}s`;
    if (m > 0) return `${m}m ${sec}s`;
    return `${sec.toFixed(1)}s`;
  };

  const nines = sla.length - sla.replace(/9/g, "").length;

  const presets = ["99", "99.9", "99.95", "99.99", "99.999", "99.9999"];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">SLA Uptime %</label>
          <div className="flex gap-2">
            <input type="number" min={0} max={100} step={0.001} value={sla} onChange={(e) => setSla(e.target.value)}
              className="flex-1 rounded-xl border border-border bg-muted px-4 py-2 text-lg font-mono text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            <span className="flex items-center text-lg font-semibold text-muted-foreground">%</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button key={p} onClick={() => setSla(p)}
              className={`rounded-lg px-3 py-1 text-sm font-mono font-medium transition-colors ${sla === p ? "bg-primary text-white" : "border border-border bg-background text-foreground hover:bg-muted"}`}>
              {p}%
            </button>
          ))}
        </div>
      </div>
      {!isNaN(uptime) && uptime >= 0 && uptime <= 100 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">Allowed downtime at <span className="font-bold text-primary">{sla}%</span> uptime ({nines} nine{nines !== 1 ? "s" : ""}):</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: "Per Year", seconds: 365.25 * 24 * 3600 },
              { label: "Per Month", seconds: 30.44 * 24 * 3600 },
              { label: "Per Week", seconds: 7 * 24 * 3600 },
              { label: "Per Day", seconds: 24 * 3600 },
            ].map(({ label, seconds }) => (
              <div key={label} className="rounded-xl border border-border bg-muted p-4">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="font-mono text-lg font-semibold text-primary">{calc(seconds)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
