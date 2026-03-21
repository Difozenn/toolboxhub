"use client";

import { useState } from "react";

export default function ShippingCalculator() {
  const [weight, setWeight] = useState(1);
  const [length, setLength] = useState(20);
  const [width, setWidth] = useState(15);
  const [height, setHeight] = useState(10);
  const [destination, setDestination] = useState("domestic");

  const dimWeight = (length * width * height) / 5000;
  const chargeableWeight = Math.max(weight, dimWeight);
  const baseRate = destination === "domestic" ? 5 : 15;
  const perKg = destination === "domestic" ? 3 : 8;
  const estimated = baseRate + chargeableWeight * perKg;

  const fmt = (n: number) => `$${n.toFixed(2)}`;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-3 text-xs text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300">
        Estimates only — based on simplified weight-based formula. Actual rates vary by carrier.
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Actual Weight (kg)</label>
          <input type="number" min={0.1} step={0.1} value={weight} onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Destination</label>
          <select value={destination} onChange={(e) => setDestination(e.target.value)}
            className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none">
            <option value="domestic">Domestic</option>
            <option value="international">International</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Dimensions (cm)</label>
          <div className="flex gap-2">
            <input type="number" min={1} value={length} onChange={(e) => setLength(Number(e.target.value))} placeholder="L"
              className="flex-1 rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" />
            <input type="number" min={1} value={width} onChange={(e) => setWidth(Number(e.target.value))} placeholder="W"
              className="flex-1 rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" />
            <input type="number" min={1} value={height} onChange={(e) => setHeight(Number(e.target.value))} placeholder="H"
              className="flex-1 rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" />
          </div>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-muted p-4 text-center">
          <p className="text-xs text-muted-foreground">Dimensional Weight</p>
          <p className="text-xl font-bold text-foreground">{dimWeight.toFixed(2)} kg</p>
        </div>
        <div className="rounded-xl border border-border bg-muted p-4 text-center">
          <p className="text-xs text-muted-foreground">Chargeable Weight</p>
          <p className="text-xl font-bold text-foreground">{chargeableWeight.toFixed(2)} kg</p>
        </div>
        <div className="rounded-xl border border-primary bg-primary/5 p-4 text-center">
          <p className="text-xs text-muted-foreground">Estimated Cost</p>
          <p className="text-xl font-bold text-primary">{fmt(estimated)}</p>
        </div>
      </div>
    </div>
  );
}
