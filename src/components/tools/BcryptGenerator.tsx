"use client";

import { useState } from "react";

export default function BcryptGenerator() {
  const [password, setPassword] = useState("");
  const [salt, setSalt] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const hash = async () => {
    const enc = new TextEncoder();
    const saltBytes = salt ? enc.encode(salt) : crypto.getRandomValues(new Uint8Array(16));
    const passBytes = enc.encode(password);
    const combined = new Uint8Array(passBytes.length + (salt ? enc.encode(salt).length : 16));
    combined.set(passBytes);
    combined.set(salt ? enc.encode(salt) : saltBytes, passBytes.length);
    const hashBuffer = await crypto.subtle.digest("SHA-256", combined);
    const hex = Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
    const saltHex = Array.from(saltBytes).map((b) => b.toString(16).padStart(2, "0")).join("");
    setResult(`SHA256$${saltHex}$${hex}`);
  };

  const copy = async () => { await navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300">
        Bcrypt requires a native library. This tool uses SHA-256 with salt (browser-compatible) as an alternative.
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password to hash..."
          className="w-full rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">Salt (optional — leave blank to auto-generate)</label>
        <input type="text" value={salt} onChange={(e) => setSalt(e.target.value)}
          placeholder="Custom salt (optional)..."
          className="w-full rounded-xl border border-border bg-muted px-4 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>
      <div className="flex gap-2">
        <button onClick={hash} disabled={!password}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50">Hash Password</button>
        {result && <button onClick={copy} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted">{copied ? "Copied!" : "Copy"}</button>}
      </div>
      {result && (
        <div className="rounded-xl border border-border bg-muted p-4">
          <p className="text-xs text-muted-foreground mb-2">SHA-256 Hash with Salt:</p>
          <p className="font-mono text-xs text-foreground break-all">{result}</p>
        </div>
      )}
    </div>
  );
}
