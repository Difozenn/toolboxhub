"use client";
import { useState } from "react";
export default function BorderRadiusGenerator() {
  const [tl, setTl] = useState(12);
  const [tr, setTr] = useState(12);
  const [br, setBr] = useState(12);
  const [bl, setBl] = useState(12);
  const [linked, setLinked] = useState(true);
  const setAll = (v: number) => { setTl(v); setTr(v); setBr(v); setBl(v); };
  const css = `border-radius: ${tl}px ${tr}px ${br}px ${bl}px;`;
  const sliders = [["Top Left", tl, setTl], ["Top Right", tr, setTr], ["Bottom Right", br, setBr], ["Bottom Left", bl, setBl]] as const;
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center gap-3"><input type="checkbox" id="link" checked={linked} onChange={e => setLinked(e.target.checked)} className="h-4 w-4" /><label htmlFor="link" className="text-sm font-medium text-foreground">Link all corners</label></div>
          {sliders.map(([label, val, setter]) => (
            <div key={label}>
              <div className="mb-1 flex justify-between"><label className="text-sm font-medium text-foreground">{label}</label><span className="text-sm text-muted-foreground">{val}px</span></div>
              <input type="range" min={0} max={100} value={val} onChange={e => { const n = Number(e.target.value); linked ? setAll(n) : setter(n); }} className="w-full accent-primary" />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="h-40 w-40 bg-primary transition-all" style={{ borderRadius: `${tl}px ${tr}px ${br}px ${bl}px` }} />
          <div className="w-full rounded-lg border border-border bg-muted p-3 font-mono text-sm text-foreground">
            {css}
            <button onClick={() => navigator.clipboard.writeText(css)} className="ml-3 text-xs text-muted-foreground hover:text-foreground">Copy</button>
          </div>
        </div>
      </div>
    </div>
  );
}
