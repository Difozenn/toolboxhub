"use client";

import { useState } from "react";

export default function RedirectChecker() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<{ status: number; redirected: boolean; finalUrl: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const check = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(url, { method: "HEAD", redirect: "follow" });
      setResult({ status: res.status, redirected: res.redirected, finalUrl: res.url });
    } catch (e: unknown) {
      setError(`Could not fetch URL (likely CORS restriction). Try using a server-side tool. Error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300">
        Note: Browser CORS policies prevent checking most redirects client-side. Results may be limited.
      </div>
      <div className="flex gap-2">
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && check()}
          placeholder="https://example.com/old-page"
          className="flex-1 rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        <button onClick={check} disabled={loading || !url}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50">
          {loading ? "Checking..." : "Check"}
        </button>
      </div>
      {error && <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">{error}</div>}
      {result && (
        <div className="rounded-xl border border-border bg-muted p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className={`font-bold text-lg ${result.status < 300 ? "text-green-600" : result.status < 400 ? "text-yellow-600" : "text-red-600"}`}>{result.status}</span>
            <span className="text-muted-foreground text-sm">{result.redirected ? "Redirect detected" : "No redirect"}</span>
          </div>
          {result.redirected && (
            <div className="text-sm">
              <p className="text-muted-foreground">Final URL:</p>
              <p className="font-mono text-foreground break-all">{result.finalUrl}</p>
            </div>
          )}
        </div>
      )}
      <div className="rounded-xl border border-border bg-muted p-3 space-y-1 text-xs text-muted-foreground">
        <p className="font-semibold text-sm text-foreground">External Redirect Checkers:</p>
        {[
          { name: "httpstatus.io", url: "https://httpstatus.io" },
          { name: "redirect-checker.org", url: "https://www.redirect-checker.org" },
        ].map((t) => (
          <a key={t.name} href={t.url} target="_blank" rel="noopener noreferrer" className="block text-primary hover:underline">{t.name}</a>
        ))}
      </div>
    </div>
  );
}
