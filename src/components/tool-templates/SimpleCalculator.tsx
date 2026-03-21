"use client";

import { useState, useCallback } from "react";
import CopyButton from "@/components/ui/CopyButton";

interface CalculatorInput {
  key: string;
  label: string;
  type?: "number" | "text" | "select";
  placeholder?: string;
  defaultValue?: string | number;
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string; label: string }[];
  suffix?: string;
}

interface CalculatorOutput {
  key: string;
  label: string;
  format?: (value: number) => string;
}

interface SimpleCalculatorConfig {
  inputs: CalculatorInput[];
  outputs: CalculatorOutput[];
  calculate: (values: Record<string, number | string>) => Record<string, number>;
}

export default function SimpleCalculator({
  inputs,
  outputs,
  calculate,
}: SimpleCalculatorConfig) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {};
    for (const input of inputs) {
      defaults[input.key] = input.defaultValue?.toString() ?? "";
    }
    return defaults;
  });
  const [results, setResults] = useState<Record<string, number> | null>(null);
  const [error, setError] = useState("");

  const handleCalculate = useCallback(() => {
    setError("");
    try {
      const numericValues: Record<string, number | string> = {};
      for (const input of inputs) {
        if (input.type === "select") {
          numericValues[input.key] = values[input.key] || "";
        } else {
          const num = parseFloat(values[input.key]);
          if (isNaN(num)) {
            setError(`Please enter a valid value for ${input.label}`);
            return;
          }
          numericValues[input.key] = num;
        }
      }
      const result = calculate(numericValues);
      setResults(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation error");
    }
  }, [values, inputs, calculate]);

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="grid gap-4 sm:grid-cols-2">
        {inputs.map((input) => (
          <div key={input.key}>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {input.label}
            </label>
            {input.type === "select" && input.options ? (
              <select
                value={values[input.key]}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, [input.key]: e.target.value }))
                }
                className="w-full rounded-lg border border-border bg-muted px-3 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {input.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <div className="relative">
                <input
                  type={input.type || "number"}
                  value={values[input.key]}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, [input.key]: e.target.value }))
                  }
                  placeholder={input.placeholder}
                  min={input.min}
                  max={input.max}
                  step={input.step}
                  className="w-full rounded-lg border border-border bg-muted px-3 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {input.suffix && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    {input.suffix}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Calculate button */}
      <button
        type="button"
        onClick={handleCalculate}
        className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Calculate
      </button>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {outputs.map((output) => {
            const value = results[output.key];
            if (value === undefined) return null;
            const formatted = output.format ? output.format(value) : value.toLocaleString();
            return (
              <div
                key={output.key}
                className="flex items-center justify-between rounded-xl border border-border bg-muted p-4"
              >
                <div>
                  <p className="text-2xl font-bold text-foreground">{formatted}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{output.label}</p>
                </div>
                <CopyButton text={formatted} label="" className="ml-2" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
