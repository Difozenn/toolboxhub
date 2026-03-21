"use client";
import { useState } from "react";

export default function MarkupToMargin() {
  const [cost, setCost] = useState("");
  const [inputMode, setInputMode] = useState<"markup"|"margin">("markup");
  const [pct, setPct] = useState("");

  const c = parseFloat(cost), p = parseFloat(pct);
  const validC = !isNaN(c) && c > 0;
  const validP = !isNaN(p) && p >= 0;

  let markup: number | null = null, margin: number | null = null, sellPrice: number | null = null, profit: number | null = null;
  if (validC && validP) {
    if (inputMode === "markup") {
      markup = p;
      margin = (p / (100 + p)) * 100;
      sellPrice = c * (1 + p / 100);
      profit = sellPrice - c;
    } else {
      margin = p;
      markup = (p / (100 - p)) * 100;
      sellPrice = c / (1 - p / 100);
      profit = sellPrice - c;
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-medium text-muted-foreground">Cost Price ($)</label>
        <input type="number" value={cost} onChange={e=>setCost(e.target.value)} placeholder="0.00" min="0" step="0.01"
          className="w-full mt-1 p-3 rounded-xl border border-border bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>
      <div className="flex gap-2">
        {(["markup","margin"] as const).map(m => (
          <button key={m} onClick={() => setInputMode(m)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors flex-1 ${inputMode===m?"bg-primary text-primary-foreground":"bg-muted border border-border text-foreground hover:bg-muted/80"}`}>
            Enter {m === "markup" ? "Markup %" : "Margin %"}
          </button>
        ))}
      </div>
      <input type="number" value={pct} onChange={e=>setPct(e.target.value)} placeholder={`Enter ${inputMode} %`} min="0"
        className="w-full p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
      {markup !== null && (
        <div className="grid grid-cols-2 gap-3">
          {[["Markup %",markup.toFixed(2)+"%"],["Margin %",margin!.toFixed(2)+"%"],["Selling Price","$"+sellPrice!.toFixed(2)],["Profit","$"+profit!.toFixed(2)]].map(([label,val]) => (
            <div key={label} className="p-3 rounded-xl bg-muted border border-border">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-xl font-bold text-primary">{val}</p>
            </div>
          ))}
        </div>
      )}
      <div className="p-3 rounded-xl bg-muted border border-border text-xs text-muted-foreground">
        <strong className="text-foreground">Tip:</strong> A 25% markup equals a 20% margin. Markup % ≠ Margin %.
      </div>
    </div>
  );
}
