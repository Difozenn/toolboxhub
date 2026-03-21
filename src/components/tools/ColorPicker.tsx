"use client";

import { useState } from "react";

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToHsl(r: number, g: number, b: number) {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6; break;
      case gn: h = ((bn - rn) / d + 2) / 6; break;
      case bn: h = ((rn - gn) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export default function ColorPicker() {
  const [color, setColor] = useState("#3b82f6");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const { r, g, b } = hexToRgb(color);
  const { h, s, l } = rgbToHsl(r, g, b);

  const formats = {
    HEX: color.toUpperCase(),
    RGB: `rgb(${r}, ${g}, ${b})`,
    HSL: `hsl(${h}, ${s}%, ${l}%)`,
  };

  const copy = async (key: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="relative">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-24 w-24 cursor-pointer rounded-xl border border-border"
          />
        </div>
        <div className="rounded-xl border border-border p-4 flex-1 w-full" style={{ backgroundColor: color }}>
          <p className="text-center text-sm font-medium" style={{ color: l > 50 ? "#000" : "#fff" }}>
            Preview
          </p>
        </div>
      </div>
      <div className="space-y-3">
        {Object.entries(formats).map(([key, value]) => (
          <div key={key} className="flex items-center gap-3 rounded-xl border border-border bg-muted p-3">
            <span className="w-10 text-sm font-semibold text-muted-foreground">{key}</span>
            <span className="flex-1 font-mono text-sm text-foreground">{value}</span>
            <button
              onClick={() => copy(key, value)}
              className="rounded-lg border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
            >
              {copiedKey === key ? "Copied!" : "Copy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
