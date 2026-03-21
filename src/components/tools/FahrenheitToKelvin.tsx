"use client";
import { useState } from "react";
export default function FahrenheitToKelvin() {
  const [f, setF] = useState("");
  const [k, setK] = useState("");
  const handleF = (v: string) => { setF(v); const n = parseFloat(v); if (!isNaN(n)) setK(((n + 459.67) * 5 / 9).toFixed(4)); else setK(""); };
  const handleK = (v: string) => { setK(v); const n = parseFloat(v); if (!isNaN(n)) setF((n * 9 / 5 - 459.67).toFixed(4)); else setF(""); };
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Fahrenheit (°F)</label><input type="number" value={f} onChange={e => handleF(e.target.value)} placeholder="Enter Fahrenheit" className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Kelvin (K)</label><input type="number" value={k} onChange={e => handleK(e.target.value)} placeholder="Enter Kelvin" className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
      </div>
      <p className="text-sm text-muted-foreground">K = (°F + 459.67) × 5/9</p>
    </div>
  );
}
