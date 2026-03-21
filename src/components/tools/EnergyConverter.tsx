"use client";
import { useState } from "react";

const UNITS = ["J", "cal", "kWh", "BTU"] as const;
type Unit = typeof UNITS[number];

// All values relative to 1 Joule
const toJoules: Record<Unit, number> = {
  J: 1,
  cal: 4.184,
  kWh: 3_600_000,
  BTU: 1055.06,
};

const UNIT_LABELS: Record<Unit, string> = {
  J: "Joules (J)",
  cal: "Calories (cal)",
  kWh: "Kilowatt-hours (kWh)",
  BTU: "BTU",
};

const common: { val: number; unit: Unit }[] = [
  { val: 1000, unit: "J" },
  { val: 1, unit: "kWh" },
  { val: 100, unit: "cal" },
  { val: 1, unit: "BTU" },
];

export default function EnergyConverter() {
  const [fromVal, setFromVal] = useState("");
  const [fromUnit, setFromUnit] = useState<Unit>("J");
  const [toUnit, setToUnit] = useState<Unit>("cal");

  const convert = (val: string, from: Unit, to: Unit) => {
    const n = parseFloat(val);
    if (isNaN(n)) return "";
    const joules = n * toJoules[from];
    return parseFloat((joules / toJoules[to]).toPrecision(8)).toString();
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
              {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">To</label>
          <div className="flex gap-2">
            <input type="number" readOnly value={result} placeholder="Result" className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            <select value={toUnit} onChange={e => setToUnit(e.target.value as Unit)} className={selectClass}>
              {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Common Conversions</h3>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border bg-muted"><th className="px-4 py-2 text-left font-medium text-foreground">From</th><th className="px-4 py-2 text-left font-medium text-foreground">J</th><th className="px-4 py-2 text-left font-medium text-foreground">cal</th><th className="px-4 py-2 text-left font-medium text-foreground">BTU</th></tr></thead>
            <tbody>
              {common.map(({ val, unit }) => {
                const j = val * toJoules[unit];
                return (
                  <tr key={`${val}-${unit}`} className="border-b border-border last:border-0">
                    <td className="px-4 py-2 text-foreground">{val} {unit}</td>
                    <td className="px-4 py-2 text-foreground">{parseFloat((j).toPrecision(6))}</td>
                    <td className="px-4 py-2 text-foreground">{parseFloat((j / toJoules.cal).toPrecision(6))}</td>
                    <td className="px-4 py-2 text-foreground">{parseFloat((j / toJoules.BTU).toPrecision(6))}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
