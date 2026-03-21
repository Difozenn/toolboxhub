"use client";
import { useState } from "react";

function fibSequence(n: number): number[] {
  const seq = [0, 1];
  for (let i = 2; i < n; i++) seq.push(seq[i-1]+seq[i-2]);
  return seq.slice(0, n);
}

export default function FibonacciGenerator() {
  const [mode, setMode] = useState<"sequence"|"nth">("sequence");
  const [count, setCount] = useState(10);
  const [pos, setPos] = useState(10);
  const [showRatio, setShowRatio] = useState(false);

  const seq = fibSequence(Math.min(count, 50));
  const nthVal = fibSequence(Math.min(pos+1, 80))[pos-1] ?? 0;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["sequence","nth"] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode===m?"bg-primary text-primary-foreground":"bg-muted text-foreground hover:bg-muted/80"}`}>
            {m==="sequence"?"Generate Sequence":"Find Nth Number"}
          </button>
        ))}
      </div>
      {mode==="sequence" ? (
        <>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Number of terms: {count}</label>
            <input type="range" min={2} max={50} value={count} onChange={e=>setCount(+e.target.value)} className="w-full mt-1 accent-primary" />
          </div>
          <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
            <input type="checkbox" checked={showRatio} onChange={e=>setShowRatio(e.target.checked)} className="accent-primary w-4 h-4" />
            Show golden ratio convergence
          </label>
          <div className="p-3 rounded-xl bg-muted border border-border overflow-auto max-h-48">
            <div className="flex flex-wrap gap-2">
              {seq.map((n,i) => (
                <div key={i} className="text-center">
                  <div className="px-2 py-1 rounded-lg bg-background border border-border text-foreground font-mono text-sm">{n.toLocaleString()}</div>
                  {showRatio && i>0 && <div className="text-xs text-muted-foreground mt-0.5">{(n/seq[i-1]).toFixed(4)}</div>}
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => navigator.clipboard.writeText(seq.join(", "))}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            Copy Sequence
          </button>
        </>
      ) : (
        <>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Position (n): {pos}</label>
            <input type="range" min={1} max={78} value={pos} onChange={e=>setPos(+e.target.value)} className="w-full mt-1 accent-primary" />
          </div>
          <div className="p-4 rounded-xl bg-muted border border-border text-center">
            <p className="text-xs text-muted-foreground">F({pos}) =</p>
            <p className="text-3xl font-bold text-primary mt-1">{nthVal.toLocaleString()}</p>
          </div>
        </>
      )}
    </div>
  );
}
