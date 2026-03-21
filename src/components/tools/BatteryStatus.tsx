"use client";

import { useState, useEffect } from "react";

interface BatteryInfo { level: number; charging: boolean; chargingTime: number; dischargingTime: number; }

export default function BatteryStatus() {
  const [battery, setBattery] = useState<BatteryInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const nav = navigator as Navigator & { getBattery?: () => Promise<BatteryManager> };
    interface BatteryManager extends EventTarget {
      level: number;
      charging: boolean;
      chargingTime: number;
      dischargingTime: number;
    }
    if (!nav.getBattery) { setError("Battery API not supported in this browser."); return; }
    nav.getBattery().then((b: BatteryManager) => {
      const update = () => setBattery({ level: b.level, charging: b.charging, chargingTime: b.chargingTime, dischargingTime: b.dischargingTime });
      update();
      b.addEventListener("levelchange", update);
      b.addEventListener("chargingchange", update);
      b.addEventListener("chargingtimechange", update);
      b.addEventListener("dischargingtimechange", update);
    }).catch(() => setError("Could not access battery information."));
  }, []);

  const fmt = (s: number) => {
    if (s === Infinity || s === 0) return "N/A";
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  const pct = battery ? Math.round(battery.level * 100) : 0;
  const color = pct > 50 ? "bg-green-500" : pct > 20 ? "bg-yellow-500" : "bg-red-500";
  const textColor = pct > 50 ? "text-green-600" : pct > 20 ? "text-yellow-600" : "text-red-600";

  return (
    <div className="space-y-4">
      {error ? (
        <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-4 text-sm text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300">{error}</div>
      ) : !battery ? (
        <p className="text-sm text-muted-foreground">Loading battery info...</p>
      ) : (
        <>
          <div className="rounded-xl border border-border bg-muted p-6 text-center space-y-4">
            <div className="relative mx-auto w-24 h-12 rounded-lg border-4 border-border bg-background flex items-center overflow-hidden">
              <div className={`h-full transition-all ${color}`} style={{ width: `${pct}%` }} />
              <span className={`absolute inset-0 flex items-center justify-center text-sm font-bold ${textColor}`}>{pct}%</span>
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-4 rounded-r bg-border" />
            </div>
            <p className={`text-3xl font-bold ${textColor}`}>{pct}%</p>
            <p className="text-sm text-muted-foreground">{battery.charging ? "Charging" : "Discharging"}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-muted p-4">
              <p className="text-xs text-muted-foreground">Charging Status</p>
              <p className="font-semibold text-foreground">{battery.charging ? "Plugged In" : "On Battery"}</p>
            </div>
            <div className="rounded-xl border border-border bg-muted p-4">
              <p className="text-xs text-muted-foreground">{battery.charging ? "Full Charge In" : "Time Remaining"}</p>
              <p className="font-semibold text-foreground">{battery.charging ? fmt(battery.chargingTime) : fmt(battery.dischargingTime)}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
