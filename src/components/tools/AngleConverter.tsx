"use client";
import { useState } from "react";

const UNITS = ["deg", "rad", "grad"] as const;
type Unit = typeof UNITS[number];

const UNIT_LABELS: Record<Unit, string> = {
  deg: "Degrees (°)",
  rad: "Radians (rad)",
  grad: "Gradians (grad)",
};

// Convert any unit to degrees first
const toDeg = (val: number, from: Unit): number => {
  if (from === "deg") return val;
  if (from === "rad") return val * (180 / Math.PI);
  return val * 0.9; // grad -> deg
};

const fromDeg = (deg: number, to: Unit): number => {
  if (to === "deg") return deg;
  if (to === "rad") return deg * (Math.PI / 180);
  return deg / 0.9; // deg -> grad
};

const common = [0, 30, 45, 60, 90, 180, 270, 360];

export default function AngleConverter() {
  const [fromVal, setFromVal] = useState("");
  const [fromUnit, setFromUnit] = useState<Unit>("deg");
  const [toUnit, setToUnit] = useState<Unit>("rad");

  const convert = (val: string, from: Unit, to: Unit) => {
    const n = parseFloat(val);
    if (isNaN(n)) return "";
    const deg = toDeg(n, from);
    return parseFloat(fromDeg(deg, to).toPrecision(8)).toString();
  };

  const result = convert(fromVal, fromUnit, toUnit);
  const selectClass = "rounded-lg border border-border bg-muted px-3 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">From</label>
          <div className="flex gap-2">
            <input type="number" value={fromVal} onChange={e => setFromVal(e.target.value)} placeholder="Enter value" className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            <select value={fromUnit} onChange={e => setFromUnit(e.target.value as Unit)} className={selectClass}>
              {UNITS.map(u => <option key={u} value={u}>{UNIT_LABELS[u]}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">To</label>
          <div className="flex gap-2">
            <input type="number" readOnly value={result} placeholder="Result" className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            <select value={toUnit} onChange={e => setToUnit(e.target.value as Unit)} className={selectClass}>
              {UNITS.map(u => <option key={u} value={u}>{UNIT_LABELS[u]}</option>)}
            </select>
          </div>
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Common Conversions (Degrees)</h3>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border bg-muted"><th className="px-4 py-2 text-left font-medium text-foreground">Degrees (°)</th><th className="px-4 py-2 text-left font-medium text-foreground">Radians</th><th className="px-4 py-2 text-left font-medium text-foreground">Gradians</th></tr></thead>
            <tbody>
              {common.map(v => (
                <tr key={v} className="border-b border-border last:border-0">
                  <td className="px-4 py-2 text-foreground">{v}</td>
                  <td className="px-4 py-2 text-foreground">{parseFloat(fromDeg(v, "rad").toPrecision(6))}</td>
                  <td className="px-4 py-2 text-foreground">{parseFloat(fromDeg(v, "grad").toPrecision(6))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
