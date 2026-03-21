"use client";

import { useState, useEffect, useRef } from "react";

export default function WheelSpinner() {
  const [input, setInput] = useState("Option 1\nOption 2\nOption 3\nOption 4");
  const [current, setCurrent] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const items = input.split("\n").map(s => s.trim()).filter(Boolean);

  const spin = () => {
    if (items.length === 0 || spinning) return;
    setSpinning(true);
    setWinner(null);
    let delay = 50;
    let elapsed = 0;
    const total = 3000;
    let idx = 0;

    const step = () => {
      idx = Math.floor(Math.random() * items.length);
      setCurrent(items[idx]);
      elapsed += delay;
      delay = Math.min(delay * 1.08, 400);
      if (elapsed < total) {
        intervalRef.current = setTimeout(step, delay);
      } else {
        setSpinning(false);
        setWinner(items[idx]);
      }
    };
    intervalRef.current = setTimeout(step, delay);
  };

  useEffect(() => () => { if (intervalRef.current) clearTimeout(intervalRef.current); }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5 space-y-3">
        <label className="block text-sm font-medium text-foreground">Items (one per line)</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={5} disabled={spinning}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none font-mono text-sm disabled:opacity-60" />
        <button onClick={spin} disabled={spinning || items.length < 2}
          className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:opacity-90 disabled:opacity-50">
          {spinning ? "Spinning..." : "Spin!"}
        </button>
      </div>

      <div className={`rounded-xl border p-8 text-center transition-all ${spinning ? "border-primary/50 bg-primary/5" : winner ? "border-primary/30 bg-primary/5" : "border-border bg-muted"}`}>
        {(spinning || winner) && current ? (
          <>
            <p className="text-sm text-muted-foreground mb-2">{spinning ? "Spinning..." : "Winner!"}</p>
            <p className={`text-4xl font-bold text-primary transition-all ${spinning ? "blur-[1px]" : ""}`}>{current}</p>
          </>
        ) : (
          <p className="text-muted-foreground">Add items and click Spin!</p>
        )}
      </div>
    </div>
  );
}
