"use client";

import { useState, useMemo, useCallback } from "react";

function base64UrlDecode(str: string): string {
  // Replace URL-safe characters and add padding
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.length % 4;
  if (pad) {
    base64 += "=".repeat(4 - pad);
  }
  try {
    return decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  } catch {
    return atob(base64);
  }
}

function toHex(str: string): string {
  return str
    .split("")
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
    .join("");
}

interface DecodedJwt {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signatureHex: string;
  rawParts: [string, string, string];
}

function decodeJwt(token: string): DecodedJwt | null {
  const parts = token.trim().split(".");
  if (parts.length !== 3) return null;

  try {
    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));

    // Decode signature to hex
    let sigBase64 = parts[2].replace(/-/g, "+").replace(/_/g, "/");
    const pad = sigBase64.length % 4;
    if (pad) sigBase64 += "=".repeat(4 - pad);
    const sigBinary = atob(sigBase64);
    const signatureHex = toHex(sigBinary);

    return {
      header,
      payload,
      signatureHex,
      rawParts: [parts[0], parts[1], parts[2]],
    };
  } catch {
    return null;
  }
}

function getExpirationStatus(
  payload: Record<string, unknown>
): { label: string; color: string } | null {
  if (!("exp" in payload)) return { label: "No expiry set", color: "text-muted-foreground" };

  const exp = payload.exp as number;
  const now = Math.floor(Date.now() / 1000);

  if (exp < now) {
    return { label: `Expired (${new Date(exp * 1000).toLocaleString()})`, color: "text-red-600 dark:text-red-400" };
  }

  return { label: `Valid until ${new Date(exp * 1000).toLocaleString()}`, color: "text-green-600 dark:text-green-400" };
}

export default function JwtDecoder() {
  const [input, setInput] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const decoded = useMemo(() => {
    if (!input.trim()) return null;
    return decodeJwt(input);
  }, [input]);

  const expStatus = useMemo(() => {
    if (!decoded) return null;
    return getExpirationStatus(decoded.payload);
  }, [decoded]);

  const copy = useCallback(async (label: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 1500);
  }, []);

  const isInvalid = input.trim() && !decoded;

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">
          JWT Token
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JWT token here..."
          spellCheck={false}
          className="h-32 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Color-coded parts */}
      {decoded && (
        <div className="rounded-xl border border-border bg-muted p-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            Token Parts
          </p>
          <p className="break-all font-mono text-sm">
            <span className="text-red-500 dark:text-red-400">
              {decoded.rawParts[0]}
            </span>
            <span className="text-muted-foreground">.</span>
            <span className="text-purple-500 dark:text-purple-400">
              {decoded.rawParts[1]}
            </span>
            <span className="text-muted-foreground">.</span>
            <span className="text-blue-500 dark:text-blue-400">
              {decoded.rawParts[2]}
            </span>
          </p>
        </div>
      )}

      {/* Expiration status */}
      {expStatus && (
        <div className="rounded-xl border border-border bg-muted p-4">
          <p className="text-xs font-medium text-muted-foreground mb-1">
            Expiration Status
          </p>
          <p className={`text-sm font-medium ${expStatus.color}`}>
            {expStatus.label}
          </p>
        </div>
      )}

      {/* Decoded sections */}
      {decoded && (
        <div className="grid gap-4 md:grid-cols-2">
          {/* Header */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-red-500 dark:text-red-400">
                Header
              </label>
              <button
                onClick={() =>
                  copy("header", JSON.stringify(decoded.header, null, 2))
                }
                className="rounded-lg border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
              >
                {copiedField === "header" ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="overflow-auto rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground whitespace-pre-wrap">
              {JSON.stringify(decoded.header, null, 2)}
            </pre>
          </div>

          {/* Payload */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-purple-500 dark:text-purple-400">
                Payload
              </label>
              <button
                onClick={() =>
                  copy("payload", JSON.stringify(decoded.payload, null, 2))
                }
                className="rounded-lg border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
              >
                {copiedField === "payload" ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="overflow-auto rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground whitespace-pre-wrap">
              {JSON.stringify(decoded.payload, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Signature */}
      {decoded && (
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-blue-500 dark:text-blue-400">
              Signature (hex)
            </label>
            <button
              onClick={() => copy("signature", decoded.signatureHex)}
              className="rounded-lg border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
            >
              {copiedField === "signature" ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="overflow-auto rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground break-all whitespace-pre-wrap">
            {decoded.signatureHex}
          </pre>
        </div>
      )}

      {/* Error */}
      {isInvalid && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
          Invalid JWT token. Make sure it has three parts separated by dots.
        </div>
      )}
    </div>
  );
}
