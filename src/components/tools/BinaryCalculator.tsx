"use client";

import { useState } from "react";

type BinOp = "+" | "-" | "AND" | "OR" | "XOR";

export default function BinaryCalculatorEdu() {
  const [a, setA] = useState("1010");
  const [b, setB] = useState("0110");
  const [op, setOp] = useState<BinOp>("+");
  const [result, setResult] = useState<{ bin: string; dec: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validate = (s: string) => /^[01]+$/.test(s);

  const calculate = () => {
    if (!validate(a.trim()) || !validate(b.trim())) { setError("Please enter valid binary numbers (0s and 1s only)"); return; }
    const av = parseInt(a.trim(), 2), bv = parseInt(b.trim(), 2);
    let res = 0;
    if (op === "+") res = av + bv;
    else if (op === "-") res = av - bv;
    else if (op === "AND") res = av & bv;
    else if (op === "OR") res = av | bv;
    else if (op === "XOR") res = av ^ bv;
    const bin = res < 0 ? "-" + Math.abs(res).toString(2) : res.toString(2);
    setResult({ bin, dec: res });
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Binary A</label>
          <input type="text" value={a} onChange={(e) => setA(e.target.value)}
            placeholder="e.g. 1010"
            className="w-full rounded-xl border border-border bg-muted px-4 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          {a && validate(a) && <p className="text-xs text-muted-foreground">= {parseInt(a, 2)} (decimal)</p>}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Binary B</label>
          <input type="text" value={b} onChange={(e) => setB(e.target.value)}
            placeholder="e.g. 0110"
            className="w-full rounded-xl border border-border bg-muted px-4 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          {b && validate(b) && <p className="text-xs text-muted-foreground">= {parseInt(b, 2)} (decimal)</p>}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        {(["+","-","AND","OR","XOR"] as BinOp[]).map((o) => (
          <button key={o} onClick={() => setOp(o)}
            className={`rounded-lg px-4 py-2 text-sm font-mono font-medium transition-colors ${op === o ? "bg-primary text-white" : "border border-border bg-background text-foreground hover:bg-muted"}`}>{o}</button>
        ))}
        <button onClick={calculate} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90 ml-auto">Calculate</button>
      </div>
      {error && <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">{error}</div>}
      {result && (
        <div className="rounded-xl border border-border bg-muted p-6 space-y-3">
          <div className="font-mono text-sm text-muted-foreground">
            <span>{a}</span>
            <span className="mx-2">{op}</span>
            <span>{b}</span>
            <span className="mx-2">=</span>
          </div>
          <p className="font-mono text-3xl font-bold text-primary">{result.bin}</p>
          <p className="text-sm text-muted-foreground">Decimal: <span className="font-semibold text-foreground">{result.dec}</span></p>
          <p className="text-sm text-muted-foreground">Hex: <span className="font-semibold font-mono text-foreground">{result.dec >= 0 ? result.dec.toString(16).toUpperCase() : "-" + Math.abs(result.dec).toString(16).toUpperCase()}</span></p>
        </div>
      )}
    </div>
  );
}
