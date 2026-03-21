"use client";

import { useState } from "react";

const CLASSIFICATIONS = [
  { min: 0, max: 29, label: "Poor", color: "text-red-500" },
  { min: 30, max: 39, label: "Fair", color: "text-orange-500" },
  { min: 40, max: 49, label: "Good", color: "text-yellow-500" },
  { min: 50, max: 59, label: "Excellent", color: "text-blue-500" },
  { min: 60, max: 999, label: "Elite", color: "text-green-500" },
];

export default function Vo2MaxCalculator() {
  const [method, setMethod] = useState<"1.5mile" | "race">("1.5mile");
  const [timeMin, setTimeMin] = useState("");
  const [timeSec, setTimeSec] = useState("0");
  const [distance, setDistance] = useState("5");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("30");
  const [vo2, setVo2] = useState<number | null>(null);

  const calculate = () => {
    const mins = parseFloat(timeMin) + parseFloat(timeSec || "0") / 60;
    if (isNaN(mins) || mins <= 0) return;

    if (method === "1.5mile") {
      // 1.5 mile run test formula
      const result = 3.5 + (483 / mins);
      setVo2(Math.round(result * 10) / 10);
    } else {
      // Jack Daniels' race time prediction formula (simplified)
      const distKm = parseFloat(distance);
      const totalMins = mins;
      const velocity = distKm / (totalMins / 60); // km/h
      const result = -4.6 + 0.182258 * velocity + 0.000104 * velocity * velocity;
      const percentVO2 = 0.8 + 0.1894393 * Math.exp(-0.012778 * totalMins) + 0.2989558 * Math.exp(-0.1932605 * totalMins);
      setVo2(Math.round((result / percentVO2) * 10) / 10);
    }
  };

  const classification = vo2 ? CLASSIFICATIONS.find((c) => vo2 >= c.min && vo2 <= c.max) : null;

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {([["1.5mile", "1.5 Mile Run Test"], ["race", "Race Time"]] as const).map(([m, label]) => (
          <button key={m} onClick={() => setMethod(m)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${method === m ? "bg-primary text-white" : "border border-border bg-background text-foreground hover:bg-muted"}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            {method === "1.5mile" ? "1.5 Mile Run Time" : "Race Time (min:sec)"}
          </label>
          <div className="flex gap-2 items-center">
            <input type="number" value={timeMin} onChange={(e) => setTimeMin(e.target.value)} placeholder="min"
              className="w-20 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" />
            <span className="text-muted-foreground">:</span>
            <input type="number" value={timeSec} onChange={(e) => setTimeSec(e.target.value)} placeholder="sec" min="0" max="59"
              className="w-20 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" />
          </div>
        </div>

        {method === "race" && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Race Distance (km)</label>
            <select value={distance} onChange={(e) => setDistance(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none">
              {[["5","5K"],["10","10K"],["21.1","Half Marathon"],["42.2","Marathon"]].map(([v, l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Age</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" />
        </div>
      </div>

      <button onClick={calculate}
        className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
        Estimate VO2 Max
      </button>

      {vo2 !== null && (
        <div className="rounded-xl border border-border bg-muted p-5 text-center space-y-2">
          <p className="text-sm text-muted-foreground">Estimated VO2 Max</p>
          <p className="text-5xl font-bold text-primary">{vo2}</p>
          <p className="text-sm text-muted-foreground">ml/kg/min</p>
          {classification && (
            <span className={`inline-block rounded-full px-4 py-1.5 text-sm font-semibold border border-border ${classification.color}`}>
              {classification.label} Fitness Level
            </span>
          )}
        </div>
      )}
    </div>
  );
}
