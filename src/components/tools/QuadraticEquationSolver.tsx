"use client";
import { useState } from "react";
export default function QuadraticEquationSolver() {
  const [a, setA] = useState("1");
  const [b, setB] = useState("-5");
  const [c, setC] = useState("6");
  const an = parseFloat(a) || 0;
  const bn = parseFloat(b) || 0;
  const cn = parseFloat(c) || 0;
  const disc = bn * bn - 4 * an * cn;
  const valid = an !== 0;
  let root1 = "", root2 = "", rootType = "";
  if (valid) {
    if (disc > 0) {
      rootType = "Two distinct real roots";
      root1 = ((-bn + Math.sqrt(disc)) / (2 * an)).toFixed(6);
      root2 = ((-bn - Math.sqrt(disc)) / (2 * an)).toFixed(6);
    } else if (disc === 0) {
      rootType = "One repeated real root";
      root1 = root2 = (-bn / (2 * an)).toFixed(6);
    } else {
      rootType = "Two complex conjugate roots";
      const real = (-bn / (2 * an)).toFixed(4);
      const imag = (Math.sqrt(-disc) / (2 * an)).toFixed(4);
      root1 = `${real} + ${imag}i`;
      root2 = `${real} - ${imag}i`;
    }
  }
  const vertexX = valid ? -bn / (2 * an) : 0;
  const vertexY = valid ? an * vertexX * vertexX + bn * vertexX + cn : 0;
  const inputClass = "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground font-mono">ax² + bx + c = 0</p>
      <div className="grid gap-4 sm:grid-cols-3">
        <div><label className="mb-1 block text-sm font-medium text-foreground">a</label><input type="number" value={a} onChange={e => setA(e.target.value)} className={inputClass} /></div>
        <div><label className="mb-1 block text-sm font-medium text-foreground">b</label><input type="number" value={b} onChange={e => setB(e.target.value)} className={inputClass} /></div>
        <div><label className="mb-1 block text-sm font-medium text-foreground">c</label><input type="number" value={c} onChange={e => setC(e.target.value)} className={inputClass} /></div>
      </div>
      {valid && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">Root 1 (x₁)</p>
              <p className="text-lg font-bold text-primary font-mono">{root1}</p>
            </div>
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">Root 2 (x₂)</p>
              <p className="text-lg font-bold text-primary font-mono">{root2}</p>
            </div>
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">Discriminant</p>
              <p className={`text-lg font-bold ${disc > 0 ? "text-green-500" : disc === 0 ? "text-foreground" : "text-red-500"}`}>{disc.toFixed(2)}</p>
            </div>
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">Vertex</p>
              <p className="text-lg font-bold text-foreground font-mono">({vertexX.toFixed(2)}, {vertexY.toFixed(2)})</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{rootType} · Parabola opens {an > 0 ? "upward ↑" : "downward ↓"} · Axis of symmetry: x = {vertexX.toFixed(2)}</p>
        </div>
      )}
      {!valid && <p className="text-sm text-red-500">Coefficient &apos;a&apos; cannot be zero (that would make it linear, not quadratic).</p>}
    </div>
  );
}
