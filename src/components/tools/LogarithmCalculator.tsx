"use client";
import { useState } from "react";

export default function LogarithmCalculator() {
  const [num, setNum] = useState("");
  const [baseKey, setBaseKey] = useState("10");
  const [mode, setMode] = useState<"log"|"antilog">("log");

  const n = parseFloat(num);
  const base = baseKey === "e" ? Math.E : parseFloat(baseKey);
  const valid = !isNaN(n) && !isNaN(base) && base > 0 && base !== 1 && (mode==="antilog" || n > 0);

  let result: number | null = null;
  let formula = "";
  if (valid) {
    if (mode === "log") {
      result = Math.log(n) / Math.log(base);
      formula = baseKey==="e" ? `ln(${n})` : `log${baseKey}(${n})`;
    } else {
      result = Math.pow(base, n);
      formula = baseKey==="e" ? `e^${n}` : `${base}^${n}`;
    }
  }

  const BASES = [["10","log₁₀"],["e","ln"],["2","log₂"],["custom","custom"]];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["log","antilog"] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${mode===m?"bg-primary text-primary-foreground":"bg-muted text-foreground hover:bg-muted/80"}`}>
            {m === "log" ? "Logarithm" : "Antilogarithm"}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {BASES.map(([k,label]) => (
          <button key={k} onClick={() => setBaseKey(k)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${baseKey===k?"bg-primary text-primary-foreground":"bg-muted border border-border text-foreground hover:bg-muted/80"}`}>
            {label}
          </button>
        ))}
      </div>
      {baseKey==="custom" && (
        <input type="number" placeholder="Enter custom base" onChange={e=>setBaseKey(e.target.value||"2")} min="0.0001"
          className="w-full p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
      )}
      <input type="number" value={num} onChange={e=>setNum(e.target.value)} placeholder={mode==="log"?"Enter number (> 0)":"Enter exponent"}
        className="w-full p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
      <div className="p-4 rounded-xl bg-muted border border-border flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-mono">{formula || "—"} =</span>
        <span className="text-2xl font-bold text-primary">{result !== null ? result.toFixed(8) : "—"}</span>
      </div>
    </div>
  );
}
