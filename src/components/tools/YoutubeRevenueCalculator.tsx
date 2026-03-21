"use client";

import { useState } from "react";

export default function YoutubeRevenueCalculator() {
  const [views, setViews] = useState("");
  const [cpm, setCpm] = useState("3");

  const v = parseFloat(views) || 0;
  const c = parseFloat(cpm) || 3;
  const revenue = (v / 1000) * c;

  const ranges = [
    { label: "Low CPM", cpm: 1, color: "text-muted-foreground" },
    { label: "Medium CPM", cpm: 3, color: "text-primary" },
    { label: "High CPM", cpm: 8, color: "text-green-500" },
  ];

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Monthly Views</label>
          <input type="number" min="0" value={views} onChange={(e) => setViews(e.target.value)} placeholder="100000"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">CPM Rate ($ per 1,000 views)</label>
          <input type="number" min="0" step="0.1" value={cpm} onChange={(e) => setCpm(e.target.value)} placeholder="3"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-muted p-6 text-center">
        <p className="text-sm text-muted-foreground mb-1">Estimated Monthly Revenue</p>
        <p className="text-4xl font-bold text-primary">{fmt(revenue)}</p>
        <p className="text-xs text-muted-foreground mt-2">Based on {(v).toLocaleString()} views at ${c} CPM</p>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">CPM Range Estimates</p>
        {ranges.map(({ label, cpm: r, color }) => (
          <div key={label} className="flex items-center justify-between rounded-lg border border-border bg-muted p-3">
            <div>
              <span className="text-sm font-medium text-foreground">{label}</span>
              <span className="text-xs text-muted-foreground ml-2">${r}/1k views</span>
            </div>
            <span className={`text-sm font-bold ${color}`}>{fmt((v / 1000) * r)}/mo</span>
          </div>
        ))}
      </div>
    </div>
  );
}
