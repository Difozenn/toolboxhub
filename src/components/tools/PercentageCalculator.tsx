"use client";

import { useState } from "react";

function CalcCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {children}
    </div>
  );
}

function NumInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex-1">
      <label className="mb-1 block text-sm text-muted-foreground">
        {label}
      </label>
      <input
        type="number"
        step="any"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}

function ResultBadge({ value }: { value: string | null }) {
  if (value === null) return null;
  return (
    <div className="rounded-lg bg-primary/10 px-4 py-2 text-center">
      <span className="text-xl font-bold text-primary">{value}</span>
    </div>
  );
}

export default function PercentageCalculator() {
  /* Calculator 1: What is X% of Y? */
  const [c1x, setC1x] = useState("");
  const [c1y, setC1y] = useState("");
  const c1Result =
    c1x !== "" && c1y !== ""
      ? ((parseFloat(c1x) / 100) * parseFloat(c1y)).toFixed(4).replace(/\.?0+$/, "")
      : null;

  /* Calculator 2: X is what % of Y? */
  const [c2x, setC2x] = useState("");
  const [c2y, setC2y] = useState("");
  const c2Result =
    c2x !== "" && c2y !== "" && parseFloat(c2y) !== 0
      ? ((parseFloat(c2x) / parseFloat(c2y)) * 100).toFixed(4).replace(/\.?0+$/, "") + "%"
      : null;

  /* Calculator 3: % change from X to Y */
  const [c3x, setC3x] = useState("");
  const [c3y, setC3y] = useState("");
  const c3Result =
    c3x !== "" && c3y !== "" && parseFloat(c3x) !== 0
      ? (
          ((parseFloat(c3y) - parseFloat(c3x)) / Math.abs(parseFloat(c3x))) *
          100
        )
          .toFixed(4)
          .replace(/\.?0+$/, "") + "%"
      : null;

  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
      {/* Calc 1 */}
      <CalcCard title="What is X% of Y?">
        <div className="flex items-end gap-3">
          <NumInput label="X (%)" value={c1x} onChange={setC1x} />
          <span className="pb-2 text-muted-foreground">of</span>
          <NumInput label="Y" value={c1y} onChange={setC1y} />
        </div>
        <ResultBadge value={c1Result} />
      </CalcCard>

      {/* Calc 2 */}
      <CalcCard title="X is what % of Y?">
        <div className="flex items-end gap-3">
          <NumInput label="X" value={c2x} onChange={setC2x} />
          <span className="pb-2 text-muted-foreground">of</span>
          <NumInput label="Y" value={c2y} onChange={setC2y} />
        </div>
        <ResultBadge value={c2Result} />
      </CalcCard>

      {/* Calc 3 */}
      <CalcCard title="% change from X to Y">
        <div className="flex items-end gap-3">
          <NumInput label="From (X)" value={c3x} onChange={setC3x} />
          <span className="pb-2 text-muted-foreground">to</span>
          <NumInput label="To (Y)" value={c3y} onChange={setC3y} />
        </div>
        <ResultBadge value={c3Result} />
      </CalcCard>
    </div>
  );
}
