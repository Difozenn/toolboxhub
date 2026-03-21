"use client";
import { useState } from "react";
export default function CorsTester() {
  const [url, setUrl] = useState("");
  const [origin, setOrigin] = useState("https://example.com");
  const [method, setMethod] = useState("GET");
  const [result, setResult] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const test = async () => {
    if (!url) return;
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch(url, { method, headers: { "Origin": origin } });
      const headers: Record<string, string> = {};
      res.headers.forEach((v, k) => { if (k.toLowerCase().startsWith("access-control")) headers[k] = v; });
      if (Object.keys(headers).length === 0) headers["Note"] = "No CORS headers found in response";
      setResult({ Status: `${res.status} ${res.statusText}`, ...headers });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Request failed";
      setError(`CORS blocked or request failed: ${msg}`);
    }
    setLoading(false);
  };
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-3"><p className="text-xs text-blue-600 dark:text-blue-400">CORS must allow requests from this tool's origin. Blocked requests indicate a CORS policy issue.</p></div>
      <div><label className="mb-1.5 block text-sm font-medium text-foreground">Target URL</label><input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://api.example.com/endpoint" className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Origin Header</label><input value={origin} onChange={e => setOrigin(e.target.value)} className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Method</label><select value={method} onChange={e => setMethod(e.target.value)} className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-foreground focus:border-primary focus:outline-none"><option>GET</option><option>POST</option><option>PUT</option><option>DELETE</option><option>OPTIONS</option></select></div>
      </div>
      <button onClick={test} disabled={loading || !url} className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">{loading ? "Testing..." : "Test CORS"}</button>
      {error && <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">{error}</div>}
      {result && (
        <div className="divide-y divide-border rounded-lg border border-border">
          {Object.entries(result).map(([k, v]) => <div key={k} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:gap-4"><span className="min-w-[200px] font-mono text-xs font-medium text-muted-foreground">{k}</span><span className="font-mono text-xs text-foreground break-all">{v}</span></div>)}
        </div>
      )}
    </div>
  );
}
