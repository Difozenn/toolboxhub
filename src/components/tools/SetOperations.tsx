"use client";

import { useState } from "react";

function parseSet(input: string): string[] {
  return [...new Set(input.split(/[\s,]+/).filter(Boolean))];
}

export default function SetOperations() {
  const [a, onChangeA] = useState("1 2 3 4 5");
  const [b, onChangeB] = useState("3 4 5 6 7");

  const parsedA = parseSet(a);
  const parsedB = parseSet(b);

  const union = [...new Set([...parsedA, ...parsedB])];
  const intersection = parsedA.filter((v) => parsedB.includes(v));
  const diffAB = parsedA.filter((v) => !parsedB.includes(v));
  const diffBA = parsedB.filter((v) => !parsedA.includes(v));
  const symmetric = [...diffAB, ...diffBA];

  const fmt = (arr: string[]) => arr.length > 0 ? `{ ${arr.join(", ")} }` : "∅ (empty set)";

  const ops = [
    { label: "A ∪ B — Union", desc: "All elements in A or B", result: union, color: "text-blue-500" },
    { label: "A ∩ B — Intersection", desc: "Elements in both A and B", result: intersection, color: "text-green-500" },
    { label: "A − B — Difference", desc: "Elements in A but not B", result: diffAB, color: "text-orange-500" },
    { label: "B − A — Difference", desc: "Elements in B but not A", result: diffBA, color: "text-purple-500" },
    { label: "A △ B — Symmetric Difference", desc: "Elements in A or B but not both", result: symmetric, color: "text-red-500" },
  ];

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Set A</label>
          <input value={a} onChange={(e) => onChangeA(e.target.value)}
            placeholder="Elements separated by spaces or commas"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          <p className="text-xs text-muted-foreground mt-1">|A| = {parsedA.length} elements</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Set B</label>
          <input value={b} onChange={(e) => onChangeB(e.target.value)}
            placeholder="Elements separated by spaces or commas"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          <p className="text-xs text-muted-foreground mt-1">|B| = {parsedB.length} elements</p>
        </div>
      </div>

      <div className="space-y-3">
        {ops.map((op) => (
          <div key={op.label} className="rounded-lg border border-border bg-muted p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-sm font-semibold ${op.color}`}>{op.label}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-1">{op.desc}</p>
            <p className="font-mono text-sm text-foreground break-all">{fmt(op.result)}</p>
            <p className="text-xs text-muted-foreground mt-1">|result| = {op.result.length}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
