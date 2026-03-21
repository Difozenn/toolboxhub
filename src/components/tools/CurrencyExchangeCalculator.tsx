"use client";

import { useState } from "react";

const CURRENCIES: Record<string, { name: string; rate: number }> = {
  USD: { name: "US Dollar", rate: 1 },
  EUR: { name: "Euro", rate: 0.92 },
  GBP: { name: "British Pound", rate: 0.79 },
  JPY: { name: "Japanese Yen", rate: 149.5 },
  CAD: { name: "Canadian Dollar", rate: 1.36 },
  AUD: { name: "Australian Dollar", rate: 1.53 },
  CHF: { name: "Swiss Franc", rate: 0.88 },
  CNY: { name: "Chinese Yuan", rate: 7.24 },
  INR: { name: "Indian Rupee", rate: 83.1 },
  BRL: { name: "Brazilian Real", rate: 4.97 },
};

export default function CurrencyExchangeCalculator() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [result, setResult] = useState<{
    converted: number;
    rate: number;
    inverse: number;
  } | null>(null);

  const inputClass =
    "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  const calculate = () => {
    const a = parseFloat(amount);
    if (!a || a <= 0) return;
    const usdAmount = a / CURRENCIES[from].rate;
    const converted = usdAmount * CURRENCIES[to].rate;
    const rate = CURRENCIES[to].rate / CURRENCIES[from].rate;
    setResult({ converted, rate, inverse: 1 / rate });
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
    setResult(null);
  };

  const fmt = (n: number, decimals = 4) =>
    n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  const selectClass = "rounded-lg border border-border bg-muted px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div className="space-y-6">
      <p className="text-xs text-muted-foreground">Uses approximate rates. For accurate rates, use a live exchange service.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Amount</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="100" className={inputClass} />
        </div>
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <label className="mb-1 block text-sm font-medium text-foreground">From</label>
            <select value={from} onChange={(e) => setFrom(e.target.value)} className={`w-full ${selectClass}`}>
              {Object.entries(CURRENCIES).map(([code, { name }]) => (
                <option key={code} value={code}>{code} — {name}</option>
              ))}
            </select>
          </div>
          <button onClick={swap} className="mb-0.5 rounded-lg border border-border bg-muted px-3 py-2 text-foreground transition-colors hover:bg-primary/10 hover:text-primary" title="Swap currencies">⇄</button>
          <div className="flex-1">
            <label className="mb-1 block text-sm font-medium text-foreground">To</label>
            <select value={to} onChange={(e) => setTo(e.target.value)} className={`w-full ${selectClass}`}>
              {Object.entries(CURRENCIES).map(([code, { name }]) => (
                <option key={code} value={code}>{code} — {name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <button onClick={calculate} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
        Convert
      </button>
      {result && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">{amount} {from} =</p>
            <p className="text-2xl font-bold text-primary">{fmt(result.converted, 2)} {to}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">1 {from} =</p>
            <p className="text-2xl font-bold text-foreground">{fmt(result.rate)} {to}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">1 {to} =</p>
            <p className="text-2xl font-bold text-foreground">{fmt(result.inverse)} {from}</p>
          </div>
        </div>
      )}
    </div>
  );
}
