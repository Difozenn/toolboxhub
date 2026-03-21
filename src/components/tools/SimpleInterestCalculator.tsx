"use client";

import { useState } from "react";

export default function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");

  const inputClass =
    "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
  const cardClass = "rounded-xl border border-border bg-muted p-4 text-center";

  const P = parseFloat(principal);
  const R = parseFloat(rate) / 100;
  const T = parseFloat(time);

  const isValid = !isNaN(P) && !isNaN(R) && !isNaN(T) && P > 0 && T > 0;
  const interest = isValid ? P * R * T : 0;
  const totalAmount = isValid ? P + interest : 0;

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Principal ($)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="1000"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Annual Rate (%)
          </label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="5"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Time (years)</label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="3"
            className={inputClass}
          />
        </div>
      </div>

      {isValid && (
        <div className="space-y-4">
          <div className={`${cardClass} bg-primary/10`}>
            <p className="mb-1 text-sm text-muted-foreground">Formula</p>
            <p className="font-mono text-lg text-foreground">
              I = P &times; R &times; T
            </p>
            <p className="mt-2 font-mono text-sm text-muted-foreground">
              I = {fmt(P)} &times; {(R).toFixed(4)} &times; {T}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className={cardClass}>
              <p className="text-sm text-muted-foreground">Principal</p>
              <p className="text-2xl font-bold text-foreground">{fmt(P)}</p>
            </div>
            <div className={cardClass}>
              <p className="text-sm text-muted-foreground">Simple Interest</p>
              <p className="text-2xl font-bold text-green-500">{fmt(interest)}</p>
            </div>
            <div className={cardClass}>
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-2xl font-bold text-primary">{fmt(totalAmount)}</p>
            </div>
          </div>

          <div className={cardClass}>
            <p className="text-sm text-muted-foreground">Breakdown</p>
            <div className="mt-2 space-y-1 text-sm text-foreground">
              <p>
                You invest <span className="font-semibold">{fmt(P)}</span> at a rate of{" "}
                <span className="font-semibold">{rate}%</span> per year for{" "}
                <span className="font-semibold">{T} year{T !== 1 ? "s" : ""}</span>.
              </p>
              <p>
                You earn <span className="font-semibold text-green-500">{fmt(interest)}</span> in
                interest.
              </p>
              <p>
                Your total amount after {T} year{T !== 1 ? "s" : ""} is{" "}
                <span className="font-semibold text-primary">{fmt(totalAmount)}</span>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
