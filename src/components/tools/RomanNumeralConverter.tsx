"use client";

import { useState, useCallback } from "react";

const ROMAN_MAP: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
  [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
  [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

function decimalToRoman(num: number): string {
  if (num < 1 || num > 3999 || !Number.isInteger(num)) return "";
  let result = "";
  let remaining = num;
  for (const [value, symbol] of ROMAN_MAP) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  return result;
}

function romanToDecimal(roman: string): number | null {
  const upper = roman.toUpperCase().trim();
  if (!upper) return null;
  if (!/^[IVXLCDM]+$/.test(upper)) return null;

  const values: Record<string, number> = {
    I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000,
  };

  let total = 0;
  for (let i = 0; i < upper.length; i++) {
    const current = values[upper[i]];
    const next = i + 1 < upper.length ? values[upper[i + 1]] : 0;
    if (current < next) {
      total -= current;
    } else {
      total += current;
    }
  }

  // Validate by converting back
  if (total < 1 || total > 3999) return null;
  if (decimalToRoman(total) !== upper) return null;

  return total;
}

export default function RomanNumeralConverter() {
  const [decimal, setDecimal] = useState("");
  const [roman, setRoman] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const handleDecimalChange = useCallback((value: string) => {
    setDecimal(value);
    setError("");
    const num = parseInt(value);
    if (!value.trim()) {
      setRoman("");
      return;
    }
    if (isNaN(num) || num < 1 || num > 3999) {
      setRoman("");
      setError("Enter a number between 1 and 3999");
      return;
    }
    setRoman(decimalToRoman(num));
  }, []);

  const handleRomanChange = useCallback((value: string) => {
    setRoman(value.toUpperCase());
    setError("");
    if (!value.trim()) {
      setDecimal("");
      return;
    }
    const result = romanToDecimal(value);
    if (result === null) {
      setDecimal("");
      setError("Invalid Roman numeral");
      return;
    }
    setDecimal(result.toString());
  }, []);

  const copy = useCallback(async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(field);
      setTimeout(() => setCopied(null), 2000);
    } catch {}
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Decimal input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Decimal Number</label>
          <div className="flex gap-2">
            <input
              type="number"
              min="1"
              max="3999"
              value={decimal}
              onChange={(e) => handleDecimalChange(e.target.value)}
              placeholder="Enter 1-3999"
              className="flex-1 rounded-lg border border-border bg-muted px-3 py-3 text-lg font-mono text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={() => decimal && copy(decimal, "decimal")}
              disabled={!decimal}
              className="rounded-lg border border-border bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {copied === "decimal" ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* Roman input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Roman Numeral</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={roman}
              onChange={(e) => handleRomanChange(e.target.value)}
              placeholder="Enter Roman numeral"
              className="flex-1 rounded-lg border border-border bg-muted px-3 py-3 text-lg font-mono text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary uppercase"
            />
            <button
              onClick={() => roman && copy(roman, "roman")}
              disabled={!roman}
              className="rounded-lg border border-border bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {copied === "roman" ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {/* Reference table */}
      <div className="rounded-xl border border-border bg-muted p-5">
        <h3 className="text-sm font-medium text-foreground mb-3">Quick Reference</h3>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
          {[
            { r: "I", d: 1 }, { r: "V", d: 5 }, { r: "X", d: 10 },
            { r: "L", d: 50 }, { r: "C", d: 100 }, { r: "D", d: 500 }, { r: "M", d: 1000 },
          ].map((item) => (
            <div key={item.r} className="rounded-lg border border-border bg-background p-2 text-center">
              <p className="text-lg font-bold text-primary">{item.r}</p>
              <p className="text-xs text-muted-foreground">{item.d}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3 sm:grid-cols-4">
          {[
            { r: "IV", d: 4 }, { r: "IX", d: 9 }, { r: "XL", d: 40 }, { r: "XC", d: 90 },
            { r: "CD", d: 400 }, { r: "CM", d: 900 }, { r: "MMXXVI", d: 2026 }, { r: "MMMCMXCIX", d: 3999 },
          ].map((item) => (
            <div key={item.r} className="rounded-lg border border-border bg-background p-2 text-center">
              <p className="text-sm font-bold text-primary">{item.r}</p>
              <p className="text-xs text-muted-foreground">{item.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
