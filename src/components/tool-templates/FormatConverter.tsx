"use client";

import { useState, useCallback } from "react";
import CopyButton from "@/components/ui/CopyButton";

interface FormatConverterConfig {
  fromFormat: string;
  toFormat: string;
  convert: (input: string) => string;
  inputPlaceholder?: string;
  outputPlaceholder?: string;
}

export default function FormatConverter({
  fromFormat,
  toFormat,
  convert,
  inputPlaceholder,
  outputPlaceholder,
}: FormatConverterConfig) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleConvert = useCallback(() => {
    setError("");
    try {
      const result = convert(input);
      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion error");
      setOutput("");
    }
  }, [input, convert]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Input */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            {fromFormat}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={inputPlaceholder ?? `Paste ${fromFormat} here...`}
            rows={12}
            className="w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Output */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">{toFormat}</label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={outputPlaceholder ?? `${toFormat} output will appear here...`}
            rows={12}
            className="w-full resize-y rounded-xl border border-border bg-muted/50 p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </div>

      {/* Convert button */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleConvert}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Convert {fromFormat} to {toFormat}
        </button>
        {error && (
          <span className="text-sm text-red-500">{error}</span>
        )}
      </div>
    </div>
  );
}
