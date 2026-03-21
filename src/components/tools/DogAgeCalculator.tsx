"use client";

import { useState } from "react";

const SIZE_FACTORS: Record<string, (age: number) => number> = {
  toy: (a) => a <= 1 ? 15 : a <= 2 ? 24 : 24 + (a - 2) * 4,
  small: (a) => a <= 1 ? 15 : a <= 2 ? 24 : 24 + (a - 2) * 4.5,
  medium: (a) => a <= 1 ? 15 : a <= 2 ? 24 : 24 + (a - 2) * 5,
  large: (a) => a <= 1 ? 15 : a <= 2 ? 24 : 24 + (a - 2) * 6,
  giant: (a) => a <= 1 ? 12 : a <= 2 ? 22 : 22 + (a - 2) * 7,
};

const SIZE_LABELS: Record<string, string> = {
  toy: "Toy (<12 lb)", small: "Small (12–25 lb)", medium: "Medium (26–55 lb)",
  large: "Large (56–90 lb)", giant: "Giant (>90 lb)",
};

const getLifeStage = (humanAge: number): string => {
  if (humanAge < 18) return "Puppy / Young";
  if (humanAge < 30) return "Young Adult";
  if (humanAge < 50) return "Adult";
  if (humanAge < 65) return "Mature Adult";
  if (humanAge < 80) return "Senior";
  return "Geriatric";
};

export default function DogAgeCalculator() {
  const [dogAge, setDogAge] = useState("3");
  const [size, setSize] = useState("medium");

  const age = parseFloat(dogAge);
  const humanAge = isNaN(age) || age < 0 ? null : Math.round(SIZE_FACTORS[size](age));
  const lifeStage = humanAge ? getLifeStage(humanAge) : null;

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Dog's Age (years)</label>
        <input type="number" value={dogAge} onChange={(e) => setDogAge(e.target.value)} min="0" max="25" step="0.5"
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Dog Size</label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {Object.entries(SIZE_LABELS).map(([key, label]) => (
            <button key={key} onClick={() => setSize(key)}
              className={`rounded-lg px-3 py-2 text-sm font-medium text-left transition-colors ${size === key ? "bg-primary text-white" : "border border-border bg-background text-foreground hover:bg-muted"}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {humanAge !== null && (
        <div className="rounded-xl border border-border bg-muted p-6 text-center space-y-4">
          <div className="text-5xl">🐕</div>
          <div>
            <p className="text-sm text-muted-foreground">Your {age}-year-old {size} dog is approximately</p>
            <p className="text-5xl font-bold text-primary mt-2">{humanAge}</p>
            <p className="text-lg text-foreground">human years old</p>
          </div>
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Life Stage: {lifeStage}
          </span>
          <p className="text-xs text-muted-foreground">Based on breed-size-adjusted aging research</p>
        </div>
      )}
    </div>
  );
}
