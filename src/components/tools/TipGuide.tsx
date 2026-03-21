"use client";

import { useState } from "react";

interface TipCategory {
  service: string;
  description: string;
  type: "percent" | "flat";
  lowPercent?: number;
  highPercent?: number;
  lowFlat?: number;
  highFlat?: number;
  note?: string;
}

const CATEGORIES: TipCategory[] = [
  { service: "Restaurant", description: "Sit-down dining", type: "percent", lowPercent: 15, highPercent: 20 },
  { service: "Bartender", description: "Bar service", type: "percent", lowPercent: 15, highPercent: 20 },
  {
    service: "Delivery",
    description: "Food delivery",
    type: "percent",
    lowPercent: 15,
    highPercent: 20,
    lowFlat: 3,
    highFlat: 5,
    note: "$3-5 or 15-20%",
  },
  { service: "Hair Salon", description: "Haircut & styling", type: "percent", lowPercent: 15, highPercent: 20 },
  { service: "Taxi / Rideshare", description: "Transportation", type: "percent", lowPercent: 15, highPercent: 20 },
  {
    service: "Hotel Housekeeping",
    description: "Per night",
    type: "flat",
    lowFlat: 2,
    highFlat: 5,
    note: "$2-5 per night",
  },
  { service: "Valet", description: "Parking service", type: "flat", lowFlat: 2, highFlat: 5 },
  {
    service: "Movers",
    description: "Per person",
    type: "flat",
    lowFlat: 20,
    highFlat: 50,
    note: "$20-50 per person",
  },
];

export default function TipGuide() {
  const [billAmount, setBillAmount] = useState("");

  const inputClass =
    "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
  const cardClass = "rounded-xl border border-border bg-muted p-4 text-center";

  const bill = parseFloat(billAmount);
  const hasBill = !isNaN(bill) && bill > 0;

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="max-w-sm">
        <label className="mb-1 block text-sm font-medium text-foreground">Bill Amount ($)</label>
        <input
          type="number"
          value={billAmount}
          onChange={(e) => setBillAmount(e.target.value)}
          placeholder="50.00"
          className={inputClass}
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Service</th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground">
                Guideline
              </th>
              {hasBill && (
                <>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                    Low Tip
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                    High Tip
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {CATEGORIES.map((cat) => {
              let lowTip = 0;
              let highTip = 0;
              let guideline = "";

              if (cat.type === "percent" && cat.lowPercent && cat.highPercent) {
                guideline = `${cat.lowPercent}-${cat.highPercent}%`;
                if (hasBill) {
                  lowTip = bill * (cat.lowPercent / 100);
                  highTip = bill * (cat.highPercent / 100);
                }
              } else if (cat.type === "flat" && cat.lowFlat !== undefined && cat.highFlat !== undefined) {
                guideline = `$${cat.lowFlat}-$${cat.highFlat}`;
                if (hasBill) {
                  lowTip = cat.lowFlat;
                  highTip = cat.highFlat;
                }
              }

              if (cat.note) {
                guideline = cat.note;
                if (hasBill && cat.lowPercent && cat.highPercent) {
                  lowTip = Math.max(cat.lowFlat || 0, bill * (cat.lowPercent / 100));
                  highTip = Math.max(cat.highFlat || 0, bill * (cat.highPercent / 100));
                }
              }

              return (
                <tr key={cat.service} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground">{cat.service}</div>
                    <div className="text-xs text-muted-foreground">{cat.description}</div>
                  </td>
                  <td className="px-4 py-3 text-center text-foreground">{guideline}</td>
                  {hasBill && (
                    <>
                      <td className="px-4 py-3 text-right text-foreground">{fmt(lowTip)}</td>
                      <td className="px-4 py-3 text-right font-medium text-primary">
                        {fmt(highTip)}
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {hasBill && (
        <div className="grid gap-3 sm:grid-cols-3">
          {[15, 18, 20].map((pct) => (
            <div key={pct} className={cardClass}>
              <p className="text-sm text-muted-foreground">{pct}% Tip</p>
              <p className="text-2xl font-bold text-primary">{fmt(bill * (pct / 100))}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Total: {fmt(bill + bill * (pct / 100))}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
