"use client";
import { useState } from "react";

const LEVELS = [
  {name:"sm",blur:2,spread:0,y:1,opacity:0.05},
  {name:"md",blur:6,spread:-1,y:3,opacity:0.1},
  {name:"lg",blur:15,spread:-3,y:6,opacity:0.12},
  {name:"xl",blur:25,spread:-5,y:10,opacity:0.15},
  {name:"2xl",blur:50,spread:-12,y:25,opacity:0.2},
];

function hexToRgb(hex: string): string {
  const m = hex.replace("#","").match(/.{2}/g) ?? [];
  return `${parseInt(m[0]??'0',16)},${parseInt(m[1]??'0',16)},${parseInt(m[2]??'0',16)}`;
}

export default function CssShadowPalette() {
  const [color, setColor] = useState("#000000");

  function shadow(l: typeof LEVELS[0]): string {
    return `0 ${l.y}px ${l.blur}px ${l.spread}px rgba(${hexToRgb(color)},${l.opacity})`;
  }

  const css = LEVELS.map(l => `  --shadow-${l.name}: ${shadow(l)};`).join("\n");

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-foreground">Shadow colour:</label>
        <input type="color" value={color} onChange={e=>setColor(e.target.value)} className="w-12 h-10 rounded-lg border border-border cursor-pointer bg-transparent" />
        <span className="text-sm font-mono text-muted-foreground">{color}</span>
      </div>
      <div className="space-y-3">
        {LEVELS.map(l => (
          <div key={l.name} className="flex items-center gap-4 p-3 rounded-xl bg-muted border border-border">
            <div className="w-16 h-12 rounded-lg bg-background" style={{boxShadow: shadow(l)}} />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-muted-foreground mb-1">--shadow-{l.name}</p>
              <p className="font-mono text-xs text-foreground truncate">{shadow(l)}</p>
            </div>
            <button onClick={() => navigator.clipboard.writeText(shadow(l))}
              className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors shrink-0">
              Copy
            </button>
          </div>
        ))}
      </div>
      <button onClick={() => navigator.clipboard.writeText(`:root {\n${css}\n}`)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
        Copy All as CSS Variables
      </button>
    </div>
  );
}
