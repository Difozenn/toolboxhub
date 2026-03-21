"use client";

import { useState } from "react";

const SIZES: { us_m: number; us_w: number; uk: number; eu: number; jp: number; cm: number }[] = [
  { us_m: 6, us_w: 7.5, uk: 5.5, eu: 39, jp: 24, cm: 24 },
  { us_m: 6.5, us_w: 8, uk: 6, eu: 39.5, jp: 24.5, cm: 24.5 },
  { us_m: 7, us_w: 8.5, uk: 6.5, eu: 40, jp: 25, cm: 25 },
  { us_m: 7.5, us_w: 9, uk: 7, eu: 40.5, jp: 25.5, cm: 25.5 },
  { us_m: 8, us_w: 9.5, uk: 7.5, eu: 41, jp: 26, cm: 26 },
  { us_m: 8.5, us_w: 10, uk: 8, eu: 42, jp: 26.5, cm: 26.5 },
  { us_m: 9, us_w: 10.5, uk: 8.5, eu: 42.5, jp: 27, cm: 27 },
  { us_m: 9.5, us_w: 11, uk: 9, eu: 43, jp: 27.5, cm: 27.5 },
  { us_m: 10, us_w: 11.5, uk: 9.5, eu: 44, jp: 28, cm: 28 },
  { us_m: 10.5, us_w: 12, uk: 10, eu: 44.5, jp: 28.5, cm: 28.5 },
  { us_m: 11, us_w: 12.5, uk: 10.5, eu: 45, jp: 29, cm: 29 },
  { us_m: 12, us_w: 13.5, uk: 11.5, eu: 46, jp: 30, cm: 30 },
];

type System = "us_m" | "us_w" | "uk" | "eu" | "jp" | "cm";
const LABELS: Record<System, string> = { us_m: "US Men", us_w: "US Women", uk: "UK", eu: "EU", jp: "JP", cm: "CM" };

export default function ShoeSizeConverter() {
  const [system, setSystem] = useState<System>("us_m");
  const [size, setSize] = useState("");

  const inputNum = parseFloat(size);
  const match = isNaN(inputNum) ? null : SIZES.find((s) => Math.abs((s[system] as number) - inputNum) < 0.3);

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Your Sizing System</label>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(LABELS) as System[]).map((s) => (
            <button key={s} onClick={() => setSystem(s)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${system === s ? "bg-primary text-white" : "border border-border bg-background text-foreground hover:bg-muted"}`}>
              {LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Your Size ({LABELS[system]})</label>
        <input type="number" value={size} onChange={(e) => setSize(e.target.value)} step="0.5"
          placeholder={`e.g., ${SIZES[4][system]}`}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      {match && (
        <div className="rounded-xl border border-border bg-muted p-4 space-y-3">
          <p className="text-sm font-semibold text-foreground">Equivalent Sizes</p>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(LABELS) as System[]).map((s) => (
              <div key={s} className={`rounded-lg border p-3 text-center ${s === system ? "border-primary bg-primary/5" : "border-border bg-background"}`}>
                <p className={`text-xl font-bold ${s === system ? "text-primary" : "text-foreground"}`}>{match[s]}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{LABELS[s]}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {size && !match && <p className="text-sm text-muted-foreground text-center">No exact match found. Try a nearby size.</p>}
    </div>
  );
}
