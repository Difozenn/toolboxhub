"use client";
import { useState } from "react";

type PatternType = "dots"|"lines"|"grid"|"diagonal"|"crosshatch"|"waves";

function buildSvg(type: PatternType, color: string, size: number, opacity: number): string {
  const c = color;
  const o = opacity;
  const s = size;
  if (type==="dots") return `<svg xmlns='http://www.w3.org/2000/svg' width='${s}' height='${s}'><circle cx='${s/2}' cy='${s/2}' r='${s/8}' fill='${c}' fill-opacity='${o}'/></svg>`;
  if (type==="lines") return `<svg xmlns='http://www.w3.org/2000/svg' width='${s}' height='${s}'><line x1='0' y1='${s/2}' x2='${s}' y2='${s/2}' stroke='${c}' stroke-opacity='${o}' stroke-width='1'/></svg>`;
  if (type==="grid") return `<svg xmlns='http://www.w3.org/2000/svg' width='${s}' height='${s}'><path d='M ${s} 0 L 0 0 0 ${s}' fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='0.5'/></svg>`;
  if (type==="diagonal") return `<svg xmlns='http://www.w3.org/2000/svg' width='${s}' height='${s}'><line x1='0' y1='${s}' x2='${s}' y2='0' stroke='${c}' stroke-opacity='${o}' stroke-width='1'/></svg>`;
  if (type==="crosshatch") return `<svg xmlns='http://www.w3.org/2000/svg' width='${s}' height='${s}'><line x1='0' y1='${s}' x2='${s}' y2='0' stroke='${c}' stroke-opacity='${o}' stroke-width='0.8'/><line x1='0' y1='0' x2='${s}' y2='${s}' stroke='${c}' stroke-opacity='${o}' stroke-width='0.8'/></svg>`;
  // waves
  return `<svg xmlns='http://www.w3.org/2000/svg' width='${s}' height='${s/2}'><path d='M0 ${s/4} Q${s/4} 0 ${s/2} ${s/4} T${s} ${s/4}' fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='1'/></svg>`;
}

const PATTERNS: PatternType[] = ["dots","lines","grid","diagonal","crosshatch","waves"];

export default function SvgPatternGenerator() {
  const [type, setType] = useState<PatternType>("dots");
  const [color, setColor] = useState("#6366f1");
  const [size, setSize] = useState(20);
  const [opacity, setOpacity] = useState(0.5);

  const svg = buildSvg(type, color, size, opacity);
  const encoded = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  const css = `background-color: #ffffff;\nbackground-image: url("${encoded}");\nbackground-repeat: repeat;`;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {PATTERNS.map(p => (
          <button key={p} onClick={() => setType(p)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${type===p?"bg-primary text-primary-foreground":"bg-muted border border-border text-foreground hover:bg-muted/80"}`}>
            {p}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground">Colour</label>
          <div className="flex gap-2 mt-1">
            <input type="color" value={color} onChange={e=>setColor(e.target.value)} className="w-10 h-10 rounded-lg border border-border cursor-pointer bg-transparent" />
            <input value={color} onChange={e=>setColor(e.target.value)} className="flex-1 p-2 rounded-lg border border-border bg-muted text-foreground font-mono text-sm focus:outline-none" />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Opacity: {opacity}</label>
          <input type="range" min={0.05} max={1} step={0.05} value={opacity} onChange={e=>setOpacity(+e.target.value)} className="w-full mt-3 accent-primary" />
        </div>
        <div className="col-span-2">
          <label className="text-xs font-medium text-muted-foreground">Size: {size}px</label>
          <input type="range" min={8} max={80} value={size} onChange={e=>setSize(+e.target.value)} className="w-full mt-1 accent-primary" />
        </div>
      </div>
      <div className="rounded-xl border border-border h-32 w-full" style={{backgroundImage:`url("${encoded}")`,backgroundRepeat:"repeat"}} />
      <div className="relative">
        <pre className="p-3 rounded-xl bg-muted border border-border text-foreground font-mono text-xs whitespace-pre overflow-auto">{css}</pre>
        <button onClick={() => navigator.clipboard.writeText(css)}
          className="absolute top-2 right-2 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium">Copy CSS</button>
      </div>
    </div>
  );
}
