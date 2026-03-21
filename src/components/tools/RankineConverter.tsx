"use client";
import { useState } from "react";
export default function RankineConverter() {
  const [fahrenheit, setFahrenheit] = useState("");
  const [rankine, setRankine] = useState("");
  const handleF = (v: string) => { setFahrenheit(v); const n = parseFloat(v); if (!isNaN(n)) setRankine((n + 459.67).toFixed(2)); else setRankine(""); };
  const handleR = (v: string) => { setRankine(v); const n = parseFloat(v); if (!isNaN(n)) setFahrenheit((n - 459.67).toFixed(2)); else setFahrenheit(""); };
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Fahrenheit (°F)</label><input type="number" value={fahrenheit} onChange={e => handleF(e.target.value)} placeholder="Enter Fahrenheit" className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Rankine (°R)</label><input type="number" value={rankine} onChange={e => handleR(e.target.value)} placeholder="Enter Rankine" className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
      </div>
      <p className="text-sm text-muted-foreground">°R = °F + 459.67 &nbsp;|&nbsp; Absolute zero = 0 °R = −459.67 °F</p>
    </div>
  );
}
