"use client";

import { useState, useMemo, useCallback } from "react";

type Base = "2" | "8" | "10" | "16";

const BASE_LABELS: Record<Base, string> = {
  "2": "Binary",
  "8": "Octal",
  "10": "Decimal",
  "16": "Hexadecimal",
};

const BASE_PREFIXES: Record<Base, string> = {
  "2": "0b",
  "8": "0o",
  "10": "",
  "16": "0x",
};

function isValidForBase(value: string, base: Base): boolean {
  if (!value) return true;
  const cleaned = value.trim().toLowerCase();
  if (!cleaned) return true;

  switch (base) {
    case "2":
      return /^[01]+$/.test(cleaned);
    case "8":
      return /^[0-7]+$/.test(cleaned);
    case "10":
      return /^-?[0-9]+$/.test(cleaned);
    case "16":
      return /^[0-9a-f]+$/.test(cleaned);
    default:
      return false;
  }
}

export default function NumberBaseConverter() {
  const [inputValue, setInputValue] = useState("");
  const [inputBase, setInputBase] = useState<Base>("10");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const isValid = useMemo(
    () => isValidForBase(inputValue, inputBase),
    [inputValue, inputBase]
  );

  const decimalValue = useMemo(() => {
    if (!inputValue.trim() || !isValid) return null;
    try {
      const parsed = parseInt(inputValue.trim(), parseInt(inputBase));
      if (isNaN(parsed)) return null;
      return parsed;
    } catch {
      return null;
    }
  }, [inputValue, inputBase, isValid]);

  const conversions = useMemo(() => {
    if (decimalValue === null) {
      return { "2": "", "8": "", "10": "", "16": "" };
    }
    return {
      "2": (decimalValue >>> 0).toString(2),
      "8": (decimalValue >>> 0).toString(8),
      "10": decimalValue.toString(10),
      "16": (decimalValue >>> 0).toString(16).toUpperCase(),
    };
  }, [decimalValue]);

  const copyValue = useCallback(async (base: Base) => {
    const val = conversions[base];
    if (!val) return;
    try {
      await navigator.clipboard.writeText(val);
      setCopiedField(base);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      setCopiedField(null);
    }
  }, [conversions]);

  return (
    <div className="space-y-6">
      {/* Input section */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto]">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Input Value
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Enter a ${BASE_LABELS[inputBase].toLowerCase()} number...`}
            className={`w-full rounded-xl border p-4 font-mono text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 ${
              !isValid && inputValue
                ? "border-red-400 bg-red-500/5 focus:border-red-400 focus:ring-red-400"
                : "border-border bg-muted focus:border-primary focus:ring-primary"
            }`}
          />
          {!isValid && inputValue && (
            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
              Invalid {BASE_LABELS[inputBase].toLowerCase()} number
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Input Base
          </label>
          <select
            value={inputBase}
            onChange={(e) => {
              setInputBase(e.target.value as Base);
              setInputValue("");
            }}
            className="w-full rounded-xl border border-border bg-muted p-4 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:w-48"
          >
            {(Object.keys(BASE_LABELS) as Base[]).map((base) => (
              <option key={base} value={base}>
                {BASE_LABELS[base]} (base {base})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {(Object.keys(BASE_LABELS) as Base[]).map((base) => (
          <div
            key={base}
            className={`rounded-xl border p-4 ${
              base === inputBase
                ? "border-primary/40 bg-primary/5"
                : "border-border bg-muted"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-foreground">
                {BASE_LABELS[base]}{" "}
                <span className="text-muted-foreground">(base {base})</span>
              </label>
              <button
                onClick={() => copyValue(base)}
                disabled={!conversions[base]}
                className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
              >
                {copiedField === base ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="font-mono text-lg text-foreground break-all min-h-[28px]">
              {conversions[base] ? (
                <>
                  <span className="text-muted-foreground">
                    {BASE_PREFIXES[base]}
                  </span>
                  {conversions[base]}
                </>
              ) : (
                <span className="text-muted-foreground text-sm">---</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bit info */}
      {decimalValue !== null && (
        <div className="rounded-xl border border-border bg-muted p-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Bit length:</span>{" "}
            {conversions["2"].length} bits
            {" | "}
            <span className="font-medium text-foreground">Unsigned 32-bit:</span>{" "}
            {(decimalValue >>> 0).toString()}
          </p>
        </div>
      )}
    </div>
  );
}
