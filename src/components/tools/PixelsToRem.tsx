"use client";

import { useState, useMemo, useCallback } from "react";

const COMMON_VALUES = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 80, 96];

export default function PixelsToRem() {
  const [mode, setMode] = useState<"pxToRem" | "remToPx">("pxToRem");
  const [inputValue, setInputValue] = useState("");
  const [baseFontSize, setBaseFontSize] = useState("16");
  const [copied, setCopied] = useState<string | null>(null);

  const base = parseFloat(baseFontSize) || 16;

  const result = useMemo(() => {
    const num = parseFloat(inputValue);
    if (isNaN(num)) return "";
    if (mode === "pxToRem") {
      const rem = num / base;
      return parseFloat(rem.toPrecision(10)).toString();
    } else {
      const px = num * base;
      return parseFloat(px.toPrecision(10)).toString();
    }
  }, [inputValue, base, mode]);

  const copy = useCallback(async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(field);
      setTimeout(() => setCopied(null), 2000);
    } catch {}
  }, []);

  return (
    <div className="space-y-6">
      {/* Mode toggle */}
      <div className="flex rounded-lg border border-border overflow-hidden">
        <button
          onClick={() => { setMode("pxToRem"); setInputValue(""); }}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            mode === "pxToRem" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-primary/10"
          }`}
        >
          PX to REM
        </button>
        <button
          onClick={() => { setMode("remToPx"); setInputValue(""); }}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            mode === "remToPx" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-primary/10"
          }`}
        >
          REM to PX
        </button>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            {mode === "pxToRem" ? "Pixels (px)" : "REM"}
          </label>
          <input
            type="number"
            step="any"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={mode === "pxToRem" ? "16" : "1"}
            className="w-full rounded-lg border border-border bg-muted px-3 py-2.5 text-lg font-mono text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Base Font Size (px)</label>
          <input
            type="number"
            step="any"
            value={baseFontSize}
            onChange={(e) => setBaseFontSize(e.target.value)}
            placeholder="16"
            className="w-full rounded-lg border border-border bg-muted px-3 py-2.5 text-lg font-mono text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            {mode === "pxToRem" ? "REM" : "Pixels (px)"}
          </label>
          <div className="flex gap-2">
            <div className="flex-1 rounded-lg border border-border bg-muted px-3 py-2.5 text-lg font-mono text-foreground min-h-[44px]">
              {result ? (
                <>
                  {result}
                  <span className="text-muted-foreground text-sm ml-1">
                    {mode === "pxToRem" ? "rem" : "px"}
                  </span>
                </>
              ) : (
                <span className="text-muted-foreground">Result</span>
              )}
            </div>
            <button
              onClick={() => result && copy(`${result}${mode === "pxToRem" ? "rem" : "px"}`, "result")}
              disabled={!result}
              className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {copied === "result" ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>

      {/* Formula display */}
      {result && inputValue && (
        <div className="rounded-xl border border-border bg-muted p-4 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-mono font-medium text-foreground">
              {inputValue}{mode === "pxToRem" ? "px" : "rem"}
            </span>
            {" / "}
            <span className="font-mono text-muted-foreground">{base}px</span>
            {" = "}
            <span className="font-mono font-medium text-primary">
              {result}{mode === "pxToRem" ? "rem" : "px"}
            </span>
          </p>
        </div>
      )}

      {/* Quick reference table */}
      <div className="rounded-xl border border-border bg-muted p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-foreground">
            Quick Reference <span className="text-muted-foreground">(base: {base}px)</span>
          </h3>
          <button
            onClick={() => {
              const text = COMMON_VALUES.map((px) => `${px}px = ${(px / base).toFixed(4).replace(/\.?0+$/, "")}rem`).join("\n");
              copy(text, "table");
            }}
            className="rounded-lg border border-border bg-background px-3 py-1 text-xs font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
          >
            {copied === "table" ? "Copied!" : "Copy Table"}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-6">
          {COMMON_VALUES.map((px) => {
            const rem = px / base;
            const remStr = parseFloat(rem.toPrecision(8)).toString();
            return (
              <button
                key={px}
                onClick={() => {
                  setMode("pxToRem");
                  setInputValue(px.toString());
                }}
                className="rounded-lg border border-border bg-background p-2 text-center hover:bg-primary/5 transition-colors"
              >
                <p className="text-sm font-bold text-foreground">{px}px</p>
                <p className="text-xs text-primary font-mono">{remStr}rem</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
