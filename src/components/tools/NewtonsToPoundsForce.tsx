"use client";
import { useState } from "react";
export default function NewtonsToPoundsForce() {
  const [fromVal, setFromVal] = useState("");
  const [toVal, setToVal] = useState("");
  const factor = 0.224809;
  const handleFrom = (v: string) => { setFromVal(v); const n = parseFloat(v); if (!isNaN(n)) setToVal((n * factor).toFixed(6)); else setToVal(""); };
  const handleTo = (v: string) => { setToVal(v); const n = parseFloat(v); if (!isNaN(n)) setFromVal((n / factor).toFixed(4)); else setFromVal(""); };
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Newtons (N)</label><input type="number" value={fromVal} onChange={e => handleFrom(e.target.value)} placeholder="Enter newtons" className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Pounds-force (lbf)</label><input type="number" value={toVal} onChange={e => handleTo(e.target.value)} placeholder="Enter lbf" className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
      </div>
      <p className="text-sm text-muted-foreground">1 Newton = 0.2248 pounds-force</p>
    </div>
  );
}
