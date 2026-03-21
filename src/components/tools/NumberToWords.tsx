"use client";

import { useState } from "react";

const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
  "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

function toWords(n: number): string {
  if (n === 0) return "zero";
  if (n < 0) return "negative " + toWords(-n);
  if (n < 20) return ones[n];
  if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? "-" + ones[n % 10] : "");
  if (n < 1000) return ones[Math.floor(n / 100)] + " hundred" + (n % 100 ? " " + toWords(n % 100) : "");
  if (n < 1_000_000) return toWords(Math.floor(n / 1000)) + " thousand" + (n % 1000 ? " " + toWords(n % 1000) : "");
  if (n < 1_000_000_000) return toWords(Math.floor(n / 1_000_000)) + " million" + (n % 1_000_000 ? " " + toWords(n % 1_000_000) : "");
  return toWords(Math.floor(n / 1_000_000_000)) + " billion" + (n % 1_000_000_000 ? " " + toWords(n % 1_000_000_000) : "");
}

export default function NumberToWords() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const convert = () => {
    const n = parseInt(input);
    if (isNaN(n)) { setError("Please enter a valid integer"); return; }
    if (Math.abs(n) > 999_999_999_999) { setError("Please enter a number up to 999 billion"); return; }
    setResult(toWords(n));
    setError(null);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <input type="number" value={input} onChange={(e) => { setInput(e.target.value); setResult(""); }}
          onKeyDown={(e) => e.key === "Enter" && convert()}
          placeholder="Enter a number (e.g. 1234567)"
          className="flex-1 rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        <button onClick={convert} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Convert</button>
      </div>
      {error && <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">{error}</div>}
      {result && (
        <div className="rounded-xl border border-border bg-muted p-6">
          <div className="flex items-start justify-between gap-4">
            <p className="text-lg font-semibold text-foreground capitalize leading-relaxed">{result}</p>
            <button onClick={copy} className="shrink-0 rounded-lg border border-border bg-background px-3 py-1 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white">
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
