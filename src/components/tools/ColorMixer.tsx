"use client";
import { useState } from "react";

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
}
function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r,g,b].map(v => Math.round(v).toString(16).padStart(2,"0")).join("");
}
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return [Math.round(h*360), Math.round(s*100), Math.round(l*100)];
}

export default function ColorMixer() {
  const [colors, setColors] = useState(["#ff0000", "#0000ff"]);
  const [copied, setCopied] = useState("");
  const addColor = () => { if (colors.length < 5) setColors([...colors, "#00ff00"]); };
  const removeColor = (i: number) => { if (colors.length > 2) setColors(colors.filter((_,idx) => idx !== i)); };
  const updateColor = (i: number, v: string) => { const c = [...colors]; c[i] = v; setColors(c); };

  const rgbs = colors.map(c => hexToRgb(c));
  const avg: [number,number,number] = [
    rgbs.reduce((s,c) => s+c[0], 0) / rgbs.length,
    rgbs.reduce((s,c) => s+c[1], 0) / rgbs.length,
    rgbs.reduce((s,c) => s+c[2], 0) / rgbs.length,
  ];
  const mixHex = rgbToHex(avg[0], avg[1], avg[2]);
  const mixHsl = rgbToHsl(avg[0], avg[1], avg[2]);
  const copy = (v: string, k: string) => { navigator.clipboard.writeText(v); setCopied(k); setTimeout(() => setCopied(""), 1200); };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        {colors.map((c, i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg border border-border bg-muted p-2">
            <input type="color" value={c} onChange={e => updateColor(i, e.target.value)} className="h-10 w-10 cursor-pointer rounded border-0" />
            <input type="text" value={c} onChange={e => updateColor(i, e.target.value)} className="w-20 rounded border border-border bg-background px-2 py-1 text-xs font-mono text-foreground" />
            {colors.length > 2 && <button onClick={() => removeColor(i)} className="text-xs text-muted-foreground hover:text-red-500">✕</button>}
          </div>
        ))}
        {colors.length < 5 && (
          <button onClick={addColor} className="rounded-lg border border-dashed border-border px-4 py-2 text-sm text-muted-foreground hover:bg-muted">+ Add</button>
        )}
      </div>
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-xl border border-border" style={{ backgroundColor: mixHex }} />
        <div className="space-y-1">
          <div className="flex items-center gap-2"><span className="text-sm text-muted-foreground">Hex:</span><span className="font-mono font-semibold text-foreground">{mixHex}</span><button onClick={() => copy(mixHex,"hex")} className="text-xs text-primary hover:underline">{copied==="hex"?"Copied!":"Copy"}</button></div>
          <div className="flex items-center gap-2"><span className="text-sm text-muted-foreground">RGB:</span><span className="font-mono text-foreground">{Math.round(avg[0])}, {Math.round(avg[1])}, {Math.round(avg[2])}</span><button onClick={() => copy(`rgb(${Math.round(avg[0])}, ${Math.round(avg[1])}, ${Math.round(avg[2])})`,"rgb")} className="text-xs text-primary hover:underline">{copied==="rgb"?"Copied!":"Copy"}</button></div>
          <div className="flex items-center gap-2"><span className="text-sm text-muted-foreground">HSL:</span><span className="font-mono text-foreground">{mixHsl[0]}°, {mixHsl[1]}%, {mixHsl[2]}%</span><button onClick={() => copy(`hsl(${mixHsl[0]}, ${mixHsl[1]}%, ${mixHsl[2]}%)`,"hsl")} className="text-xs text-primary hover:underline">{copied==="hsl"?"Copied!":"Copy"}</button></div>
        </div>
      </div>
    </div>
  );
}
