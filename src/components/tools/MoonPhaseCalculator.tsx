"use client";

import { useState } from "react";

function getMoonPhase(date: Date): { phase: string; illumination: number; icon: string; daysUntilFull: number } {
  const knownNew = new Date("2000-01-06T18:14:00Z");
  const synodicPeriod = 29.53058867;
  const diff = (date.getTime() - knownNew.getTime()) / (1000 * 60 * 60 * 24);
  const cyclePos = ((diff % synodicPeriod) + synodicPeriod) % synodicPeriod;
  const illumination = Math.round((1 - Math.cos((cyclePos / synodicPeriod) * 2 * Math.PI)) / 2 * 100);
  const daysUntilFull = cyclePos <= 14.76 ? Math.round(14.76 - cyclePos) : Math.round(synodicPeriod - cyclePos + 14.76);

  let phase: string; let icon: string;
  if (cyclePos < 1.85) { phase = "New Moon"; icon = "🌑"; }
  else if (cyclePos < 7.38) { phase = "Waxing Crescent"; icon = "🌒"; }
  else if (cyclePos < 9.22) { phase = "First Quarter"; icon = "🌓"; }
  else if (cyclePos < 14.76) { phase = "Waxing Gibbous"; icon = "🌔"; }
  else if (cyclePos < 16.61) { phase = "Full Moon"; icon = "🌕"; }
  else if (cyclePos < 22.15) { phase = "Waning Gibbous"; icon = "🌖"; }
  else if (cyclePos < 23.99) { phase = "Third Quarter"; icon = "🌗"; }
  else { phase = "Waning Crescent"; icon = "🌘"; }

  return { phase, illumination, icon, daysUntilFull };
}

export default function MoonPhaseCalculator() {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const d = new Date(date + "T12:00:00");
  const { phase, illumination, icon, daysUntilFull } = getMoonPhase(d);

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Select Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      <div className="rounded-xl border border-border bg-muted p-6 text-center space-y-4">
        <div className="text-7xl">{icon}</div>
        <div>
          <h3 className="text-xl font-bold text-foreground">{phase}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {new Date(date + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
          <div className="rounded-lg border border-border bg-background p-3">
            <p className="text-2xl font-bold text-primary">{illumination}%</p>
            <p className="text-xs text-muted-foreground">Illumination</p>
          </div>
          <div className="rounded-lg border border-border bg-background p-3">
            <p className="text-2xl font-bold text-primary">{daysUntilFull}</p>
            <p className="text-xs text-muted-foreground">Days to Full Moon</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[["🌑","New"],["🌓","Quarter"],["🌕","Full"],["🌗","Quarter"]].map(([icon, label]) => (
          <div key={label} className="rounded-lg border border-border bg-muted p-2 text-center">
            <div className="text-2xl">{icon}</div>
            <p className="text-xs text-muted-foreground mt-1">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
