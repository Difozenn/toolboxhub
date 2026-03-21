"use client";

import { useState } from "react";

const ANGLES = [
  { deg: 0, rad: "0", sin: "0", cos: "1", tan: "0" },
  { deg: 30, rad: "π/6", sin: "1/2", cos: "√3/2", tan: "1/√3" },
  { deg: 45, rad: "π/4", sin: "√2/2", cos: "√2/2", tan: "1" },
  { deg: 60, rad: "π/3", sin: "√3/2", cos: "1/2", tan: "√3" },
  { deg: 90, rad: "π/2", sin: "1", cos: "0", tan: "∞" },
  { deg: 120, rad: "2π/3", sin: "√3/2", cos: "-1/2", tan: "-√3" },
  { deg: 135, rad: "3π/4", sin: "√2/2", cos: "-√2/2", tan: "-1" },
  { deg: 150, rad: "5π/6", sin: "1/2", cos: "-√3/2", tan: "-1/√3" },
  { deg: 180, rad: "π", sin: "0", cos: "-1", tan: "0" },
  { deg: 210, rad: "7π/6", sin: "-1/2", cos: "-√3/2", tan: "1/√3" },
  { deg: 225, rad: "5π/4", sin: "-√2/2", cos: "-√2/2", tan: "1" },
  { deg: 240, rad: "4π/3", sin: "-√3/2", cos: "-1/2", tan: "√3" },
  { deg: 270, rad: "3π/2", sin: "-1", cos: "0", tan: "∞" },
  { deg: 300, rad: "5π/3", sin: "-√3/2", cos: "1/2", tan: "-√3" },
  { deg: 315, rad: "7π/4", sin: "-√2/2", cos: "√2/2", tan: "-1" },
  { deg: 330, rad: "11π/6", sin: "-1/2", cos: "√3/2", tan: "-1/√3" },
  { deg: 360, rad: "2π", sin: "0", cos: "1", tan: "0" },
];

export default function UnitCircle() {
  const [selected, setSelected] = useState<typeof ANGLES[0] | null>(null);
  const cx = 90, cy = 90, r = 70;

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-6">
        <svg width="180" height="180" className="shrink-0 mx-auto">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" className="text-border" strokeWidth="1.5" />
          <line x1={cx-r-10} y1={cy} x2={cx+r+10} y2={cy} stroke="currentColor" className="text-border" strokeWidth="1" />
          <line x1={cx} y1={cy-r-10} x2={cx} y2={cy+r+10} stroke="currentColor" className="text-border" strokeWidth="1" />
          {ANGLES.slice(0, -1).map((a) => {
            const rad = (a.deg * Math.PI) / 180;
            const x = cx + r * Math.cos(rad);
            const y = cy - r * Math.sin(rad);
            return (
              <circle key={a.deg} cx={x} cy={y} r="5" className={`cursor-pointer transition-all ${selected?.deg === a.deg ? "fill-primary" : "fill-muted-foreground hover:fill-primary"}`}
                onClick={() => setSelected(selected?.deg === a.deg ? null : a)} />
            );
          })}
        </svg>
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border text-xs text-muted-foreground"><th className="py-1 pr-3 text-left">Deg</th><th className="py-1 pr-3">Rad</th><th className="py-1 pr-3">Sin</th><th className="py-1 pr-3">Cos</th><th className="py-1">Tan</th></tr></thead>
            <tbody>
              {ANGLES.map((a) => (
                <tr key={a.deg} onClick={() => setSelected(selected?.deg === a.deg ? null : a)}
                  className={`cursor-pointer border-b border-border text-xs ${selected?.deg === a.deg ? "bg-primary/10" : "hover:bg-muted"}`}>
                  <td className="py-1 pr-3 font-semibold text-primary">{a.deg}°</td>
                  <td className="py-1 pr-3 font-mono">{a.rad}</td>
                  <td className="py-1 pr-3 font-mono">{a.sin}</td>
                  <td className="py-1 pr-3 font-mono">{a.cos}</td>
                  <td className="py-1 font-mono">{a.tan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
