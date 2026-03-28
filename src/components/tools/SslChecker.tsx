"use client";

import { useState } from "react";
import ErrorAlert from "@/components/ui/ErrorAlert";
import ToolSection from "@/components/ui/ToolSection";
import ResultGrid from "@/components/ui/ResultGrid";

interface SslResult {
  hostname: string;
  valid: boolean;
  subject: { CN?: string; O?: string };
  issuer: { CN?: string; O?: string };
  validFrom: string;
  validTo: string;
  daysUntilExpiry: number;
  serialNumber: string;
  fingerprint256: string;
  sans: string[];
  protocol: string;
  cipher: { name: string; version: string };
}

export default function SslChecker() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SslResult | null>(null);

  const check = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/ssl-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hostname: input }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "SSL check failed");
      setResult(json.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const expiryColor = (days: number) => {
    if (days < 0) return "text-red-600 dark:text-red-400";
    if (days < 7) return "text-red-600 dark:text-red-400";
    if (days < 30) return "text-yellow-600 dark:text-yellow-400";
    return "text-green-600 dark:text-green-400";
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && input && check()}
          placeholder="example.com"
          className="flex-1 rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button
          onClick={check}
          disabled={!input || loading}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Checking..." : "Check SSL"}
        </button>
      </div>

      {error && <ErrorAlert message={error} />}

      {result && (
        <div className="space-y-4">
          {/* Status Banner */}
          <div
            className={`rounded-xl border p-4 ${
              result.valid
                ? "border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-950"
                : "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white ${
                  result.valid ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {result.valid ? "\u2713" : "\u2717"}
              </span>
              <div>
                <p className="font-semibold text-foreground">{result.hostname}</p>
                <p className={`text-sm ${result.valid ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>
                  {result.valid ? "Valid SSL Certificate" : "Invalid SSL Certificate"}
                </p>
              </div>
            </div>
          </div>

          {/* Key Stats */}
          <ResultGrid
            stats={[
              { label: "Days Until Expiry", value: result.daysUntilExpiry },
              { label: "Protocol", value: result.protocol },
              { label: "Cipher", value: result.cipher.name },
            ]}
          />

          {/* Certificate Details */}
          <ToolSection title="Certificate Details">
            <div className="space-y-1.5">
              {[
                { label: "Common Name", value: result.subject.CN || "N/A" },
                { label: "Organization", value: result.subject.O || "N/A" },
                { label: "Issuer", value: [result.issuer.O, result.issuer.CN].filter(Boolean).join(" — ") || "N/A" },
                { label: "Valid From", value: result.validFrom },
                { label: "Valid To", value: result.validTo },
                {
                  label: "Expiry",
                  value: result.daysUntilExpiry < 0
                    ? `Expired ${Math.abs(result.daysUntilExpiry)} days ago`
                    : `${result.daysUntilExpiry} days remaining`,
                  className: expiryColor(result.daysUntilExpiry),
                },
                { label: "Serial Number", value: result.serialNumber },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-lg bg-background p-2.5">
                  <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
                  <span className={`text-xs font-mono text-foreground ${"className" in item ? item.className : ""}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </ToolSection>

          {/* SANs */}
          {result.sans.length > 0 && (
            <ToolSection title={`Subject Alternative Names (${result.sans.length})`}>
              <div className="flex flex-wrap gap-1.5">
                {result.sans.map((san) => (
                  <span key={san} className="rounded-full border border-border bg-background px-3 py-1 text-xs font-mono text-foreground">
                    {san}
                  </span>
                ))}
              </div>
            </ToolSection>
          )}

          {/* Fingerprint */}
          <ToolSection title="Fingerprint (SHA-256)">
            <p className="break-all text-xs font-mono text-muted-foreground">{result.fingerprint256}</p>
          </ToolSection>
        </div>
      )}

      {!loading && !result && !error && (
        <div className="rounded-xl border border-border bg-muted p-12 text-center">
          <p className="text-muted-foreground">Enter a hostname to check its SSL certificate.</p>
        </div>
      )}
    </div>
  );
}
