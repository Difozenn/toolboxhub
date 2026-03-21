"use client";

import { useState } from "react";

function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n < 4) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) if (n % i === 0 || n % (i + 2) === 0) return false;
  return true;
}

function primeFactors(n: number): number[] {
  const factors: number[] = [];
  let d = 2;
  while (d * d <= n) { while (n % d === 0) { factors.push(d); n = Math.floor(n / d); } d++; }
  if (n > 1) factors.push(n);
  return factors;
}

export default function PrimeChecker() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ prime: boolean; factors: number[]; n: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const check = () => {
    const n = parseInt(input);
    if (isNaN(n) || n < 1) { setError("Please enter a positive integer"); return; }
    if (n > 10_000_000) { setError("Please enter a number up to 10,000,000"); return; }
    setResult({ prime: isPrime(n), factors: isPrime(n) ? [] : primeFactors(n), n });
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <input type="number" value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && check()}
          placeholder="Enter a positive integer..."
          className="flex-1 rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        <button onClick={check} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Check</button>
      </div>
      {error && <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">{error}</div>}
      {result && (
        <div className={`rounded-xl border p-6 text-center space-y-3 ${result.prime ? "border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-950" : "border-yellow-300 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950"}`}>
          <p className="text-4xl font-bold text-foreground">{result.n}</p>
          <p className={`text-xl font-semibold ${result.prime ? "text-green-700 dark:text-green-400" : "text-yellow-700 dark:text-yellow-400"}`}>
            {result.prime ? "Is a Prime Number" : "Is Not Prime (Composite)"}
          </p>
          {!result.prime && result.factors.length > 0 && (
            <div className="text-sm text-muted-foreground">
              <p>Prime factorization:</p>
              <p className="font-mono font-semibold text-foreground mt-1">
                {result.n} = {result.factors.join(" × ")}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
