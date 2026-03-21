"use client";

import { useState } from "react";

function gcd(a: number, b: number): number { return b === 0 ? a : gcd(b, a % b); }

export default function AspectRatioCalculator() {
  const [width, setWidth] = useState("1920");
  const [height, setHeight] = useState("1080");
  const [ratioW, setRatioW] = useState("16");
  const [ratioH, setRatioH] = useState("9");
  const [knownDim, setKnownDim] = useState("width");
  const [knownVal, setKnownVal] = useState("1280");
  const [mode, setMode] = useState<"calculate" | "scale">("calculate");

  const w = parseFloat(width), h = parseFloat(height);
  const simplified = !isNaN(w) && !isNaN(h) && w > 0 && h > 0 ? (() => { const g = gcd(Math.round(w), Math.round(h)); return `${Math.round(w)/g}:${Math.round(h)/g}`; })() : "";
  const decimal = !isNaN(w) && !isNaN(h) && h > 0 ? (w / h).toFixed(4) : "";

  const rw = parseFloat(ratioW), rh = parseFloat(ratioH), kv = parseFloat(knownVal);
  const scaledResult = !isNaN(rw) && !isNaN(rh) && !isNaN(kv) && rw > 0 && rh > 0 ? (
    knownDim === "width" ? Math.round(kv * (rh / rw)) : Math.round(kv * (rw / rh))
  ) : null;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["calculate", "scale"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)}
            className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${mode === m ? "bg-primary text-white" : "border border-border bg-background text-foreground hover:bg-muted"}`}>{m === "calculate" ? "Calculate Ratio" : "Scale by Ratio"}</button>
        ))}
      </div>
      {mode === "calculate" ? (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="space-y-1 flex-1">
              <label className="text-sm text-muted-foreground">Width (px)</label>
              <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" />
            </div>
            <span className="mt-5 text-muted-foreground">×</span>
            <div className="space-y-1 flex-1">
              <label className="text-sm text-muted-foreground">Height (px)</label>
              <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" />
            </div>
          </div>
          {simplified && (
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-muted p-4 text-center"><p className="text-xs text-muted-foreground">Simplified Ratio</p><p className="text-2xl font-bold text-primary">{simplified}</p></div>
              <div className="rounded-xl border border-border bg-muted p-4 text-center"><p className="text-xs text-muted-foreground">Decimal Ratio</p><p className="text-2xl font-bold text-primary">{decimal}</p></div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="space-y-1"><label className="text-sm text-muted-foreground">Ratio W</label><input type="number" value={ratioW} onChange={(e) => setRatioW(e.target.value)} className="w-20 rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" /></div>
            <span className="mt-4 text-muted-foreground font-bold">:</span>
            <div className="space-y-1"><label className="text-sm text-muted-foreground">Ratio H</label><input type="number" value={ratioH} onChange={(e) => setRatioH(e.target.value)} className="w-20 rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" /></div>
          </div>
          <div className="flex items-center gap-3">
            <select value={knownDim} onChange={(e) => setKnownDim(e.target.value)} className="rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none">
              <option value="width">Known Width</option>
              <option value="height">Known Height</option>
            </select>
            <input type="number" value={knownVal} onChange={(e) => setKnownVal(e.target.value)} className="flex-1 rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none" />
          </div>
          {scaledResult !== null && (
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">{knownDim === "width" ? "Calculated Height" : "Calculated Width"}</p>
              <p className="text-3xl font-bold text-primary">{scaledResult}px</p>
              <p className="text-sm text-muted-foreground mt-1">{knownDim === "width" ? `${knownVal} × ${scaledResult}` : `${scaledResult} × ${knownVal}`}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
