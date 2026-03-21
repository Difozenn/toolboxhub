"use client";
import { useState } from "react";
export default function DecibelsConverter() {
  const [ratio, setRatio] = useState("");
  const [db, setDb] = useState("");
  const [mode, setMode] = useState<"power" | "amplitude">("power");
  const handleRatio = (v: string) => {
    setRatio(v);
    const n = parseFloat(v);
    if (!isNaN(n) && n > 0) {
      const result = mode === "power" ? 10 * Math.log10(n) : 20 * Math.log10(n);
      setDb(result.toFixed(4));
    } else setDb("");
  };
  const handleDb = (v: string) => {
    setDb(v);
    const n = parseFloat(v);
    if (!isNaN(n)) {
      const result = mode === "power" ? Math.pow(10, n / 10) : Math.pow(10, n / 20);
      setRatio(result.toFixed(6));
    } else setRatio("");
  };
  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <button onClick={() => setMode("power")} className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${mode === "power" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>Power ratio (10 log)</button>
        <button onClick={() => setMode("amplitude")} className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${mode === "amplitude" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>Amplitude ratio (20 log)</button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Ratio (linear)</label><input type="number" value={ratio} onChange={e => handleRatio(e.target.value)} placeholder="Enter ratio" className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Decibels (dB)</label><input type="number" value={db} onChange={e => handleDb(e.target.value)} placeholder="Enter dB" className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
      </div>
      <p className="text-sm text-muted-foreground">dB = {mode === "power" ? "10" : "20"} × log₁₀(ratio)</p>
    </div>
  );
}
