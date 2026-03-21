"use client";
import { useState } from "react";
function rgbToCmyk(r: number, g: number, b: number) {
  const rp = r / 255, gp = g / 255, bp = b / 255;
  const k = 1 - Math.max(rp, gp, bp);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  return { c: Math.round(((1 - rp - k) / (1 - k)) * 100), m: Math.round(((1 - gp - k) / (1 - k)) * 100), y: Math.round(((1 - bp - k) / (1 - k)) * 100), k: Math.round(k * 100) };
}
export default function RgbToCmyk() {
  const [r, setR] = useState(""); const [g, setG] = useState(""); const [b, setB] = useState("");
  const valid = [r, g, b].every(v => v !== "" && !isNaN(Number(v)) && Number(v) >= 0 && Number(v) <= 255);
  const cmyk = valid ? rgbToCmyk(Number(r), Number(g), Number(b)) : null;
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-sm font-medium text-foreground">RGB Values (0–255)</p>
        <div className="grid gap-4 sm:grid-cols-3">
          <div><label className="mb-1.5 block text-sm text-muted-foreground">Red</label><input type="number" min={0} max={255} value={r} onChange={e => setR(e.target.value)} placeholder="0–255" className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-lg text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
          <div><label className="mb-1.5 block text-sm text-muted-foreground">Green</label><input type="number" min={0} max={255} value={g} onChange={e => setG(e.target.value)} placeholder="0–255" className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-lg text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
          <div><label className="mb-1.5 block text-sm text-muted-foreground">Blue</label><input type="number" min={0} max={255} value={b} onChange={e => setB(e.target.value)} placeholder="0–255" className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-lg text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
        </div>
      </div>
      {cmyk && (
        <div className="rounded-lg border border-border bg-muted p-4">
          <p className="mb-2 text-sm font-medium text-foreground">CMYK Result</p>
          <div className="grid grid-cols-4 gap-3 text-center">
            {(["C", "M", "Y", "K"] as const).map(ch => (
              <div key={ch} className="rounded-lg bg-background p-3">
                <p className="text-xs text-muted-foreground">{ch}</p>
                <p className="text-xl font-bold text-foreground">{cmyk[ch.toLowerCase() as "c"|"m"|"y"|"k"]}%</p>
              </div>
            ))}
          </div>
          {valid && <div className="mt-3 h-6 rounded" style={{ background: `rgb(${r},${g},${b})` }} />}
        </div>
      )}
    </div>
  );
}
