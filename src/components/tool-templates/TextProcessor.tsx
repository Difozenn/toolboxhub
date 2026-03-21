"use client";

import { useState, useCallback } from "react";
import CopyButton from "@/components/ui/CopyButton";

interface TextProcessorOption {
  key: string;
  label: string;
  type: "checkbox" | "select" | "number";
  defaultValue?: boolean | string | number;
  options?: { value: string; label: string }[];
}

interface TextProcessorConfig {
  process: (input: string, options: Record<string, unknown>) => string;
  options?: TextProcessorOption[];
  inputLabel?: string;
  outputLabel?: string;
  inputPlaceholder?: string;
  showStats?: boolean;
}

export default function TextProcessor({
  process,
  options = [],
  inputLabel = "Input",
  outputLabel = "Output",
  inputPlaceholder = "Enter text...",
  showStats = false,
}: TextProcessorConfig) {
  const [input, setInput] = useState("");
  const [optionValues, setOptionValues] = useState<Record<string, unknown>>(() => {
    const defaults: Record<string, unknown> = {};
    for (const opt of options) {
      defaults[opt.key] = opt.defaultValue ?? (opt.type === "checkbox" ? false : "");
    }
    return defaults;
  });

  const output = input ? process(input, optionValues) : "";

  const handleOptionChange = useCallback((key: string, value: unknown) => {
    setOptionValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  return (
    <div className="space-y-4">
      {/* Options */}
      {options.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {options.map((opt) => (
            <div key={opt.key} className="flex items-center gap-2">
              {opt.type === "checkbox" ? (
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <input
                    type="checkbox"
                    checked={!!optionValues[opt.key]}
                    onChange={(e) => handleOptionChange(opt.key, e.target.checked)}
                    className="rounded border-border"
                  />
                  {opt.label}
                </label>
              ) : opt.type === "select" && opt.options ? (
                <div>
                  <label className="text-sm text-muted-foreground">{opt.label}</label>
                  <select
                    value={optionValues[opt.key] as string}
                    onChange={(e) => handleOptionChange(opt.key, e.target.value)}
                    className="ml-2 rounded border border-border bg-muted px-2 py-1 text-sm text-foreground"
                  >
                    {opt.options.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="text-sm text-muted-foreground">{opt.label}</label>
                  <input
                    type="number"
                    value={optionValues[opt.key] as number}
                    onChange={(e) => handleOptionChange(opt.key, parseInt(e.target.value))}
                    className="ml-2 w-20 rounded border border-border bg-muted px-2 py-1 text-sm text-foreground"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Input / Output */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">{inputLabel}</label>
            {showStats && input && (
              <span className="text-xs text-muted-foreground">
                {input.length} chars
              </span>
            )}
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={inputPlaceholder}
            rows={10}
            className="w-full resize-y rounded-xl border border-border bg-muted p-4 font-sans text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">{outputLabel}</label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea
            value={output}
            readOnly
            rows={10}
            className="w-full resize-y rounded-xl border border-border bg-muted/50 p-4 font-sans text-foreground focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
