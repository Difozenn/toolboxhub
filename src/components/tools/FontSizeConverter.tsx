"use client";
import { useState } from "react";
export default function FontSizeConverter() {
  const [base, setBase] = useState(16);
  const [px, setPx] = useState("16");
  const pxNum = parseFloat(px) || 0;
  const pt = pxNum * 0.75;
  const em = pxNum / base;
  const rem = pxNum / base;
  const pct = (pxNum / base) * 100;
  const rows = [
    ["Pixels (px)", pxNum.toFixed(2)],
    ["Points (pt)", pt.toFixed(2)],
    ["Em", em.toFixed(4)],
    ["Rem", rem.toFixed(4)],
    ["Percentage (%)", pct.toFixed(2) + "%"],
  ];
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Font Size (px)</label>
          <input type="number" value={px} onChange={e => setPx(e.target.value)} placeholder="16"
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Base Size (px): {base}</label>
          <input type="number" value={base} onChange={e => setBase(+e.target.value || 16)} min={1} placeholder="16"
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
      </div>
      <div className="rounded-lg border border-border overflow-hidden">
        {rows.map(([label, val]) => (
          <div key={label} className="flex items-center justify-between px-4 py-3 border-b border-border last:border-b-0 hover:bg-muted/50">
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="text-sm font-mono font-semibold text-foreground">{val}</span>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-border bg-muted p-4 flex items-center gap-4">
        <span className="text-muted-foreground text-sm">Preview:</span>
        <span style={{ fontSize: `${pxNum}px` }} className="text-foreground font-medium">The quick brown fox</span>
      </div>
    </div>
  );
}
