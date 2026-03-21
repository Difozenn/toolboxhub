"use client";

import { useState, useCallback } from "react";
import CopyButton from "@/components/ui/CopyButton";

interface CommonValue {
  input: number;
  label?: string;
}

interface SimpleConverterConfig {
  fromUnit: string;
  toUnit: string;
  convert: (value: number) => number;
  reverseConvert: (value: number) => number;
  precision?: number;
  commonValues?: CommonValue[];
}

export default function SimpleConverter({
  fromUnit,
  toUnit,
  convert,
  reverseConvert,
  precision = 6,
  commonValues,
}: SimpleConverterConfig) {
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [direction, setDirection] = useState<"forward" | "reverse">("forward");

  const handleFromChange = useCallback(
    (val: string) => {
      setFromValue(val);
      setDirection("forward");
      const num = parseFloat(val);
      if (!isNaN(num)) {
        setToValue(parseFloat(convert(num).toFixed(precision)).toString());
      } else {
        setToValue("");
      }
    },
    [convert, precision],
  );

  const handleToChange = useCallback(
    (val: string) => {
      setToValue(val);
      setDirection("reverse");
      const num = parseFloat(val);
      if (!isNaN(num)) {
        setFromValue(parseFloat(reverseConvert(num).toFixed(precision)).toString());
      } else {
        setFromValue("");
      }
    },
    [reverseConvert, precision],
  );

  const result = direction === "forward" ? toValue : fromValue;
  const resultUnit = direction === "forward" ? toUnit : fromUnit;

  return (
    <div className="space-y-6">
      {/* Converter inputs */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            {fromUnit}
          </label>
          <input
            type="number"
            value={fromValue}
            onChange={(e) => handleFromChange(e.target.value)}
            placeholder={`Enter ${fromUnit.toLowerCase()}`}
            className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Swap arrow */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            {toUnit}
          </label>
          <input
            type="number"
            value={toValue}
            onChange={(e) => handleToChange(e.target.value)}
            placeholder={`Enter ${toUnit.toLowerCase()}`}
            className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Formula display */}
      {fromValue && toValue && (
        <div className="flex items-center justify-between rounded-xl border border-border bg-muted p-4">
          <p className="text-foreground">
            <span className="font-semibold">{direction === "forward" ? fromValue : toValue}</span>{" "}
            {direction === "forward" ? fromUnit : toUnit} ={" "}
            <span className="font-semibold text-primary">{result}</span> {resultUnit}
          </p>
          <CopyButton text={result} />
        </div>
      )}

      {/* Common values table */}
      {commonValues && commonValues.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold text-foreground">Common Conversions</h3>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="px-4 py-2 text-left font-medium text-foreground">{fromUnit}</th>
                  <th className="px-4 py-2 text-left font-medium text-foreground">{toUnit}</th>
                </tr>
              </thead>
              <tbody>
                {commonValues.map((cv) => (
                  <tr key={cv.input} className="border-b border-border last:border-0">
                    <td className="px-4 py-2 text-foreground">
                      {cv.label ?? cv.input}
                    </td>
                    <td className="px-4 py-2 text-foreground">
                      {parseFloat(convert(cv.input).toFixed(precision))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
