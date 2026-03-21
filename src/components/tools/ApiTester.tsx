"use client";

import { useState } from "react";

export default function ApiTester() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState('{\n  "Content-Type": "application/json"\n}');
  const [body, setBody] = useState("");
  const [response, setResponse] = useState<{ status: number; statusText: string; headers: Record<string, string>; body: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const parsedHeaders = headers.trim() ? JSON.parse(headers) : {};
      const options: RequestInit = { method, headers: parsedHeaders };
      if (body && method !== "GET" && method !== "HEAD") options.body = body;
      const res = await fetch(url, options);
      const resHeaders: Record<string, string> = {};
      res.headers.forEach((v, k) => { resHeaders[k] = v; });
      const resBody = await res.text();
      setResponse({ status: res.status, statusText: res.statusText, headers: resHeaders, body: resBody });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  const statusColor = response ? (response.status < 300 ? "text-green-600" : response.status < 400 ? "text-yellow-600" : "text-red-600") : "";

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <select value={method} onChange={(e) => setMethod(e.target.value)}
          className="rounded-lg border border-border bg-muted px-3 py-2 text-sm font-semibold text-primary focus:border-primary focus:outline-none">
          {["GET","POST","PUT","DELETE","PATCH"].map((m) => <option key={m}>{m}</option>)}
        </select>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/endpoint"
          className="flex-1 rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        <button onClick={send} disabled={loading || !url}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50">
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Headers (JSON)</label>
          <textarea value={headers} onChange={(e) => setHeaders(e.target.value)} spellCheck={false}
            className="h-28 w-full resize-y rounded-xl border border-border bg-muted p-3 font-mono text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Body</label>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} spellCheck={false}
            placeholder={method === "GET" ? "No body for GET requests" : '{"key":"value"}'}
            className="h-28 w-full resize-y rounded-xl border border-border bg-muted p-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
      </div>
      {error && <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">{error}</div>}
      {response && (
        <div className="space-y-3 rounded-xl border border-border bg-muted p-4">
          <p className="font-semibold">Status: <span className={statusColor}>{response.status} {response.statusText}</span></p>
          <details><summary className="cursor-pointer text-sm text-muted-foreground">Response Headers</summary>
            <pre className="mt-2 text-xs font-mono">{JSON.stringify(response.headers, null, 2)}</pre>
          </details>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Response Body</p>
            <pre className="max-h-64 overflow-auto rounded-lg border border-border bg-background p-3 text-xs font-mono whitespace-pre-wrap">{(() => { try { return JSON.stringify(JSON.parse(response.body), null, 2); } catch { return response.body; } })()}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
