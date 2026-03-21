"use client";
import { useState } from "react";

const NAMED_COLORS: [string, string][] = [
  ["#FF0000","Red"],["#00FF00","Lime"],["#0000FF","Blue"],["#FFFF00","Yellow"],["#FF00FF","Magenta"],
  ["#00FFFF","Cyan"],["#FF6600","Orange"],["#800080","Purple"],["#008000","Green"],["#000080","Navy"],
  ["#FFC0CB","Pink"],["#A52A2A","Brown"],["#808080","Grey"],["#FFF8DC","Cornsilk"],["#4169E1","Royal Blue"],
  ["#DC143C","Crimson"],["#006400","Dark Green"],["#FF69B4","Hot Pink"],["#1E90FF","Dodger Blue"],["#32CD32","Lime Green"],
];
const EVOCATIVE = ["Dusty Rose","Ocean Slate","Midnight Storm","Golden Hour","Forest Mist","Ember Glow","Arctic Ice","Velvet Shadow","Peach Fizz","Sage Dream"];

function hexToRgb(hex: string): [number,number,number]|null {
  const m = hex.replace("#","").match(/.{2}/g);
  if (!m) return null;
  return [parseInt(m[0],16),parseInt(m[1],16),parseInt(m[2],16)];
}
function colorDist([r1,g1,b1]: number[], [r2,g2,b2]: number[]): number {
  return Math.sqrt((r1-r2)**2+(g1-g2)**2+(b1-b2)**2);
}

export default function ColorNameGenerator() {
  const [hex, setHex] = useState("#3a7bd5");
  const [names, setNames] = useState<{nearest:string;creative:string[]}>({nearest:"",creative:[]});

  function analyse() {
    const rgb = hexToRgb(hex);
    if (!rgb) return;
    let nearest = NAMED_COLORS[0][1];
    let minDist = Infinity;
    for (const [h,n] of NAMED_COLORS) {
      const d = colorDist(rgb, hexToRgb(h)!);
      if (d < minDist) { minDist = d; nearest = n; }
    }
    const creative = EVOCATIVE.sort(()=>Math.random()-0.5).slice(0,4);
    setNames({nearest, creative});
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-center">
        <input type="color" value={hex} onChange={e=>setHex(e.target.value)} className="w-14 h-14 rounded-xl border border-border cursor-pointer bg-transparent" />
        <input value={hex} onChange={e=>setHex(e.target.value)} maxLength={7}
          className="flex-1 p-3 rounded-xl border border-border bg-muted text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary" />
        <button onClick={analyse} className="px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          Find Names
        </button>
      </div>
      {names.nearest && (
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-muted border border-border flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Nearest named color:</span>
            <span className="font-semibold text-foreground">{names.nearest}</span>
          </div>
          <p className="text-xs font-medium text-muted-foreground">Creative alternatives:</p>
          <div className="grid grid-cols-2 gap-2">
            {names.creative.map(n => (
              <button key={n} onClick={() => navigator.clipboard.writeText(n)}
                className="px-3 py-2 rounded-xl bg-muted border border-border text-sm text-foreground hover:bg-muted/80 transition-colors text-left">
                {n}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
