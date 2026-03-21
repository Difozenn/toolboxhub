"use client";

import { useState } from "react";

function gcd(a: number, b: number): number { return b === 0 ? Math.abs(a) : gcd(b, a % b); }

function simplify(num: number, den: number) {
  if (den === 0) return { num: NaN, den: 0 };
  const g = gcd(Math.abs(num), Math.abs(den));
  const sign = den < 0 ? -1 : 1;
  return { num: sign * num / g, den: sign * den / g };
}

export default function FractionCalculator() {
  const [n1, setN1] = useState("");
  const [d1, setD1] = useState("");
  const [n2, setN2] = useState("");
  const [d2, setD2] = useState("");
  const [op, setOp] = useState("+");
  const [result, setResult] = useState<{ num: number; den: number; decimal: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    const a = parseInt(n1), b = parseInt(d1), c = parseInt(n2), d = parseInt(d2);
    if ([a,b,c,d].some(isNaN)) { setError("Please enter valid integers"); return; }
    if (b === 0 || d === 0) { setError("Denominator cannot be zero"); return; }
    let rn = 0, rd = 1;
    switch (op) {
      case "+": rn = a * d + c * b; rd = b * d; break;
      case "-": rn = a * d - c * b; rd = b * d; break;
      case "*": rn = a * c; rd = b * d; break;
      case "÷": if (c === 0) { setError("Cannot divide by zero"); return; } rn = a * d; rd = b * c; break;
    }
    const { num, den } = simplify(rn, rd);
    setResult({ num, den, decimal: (num / den).toFixed(6).replace(/\.?0+$/, "") });
    setError(null);
  };

  const Input = ({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) => (
    <input type="number" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-16 rounded-lg border border-border bg-muted px-2 py-1 text-center text-sm text-foreground focus:border-primary focus:outline-none" />
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex flex-col items-center gap-1">
          <Input value={n1} onChange={setN1} placeholder="1" />
          <div className="w-16 border-t-2 border-foreground" />
          <Input value={d1} onChange={setD1} placeholder="2" />
        </div>
        <select value={op} onChange={(e) => setOp(e.target.value)}
          className="rounded-lg border border-border bg-muted px-3 py-2 text-lg font-semibold text-primary focus:border-primary focus:outline-none">
          {["+", "-", "*", "÷"].map((o) => <option key={o}>{o}</option>)}
        </select>
        <div className="flex flex-col items-center gap-1">
          <Input value={n2} onChange={setN2} placeholder="1" />
          <div className="w-16 border-t-2 border-foreground" />
          <Input value={d2} onChange={setD2} placeholder="3" />
        </div>
        <button onClick={calculate} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Calculate</button>
      </div>
      {error && <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">{error}</div>}
      {result && (
        <div className="rounded-xl border border-border bg-muted p-6 text-center space-y-2">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-primary">{result.num}</span>
            <div className="w-16 border-t-2 border-foreground my-1" />
            <span className="text-3xl font-bold text-primary">{result.den}</span>
          </div>
          <p className="text-muted-foreground">= <span className="font-semibold text-foreground">{result.decimal}</span></p>
        </div>
      )}
    </div>
  );
}
