"use client";

import { useState } from "react";

interface Row { label: string; amount: number; }

export default function ProfitLossCalculator() {
  const [revenues, setRevenues] = useState<Row[]>([{ label: "Product Sales", amount: 0 }]);
  const [expenses, setExpenses] = useState<Row[]>([{ label: "Operating Costs", amount: 0 }]);

  const update = (list: Row[], setList: (r: Row[]) => void, i: number, field: keyof Row, val: string) =>
    setList(list.map((r, idx) => idx === i ? { ...r, [field]: field === "amount" ? Number(val) : val } : r));

  const add = (list: Row[], setList: (r: Row[]) => void) => setList([...list, { label: "", amount: 0 }]);
  const remove = (list: Row[], setList: (r: Row[]) => void, i: number) => setList(list.filter((_, idx) => idx !== i));

  const totalRev = revenues.reduce((s, r) => s + r.amount, 0);
  const totalExp = expenses.reduce((s, r) => s + r.amount, 0);
  const net = totalRev - totalExp;

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

  const Section = ({ title, rows, setRows, color }: { title: string; rows: Row[]; setRows: (r: Row[]) => void; color: string }) => (
    <div className="space-y-2">
      <p className={`text-sm font-semibold ${color}`}>{title}</p>
      {rows.map((row, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input type="text" value={row.label} onChange={(e) => update(rows, setRows, i, "label", e.target.value)} placeholder="Label"
            className="flex-1 rounded-lg border border-border bg-muted px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none" />
          <input type="number" value={row.amount} onChange={(e) => update(rows, setRows, i, "amount", e.target.value)} placeholder="0"
            className="w-32 rounded-lg border border-border bg-muted px-3 py-1.5 text-sm text-right text-foreground focus:border-primary focus:outline-none" />
          <button onClick={() => remove(rows, setRows, i)} className="text-muted-foreground hover:text-red-500 text-sm">×</button>
        </div>
      ))}
      <button onClick={() => add(rows, setRows)} className="text-xs text-primary hover:underline">+ Add row</button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Section title="Revenue" rows={revenues} setRows={setRevenues} color="text-green-600 dark:text-green-400" />
        <Section title="Expenses" rows={expenses} setRows={setExpenses} color="text-red-600 dark:text-red-400" />
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-950 p-4 text-center">
          <p className="text-xs text-muted-foreground">Total Revenue</p>
          <p className="text-xl font-bold text-green-600 dark:text-green-400">{fmt(totalRev)}</p>
        </div>
        <div className="rounded-xl border border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950 p-4 text-center">
          <p className="text-xs text-muted-foreground">Total Expenses</p>
          <p className="text-xl font-bold text-red-600 dark:text-red-400">{fmt(totalExp)}</p>
        </div>
        <div className={`rounded-xl border p-4 text-center ${net >= 0 ? "border-primary bg-primary/5" : "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950"}`}>
          <p className="text-xs text-muted-foreground">Net {net >= 0 ? "Profit" : "Loss"}</p>
          <p className={`text-xl font-bold ${net >= 0 ? "text-primary" : "text-red-600 dark:text-red-400"}`}>{fmt(Math.abs(net))}</p>
          {totalRev > 0 && <p className="text-xs text-muted-foreground mt-1">{Math.round((net / totalRev) * 100)}% margin</p>}
        </div>
      </div>
    </div>
  );
}
