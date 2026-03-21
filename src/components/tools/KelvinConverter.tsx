"use client";
import { useState } from "react";
export default function KelvinConverter() {
  const [celsius, setCelsius] = useState("");
  const [kelvin, setKelvin] = useState("");
  const handleCelsius = (v: string) => { setCelsius(v); const n = parseFloat(v); if (!isNaN(n)) setKelvin((n + 273.15).toFixed(2)); else setKelvin(""); };
  const handleKelvin = (v: string) => { setKelvin(v); const n = parseFloat(v); if (!isNaN(n)) setCelsius((n - 273.15).toFixed(2)); else setCelsius(""); };
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Celsius (°C)</label><input type="number" value={celsius} onChange={e => handleCelsius(e.target.value)} placeholder="Enter Celsius" className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Kelvin (K)</label><input type="number" value={kelvin} onChange={e => handleKelvin(e.target.value)} placeholder="Enter Kelvin" className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
      </div>
      <p className="text-sm text-muted-foreground">K = °C + 273.15 &nbsp;|&nbsp; Absolute zero = 0 K = −273.15 °C</p>
    </div>
  );
}
