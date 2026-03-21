"use client";

import { useState } from "react";

interface Item {
  id: number;
  label: string;
  value: string;
}

let nextId = 1;

export default function NetWorthCalculator() {
  const [assets, setAssets] = useState<Item[]>([{ id: nextId++, label: "Home", value: "" }]);
  const [liabilities, setLiabilities] = useState<Item[]>([{ id: nextId++, label: "Mortgage", value: "" }]);

  const addItem = (type: "assets" | "liabilities") => {
    const item: Item = { id: nextId++, label: "", value: "" };
    if (type === "assets") setAssets((p) => [...p, item]);
    else setLiabilities((p) => [...p, item]);
  };

  const updateItem = (type: "assets" | "liabilities", id: number, field: "label" | "value", val: string) => {
    const updater = (items: Item[]) => items.map((it) => (it.id === id ? { ...it, [field]: val } : it));
    if (type === "assets") setAssets(updater);
    else setLiabilities(updater);
  };

  const removeItem = (type: "assets" | "liabilities", id: number) => {
    if (type === "assets") setAssets((p) => p.filter((it) => it.id !== id));
    else setLiabilities((p) => p.filter((it) => it.id !== id));
  };

  const totalAssets = assets.reduce((sum, it) => sum + (parseFloat(it.value) || 0), 0);
  const totalLiabilities = liabilities.reduce((sum, it) => sum + (parseFloat(it.value) || 0), 0);
  const netWorth = totalAssets - totalLiabilities;

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const inputClass = "rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  const renderList = (type: "assets" | "liabilities", items: Item[]) => (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="flex gap-2">
          <input value={item.label} onChange={(e) => updateItem(type, item.id, "label", e.target.value)} placeholder="Label" className={`${inputClass} flex-1`} />
          <input type="number" value={item.value} onChange={(e) => updateItem(type, item.id, "value", e.target.value)} placeholder="0" className={`${inputClass} w-32`} />
          <button onClick={() => removeItem(type, item.id)} className="rounded-lg border border-border bg-muted px-2 py-2 text-muted-foreground hover:text-red-500 transition-colors">✕</button>
        </div>
      ))}
      <button onClick={() => addItem(type)} className="text-sm text-primary hover:underline">+ Add {type === "assets" ? "Asset" : "Liability"}</button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Assets</h3>
          {renderList("assets", assets)}
          <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm font-medium text-green-600">Total Assets: ${fmt(totalAssets)}</div>
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Liabilities</h3>
          {renderList("liabilities", liabilities)}
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-500">Total Liabilities: ${fmt(totalLiabilities)}</div>
        </div>
      </div>
      <div className={`rounded-xl border p-5 text-center ${netWorth >= 0 ? "border-primary/30 bg-primary/10" : "border-red-500/30 bg-red-500/10"}`}>
        <p className="text-sm text-muted-foreground mb-1">Net Worth</p>
        <p className={`text-3xl font-bold ${netWorth >= 0 ? "text-primary" : "text-red-500"}`}>
          {netWorth < 0 ? "-" : ""}${fmt(Math.abs(netWorth))}
        </p>
      </div>
    </div>
  );
}
