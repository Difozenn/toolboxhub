"use client";
import { useState } from "react";

type MatSize = 2 | 3;

function emptyMatrix(n: MatSize): number[][] {
  return Array.from({ length: n }, () => Array(n).fill(0));
}

function det2(m: number[][]): number { return m[0][0]*m[1][1] - m[0][1]*m[1][0]; }
function det3(m: number[][]): number {
  return m[0][0]*(m[1][1]*m[2][2]-m[1][2]*m[2][1])
       - m[0][1]*(m[1][0]*m[2][2]-m[1][2]*m[2][0])
       + m[0][2]*(m[1][0]*m[2][1]-m[1][1]*m[2][0]);
}

function transpose(m: number[][]): number[][] {
  const n = m.length;
  return Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => m[j][i]));
}

function add(a: number[][], b: number[][]): number[][] {
  return a.map((row, i) => row.map((v, j) => v + b[i][j]));
}

function multiply(a: number[][], b: number[][]): number[][] {
  const n = a.length;
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) =>
      a[i].reduce((sum, _, k) => sum + a[i][k] * b[k][j], 0)
    )
  );
}

export default function MatrixCalculator() {
  const [size, setSize] = useState<MatSize>(2);
  const [matA, setMatA] = useState(emptyMatrix(2));
  const [matB, setMatB] = useState(emptyMatrix(2));
  const [result, setResult] = useState<number[][] | number | null>(null);
  const [label, setLabel] = useState("");

  const inputClass = "w-16 rounded border border-border bg-muted px-2 py-1 text-center text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  const changeSize = (n: MatSize) => { setSize(n); setMatA(emptyMatrix(n)); setMatB(emptyMatrix(n)); setResult(null); };

  const updateCell = (mat: "A"|"B", r: number, c: number, val: string) => {
    const setter = mat === "A" ? setMatA : setMatB;
    const source = mat === "A" ? matA : matB;
    const copy = source.map(row => [...row]);
    copy[r][c] = parseFloat(val) || 0;
    setter(copy);
  };

  const renderMatrix = (mat: number[][], name: "A"|"B") => (
    <div>
      <p className="text-sm font-medium text-foreground mb-2">Matrix {name}</p>
      <div className="space-y-1">
        {mat.map((row, i) => (
          <div key={i} className="flex gap-1">
            {row.map((v, j) => (
              <input key={j} type="number" value={v || ""} onChange={e => updateCell(name, i, j, e.target.value)} className={inputClass} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  const renderResult = () => {
    if (result === null) return null;
    if (typeof result === "number") return (
      <div className="rounded-xl border border-border bg-muted p-4 text-center">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold text-primary">{result}</p>
      </div>
    );
    return (
      <div>
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
        <div className="space-y-1 inline-block rounded-lg border border-border bg-muted p-3">
          {(result as number[][]).map((row, i) => (
            <div key={i} className="flex gap-3">
              {row.map((v, j) => <span key={j} className="w-16 text-center text-sm font-mono text-foreground">{v}</span>)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {([2, 3] as MatSize[]).map(n => (
          <button key={n} onClick={() => changeSize(n)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${size === n ? "bg-primary text-primary-foreground" : "bg-muted border border-border text-foreground hover:bg-muted/80"}`}>
            {n}x{n}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {renderMatrix(matA, "A")}
        {renderMatrix(matB, "B")}
      </div>
      <div className="flex flex-wrap gap-2">
        <button onClick={() => { setResult(add(matA, matB)); setLabel("A + B"); }} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">A + B</button>
        <button onClick={() => { setResult(multiply(matA, matB)); setLabel("A × B"); }} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">A × B</button>
        <button onClick={() => { setResult(transpose(matA)); setLabel("Transpose A"); }} className="rounded-lg border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/80">Transpose A</button>
        <button onClick={() => { setResult(size === 2 ? det2(matA) : det3(matA)); setLabel("Determinant A"); }} className="rounded-lg border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/80">Det A</button>
      </div>
      {renderResult()}
    </div>
  );
}
