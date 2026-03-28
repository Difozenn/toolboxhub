"use client";

import { useState } from "react";
import ErrorAlert from "@/components/ui/ErrorAlert";
import ResultGrid from "@/components/ui/ResultGrid";

interface Hop {
  url: string;
  statusCode: number;
  statusText: string;
  server?: string;
  location?: string;
}

interface RedirectResult {
  chain: Hop[];
  totalHops: number;
  finalUrl: string;
  hasLoop: boolean;
  totalTimeMs: number;
  error?: string;
}

function statusColor(code: number) {
  if (code >= 200 && code < 300) return "bg-green-500";
  if (code >= 300 && code < 400) return "bg-yellow-500";
  return "bg-red-500";
}

export default function RedirectChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RedirectResult | null>(null);

  const check = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/redirect-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Check failed");
      setResult(json.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && url && check()}
          placeholder="https://example.com/old-page"
          className="flex-1 rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button
          onClick={check}
          disabled={loading || !url}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Checking..." : "Check Redirects"}
        </button>
      </div>

      {error && <ErrorAlert message={error} />}

      {result && (
        <div className="space-y-4">
          {result.hasLoop && (
            <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
              Redirect loop detected! The URL redirects back to a previously visited URL.
            </div>
          )}

          {result.error && (
            <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300">
              Partial result: {result.error}
            </div>
          )}

          <ResultGrid
            stats={[
              { label: "Total Hops", value: result.totalHops },
              { label: "Time", value: `${result.totalTimeMs}ms` },
              { label: "Status", value: result.hasLoop ? "Loop" : result.totalHops === 0 ? "No Redirect" : "Redirect" },
            ]}
          />

          {/* Redirect Chain */}
          <div className="space-y-0">
            {result.chain.map((hop, i) => (
              <div key={i}>
                <div className="rounded-xl border border-border bg-muted p-3">
                  <div className="flex items-start gap-3">
                    <span className={`mt-0.5 inline-flex h-6 min-w-[2.5rem] items-center justify-center rounded-md px-1.5 text-xs font-bold text-white ${statusColor(hop.statusCode)}`}>
                      {hop.statusCode}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="break-all text-sm font-mono text-foreground">{hop.url}</p>
                      <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span>{hop.statusText}</span>
                        {hop.server && <span>Server: {hop.server}</span>}
                      </div>
                    </div>
                  </div>
                </div>
                {i < result.chain.length - 1 && (
                  <div className="flex items-center justify-center py-1">
                    <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && !result && !error && (
        <div className="rounded-xl border border-border bg-muted p-12 text-center">
          <p className="text-muted-foreground">Enter a URL to trace its redirect chain.</p>
        </div>
      )}
    </div>
  );
}
