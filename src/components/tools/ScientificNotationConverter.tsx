"use client";
import { useState } from "react";
export default function ScientificNotationConverter() {
  const [input, setInput] = useState("");
  const [sigFigs, setSigFigs] = useState(4);
  const [copied, setCopied] = useState("");
  const num = parseFloat(input);
  const valid = input.trim() !== "" && !isNaN(num) && isFinite(num);
  const sci = valid ? num.toExponential(sigFigs - 1) : "";
  const std = valid ? num.toPrecision(Math.min(sigFigs + 5, 21)) : "";
  const parts = sci.split("e");
  const display = valid ? `${parts[0]} × 10^${parts[1].replace("+", "")}` : "";
  const copy = (v: string, k: string) => { navigator.clipboard.writeText(v); setCopied(k); setTimeout(() => setCopied(""), 1200); };
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Number</label>
          <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="e.g. 299792458 or 3.5e-8"
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Significant Figures: {sigFigs}</label>
          <input type="range" min={1} max={10} value={sigFigs} onChange={e => setSigFigs(+e.target.value)} className="w-full mt-2 accent-primary" />
        </div>
      </div>
      {valid && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-muted p-4">
            <p className="text-xs text-muted-foreground mb-1">Scientific Notation</p>
            <p className="text-lg font-bold text-primary font-mono">{display}</p>
            <button onClick={() => copy(sci, "sci")} className="mt-2 text-xs text-primary hover:underline">{copied === "sci" ? "Copied!" : "Copy"}</button>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4">
            <p className="text-xs text-muted-foreground mb-1">Standard Form</p>
            <p className="text-lg font-bold text-foreground font-mono">{std}</p>
            <button onClick={() => copy(std, "std")} className="mt-2 text-xs text-primary hover:underline">{copied === "std" ? "Copied!" : "Copy"}</button>
          </div>
        </div>
      )}
    </div>
  );
}
