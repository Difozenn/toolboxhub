"use client";
import { useState } from "react";

const FACTOR = 0.092903;
const PRECISION = 4;
const common = [100, 500, 1000, 1500, 2000, 5000];

export default function SqftToSqm() {
  const [fromVal, setFromVal] = useState("");
  const [toVal, setToVal] = useState("");

  const handleFrom = (v: string) => {
    setFromVal(v);
    const n = parseFloat(v);
    if (!isNaN(n)) setToVal(parseFloat((n * FACTOR).toFixed(PRECISION)).toString());
    else setToVal("");
  };

  const handleTo = (v: string) => {
    setToVal(v);
    const n = parseFloat(v);
    if (!isNaN(n)) setFromVal(parseFloat((n / FACTOR).toFixed(PRECISION)).toString());
    else setFromVal("");
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Square Feet (sqft)</label>
          <input type="number" value={fromVal} onChange={e => handleFrom(e.target.value)} placeholder="Enter sqft" className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Square Meters (m²)</label>
          <input type="number" value={toVal} onChange={e => handleTo(e.target.value)} placeholder="Enter m²" className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Common Conversions</h3>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border bg-muted"><th className="px-4 py-2 text-left font-medium text-foreground">Square Feet (sqft)</th><th className="px-4 py-2 text-left font-medium text-foreground">Square Meters (m²)</th></tr></thead>
            <tbody>
              {common.map(v => (
                <tr key={v} className="border-b border-border last:border-0">
                  <td className="px-4 py-2 text-foreground">{v}</td>
                  <td className="px-4 py-2 text-foreground">{parseFloat((v * FACTOR).toFixed(PRECISION))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
