"use client";

import { useState } from "react";

export default function CoinFlip() {
  const [result, setResult] = useState<"heads" | "tails" | null>(null);
  const [heads, setHeads] = useState(0);
  const [tails, setTails] = useState(0);
  const [flipping, setFlipping] = useState(false);

  const flip = () => {
    setFlipping(true);
    setTimeout(() => {
      const r = Math.random() < 0.5 ? "heads" : "tails";
      setResult(r);
      if (r === "heads") setHeads(h => h + 1);
      else setTails(t => t + 1);
      setFlipping(false);
    }, 400);
  };

  const total = heads + tails;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-8 text-center space-y-4">
        <div className={`mx-auto flex h-32 w-32 items-center justify-center rounded-full border-4 text-5xl transition-all duration-300 ${
          flipping ? "opacity-30 scale-90" :
          result === "heads" ? "border-primary bg-primary/10" :
          result === "tails" ? "border-foreground bg-muted" :
          "border-border bg-background"
        }`}>
          {flipping ? "?" : result === "heads" ? "🪙" : result === "tails" ? "⚫" : "🪙"}
        </div>
        {result && !flipping && (
          <p className="text-3xl font-bold text-primary capitalize">{result}!</p>
        )}
        <button onClick={flip} disabled={flipping}
          className="rounded-lg bg-primary px-8 py-3 font-semibold text-white transition-colors hover:opacity-90 disabled:opacity-50">
          {flipping ? "Flipping..." : "Flip Coin"}
        </button>
      </div>

      {total > 0 && (
        <div className="rounded-xl border border-border bg-muted p-5 space-y-3">
          <div className="flex justify-between text-sm font-medium text-foreground">
            <span>Heads: {heads} ({total > 0 ? ((heads / total) * 100).toFixed(1) : 0}%)</span>
            <span>Tails: {tails} ({total > 0 ? ((tails / total) * 100).toFixed(1) : 0}%)</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-background border border-border">
            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${total > 0 ? (heads / total) * 100 : 50}%` }} />
          </div>
          <p className="text-center text-xs text-muted-foreground">{total} total flip{total !== 1 ? "s" : ""}</p>
          <button onClick={() => { setHeads(0); setTails(0); setResult(null); }}
            className="w-full rounded-lg border border-border bg-background py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            Reset Stats
          </button>
        </div>
      )}
    </div>
  );
}
