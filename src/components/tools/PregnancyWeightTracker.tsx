"use client";

import { useState } from "react";

const BMI_RANGES: { min: number; max: number; label: string; low: number; high: number }[] = [
  { min: 0, max: 18.49, label: "Underweight", low: 28, high: 40 },
  { min: 18.5, max: 24.99, label: "Normal weight", low: 25, high: 35 },
  { min: 25, max: 29.99, label: "Overweight", low: 15, high: 25 },
  { min: 30, max: 999, label: "Obese", low: 11, high: 20 },
];

export default function PregnancyWeightTracker() {
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("5");
  const [preWeight, setPreWeight] = useState("");
  const [curWeight, setCurWeight] = useState("");
  const [week, setWeek] = useState("20");

  const heightInches = parseInt(heightFt) * 12 + parseInt(heightIn);
  const preW = parseFloat(preWeight);
  const curW = parseFloat(curWeight);
  const wk = parseInt(week);

  const bmi = preW && heightInches ? (preW / (heightInches * heightInches)) * 703 : null;
  const range = bmi ? BMI_RANGES.find((r) => bmi >= r.min && bmi <= r.max) : null;

  const gained = preW && curW ? curW - preW : null;
  const expectedMid = range && wk ? ((range.low + range.high) / 2) * (wk / 40) : null;
  const status = gained !== null && expectedMid !== null
    ? gained < expectedMid * 0.7 ? "below" : gained > expectedMid * 1.3 ? "above" : "on track"
    : null;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Height</label>
          <div className="flex gap-2">
            <input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} placeholder="ft"
              className="w-20 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" />
            <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} placeholder="in"
              className="w-20 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Week of Pregnancy</label>
          <input type="number" value={week} onChange={(e) => setWeek(e.target.value)} min="1" max="42"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Pre-pregnancy Weight (lbs)</label>
          <input type="number" value={preWeight} onChange={(e) => setPreWeight(e.target.value)} placeholder="e.g., 140"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Current Weight (lbs)</label>
          <input type="number" value={curWeight} onChange={(e) => setCurWeight(e.target.value)} placeholder="e.g., 155"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
      </div>

      {bmi && range && (
        <div className="rounded-xl border border-border bg-muted p-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Pre-pregnancy BMI</span>
            <span className="font-bold text-foreground">{bmi.toFixed(1)} — {range.label}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Recommended Gain</span>
            <span className="font-bold text-foreground">{range.low}–{range.high} lbs total</span>
          </div>
          {gained !== null && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Weight Gained So Far</span>
              <span className={`font-bold ${status === "on track" ? "text-green-500" : status === "above" ? "text-red-500" : "text-yellow-500"}`}>
                {gained >= 0 ? "+" : ""}{gained.toFixed(1)} lbs — {status}
              </span>
            </div>
          )}
          <p className="text-xs text-muted-foreground italic">Based on IOM guidelines. Consult your OB for personalized advice.</p>
        </div>
      )}
    </div>
  );
}
