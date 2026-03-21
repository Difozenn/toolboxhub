"use client";

import { useState } from "react";

interface Row { name: string; grade: number; weight: number; }

export default function GradeCalculator() {
  const [rows, setRows] = useState<Row[]>([{ name: "Assignment 1", grade: 90, weight: 20 }, { name: "Midterm", grade: 85, weight: 30 }, { name: "Final", grade: 88, weight: 50 }]);

  const update = (i: number, field: keyof Row, val: string | number) =>
    setRows(rows.map((r, idx) => idx === i ? { ...r, [field]: field === "name" ? val : Number(val) } : r));
  const add = () => setRows([...rows, { name: "", grade: 0, weight: 0 }]);
  const remove = (i: number) => setRows(rows.filter((_, idx) => idx !== i));

  const totalWeight = rows.reduce((s, r) => s + r.weight, 0);
  const weightedSum = rows.reduce((s, r) => s + r.grade * r.weight, 0);
  const avg = totalWeight > 0 ? weightedSum / totalWeight : 0;

  const letter = avg >= 90 ? "A" : avg >= 80 ? "B" : avg >= 70 ? "C" : avg >= 60 ? "D" : "F";

  return (
    <div className="space-y-4">
      <div className="overflow-auto rounded-xl border border-border bg-muted">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border"><th className="px-3 py-2 text-left text-xs text-muted-foreground font-medium">Assignment</th><th className="px-3 py-2 text-right text-xs text-muted-foreground font-medium">Grade (%)</th><th className="px-3 py-2 text-right text-xs text-muted-foreground font-medium">Weight (%)</th><th className="w-8" /></tr></thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="px-3 py-2"><input type="text" value={row.name} onChange={(e) => update(i, "name", e.target.value)} placeholder="Assignment" className="w-full rounded border border-border bg-background px-2 py-1 text-sm focus:border-primary focus:outline-none" /></td>
                <td className="px-3 py-2"><input type="number" min={0} max={100} value={row.grade} onChange={(e) => update(i, "grade", e.target.value)} className="w-full rounded border border-border bg-background px-2 py-1 text-sm text-right focus:border-primary focus:outline-none" /></td>
                <td className="px-3 py-2"><input type="number" min={0} max={100} value={row.weight} onChange={(e) => update(i, "weight", e.target.value)} className="w-full rounded border border-border bg-background px-2 py-1 text-sm text-right focus:border-primary focus:outline-none" /></td>
                <td className="px-3 py-2"><button onClick={() => remove(i)} className="text-muted-foreground hover:text-red-500">×</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between">
        <button onClick={add} className="text-sm text-primary hover:underline">+ Add Row</button>
        <span className={`text-xs ${totalWeight === 100 ? "text-green-600" : "text-yellow-600"}`}>Total weight: {totalWeight}%{totalWeight !== 100 ? " (should be 100%)" : ""}</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-muted p-6 text-center">
          <p className="text-xs text-muted-foreground">Weighted Average</p>
          <p className="text-4xl font-bold text-primary">{avg.toFixed(2)}%</p>
        </div>
        <div className="rounded-xl border border-border bg-muted p-6 text-center">
          <p className="text-xs text-muted-foreground">Letter Grade</p>
          <p className="text-4xl font-bold text-primary">{letter}</p>
        </div>
      </div>
    </div>
  );
}
