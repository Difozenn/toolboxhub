"use client";

import { useState, useCallback } from "react";

interface HtaccessConfig {
  forceHttps: boolean;
  wwwMode: "none" | "force-www" | "force-non-www";
  errorPages: {
    enabled: boolean;
    e400: string;
    e403: string;
    e404: string;
    e500: string;
  };
  blockIps: { enabled: boolean; ips: string };
  gzip: boolean;
  caching: boolean;
  securityHeaders: {
    enabled: boolean;
    xFrameOptions: boolean;
    xContentType: boolean;
    xssProtection: boolean;
  };
  blockDirectoryListing: boolean;
}

function generateHtaccess(config: HtaccessConfig): string {
  const lines: string[] = [];

  if (config.forceHttps) {
    lines.push("# Force HTTPS");
    lines.push("RewriteEngine On");
    lines.push("RewriteCond %{HTTPS} off");
    lines.push("RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]");
    lines.push("");
  }

  if (config.wwwMode === "force-www") {
    lines.push("# Force WWW");
    lines.push("RewriteEngine On");
    lines.push("RewriteCond %{HTTP_HOST} !^www\\. [NC]");
    lines.push("RewriteRule ^(.*)$ https://www.%{HTTP_HOST}%{REQUEST_URI} [L,R=301]");
    lines.push("");
  } else if (config.wwwMode === "force-non-www") {
    lines.push("# Force non-WWW");
    lines.push("RewriteEngine On");
    lines.push("RewriteCond %{HTTP_HOST} ^www\\.(.*)$ [NC]");
    lines.push("RewriteRule ^(.*)$ https://%1%{REQUEST_URI} [L,R=301]");
    lines.push("");
  }

  if (config.errorPages.enabled) {
    lines.push("# Custom Error Pages");
    if (config.errorPages.e400) lines.push(`ErrorDocument 400 ${config.errorPages.e400}`);
    if (config.errorPages.e403) lines.push(`ErrorDocument 403 ${config.errorPages.e403}`);
    if (config.errorPages.e404) lines.push(`ErrorDocument 404 ${config.errorPages.e404}`);
    if (config.errorPages.e500) lines.push(`ErrorDocument 500 ${config.errorPages.e500}`);
    lines.push("");
  }

  if (config.blockIps.enabled && config.blockIps.ips.trim()) {
    lines.push("# Block IPs");
    lines.push("order allow,deny");
    lines.push("allow from all");
    config.blockIps.ips
      .split("\n")
      .map((ip) => ip.trim())
      .filter(Boolean)
      .forEach((ip) => lines.push(`deny from ${ip}`));
    lines.push("");
  }

  if (config.gzip) {
    lines.push("# GZIP Compression");
    lines.push("<IfModule mod_deflate.c>");
    lines.push("  AddOutputFilterByType DEFLATE text/html");
    lines.push("  AddOutputFilterByType DEFLATE text/css");
    lines.push("  AddOutputFilterByType DEFLATE text/javascript");
    lines.push("  AddOutputFilterByType DEFLATE application/javascript");
    lines.push("  AddOutputFilterByType DEFLATE application/json");
    lines.push("  AddOutputFilterByType DEFLATE application/xml");
    lines.push("  AddOutputFilterByType DEFLATE image/svg+xml");
    lines.push("</IfModule>");
    lines.push("");
  }

  if (config.caching) {
    lines.push("# Browser Caching");
    lines.push("<IfModule mod_expires.c>");
    lines.push("  ExpiresActive On");
    lines.push("  ExpiresByType image/jpeg \"access plus 1 year\"");
    lines.push("  ExpiresByType image/png \"access plus 1 year\"");
    lines.push("  ExpiresByType image/gif \"access plus 1 year\"");
    lines.push("  ExpiresByType image/svg+xml \"access plus 1 year\"");
    lines.push("  ExpiresByType image/webp \"access plus 1 year\"");
    lines.push("  ExpiresByType text/css \"access plus 1 month\"");
    lines.push("  ExpiresByType application/javascript \"access plus 1 month\"");
    lines.push("  ExpiresByType text/html \"access plus 0 seconds\"");
    lines.push("  ExpiresByType application/json \"access plus 0 seconds\"");
    lines.push("</IfModule>");
    lines.push("");
  }

  if (config.securityHeaders.enabled) {
    lines.push("# Security Headers");
    lines.push("<IfModule mod_headers.c>");
    if (config.securityHeaders.xFrameOptions)
      lines.push('  Header always set X-Frame-Options "SAMEORIGIN"');
    if (config.securityHeaders.xContentType)
      lines.push('  Header always set X-Content-Type-Options "nosniff"');
    if (config.securityHeaders.xssProtection)
      lines.push('  Header always set X-XSS-Protection "1; mode=block"');
    lines.push("</IfModule>");
    lines.push("");
  }

  if (config.blockDirectoryListing) {
    lines.push("# Block Directory Listing");
    lines.push("Options -Indexes");
    lines.push("");
  }

  return lines.join("\n").trimEnd();
}

