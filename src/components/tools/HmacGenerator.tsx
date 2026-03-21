"use client";

import { useState } from "react";

export default function HmacGenerator() {
  const [message, setMessage] = useState("");
  const [secret, setSecret] = useState("");
  const [hmac, setHmac] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    try {
      const enc = new TextEncoder();
      const keyData = enc.encode(secret);
      const msgData = enc.encode(message);
      const key = await crypto.subtle.importKey("raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
      const sig = await crypto.subtle.sign("HMAC", key, msgData);
      const hex = Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
      setHmac(hex);
      setError(null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  const copy = async () => { await navigator.clipboard.writeText(hmac); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">Message</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4}
          placeholder="Enter message to sign..."
          className="w-full resize-none rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">Secret Key</label>
        <input type="password" value={secret} onChange={(e) => setSecret(e.target.value)}
          placeholder="Enter secret key..."
          className="w-full rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Algorithm:</span>
        <span className="rounded border border-border bg-muted px-2 py-0.5 text-xs font-mono">HMAC-SHA256</span>
      </div>
      <div className="flex gap-2">
        <button onClick={generate} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Generate HMAC</button>
        {hmac && <button onClick={copy} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted">{copied ? "Copied!" : "Copy"}</button>}
      </div>
      {error && <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">{error}</div>}
      {hmac && (
        <div className="rounded-xl border border-border bg-muted p-4">
          <p className="text-xs text-muted-foreground mb-2">HMAC-SHA256 (hex):</p>
          <p className="font-mono text-sm text-foreground break-all">{hmac}</p>
        </div>
      )}
    </div>
  );
}
