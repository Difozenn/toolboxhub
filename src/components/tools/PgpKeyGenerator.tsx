"use client";

import { useState } from "react";

function arrayBufferToPem(buffer: ArrayBuffer, type: string): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  const b64 = btoa(binary).match(/.{1,64}/g)?.join("\n") ?? "";
  return `-----BEGIN ${type}-----\n${b64}\n-----END ${type}-----`;
}

export default function PgpKeyGenerator() {
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const generate = async () => {
    setGenerating(true);
    setError(null);
    try {
      const keyPair = await crypto.subtle.generateKey(
        { name: "RSA-OAEP", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
        true, ["encrypt", "decrypt"]
      );
      const pubBuffer = await crypto.subtle.exportKey("spki", keyPair.publicKey);
      const privBuffer = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
      setPublicKey(arrayBufferToPem(pubBuffer, "PUBLIC KEY"));
      setPrivateKey(arrayBufferToPem(privBuffer, "PRIVATE KEY"));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setGenerating(false);
    }
  };

  const copy = async (val: string, key: string) => {
    await navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300">
        Generates RSA-2048 key pair using SubtleCrypto. These are SPKI/PKCS8 format keys, not PGP format — for educational use only.
      </div>
      <button onClick={generate} disabled={generating}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50">
        {generating ? "Generating..." : "Generate RSA-2048 Key Pair"}
      </button>
      {error && <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">{error}</div>}
      {publicKey && (
        <>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-muted-foreground">Public Key</label>
              <button onClick={() => copy(publicKey, "pub")} className="text-xs text-muted-foreground hover:text-primary">{copiedKey === "pub" ? "Copied!" : "Copy"}</button>
            </div>
            <textarea readOnly value={publicKey} className="h-32 w-full resize-none rounded-xl border border-border bg-muted p-3 font-mono text-xs text-foreground focus:outline-none" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-muted-foreground">Private Key (keep secret!)</label>
              <button onClick={() => copy(privateKey, "priv")} className="text-xs text-muted-foreground hover:text-primary">{copiedKey === "priv" ? "Copied!" : "Copy"}</button>
            </div>
            <textarea readOnly value={privateKey} className="h-40 w-full resize-none rounded-xl border border-border bg-muted p-3 font-mono text-xs text-foreground focus:outline-none" />
          </div>
        </>
      )}
    </div>
  );
}
