"use client";

import { useState } from "react";

const DICE = [4, 6, 8, 10, 12, 20, 100];

interface RollRecord {
  label: string;
  results: number[];
  total: number;
}

export default function DiceRoller() {
  const [diceType, setDiceType] = useState(6);
  const [quantity, setQuantity] = useState(1);
  const [lastRoll, setLastRoll] = useState<RollRecord | null>(null);
  const [history, setHistory] = useState<RollRecord[]>([]);

  const roll = () => {
    const results = Array.from({ length: quantity }, () => Math.floor(Math.random() * diceType) + 1);
    const total = results.reduce((a, b) => a + b, 0);
    const record: RollRecord = { label: `${quantity}d${diceType}`, results, total };
    setLastRoll(record);
    setHistory(prev => [record, ...prev].slice(0, 10));
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Dice Type</label>
            <div className="flex flex-wrap gap-2">
              {DICE.map(d => (
                <button key={d} onClick={() => setDiceType(d)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${diceType === d ? "bg-primary text-white" : "border border-border bg-background text-foreground hover:bg-primary/10"}`}>
                  d{d}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Quantity (1–10)</label>
            <input type="number" min="1" max="10" value={quantity} onChange={(e) => setQuantity(Math.max(1, Math.min(10, Number(e.target.value))))}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        </div>
        <button onClick={roll} className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:opacity-90">
          Roll {quantity}d{diceType}
        </button>
      </div>

      {lastRoll && (
        <div className="rounded-xl border border-border bg-muted p-5 text-center space-y-3">
          <p className="text-sm text-muted-foreground">{lastRoll.label}</p>
          <div className="flex justify-center flex-wrap gap-2">
            {lastRoll.results.map((r, i) => (
              <span key={i} className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-lg font-bold text-foreground">{r}</span>
            ))}
          </div>
          <p className="text-3xl font-bold text-primary">Total: {lastRoll.total}</p>
        </div>
      )}

      {history.length > 0 && (
        <div className="rounded-xl border border-border bg-muted p-5 space-y-2">
          <p className="text-sm font-medium text-foreground mb-2">History (last 10)</p>
          {history.map((r, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-sm">
              <span className="text-muted-foreground">{r.label}</span>
              <span className="font-mono text-foreground">[{r.results.join(", ")}]</span>
              <span className="font-bold text-primary">{r.total}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
