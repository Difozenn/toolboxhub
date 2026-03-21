"use client";

import { useState } from "react";

export default function UrlParser() {
  const [input, setInput] = useState("");
  const [parsed, setParsed] = useState<URL | null>(null);
  const [error, setError] = useState<string | null>(null);

  const parse = () => {
    try {
      const url = new URL(input);
      setParsed(url);
      setError(null);
    } catch {
      setError("Invalid URL. Make sure to include the protocol (e.g. https://)");
      setParsed(null);
    }
  };

  const params: [string, string][] = parsed ? Array.from(parsed.searchParams.entries()) : [];

  const Row = ({ label, value }: { label: string; value: string }) => (
    <tr className="border-b border-border">
      <td className="py-2 pr-4 text-sm font-medium text-muted-foreground w-36">{label}</td>
      <td className="py-2 font-mono text-sm text-foreground break-all">{value || <span className="text-muted-foreground italic">empty</span>}</td>
    </tr>
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && parse()}
          placeholder="https://example.com/path?query=value#hash"
          className="flex-1 rounded-xl border border-border bg-muted px-4 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button
          onClick={parse}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
        >
          Parse
        </button>
      </div>
      {error && <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">{error}</div>}
      {parsed && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-muted p-4 overflow-auto">
            <table className="w-full">
              <tbody>
                <Row label="Protocol" value={parsed.protocol} />
                <Row label="Hostname" value={parsed.hostname} />
                <Row label="Port" value={parsed.port} />
                <Row label="Pathname" value={parsed.pathname} />
                <Row label="Hash" value={parsed.hash} />
              </tbody>
            </table>
          </div>
          {params.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-medium text-muted-foreground">Query Parameters</p>
              <div className="rounded-xl border border-border bg-muted overflow-auto">
                <table className="w-full">
                  <thead><tr className="border-b border-border"><th className="py-2 px-4 text-left text-xs text-muted-foreground">Key</th><th className="py-2 px-4 text-left text-xs text-muted-foreground">Value</th></tr></thead>
                  <tbody>{params.map(([k, v], i) => <tr key={i} className="border-b border-border"><td className="py-2 px-4 font-mono text-sm">{k}</td><td className="py-2 px-4 font-mono text-sm">{v}</td></tr>)}</tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
