"use client";

import { useState } from "react";

export default function GradientBackground() {
  const [color1, setColor1] = useState("#6366f1");
  const [color2, setColor2] = useState("#ec4899");
  const [angle, setAngle] = useState(135);
  const [type, setType] = useState<"linear" | "radial">("linear");
  const [copied, setCopied] = useState(false);

  const css = type === "linear"
    ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
    : `radial-gradient(circle, ${color1}, ${color2})`;

  const cssStr = `background: ${css};`;

  const copy = async () => { await navigator.clipboard.writeText(cssStr); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="space-y-4">
      <div className="h-48 w-full rounded-xl border border-border transition-all" style={{ background: css }} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Color 1</label>
          <div className="flex gap-2 items-center">
            <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="h-10 w-10 rounded-lg border border-border cursor-pointer" />
            <input type="text" value={color1} onChange={(e) => setColor1(e.target.value)} className="flex-1 rounded-lg border border-border bg-muted px-3 py-2 font-mono text-sm text-foreground focus:border-primary focus:outline-none" />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Color 2</label>
          <div className="flex gap-2 items-center">
            <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="h-10 w-10 rounded-lg border border-border cursor-pointer" />
            <input type="text" value={color2} onChange={(e) => setColor2(e.target.value)} className="flex-1 rounded-lg border border-border bg-muted px-3 py-2 font-mono text-sm text-foreground focus:border-primary focus:outline-none" />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Type</label>
          <div className="flex gap-2">
            {(["linear", "radial"] as const).map((t) => (
              <button key={t} onClick={() => setType(t)}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium capitalize transition-colors ${type === t ? "bg-primary text-white" : "border border-border bg-background text-foreground hover:bg-muted"}`}>{t}</button>
            ))}
          </div>
        </div>
        {type === "linear" && (
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">Angle: {angle}°</label>
            <input type="range" min={0} max={360} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full mt-2" />
          </div>
        )}
      </div>
      <div className="rounded-xl border border-border bg-muted p-3 flex items-center gap-2">
        <span className="font-mono text-xs text-foreground flex-1 break-all">{cssStr}</span>
        <button onClick={copy} className="shrink-0 rounded-lg border border-border bg-background px-3 py-1 text-xs font-medium hover:bg-primary hover:text-white">{copied ? "Copied!" : "Copy CSS"}</button>
      </div>
    </div>
  );
}
