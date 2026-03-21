"use client";
import { useState } from "react";

const UNITS = ["Bytes", "KB", "MB", "GB", "TB"] as const;
type Unit = typeof UNITS[number];

const toBytes: Record<Unit, number> = {
  Bytes: 1,
  KB: 1024,
  MB: 1024 ** 2,
  GB: 1024 ** 3,
  TB: 1024 ** 4,
};

export default function BytesConverter() {
  const [fromVal, setFromVal] = useState("");
  const [fromUnit, setFromUnit] = useState<Unit>("MB");
  const [toUnit, setToUnit] = useState<Unit>("GB");

  const convert = (val: string, from: Unit, to: Unit) => {
    const n = parseFloat(val);
    if (isNaN(n)) return "";
    const bytes = n * toBytes[from];
    const result = bytes / toBytes[to];
    return parseFloat(result.toPrecision(8)).toString();
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
        <h3 className="mb-3 text-sm font-semibold text-foreground">Common Conversions (MB to other units)</h3>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border bg-muted"><th className="px-4 py-2 text-left font-medium text-foreground">MB</th><th className="px-4 py-2 text-left font-medium text-foreground">KB</th><th className="px-4 py-2 text-left font-medium text-foreground">GB</th></tr></thead>
            <tbody>
              {[1, 10, 100, 500, 1000, 5000].map(v => (
                <tr key={v} className="border-b border-border last:border-0">
                  <td className="px-4 py-2 text-foreground">{v}</td>
                  <td className="px-4 py-2 text-foreground">{v * 1024}</td>
                  <td className="px-4 py-2 text-foreground">{parseFloat((v / 1024).toPrecision(4))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
