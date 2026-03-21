"use client";

import { useState } from "react";

export default function MultiplicationTable() {
  const [n, setN] = useState(10);

  const size = Math.max(1, Math.min(20, n));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-muted-foreground">Table size (1–20):</label>
        <input type="number" min={1} max={20} value={n} onChange={(e) => setN(Number(e.target.value))}
          className="w-20 rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>
      <div className="overflow-auto rounded-xl border border-border">
        <table className="text-center text-xs">
          <thead>
            <tr>
              <th className="sticky left-0 bg-muted px-3 py-2 text-muted-foreground border-b border-r border-border">×</th>
              {Array.from({ length: size }, (_, i) => (
                <th key={i} className="px-3 py-2 font-semibold text-primary bg-muted border-b border-border">{i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: size }, (_, r) => (
              <tr key={r} className="hover:bg-muted/50">
                <td className="sticky left-0 px-3 py-2 font-semibold text-primary bg-muted border-r border-border">{r + 1}</td>
                {Array.from({ length: size }, (_, c) => (
                  <td key={c} className={`px-3 py-2 text-foreground ${(r + 1) === (c + 1) ? "font-bold text-primary" : ""}`}>{(r + 1) * (c + 1)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
