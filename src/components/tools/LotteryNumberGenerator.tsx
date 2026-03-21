"use client";

import { useState } from "react";

type Preset = "powerball" | "megamillions" | "custom";

interface LotteryResult {
  main: number[];
  bonus: number | null;
  label: string;
  bonusLabel: string;
}

export default function LotteryNumberGenerator() {
  const [preset, setPreset] = useState<Preset>("powerball");
  const [customCount, setCustomCount] = useState(6);
  const [customMin, setCustomMin] = useState(1);
  const [customMax, setCustomMax] = useState(49);
  const [result, setResult] = useState<LotteryResult | null>(null);

  const generateUniqueNumbers = (count: number, min: number, max: number): number[] => {
    const numbers = new Set<number>();
    while (numbers.size < count) {
      numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return Array.from(numbers).sort((a, b) => a - b);
  };

  const generate = () => {
    switch (preset) {
      case "powerball": {
        const main = generateUniqueNumbers(5, 1, 69);
        const bonus = Math.floor(Math.random() * 26) + 1;
        setResult({ main, bonus, label: "Powerball", bonusLabel: "Powerball" });
        break;
      }
      case "megamillions": {
        const main = generateUniqueNumbers(5, 1, 70);
        const bonus = Math.floor(Math.random() * 25) + 1;
        setResult({ main, bonus, label: "Mega Millions", bonusLabel: "Mega Ball" });
        break;
      }
      case "custom": {
        const main = generateUniqueNumbers(customCount, customMin, customMax);
        setResult({ main, bonus: null, label: "Custom", bonusLabel: "" });
        break;
      }
    }
  };

  const ballColors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-teal-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-cyan-500",
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          Lottery Type
        </label>
        <select
          value={preset}
          onChange={(e) => setPreset(e.target.value as Preset)}
          className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="powerball">Powerball (5 from 1-69 + 1 from 1-26)</option>
          <option value="megamillions">Mega Millions (5 from 1-70 + 1 from 1-25)</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      {preset === "custom" && (
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              How Many Numbers
            </label>
            <input
              type="number"
              min={1}
              max={20}
              value={customCount}
              onChange={(e) => setCustomCount(Number(e.target.value))}
              className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Min Value
            </label>
            <input
              type="number"
              min={1}
              value={customMin}
              onChange={(e) => setCustomMin(Number(e.target.value))}
              className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Max Value
            </label>
            <input
              type="number"
              min={customMin + customCount - 1}
              value={customMax}
              onChange={(e) => setCustomMax(Number(e.target.value))}
              className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      )}

      <button
        onClick={generate}
        className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Generate Numbers
      </button>

      {result && (
        <div className="rounded-xl border border-border bg-muted p-6 text-center">
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            {result.label}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {result.main.map((num, i) => (
              <div
                key={i}
                className={`flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold text-white shadow-md ${ballColors[i % ballColors.length]}`}
              >
                {num}
              </div>
            ))}
            {result.bonus !== null && (
              <>
                <div className="mx-1 text-2xl text-muted-foreground">+</div>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-lg font-bold text-white shadow-md">
                  {result.bonus}
                </div>
              </>
            )}
          </div>
          {result.bonus !== null && (
            <p className="mt-3 text-sm text-muted-foreground">
              {result.bonusLabel}:{" "}
              <span className="font-semibold text-foreground">{result.bonus}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
