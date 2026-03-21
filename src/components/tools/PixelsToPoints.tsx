"use client";
import { useState } from "react";
export default function PixelsToPoints() {
  const [px, setPx] = useState("");
  const [pt, setPt] = useState("");
  const [dpi, setDpi] = useState("96");
  const factor = () => 72 / (parseFloat(dpi) || 96);
  const handlePx = (v: string) => { setPx(v); const n = parseFloat(v); if (!isNaN(n)) setPt((n * factor()).toFixed(4)); else setPt(""); };
  const handlePt = (v: string) => { setPt(v); const n = parseFloat(v); if (!isNaN(n)) setPx((n / factor()).toFixed(4)); else setPx(""); };
  return (
    <div className="space-y-6">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">DPI (dots per inch)</label>
        <input type="number" value={dpi} onChange={e => { setDpi(e.target.value); setPx(""); setPt(""); }} className="w-full max-w-xs rounded-lg border border-border bg-muted px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Pixels (px)</label><input type="number" value={px} onChange={e => handlePx(e.target.value)} placeholder="Enter pixels" className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Points (pt)</label><input type="number" value={pt} onChange={e => handlePt(e.target.value)} placeholder="Enter points" className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
      </div>
      <p className="text-sm text-muted-foreground">At 96 DPI: 1 px = 0.75 pt &nbsp;|&nbsp; 1 pt = 1.333 px</p>
    </div>
  );
}
