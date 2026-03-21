"use client";
import { useState } from "react";
export default function RpmToRadians() {
  const [fromVal, setFromVal] = useState("");
  const [toVal, setToVal] = useState("");
  const factor = Math.PI * 2 / 60;
  const handleFrom = (v: string) => { setFromVal(v); const n = parseFloat(v); if (!isNaN(n)) setToVal((n * factor).toFixed(6)); else setToVal(""); };
  const handleTo = (v: string) => { setToVal(v); const n = parseFloat(v); if (!isNaN(n)) setFromVal((n / factor).toFixed(4)); else setFromVal(""); };
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">RPM (rev/min)</label><input type="number" value={fromVal} onChange={e => handleFrom(e.target.value)} placeholder="Enter RPM" className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Radians/second (rad/s)</label><input type="number" value={toVal} onChange={e => handleTo(e.target.value)} placeholder="Enter rad/s" className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
      </div>
      <p className="text-sm text-muted-foreground">1 RPM = 0.10472 rad/s (2π/60)</p>
    </div>
  );
}
