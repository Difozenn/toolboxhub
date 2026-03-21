"use client";

import { useState } from "react";

const PRESETS = [
  { label: "p AND q", vars: ["p","q"], expr: (p: boolean, q: boolean) => p && q },
  { label: "p OR q", vars: ["p","q"], expr: (p: boolean, q: boolean) => p || q },
  { label: "NOT p", vars: ["p","q"], expr: (p: boolean, _q: boolean) => !p },
  { label: "p XOR q", vars: ["p","q"], expr: (p: boolean, q: boolean) => p !== q },
  { label: "p → q (implies)", vars: ["p","q"], expr: (p: boolean, q: boolean) => !p || q },
  { label: "(p AND q) OR r", vars: ["p","q","r"], expr: (p: boolean, q: boolean, r: boolean) => (p && q) || r },
];

export default function TruthTableGenerator() {
  const [selected, setSelected] = useState(0);

  const preset = PRESETS[selected];
  const varCount = preset.vars.length;

  const rows: { inputs: boolean[]; output: boolean }[] = [];
  for (let i = 0; i < 2 ** varCount; i++) {
    const inputs = Array.from({ length: varCount }, (_, bit) => !!(i & (1 << (varCount - 1 - bit))));
    const output = preset.expr(inputs[0] ?? false, inputs[1] ?? false, inputs[2] ?? false);
    rows.push({ inputs, output });
  }

  const tautology = rows.every((r) => r.output);
  const contradiction = rows.every((r) => !r.output);

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Select Expression</label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {PRESETS.map((p, i) => (
            <button key={p.label} onClick={() => setSelected(i)}
              className={`rounded-lg px-3 py-2 text-sm font-medium text-left transition-colors ${selected === i ? "bg-primary text-white" : "border border-border bg-background text-foreground hover:bg-muted"}`}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                {preset.vars.map((v) => (
                  <th key={v} className="px-4 py-2 text-center font-semibold text-foreground border-r border-border">{v}</th>
                ))}
                <th className="px-4 py-2 text-center font-semibold text-primary">{preset.label}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((row, i) => (
                <tr key={i} className="hover:bg-muted/50">
                  {row.inputs.map((val, j) => (
                    <td key={j} className="px-4 py-2 text-center border-r border-border">
                      <span className={`font-mono font-bold ${val ? "text-green-500" : "text-red-500"}`}>{val ? "T" : "F"}</span>
                    </td>
                  ))}
                  <td className="px-4 py-2 text-center">
                    <span className={`font-mono font-bold text-base ${row.output ? "text-green-500" : "text-red-500"}`}>{row.output ? "T" : "F"}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex gap-2">
        {tautology && <span className="rounded-full bg-green-100 dark:bg-green-900 px-3 py-1 text-xs font-semibold text-green-700 dark:text-green-300">Tautology (always true)</span>}
        {contradiction && <span className="rounded-full bg-red-100 dark:bg-red-900 px-3 py-1 text-xs font-semibold text-red-700 dark:text-red-300">Contradiction (always false)</span>}
        {!tautology && !contradiction && <span className="rounded-full bg-blue-100 dark:bg-blue-900 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300">Contingency (sometimes true)</span>}
      </div>
    </div>
  );
}
