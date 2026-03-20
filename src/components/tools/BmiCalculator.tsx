"use client";

import { useState, useMemo } from "react";

function getBmiCategory(bmi: number): { label: string; color: string } {
  if (bmi < 18.5) return { label: "Underweight", color: "text-blue-500" };
  if (bmi < 25) return { label: "Normal weight", color: "text-green-500" };
  if (bmi < 30) return { label: "Overweight", color: "text-yellow-500" };
  return { label: "Obese", color: "text-red-500" };
}

export default function BmiCalculator() {
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");
  const [heightUnit, setHeightUnit] = useState<"cm" | "ftin">("cm");
  const [weight, setWeight] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");

  const bmi = useMemo(() => {
    const w = parseFloat(weight);
    if (!w || w <= 0) return null;

    let hMeters: number;
    if (heightUnit === "cm") {
      const cm = parseFloat(heightCm);
      if (!cm || cm <= 0) return null;
      hMeters = cm / 100;
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inches = parseFloat(heightIn) || 0;
      const totalInches = ft * 12 + inches;
      if (totalInches <= 0) return null;
      hMeters = totalInches * 0.0254;
    }

    const weightKg = weightUnit === "kg" ? w : w * 0.453592;
    return weightKg / (hMeters * hMeters);
  }, [weight, weightUnit, heightUnit, heightCm, heightFt, heightIn]);

  const healthyRange = useMemo(() => {
    let hMeters: number;
    if (heightUnit === "cm") {
      const cm = parseFloat(heightCm);
      if (!cm || cm <= 0) return null;
      hMeters = cm / 100;
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inches = parseFloat(heightIn) || 0;
      const totalInches = ft * 12 + inches;
      if (totalInches <= 0) return null;
      hMeters = totalInches * 0.0254;
    }
    const lowKg = 18.5 * hMeters * hMeters;
    const highKg = 24.9 * hMeters * hMeters;
    if (weightUnit === "lbs") {
      return { low: (lowKg / 0.453592).toFixed(1), high: (highKg / 0.453592).toFixed(1), unit: "lbs" };
    }
    return { low: lowKg.toFixed(1), high: highKg.toFixed(1), unit: "kg" };
  }, [heightUnit, heightCm, heightFt, heightIn, weightUnit]);

  const meterPosition = useMemo(() => {
    if (!bmi) return 0;
    // Scale: 10 to 40 mapped to 0-100%
    const clamped = Math.max(10, Math.min(40, bmi));
    return ((clamped - 10) / 30) * 100;
  }, [bmi]);

  const category = bmi ? getBmiCategory(bmi) : null;

  return (
    <div className="space-y-6">
      {/* Weight */}
      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">Weight</label>
          <div className="flex rounded-lg border border-border overflow-hidden">
            <button
              onClick={() => setWeightUnit("kg")}
              className={`px-3 py-1 text-sm font-medium transition-colors ${weightUnit === "kg" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-primary/10"}`}
            >
              kg
            </button>
            <button
              onClick={() => setWeightUnit("lbs")}
              className={`px-3 py-1 text-sm font-medium transition-colors ${weightUnit === "lbs" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-primary/10"}`}
            >
              lbs
            </button>
          </div>
        </div>
        <input
          type="number"
          step="any"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder={`Enter weight in ${weightUnit}`}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Height */}
      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">Height</label>
          <div className="flex rounded-lg border border-border overflow-hidden">
            <button
              onClick={() => setHeightUnit("cm")}
              className={`px-3 py-1 text-sm font-medium transition-colors ${heightUnit === "cm" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-primary/10"}`}
            >
              cm
            </button>
            <button
              onClick={() => setHeightUnit("ftin")}
              className={`px-3 py-1 text-sm font-medium transition-colors ${heightUnit === "ftin" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-primary/10"}`}
            >
              ft/in
            </button>
          </div>
        </div>
        {heightUnit === "cm" ? (
          <input
            type="number"
            step="any"
            value={heightCm}
            onChange={(e) => setHeightCm(e.target.value)}
            placeholder="Enter height in cm"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        ) : (
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="mb-1 block text-xs text-muted-foreground">Feet</label>
              <input
                type="number"
                value={heightFt}
                onChange={(e) => setHeightFt(e.target.value)}
                placeholder="ft"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-xs text-muted-foreground">Inches</label>
              <input
                type="number"
                value={heightIn}
                onChange={(e) => setHeightIn(e.target.value)}
                placeholder="in"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        )}
      </div>

      {/* Result */}
      {bmi !== null && category && (
        <div className="rounded-xl border border-border bg-muted p-5 space-y-5">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Your BMI</p>
            <p className="text-5xl font-bold text-foreground">{bmi.toFixed(1)}</p>
            <p className={`text-lg font-semibold mt-1 ${category.color}`}>{category.label}</p>
          </div>

          {/* Visual scale */}
          <div className="space-y-2">
            <div className="relative h-4 rounded-full overflow-hidden">
              <div className="absolute inset-0 flex">
                <div className="flex-1 bg-blue-400" />
                <div className="flex-[2] bg-green-400" />
                <div className="flex-[1.7] bg-yellow-400" />
                <div className="flex-[3.3] bg-red-400" />
              </div>
              {/* Indicator */}
              <div
                className="absolute top-0 h-full w-1 bg-foreground rounded-full shadow-lg transition-all duration-300"
                style={{ left: `${meterPosition}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>10</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>40</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground px-1">
              <span className="text-blue-500">Under</span>
              <span className="text-green-500">Normal</span>
              <span className="text-yellow-500">Over</span>
              <span className="text-red-500">Obese</span>
            </div>
          </div>

          {/* Healthy weight range */}
          {healthyRange && (
            <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-3 text-center">
              <p className="text-sm text-muted-foreground">Healthy weight range for your height</p>
              <p className="text-lg font-semibold text-green-600">
                {healthyRange.low} - {healthyRange.high} {healthyRange.unit}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
