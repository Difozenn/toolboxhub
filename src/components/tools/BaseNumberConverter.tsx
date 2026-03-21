"use client";

import { useState } from "react";

const BASES = [
  { label: "Binary (2)", value: 2 },
  { label: "Octal (8)", value: 8 },
  { label: "Decimal (10)", value: 10 },
  { label: "Hexadecimal (16)", value: 16 },
];

export default function BaseNumberConverter() {
  const [input, setInput] = useState("");
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(2);
  const [result, setResult] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const convert = () => {
    try {
      if (!input.trim()) { setResult(""); setError(null); return; }
      const decimal = parseInt(input.trim(), fromBase);
      if (isNaN(decimal)) throw new Error(`Invalid number for base ${fromBase}`);
      const converted = decimal.toString(toBase).toUpperCase();
      setResult(converted);
      setError(null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
      setResult("");
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">From Base</label>
          <select value={fromBase} onChange={(e) => setFromBase(Number(e.target.value))}
            className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none">
            {BASES.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">To Base</label>
          <select value={toBase} onChange={(e) => setToBase(Number(e.target.value))}
            className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none">
            {BASES.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
          </select>
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">Input Number</label>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && convert()}
          placeholder={fromBase === 16 ? "e.g. FF or 1A3F" : fromBase === 2 ? "e.g. 1010" : "e.g. 255"}
          className="w-full rounded-xl border border-border bg-muted px-4 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>
      <button onClick={convert} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Convert</button>
      {error && <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">{error}</div>}
      {result && (
        <div className="rounded-xl border border-border bg-muted p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Result (Base {toBase})</p>
              <p className="font-mono text-2xl font-semibold text-primary">{result}</p>
            </div>
            <button onClick={copy} className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white">
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
