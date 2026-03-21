"use client";

import { useState } from "react";

export default function StatisticsVisualizer() {
  const [input, setInput] = useState("");

  const inputClass =
    "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
  const cardClass = "rounded-xl border border-border bg-muted p-4 text-center";

  const numbers = input
    .split(",")
    .map((s) => parseFloat(s.trim()))
    .filter((n) => !isNaN(n));

  const isValid = numbers.length > 0;

  const count = numbers.length;
  const sum = numbers.reduce((a, b) => a + b, 0);
  const mean = sum / count;
  const sorted = [...numbers].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const range = max - min;

  const median =
    count % 2 === 0
      ? (sorted[count / 2 - 1] + sorted[count / 2]) / 2
      : sorted[Math.floor(count / 2)];

  const modeMap: Record<number, number> = {};
  numbers.forEach((n) => {
    modeMap[n] = (modeMap[n] || 0) + 1;
  });
  const maxFreq = Math.max(...Object.values(modeMap));
  const modes = Object.entries(modeMap)
    .filter(([, freq]) => freq === maxFreq && freq > 1)
    .map(([val]) => parseFloat(val));
  const modeStr = modes.length > 0 ? modes.join(", ") : "No mode";

  const variance =
    count > 1 ? numbers.reduce((acc, n) => acc + (n - mean) ** 2, 0) / (count - 1) : 0;
  const stdDev = Math.sqrt(variance);

  const fmt = (n: number) => (Number.isInteger(n) ? n.toString() : n.toFixed(4));

  const chartMax = isValid ? Math.max(...numbers.map(Math.abs), 1) : 1;

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">
          Enter numbers (comma-separated)
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="1, 2, 3, 4, 5, 6, 7, 8"
          className={inputClass}
        />
      </div>

      {isValid && (
        <div className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { label: "Mean", value: fmt(mean) },
              { label: "Median", value: fmt(median) },
              { label: "Mode", value: modeStr },
              { label: "Std Dev", value: fmt(stdDev) },
              { label: "Variance", value: fmt(variance) },
            ].map((stat) => (
              <div key={stat.label} className={cardClass}>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-lg font-bold text-primary">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { label: "Min", value: fmt(min) },
              { label: "Max", value: fmt(max) },
              { label: "Range", value: fmt(range) },
              { label: "Sum", value: fmt(sum) },
              { label: "Count", value: count.toString() },
            ].map((stat) => (
              <div key={stat.label} className={cardClass}>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-lg font-bold text-foreground">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className={`${cardClass} text-left`}>
            <p className="mb-3 text-sm font-medium text-foreground">Data Visualization</p>
            <div className="flex items-end gap-1" style={{ height: 200 }}>
              {numbers.map((n, i) => {
                const height = Math.max((Math.abs(n) / chartMax) * 160, 4);
                return (
                  <div
                    key={i}
                    className="group relative flex flex-1 flex-col items-center justify-end"
                    style={{ height: 200 }}
                  >
                    <div className="mb-1 text-[10px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                      {n}
                    </div>
                    <div
                      className="w-full rounded-t-sm bg-primary transition-all hover:bg-primary/80"
                      style={{ height }}
                    />
                    <div className="mt-1 text-[10px] text-muted-foreground">{i + 1}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
