"use client";

import { useState, useMemo, useCallback } from "react";

// Approximate rates relative to USD (as of early 2026)
const RATES: Record<string, { name: string; rate: number; symbol: string }> = {
  USD: { name: "US Dollar", rate: 1, symbol: "$" },
  EUR: { name: "Euro", rate: 0.92, symbol: "\u20AC" },
  GBP: { name: "British Pound", rate: 0.79, symbol: "\u00A3" },
  JPY: { name: "Japanese Yen", rate: 149.5, symbol: "\u00A5" },
  CHF: { name: "Swiss Franc", rate: 0.88, symbol: "CHF" },
  CAD: { name: "Canadian Dollar", rate: 1.36, symbol: "CA$" },
  AUD: { name: "Australian Dollar", rate: 1.53, symbol: "A$" },
  CNY: { name: "Chinese Yuan", rate: 7.24, symbol: "\u00A5" },
  INR: { name: "Indian Rupee", rate: 83.1, symbol: "\u20B9" },
  BRL: { name: "Brazilian Real", rate: 4.97, symbol: "R$" },
  KRW: { name: "South Korean Won", rate: 1320, symbol: "\u20A9" },
  MXN: { name: "Mexican Peso", rate: 17.15, symbol: "MX$" },
  SGD: { name: "Singapore Dollar", rate: 1.34, symbol: "S$" },
  HKD: { name: "Hong Kong Dollar", rate: 7.82, symbol: "HK$" },
  SEK: { name: "Swedish Krona", rate: 10.42, symbol: "kr" },
  NOK: { name: "Norwegian Krone", rate: 10.55, symbol: "kr" },
  NZD: { name: "New Zealand Dollar", rate: 1.63, symbol: "NZ$" },
  ZAR: { name: "South African Rand", rate: 18.6, symbol: "R" },
  TRY: { name: "Turkish Lira", rate: 30.2, symbol: "\u20BA" },
  AED: { name: "UAE Dirham", rate: 3.67, symbol: "AED" },
};

const currencyCodes = Object.keys(RATES);

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const num = parseFloat(amount);
    if (isNaN(num) || num < 0) return null;

    const fromRate = RATES[fromCurrency].rate;
    const toRate = RATES[toCurrency].rate;
    const inUsd = num / fromRate;
    const converted = inUsd * toRate;
    const exchangeRate = toRate / fromRate;

    return { converted, exchangeRate, inUsd };
  }, [amount, fromCurrency, toCurrency]);

  const swap = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }, [fromCurrency, toCurrency]);

  const copyResult = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.converted.toFixed(2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, [result]);

  const fmt = (n: number, decimals = 2) =>
    n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  return (
    <div className="space-y-6">
      {/* Notice */}
      <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 px-4 py-2">
        <p className="text-xs text-muted-foreground">
          Rates are approximate and for reference only. They do not reflect real-time market rates.
        </p>
      </div>

      {/* Converter */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr]">
        {/* From */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">From</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {currencyCodes.map((code) => (
              <option key={code} value={code}>
                {code} - {RATES[code].name}
              </option>
            ))}
          </select>
          <input
            type="number"
            step="any"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full rounded-lg border border-border bg-muted px-3 py-2.5 text-lg font-mono text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Swap */}
        <div className="flex items-center justify-center">
          <button
            onClick={swap}
            className="rounded-full border border-border bg-muted p-3 text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            aria-label="Swap currencies"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 16l-4-4 4-4" />
              <path d="M17 8l4 4-4 4" />
              <path d="M3 12h18" />
            </svg>
          </button>
        </div>

        {/* To */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">To</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {currencyCodes.map((code) => (
              <option key={code} value={code}>
                {code} - {RATES[code].name}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <div className="flex-1 rounded-lg border border-border bg-muted px-3 py-2.5 text-lg font-mono text-foreground min-h-[44px]">
              {result ? (
                <>
                  <span className="text-muted-foreground mr-1">{RATES[toCurrency].symbol}</span>
                  {fmt(result.converted)}
                </>
              ) : (
                <span className="text-muted-foreground">Result</span>
              )}
            </div>
            <button
              onClick={copyResult}
              disabled={!result}
              className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>

      {/* Exchange rate formula */}
      {result && (
        <div className="rounded-xl border border-border bg-muted p-4 text-center space-y-1">
          <p className="text-sm text-muted-foreground">
            1 {fromCurrency} = <span className="font-mono font-medium text-primary">{fmt(result.exchangeRate, 6)}</span> {toCurrency}
          </p>
          <p className="text-sm text-muted-foreground">
            1 {toCurrency} = <span className="font-mono font-medium text-foreground">{fmt(1 / result.exchangeRate, 6)}</span> {fromCurrency}
          </p>
        </div>
      )}
    </div>
  );
}
