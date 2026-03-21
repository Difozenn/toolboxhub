"use client";
import { useState } from "react";
export default function EmToPx() {
  const [em, setEm] = useState("");
  const [px, setPx] = useState("");
  const [base, setBase] = useState("16");
  const factor = () => parseFloat(base) || 16;
  const handleEm = (v: string) => { setEm(v); const n = parseFloat(v); if (!isNaN(n)) setPx((n * factor()).toFixed(4)); else setPx(""); };
  const handlePx = (v: string) => { setPx(v); const n = parseFloat(v); if (!isNaN(n)) setEm((n / factor()).toFixed(6)); else setEm(""); };
  return (
    <div className="space-y-6">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Base font size (px)</label>
        <input type="number" value={base} onChange={e => { setBase(e.target.value); setEm(""); setPx(""); }} className="w-full max-w-xs rounded-lg border border-border bg-muted px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Em (em)</label><input type="number" value={em} onChange={e => handleEm(e.target.value)} placeholder="Enter em" className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Pixels (px)</label><input type="number" value={px} onChange={e => handlePx(e.target.value)} placeholder="Enter pixels" className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
      </div>
      <p className="text-sm text-muted-foreground">At {base || 16}px base: 1 em = {factor()}px</p>
    </div>
  );
}