export default function HtaccessGenerator() {
  const [config, setConfig] = useState<HtaccessConfig>({
    forceHttps: true,
    wwwMode: "none",
    errorPages: {
      enabled: false,
      e400: "/errors/400.html",
      e403: "/errors/403.html",
      e404: "/errors/404.html",
      e500: "/errors/500.html",
    },
    blockIps: { enabled: false, ips: "" },
    gzip: true,
    caching: true,
    securityHeaders: {
      enabled: true,
      xFrameOptions: true,
      xContentType: true,
      xssProtection: true,
    },
    blockDirectoryListing: true,
  });
  const [copied, setCopied] = useState(false);

  const output = generateHtaccess(config);

  const copyOutput = useCallback(async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [output]);

  const toggle = (key: keyof HtaccessConfig) => {
    setConfig((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* Configuration */}
      <div className="rounded-xl border border-border bg-muted p-5 space-y-5">
        {/* Force HTTPS */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={config.forceHttps}
            onChange={() => toggle("forceHttps")}
            className="h-4 w-4 rounded border-border accent-primary"
          />
          <span className="text-sm font-medium text-foreground">
            Force HTTPS Redirect
          </span>
        </label>

        {/* WWW mode */}
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">
            WWW Preference
          </p>
          <div className="flex flex-wrap gap-3">
            {(["none", "force-www", "force-non-www"] as const).map((m) => (
              <label key={m} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="wwwMode"
                  checked={config.wwwMode === m}
                  onChange={() =>
                    setConfig((prev) => ({ ...prev, wwwMode: m }))
                  }
                  className="accent-primary"
                />
                <span className="text-sm text-foreground">
                  {m === "none"
                    ? "No preference"
                    : m === "force-www"
                      ? "Force WWW"
                      : "Force non-WWW"}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Custom Error Pages */}
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={config.errorPages.enabled}
              onChange={() =>
                setConfig((prev) => ({
                  ...prev,
                  errorPages: { ...prev.errorPages, enabled: !prev.errorPages.enabled },
                }))
              }
              className="h-4 w-4 rounded border-border accent-primary"
            />
            <span className="text-sm font-medium text-foreground">
              Custom Error Pages
            </span>
          </label>
          {config.errorPages.enabled && (
            <div className="grid gap-3 pl-7 sm:grid-cols-2">
              {(["400", "403", "404", "500"] as const).map((code) => (
                <div key={code}>
                  <label className="mb-1 block text-xs text-muted-foreground">
                    Error {code}
                  </label>
                  <input
                    type="text"
                    value={
                      config.errorPages[`e${code}` as keyof typeof config.errorPages] as string
                    }
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        errorPages: {
                          ...prev.errorPages,
                          [`e${code}`]: e.target.value,
                        },
                      }))
                    }
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Block IPs */}
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={config.blockIps.enabled}
              onChange={() =>
                setConfig((prev) => ({
                  ...prev,
                  blockIps: { ...prev.blockIps, enabled: !prev.blockIps.enabled },
                }))
              }
              className="h-4 w-4 rounded border-border accent-primary"
            />
            <span className="text-sm font-medium text-foreground">
              Block IPs
            </span>
          </label>
          {config.blockIps.enabled && (
            <textarea
              value={config.blockIps.ips}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  blockIps: { ...prev.blockIps, ips: e.target.value },
                }))
              }
              placeholder="Enter IPs, one per line"
              rows={3}
              className="ml-7 w-full max-w-md resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          )}
        </div>

        {/* GZIP */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={config.gzip}
            onChange={() => toggle("gzip")}
            className="h-4 w-4 rounded border-border accent-primary"
          />
          <span className="text-sm font-medium text-foreground">
            GZIP Compression
          </span>
        </label>

        {/* Browser Caching */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={config.caching}
            onChange={() => toggle("caching")}
            className="h-4 w-4 rounded border-border accent-primary"
          />
          <span className="text-sm font-medium text-foreground">
            Browser Caching Headers
          </span>
        </label>

        {/* Security Headers */}
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={config.securityHeaders.enabled}
              onChange={() =>
                setConfig((prev) => ({
                  ...prev,
                  securityHeaders: {
                    ...prev.securityHeaders,
                    enabled: !prev.securityHeaders.enabled,
                  },
                }))
              }
              className="h-4 w-4 rounded border-border accent-primary"
            />
            <span className="text-sm font-medium text-foreground">
              Security Headers
            </span>
          </label>
          {config.securityHeaders.enabled && (
            <div className="flex flex-wrap gap-4 pl-7">
              {(
                [
                  { key: "xFrameOptions" as const, label: "X-Frame-Options" },
                  { key: "xContentType" as const, label: "X-Content-Type-Options" },
                  { key: "xssProtection" as const, label: "X-XSS-Protection" },
                ] as const
              ).map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.securityHeaders[key]}
                    onChange={() =>
                      setConfig((prev) => ({
                        ...prev,
                        securityHeaders: {
                          ...prev.securityHeaders,
                          [key]: !prev.securityHeaders[key],
                        },
                      }))
                    }
                    className="h-4 w-4 rounded border-border accent-primary"
                  />
                  <span className="text-sm text-foreground">{label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Block Directory Listing */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={config.blockDirectoryListing}
            onChange={() => toggle("blockDirectoryListing")}
            className="h-4 w-4 rounded border-border accent-primary"
          />
          <span className="text-sm font-medium text-foreground">
            Block Directory Listing
          </span>
        </label>
      </div>

      {/* Output */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">
            Generated .htaccess
          </h3>
          <button
            onClick={copyOutput}
            className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="rounded-xl border border-border bg-muted p-4">
          <pre className="max-h-96 overflow-auto whitespace-pre font-mono text-sm text-foreground">
            {output || "# Enable options above to generate .htaccess rules"}
          </pre>
        </div>
      </div>
    </div>
  );
}
