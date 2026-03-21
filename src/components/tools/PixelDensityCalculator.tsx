"use client";
import { useState } from "react";
export default function PixelDensityCalculator() {
  const [width, setWidth] = useState("1920");
  const [height, setHeight] = useState("1080");
  const [diagonal, setDiagonal] = useState("27");
  const w = parseFloat(width) || 0;
  const h = parseFloat(height) || 0;
  const d = parseFloat(diagonal) || 0;
  const diagPx = Math.sqrt(w * w + h * h);
  const ppi = d > 0 ? diagPx / d : 0;
  const totalPx = w * h;
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const g = w > 0 && h > 0 ? gcd(w, h) : 1;
  const ratioW = w / g;
  const ratioH = h / g;
  const inputClass = "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Width (px)</label>
          <input type="number" value={width} onChange={e => setWidth(e.target.value)} placeholder="1920" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Height (px)</label>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="1080" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Screen Size (inches)</label>
          <input type="number" value={diagonal} onChange={e => setDiagonal(e.target.value)} placeholder="27" step="0.1" className={inputClass} />
        </div>
      </div>
      {ppi > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-xs text-muted-foreground">Pixel Density</p>
            <p className="text-2xl font-bold text-primary">{ppi.toFixed(1)} PPI</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-xs text-muted-foreground">Total Pixels</p>
            <p className="text-2xl font-bold text-foreground">{totalPx.toLocaleString()}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-xs text-muted-foreground">Aspect Ratio</p>
            <p className="text-2xl font-bold text-foreground">{ratioW}:{ratioH}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-xs text-muted-foreground">Retina?</p>
            <p className={`text-2xl font-bold ${ppi >= 200 ? "text-green-500" : "text-muted-foreground"}`}>{ppi >= 200 ? "Yes" : "No"}</p>
          </div>
        </div>
      )}
    </div>
  );
}
