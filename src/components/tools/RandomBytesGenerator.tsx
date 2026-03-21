"use client";

import { useState } from "react";

export default function RandomBytesGenerator() {
  const [length, setLength] = useState(32);
  const [hex, setHex] = useState("");
  const [b64, setB64] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const generate = () => {
    const bytes = crypto.getRandomValues(new Uint8Array(length));
    const hexStr = Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
    const b64Str = btoa(String.fromCharCode(...bytes));
    setHex(hexStr);
    setB64(b64Str);
  };

  const copy = async (val: string, key: string) => {
    await navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="space-y-1 flex-1">
          <label className="text-sm font-medium text-muted-foreground">Byte Length (1–256)</label>
          <input type="number" min={1} max={256} value={length} onChange={(e) => setLength(Math.max(1, Math.min(256, Number(e.target.value))))}
            className="w-full rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <button onClick={generate} className="mt-5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Generate</button>
      </div>
      {hex && (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-muted-foreground">Hexadecimal ({hex.length} chars)</label>
              <button onClick={() => copy(hex, "hex")} className="text-xs text-muted-foreground hover:text-primary">{copiedKey === "hex" ? "Copied!" : "Copy"}</button>
            </div>
            <textarea readOnly value={hex} className="h-20 w-full resize-none rounded-xl border border-border bg-muted p-3 font-mono text-xs text-foreground focus:outline-none" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-muted-foreground">Base64 ({b64.length} chars)</label>
              <button onClick={() => copy(b64, "b64")} className="text-xs text-muted-foreground hover:text-primary">{copiedKey === "b64" ? "Copied!" : "Copy"}</button>
            </div>
            <textarea readOnly value={b64} className="h-20 w-full resize-none rounded-xl border border-border bg-muted p-3 font-mono text-xs text-foreground focus:outline-none" />
          </div>
          <p className="text-xs text-muted-foreground">Generated using <code>crypto.getRandomValues()</code> — cryptographically secure.</p>
        </div>
      )}
    </div>
  );
}
