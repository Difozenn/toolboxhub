"use client";

import { useState } from "react";

type Matrix = number[][];
const empty3x3 = (): Matrix => Array.from({ length: 3 }, () => Array(3).fill(0));

function matAdd(a: Matrix, b: Matrix): Matrix { return a.map((r, i) => r.map((v, j) => v + b[i][j])); }
function matMul(a: Matrix, b: Matrix): Matrix {
  return a.map((r, i) => b[0].map((_, j) => r.reduce((s, _, k) => s + a[i][k] * b[k][j], 0)));
}
function matTranspose(a: Matrix): Matrix { return a[0].map((_, j) => a.map((r) => r[j])); }
function det3(m: Matrix): number {
  return m[0][0]*(m[1][1]*m[2][2]-m[1][2]*m[2][1]) - m[0][1]*(m[1][0]*m[2][2]-m[1][2]*m[2][0]) + m[0][2]*(m[1][0]*m[2][1]-m[1][1]*m[2][0]);
}

export default function MatrixCalculator() {
  const [mA, setMA] = useState<Matrix>(empty3x3());
  const [mB, setMB] = useState<Matrix>(empty3x3());
  const [op, setOp] = useState("add");
  const [result, setResult] = useState<Matrix | number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const setCell = (mat: Matrix, setMat: (m: Matrix) => void, r: number, c: number, v: string) => {
    const next = mat.map((row, ri) => row.map((cell, ci) => ri === r && ci === c ? (parseFloat(v) || 0) : cell));
    setMat(next);
  };

  const calculate = () => {
    try {
      if (op === "add") setResult(matAdd(mA, mB));
      else if (op === "multiply") setResult(matMul(mA, mB));
      else if (op === "transpose-a") setResult(matTranspose(mA));
      else if (op === "det-a") setResult(det3(mA));
      setError(null);
    } catch (e: unknown) { setError(String(e)); }
  };

  const Grid = ({ mat, setMat }: { mat: Matrix; setMat: (m: Matrix) => void }) => (
    <div className="space-y-1">
      {mat.map((row, r) => (
        <div key={r} className="flex gap-1">
          {row.map((cell, c) => (
            <input key={c} type="number" value={cell} onChange={(e) => setCell(mat, setMat, r, c, e.target.value)}
              className="w-14 rounded-lg border border-border bg-muted px-2 py-1 text-center text-sm text-foreground focus:border-primary focus:outline-none" />
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2"><p className="text-sm font-medium text-muted-foreground">Matrix A</p><Grid mat={mA} setMat={setMA} /></div>
        <div className="space-y-2"><p className="text-sm font-medium text-muted-foreground">Matrix B</p><Grid mat={mB} setMat={setMB} /></div>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <select value={op} onChange={(e) => setOp(e.target.value)}
          className="rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none">
          <option value="add">A + B (Add)</option>
          <option value="multiply">A × B (Multiply)</option>
          <option value="transpose-a">Transpose A</option>
          <option value="det-a">Det(A)</option>
        </select>
        <button onClick={calculate} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Calculate</button>
      </div>
      {error && <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">{error}</div>}
      {result !== null && (
        <div className="rounded-xl border border-border bg-muted p-4">
          <p className="mb-2 text-sm font-medium text-muted-foreground">Result</p>
          {typeof result === "number" ? (
            <p className="text-2xl font-bold text-primary">{result}</p>
          ) : (
            <div className="space-y-1">
              {(result as Matrix).map((row, r) => (
                <div key={r} className="flex gap-2">
                  {row.map((v, c) => <span key={c} className="w-14 text-center font-mono text-sm font-semibold text-foreground">{Number(v.toFixed(4))}</span>)}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
