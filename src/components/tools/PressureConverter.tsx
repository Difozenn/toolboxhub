"use client";
import { useState } from "react";

const UNITS = ["PSI", "bar", "atm", "Pa"] as const;
type Unit = typeof UNITS[number];

// All values relative to 1 Pascal
const toPascals: Record<Unit, number> = {
  PSI: 6894.76,
  bar: 100_000,
  atm: 101_325,
  Pa: 1,
};

const common: { val: number; unit: Unit }[] = [
  { val: 1, unit: "atm" },
  { val: 1, unit: "bar" },
  { val: 14.696, unit: "PSI" },
  { val: 101325, unit: "Pa" },
];

export default function PressureConverter() {
  const [fromVal, setFromVal] = useState("");
  const [fromUnit, setFromUnit] = useState<Unit>("PSI");
  const [toUnit, setToUnit] = useState<Unit>("bar");

  const convert = (val: string, from: Unit, to: Unit) => {
    const n = parseFloat(val);
    if (isNaN(n)) return "";
    const pa = n * toPascals[from];
    return parseFloat((pa / toPascals[to]).toPrecision(8)).toString();
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
            <thead><tr className="border-b border-border bg-muted"><th className="px-4 py-2 text-left font-medium text-foreground">From</th><th className="px-4 py-2 text-left font-medium text-foreground">PSI</th><th className="px-4 py-2 text-left font-medium text-foreground">bar</th><th className="px-4 py-2 text-left font-medium text-foreground">atm</th></tr></thead>
            <tbody>
              {common.map(({ val, unit }) => {
                const pa = val * toPascals[unit];
                return (
                  <tr key={`${val}-${unit}`} className="border-b border-border last:border-0">
                    <td className="px-4 py-2 text-foreground">{val} {unit}</td>
                    <td className="px-4 py-2 text-foreground">{parseFloat((pa / toPascals.PSI).toPrecision(6))}</td>
                    <td className="px-4 py-2 text-foreground">{parseFloat((pa / toPascals.bar).toPrecision(6))}</td>
                    <td className="px-4 py-2 text-foreground">{parseFloat((pa / toPascals.atm).toPrecision(6))}</td>
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
