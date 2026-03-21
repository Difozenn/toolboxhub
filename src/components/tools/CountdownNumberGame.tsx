"use client";

import { useState } from "react";

function genNumbers(): number[] {
  const large = [25, 50, 75, 100];
  const small = Array.from({ length: 10 }, (_, i) => i + 1).flatMap(n => [n, n]);
  const shuffled = [...small].sort(() => Math.random() - 0.5);
  const picked = [large[Math.floor(Math.random() * large.length)], ...shuffled.slice(0, 5)];
  return picked.sort((a, b) => a - b);
}

export default function CountdownNumberGame() {
  const [numbers, setNumbers] = useState(() => genNumbers());
  const [target, setTarget] = useState(() => Math.floor(Math.random() * 900) + 100);
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState<{ value: number; correct: boolean; msg: string } | null>(null);

  const evaluate = () => {
    try {
      const sanitized = expr.replace(/[^0-9+\-*/().\s]/g, "");
      // eslint-disable-next-line no-new-func
      const value = Function(`"use strict"; return (${sanitized})`)() as number;
      if (typeof value !== "number" || !isFinite(value)) {
        setResult({ value: 0, correct: false, msg: "Invalid expression." });
        return;
      }
      const rounded = Math.round(value);
      const diff = Math.abs(rounded - target);
      const correct = diff === 0;
      const msg = correct ? "Exact! Perfect score!" : diff <= 5 ? `Off by ${diff} — very close!` : diff <= 10 ? `Off by ${diff} — close!` : `Off by ${diff}.`;
      setResult({ value: rounded, correct, msg });
    } catch {
      setResult({ value: 0, correct: false, msg: "Invalid expression. Check your syntax." });
    }
  };

  const newGame = () => {
    setNumbers(genNumbers());
    setTarget(Math.floor(Math.random() * 900) + 100);
    setExpr("");
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Target</p>
          <p className="text-5xl font-bold text-primary">{target}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground mb-2">Your Numbers</p>
          <div className="flex flex-wrap gap-2">
            {numbers.map((n, i) => (
              <span key={i} className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-background text-lg font-bold text-foreground">{n}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-muted p-5 space-y-3">
        <label className="block text-sm font-medium text-foreground">Your Expression</label>
        <input value={expr} onChange={(e) => setExpr(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && evaluate()}
          placeholder="e.g. (75 + 25) * 6 - 50"
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground font-mono focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        <div className="flex gap-2">
          <button onClick={evaluate} className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-colors">Check Answer</button>
          <button onClick={newGame} className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground hover:bg-primary/10 transition-colors">New Game</button>
        </div>
      </div>

      {result && (
        <div className={`rounded-xl border p-5 text-center ${result.correct ? "border-primary/30 bg-primary/5" : "border-border bg-muted"}`}>
          <p className="text-2xl font-bold text-primary tabular-nums">{result.value}</p>
          <p className={`text-sm mt-1 font-medium ${result.correct ? "text-primary" : "text-muted-foreground"}`}>{result.msg}</p>
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center">Use +, -, *, / and parentheses. Try to reach the target using only your 6 numbers.</p>
    </div>
  );
}
