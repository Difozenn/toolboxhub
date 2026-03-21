"use client";

import { useState } from "react";

export default function SslChecker() {
  const [url, setUrl] = useState("");
  const [parsed, setParsed] = useState<{ hostname: string; isHttps: boolean } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const check = () => {
    try {
      const input = url.startsWith("http") ? url : "https://" + url;
      const u = new URL(input);
      setParsed({ hostname: u.hostname, isHttps: u.protocol === "https:" });
      setError(null);
    } catch {
      setError("Invalid URL");
      setParsed(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300">
        SSL certificate details cannot be checked client-side. This tool validates URL format and links to external SSL checkers.
      </div>
      <div className="flex gap-2">
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && check()}
          placeholder="example.com or https://example.com"
          className="flex-1 rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        <button onClick={check} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Check</button>
      </div>
      {error && <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">{error}</div>}
      {parsed && (
        <div className={`rounded-xl border p-4 ${parsed.isHttps ? "border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-950" : "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950"}`}>
          <p className="font-semibold text-foreground">{parsed.hostname}</p>
          <p className={`text-sm mt-1 ${parsed.isHttps ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>
            {parsed.isHttps ? "Uses HTTPS protocol" : "Uses HTTP — not secure"}
          </p>
        </div>
      )}
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">External SSL Tools:</p>
        {[
          { name: "SSL Labs (Qualys)", url: "https://www.ssllabs.com/ssltest/", desc: "Industry standard SSL/TLS analysis" },
          { name: "SSL Shopper", url: "https://www.sslshopper.com/ssl-checker.html", desc: "Check certificate chain and expiry" },
          { name: "DigiCert SSL Checker", url: "https://www.digicert.com/help/", desc: "Fast certificate installation checker" },
        ].map((t) => (
          <a key={t.name} href={parsed ? `${t.url}${parsed ? "?d=" + parsed.hostname : ""}` : t.url} target="_blank" rel="noopener noreferrer"
            className="flex items-start gap-3 rounded-xl border border-border bg-muted p-3 hover:border-primary transition-colors">
            <div className="flex-1"><p className="text-sm font-semibold text-primary">{t.name}</p><p className="text-xs text-muted-foreground">{t.desc}</p></div>
          </a>
        ))}
      </div>
    </div>
  );
}
