"use client";

import { useState } from "react";
import ErrorAlert from "@/components/ui/ErrorAlert";

const TLDS = [".com", ".net", ".org", ".io", ".co", ".app", ".dev", ".ai", ".me", ".info"];

interface CheckResult {
  domain: string;
  tld: string;
  status: "registered" | "available" | "unknown";
}

const STATUS_STYLES = {
  available: { icon: "\u2713", bg: "border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-950", text: "text-green-700 dark:text-green-400", label: "Likely Available" },
  registered: { icon: "\u2717", bg: "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950", text: "text-red-700 dark:text-red-400", label: "Registered" },
  unknown: { icon: "?", bg: "border-border bg-muted", text: "text-muted-foreground", label: "Unknown" },
};

export default function DomainAvailability() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<CheckResult[]>([]);
  const [base, setBase] = useState("");

  const check = async () => {
    const cleaned = input.toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/^-+|-+$/g, "").slice(0, 63);
    if (!cleaned) return;
    setBase(cleaned);
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const res = await fetch("/api/domain-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: cleaned, tlds: TLDS }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Check failed");
      setResults(json.data.results);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const alternatives = base
    ? [`${base}hq`, `get${base}`, `the${base}`, `${base}app`, `${base}pro`, `my${base}`]
    : [];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && input && check()}
          placeholder="Enter domain name (e.g. mystartup)"
          className="flex-1 rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button
          onClick={check}
          disabled={!input || loading}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Checking..." : "Check Availability"}
        </button>
      </div>

      {error && <ErrorAlert message={error} />}

      {results.length > 0 && (
        <>
          <div className="grid gap-2 sm:grid-cols-2">
            {results.map((r) => {
              const s = STATUS_STYLES[r.status];
              return (
                <div key={r.domain} className={`flex items-center justify-between rounded-xl border px-4 py-3 ${s.bg}`}>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${s.text}`}>{s.icon}</span>
                    <span className="font-mono text-sm text-foreground">{r.domain}</span>
                  </div>
                  <span className={`text-xs font-medium ${s.text}`}>{s.label}</span>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-muted-foreground">
            Results are approximate. Verify availability at a domain registrar before purchasing.
          </p>
        </>
      )}

      {base && alternatives.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Alternative name suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {alternatives.map((alt) => (
              <span key={alt} className="rounded-full border border-border bg-muted px-3 py-1 text-sm font-mono text-foreground">
                {alt}.com
              </span>
            ))}
          </div>
        </div>
      )}

      {!loading && results.length === 0 && !error && (
        <div className="rounded-xl border border-border bg-muted p-12 text-center">
          <p className="text-muted-foreground">Enter a domain name to check availability across popular TLDs.</p>
        </div>
      )}
    </div>
  );
}
