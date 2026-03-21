"use client";

import { useState } from "react";

interface Step { desc: string; equation: string }

function solveLinear(eq: string): { solution: string; steps: Step[] } | null {
  // Simple parser for ax + b = c style
  const normalized = eq.replace(/\s+/g, "").replace("−","-");
  const match = normalized.match(/^([+-]?\d*\.?\d*)x([+-]\d+\.?\d*)?=([+-]?\d+\.?\d*)$/i);
  if (!match) return null;
  const a = match[1] === "" || match[1] === "+" ? 1 : match[1] === "-" ? -1 : parseFloat(match[1]);
  const b = match[2] ? parseFloat(match[2]) : 0;
  const c = parseFloat(match[3]);
  const steps: Step[] = [
    { desc: "Original equation", equation: eq },
    { desc: `Subtract ${b} from both sides`, equation: `${a}x = ${c - b}` },
    { desc: `Divide both sides by ${a}`, equation: `x = ${(c - b) / a}` },
  ];
  return { solution: `x = ${(c - b) / a}`, steps };
}

function solveQuadratic(eq: string): { solution: string; steps: Step[] } | null {
  const match = eq.replace(/\s+/g,"").match(/^([+-]?\d*\.?\d*)x\^?2([+-]\d*\.?\d*)x([+-]\d+\.?\d*)?=0$/i);
  if (!match) return null;
  const a = match[1] === "" || match[1] === "+" ? 1 : match[1] === "-" ? -1 : parseFloat(match[1]);
  const b = match[2] === "" || match[2] === "+" ? 1 : match[2] === "-" ? -1 : parseFloat(match[2]);
  const c = match[3] ? parseFloat(match[3]) : 0;
  const disc = b * b - 4 * a * c;
  const steps: Step[] = [
    { desc: "Standard form", equation: `${a}x² + ${b}x + ${c} = 0` },
    { desc: "Apply quadratic formula", equation: `x = (−b ± √(b²−4ac)) / 2a` },
    { desc: "Calculate discriminant", equation: `Δ = ${b}² − 4(${a})(${c}) = ${disc}` },
  ];
  if (disc < 0) {
    steps.push({ desc: "Result", equation: "No real solutions (Δ < 0)" });
    return { solution: "No real solutions", steps };
  }
  const x1 = (-b + Math.sqrt(disc)) / (2 * a);
  const x2 = (-b - Math.sqrt(disc)) / (2 * a);
  const sol = x1 === x2 ? `x = ${x1}` : `x₁ = ${x1.toFixed(4)}, x₂ = ${x2.toFixed(4)}`;
  steps.push({ desc: "Solutions", equation: sol });
  return { solution: sol, steps };
}

export default function EquationSolver() {
  const [eq, setEq] = useState("2x + 4 = 10");
  const [result, setResult] = useState<{ solution: string; steps: Step[] } | null>(null);
  const [error, setError] = useState("");

  const solve = () => {
    setError("");
    const r = solveLinear(eq) || solveQuadratic(eq);
    if (r) setResult(r);
    else setError("Could not parse. Try: 2x + 4 = 10 or x^2 - 5x + 6 = 0");
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Enter Equation</label>
        <div className="flex gap-2">
          <input value={eq} onChange={(e) => setEq(e.target.value)} onKeyDown={(e) => e.key === "Enter" && solve()}
            placeholder="e.g., 3x + 6 = 15 or x^2 - 5x + 6 = 0"
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          <button onClick={solve} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity">Solve</button>
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>

      <div className="flex flex-wrap gap-2">
        {["2x + 4 = 10", "3x - 7 = 8", "x^2 - 5x + 6 = 0", "x^2 + 2x + 1 = 0"].map((ex) => (
          <button key={ex} onClick={() => { setEq(ex); setResult(null); }}
            className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            {ex}
          </button>
        ))}
      </div>

      {result && (
        <div className="rounded-xl border border-border bg-muted p-4 space-y-4">
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-center">
            <p className="text-sm text-muted-foreground">Solution</p>
            <p className="text-xl font-bold text-primary mt-1">{result.solution}</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase">Step-by-step</p>
            {result.steps.map((step, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold mt-0.5">{i + 1}</span>
                <div>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                  <p className="font-mono text-sm text-foreground">{step.equation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
