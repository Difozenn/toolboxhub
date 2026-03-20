"use client";

import { useState, useCallback } from "react";

/* ── Luhn algorithm ─────────────────────────────────────────────── */

function luhnCheck(num: string): boolean {
  const digits = num.replace(/\D/g, "");
  if (digits.length === 0) return false;

  let sum = 0;
  let alternate = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10);
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }
  return sum % 10 === 0;
}

/* ── Card type detection ────────────────────────────────────────── */

interface CardType {
  name: string;
  icon: string;
  lengths: number[];
}

function detectCardType(num: string): CardType | null {
  const digits = num.replace(/\D/g, "");
  if (digits.length < 2) return null;

  // Amex: starts with 34 or 37
  if (/^3[47]/.test(digits))
    return { name: "American Express", icon: "AMEX", lengths: [15] };

  // Visa: starts with 4
  if (/^4/.test(digits))
    return { name: "Visa", icon: "VISA", lengths: [13, 16, 19] };

  // Mastercard: starts with 51-55 or 2221-2720
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits))
    return { name: "Mastercard", icon: "MC", lengths: [16] };

  // Discover: starts with 6011, 622126-622925, 644-649, 65
  if (/^6(?:011|5|4[4-9])/.test(digits))
    return { name: "Discover", icon: "DISC", lengths: [16, 19] };

  return null;
}

/* ── Format card number with spaces ─────────────────────────────── */

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "");
  const groups: string[] = [];
  // Amex: 4-6-5
  if (/^3[47]/.test(digits)) {
    if (digits.length > 0) groups.push(digits.slice(0, 4));
    if (digits.length > 4) groups.push(digits.slice(4, 10));
    if (digits.length > 10) groups.push(digits.slice(10, 15));
  } else {
    // Standard: groups of 4
    for (let i = 0; i < digits.length; i += 4) {
      groups.push(digits.slice(i, i + 4));
    }
  }
  return groups.join(" ");
}

export default function CreditCardValidator() {
  const [rawInput, setRawInput] = useState("");
  const [copied, setCopied] = useState(false);

  const digits = rawInput.replace(/\D/g, "");
  const cardType = detectCardType(digits);
  const isValid = digits.length >= 12 && luhnCheck(digits);
  const hasInput = digits.length > 0;

  const lengthOk =
    cardType && cardType.lengths.includes(digits.length);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/\D/g, "").slice(0, 19);
      setRawInput(raw);
    },
    []
  );

  const copyDigits = useCallback(async () => {
    await navigator.clipboard.writeText(digits);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [digits]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5 space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Card Number
        </label>
        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            value={formatCardNumber(rawInput)}
            onChange={handleChange}
            placeholder="4242 4242 4242 4242"
            maxLength={23}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-20 font-mono text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {cardType && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
              {cardType.icon}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          For validation purposes only. No real card processing occurs.
        </p>
      </div>

      {hasInput && (
        <div className="space-y-4">
          {/* Validation result */}
          <div
            className={`rounded-xl border p-5 ${
              isValid && lengthOk
                ? "border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-950"
                : "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`text-2xl font-bold ${
                  isValid && lengthOk
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {isValid && lengthOk ? "VALID" : "INVALID"}
              </span>
            </div>
            <p
              className={`mt-1 text-sm ${
                isValid && lengthOk
                  ? "text-green-700 dark:text-green-300"
                  : "text-red-700 dark:text-red-300"
              }`}
            >
              {isValid && lengthOk
                ? "This card number passes the Luhn check."
                : !luhnCheck(digits)
                  ? "This card number fails the Luhn check."
                  : "Card number length does not match expected format."}
            </p>
          </div>

          {/* Details */}
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-muted p-4">
              <p className="text-xs font-medium text-muted-foreground">
                Card Type
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {cardType ? cardType.name : "Unknown"}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-muted p-4">
              <p className="text-xs font-medium text-muted-foreground">
                Card Icon
              </p>
              <p className="mt-1 text-lg font-bold text-primary">
                {cardType ? cardType.icon : "--"}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-muted p-4">
              <p className="text-xs font-medium text-muted-foreground">
                Digits
              </p>
              <div className="mt-1 flex items-center gap-2">
                <p className="font-mono text-sm text-foreground">
                  {digits.length}
                  {cardType
                    ? ` / ${cardType.lengths.join(" or ")}`
                    : ""}
                </p>
                <button
                  onClick={copyDigits}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
