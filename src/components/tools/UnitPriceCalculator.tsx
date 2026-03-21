"use client";

import { useState } from "react";

export default function UnitPriceCalculator() {
  const [price1, setPrice1] = useState("");
  const [qty1, setQty1] = useState("");
  const [label1, setLabel1] = useState("Item A");
  const [price2, setPrice2] = useState("");
  const [qty2, setQty2] = useState("");
  const [label2, setLabel2] = useState("Item B");

  const inputClass =
    "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
  const cardClass = "rounded-xl border border-border bg-muted p-4 text-center";

  const p1 = parseFloat(price1);
  const q1 = parseFloat(qty1);
  const p2 = parseFloat(price2);
  const q2 = parseFloat(qty2);

  const unit1 = !isNaN(p1) && !isNaN(q1) && q1 > 0 ? p1 / q1 : null;
  const unit2 = !isNaN(p2) && !isNaN(q2) && q2 > 0 ? p2 / q2 : null;

  let winner: "a" | "b" | "tie" | null = null;
  if (unit1 !== null && unit2 !== null) {
    if (unit1 < unit2) winner = "a";
    else if (unit2 < unit1) winner = "b";
    else winner = "tie";
  }

  const fmt = (n: number) => "$" + n.toFixed(4);

  const savings =
    unit1 !== null && unit2 !== null ? Math.abs(unit1 - unit2) : 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Item A */}
        <div
          className={`space-y-3 rounded-xl border p-4 ${
            winner === "a" ? "border-green-500 bg-green-500/5" : "border-border"
          }`}
        >
          <input
            type="text"
            value={label1}
            onChange={(e) => setLabel1(e.target.value)}
            className={`${inputClass} text-center font-semibold`}
          />
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Price ($)</label>
            <input
              type="number"
              value={price1}
              onChange={(e) => setPrice1(e.target.value)}
              placeholder="5.99"
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Quantity / Weight
            </label>
            <input
              type="number"
              value={qty1}
              onChange={(e) => setQty1(e.target.value)}
              placeholder="16"
              className={inputClass}
            />
          </div>
          {unit1 !== null && (
            <div className={cardClass}>
              <p className="text-sm text-muted-foreground">Unit Price</p>
              <p className="text-2xl font-bold text-foreground">{fmt(unit1)}</p>
              <p className="text-xs text-muted-foreground">per unit</p>
            </div>
          )}
          {winner === "a" && (
            <div className="rounded-lg bg-green-500/10 px-3 py-2 text-center text-sm font-semibold text-green-500">
              Better Deal!
            </div>
          )}
        </div>

        {/* Item B */}
        <div
          className={`space-y-3 rounded-xl border p-4 ${
            winner === "b" ? "border-green-500 bg-green-500/5" : "border-border"
          }`}
        >
          <input
            type="text"
            value={label2}
            onChange={(e) => setLabel2(e.target.value)}
            className={`${inputClass} text-center font-semibold`}
          />
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Price ($)</label>
            <input
              type="number"
              value={price2}
              onChange={(e) => setPrice2(e.target.value)}
              placeholder="8.49"
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Quantity / Weight
            </label>
            <input
              type="number"
              value={qty2}
              onChange={(e) => setQty2(e.target.value)}
              placeholder="32"
              className={inputClass}
            />
          </div>
          {unit2 !== null && (
            <div className={cardClass}>
              <p className="text-sm text-muted-foreground">Unit Price</p>
              <p className="text-2xl font-bold text-foreground">{fmt(unit2)}</p>
              <p className="text-xs text-muted-foreground">per unit</p>
            </div>
          )}
          {winner === "b" && (
            <div className="rounded-lg bg-green-500/10 px-3 py-2 text-center text-sm font-semibold text-green-500">
              Better Deal!
            </div>
          )}
        </div>
      </div>

      {winner && winner !== "tie" && (
        <div className={`${cardClass} bg-primary/10`}>
          <p className="text-sm text-muted-foreground">Savings</p>
          <p className="text-xl font-bold text-primary">
            {winner === "a" ? label1 : label2} saves you {fmt(savings)} per unit
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            compared to {winner === "a" ? label2 : label1}
          </p>
        </div>
      )}

      {winner === "tie" && (
        <div className={`${cardClass} bg-primary/10`}>
          <p className="text-lg font-bold text-primary">Both items have the same unit price!</p>
        </div>
      )}
    </div>
  );
}
