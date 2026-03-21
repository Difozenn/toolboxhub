"use client";

import { useState } from "react";

export default function VatCalculator() {
  const [amount, setAmount] = useState("");
  const [vatRate, setVatRate] = useState("20");
  const [mode, setMode] = useState<"add" | "remove">("add");
  const [result, setResult] = useState<{
    net: number;
    vatAmount: number;
    gross: number;
  } | null>(null);

  const inputClass =
    "w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  const calculate = () => {
    const a = parseFloat(amount);
    const rate = parseFloat(vatRate);
    if (!a || isNaN(rate) || rate < 0) return;
    if (mode === "add") {
      const vatAmount = a * (rate / 100);
      setResult({ net: a, vatAmount, gross: a + vatAmount });
    } else {
      const net = a / (1 + rate / 100);
      const vatAmount = a - net;
      setResult({ net, vatAmount, gross: a });
    }
  };

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Amount ($)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="100" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">VAT / Tax Rate (%)</label>
          <input type="number" value={vatRate} onChange={(e) => setVatRate(e.target.value)} placeholder="20" step="0.1" className={inputClass} />
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setMode("add")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${mode === "add" ? "bg-primary text-primary-foreground" : "border border-border bg-muted text-foreground hover:bg-primary/10"}`}
        >
          Add VAT
        </button>
        <button
          onClick={() => setMode("remove")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${mode === "remove" ? "bg-primary text-primary-foreground" : "border border-border bg-muted text-foreground hover:bg-primary/10"}`}
        >
          Remove VAT
        </button>
      </div>
      <button onClick={calculate} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
        Calculate
      </button>
      {result && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Net (excl. VAT)</p>
            <p className="text-2xl font-bold text-foreground">${fmt(result.net)}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">VAT Amount</p>
            <p className="text-2xl font-bold text-primary">${fmt(result.vatAmount)}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Gross (incl. VAT)</p>
            <p className="text-2xl font-bold text-foreground">${fmt(result.gross)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
