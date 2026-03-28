"use client";

import { useState, useMemo, useCallback } from "react";
import ErrorAlert from "@/components/ui/ErrorAlert";
import ToolSection from "@/components/ui/ToolSection";
import CopyButton from "@/components/ui/CopyButton";

const TLD_INFO: Record<string, { type: string; org: string }> = {
  com: { type: "Generic", org: "VeriSign" },
  org: { type: "Generic", org: "Public Interest Registry" },
  net: { type: "Generic", org: "VeriSign" },
  io: { type: "Country Code (British Indian Ocean Territory)", org: "Internet Computer Bureau" },
  co: { type: "Country Code (Colombia)", org: "Ministry of IT (Colombia)" },
  dev: { type: "Generic (Sponsored)", org: "Google Registry" },
  app: { type: "Generic (Sponsored)", org: "Google Registry" },
  ai: { type: "Country Code (Anguilla)", org: "Government of Anguilla" },
  me: { type: "Country Code (Montenegro)", org: "Government of Montenegro" },
  us: { type: "Country Code (United States)", org: "NeuStar" },
  uk: { type: "Country Code (United Kingdom)", org: "Nominet" },
  de: { type: "Country Code (Germany)", org: "DENIC" },
  fr: { type: "Country Code (France)", org: "AFNIC" },
  ca: { type: "Country Code (Canada)", org: "CIRA" },
  au: { type: "Country Code (Australia)", org: "auDA" },
  jp: { type: "Country Code (Japan)", org: "JPRS" },
  edu: { type: "Sponsored", org: "EDUCAUSE" },
  gov: { type: "Sponsored", org: "CISA" },
};

interface WhoisResult {
  domain: string;
  found: boolean;
  status?: string[];
  registrar?: string;
  registrationDate?: string;
  expirationDate?: string;
  lastUpdated?: string;
  nameservers?: string[];
  dnssec?: boolean;
  contacts?: { role: string; name?: string; organization?: string }[];
}

function formatDate(iso: string | undefined): string {
  if (!iso) return "N/A";
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function WhoisLookup() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<WhoisResult | null>(null);

  const cleanDomain = useMemo(() => {
    let d = domain.trim().toLowerCase();
    d = d.replace(/^https?:\/\//, "");
    d = d.replace(/\/.*$/, "");
    d = d.replace(/^www\./, "");
    return d;
  }, [domain]);

  const tld = cleanDomain.split(".").pop() || "";
  const tldInfo = TLD_INFO[tld] || null;

  const lookup = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/whois", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: cleanDomain }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Lookup failed");
      setResult(json.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [cleanDomain]);

  const copyText = useMemo(() => {
    if (!result || !result.found) return "";
    return [
      `Domain: ${result.domain}`,
      `Registrar: ${result.registrar || "N/A"}`,
      `Registered: ${formatDate(result.registrationDate)}`,
      `Expires: ${formatDate(result.expirationDate)}`,
      `Nameservers: ${result.nameservers?.join(", ") || "N/A"}`,
      `DNSSEC: ${result.dnssec ? "Yes" : "No"}`,
      `Status: ${result.status?.join(", ") || "N/A"}`,
    ].join("\n");
  }, [result]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && cleanDomain && lookup()}
          placeholder="example.com"
          className="flex-1 rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button
          onClick={lookup}
          disabled={!cleanDomain || loading}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Looking up..." : "WHOIS Lookup"}
        </button>
      </div>

      {error && <ErrorAlert message={error} />}

      {result && !result.found && (
        <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-4 text-sm text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300">
          Domain <strong>{result.domain}</strong> was not found in the RDAP registry. It may not be registered or the TLD may not support RDAP.
        </div>
      )}

      {result && result.found && (
        <div className="space-y-4">
          {/* Registration Info */}
          <ToolSection title="Registration Details">
            <div className="mb-2 flex justify-end">
              <CopyButton text={copyText} />
            </div>
            <div className="space-y-1.5">
              {[
                { label: "Domain", value: result.domain },
                { label: "Registrar", value: result.registrar || "N/A" },
                { label: "Registered", value: formatDate(result.registrationDate) },
                { label: "Expires", value: formatDate(result.expirationDate) },
                { label: "Last Updated", value: formatDate(result.lastUpdated) },
                { label: "DNSSEC", value: result.dnssec ? "Signed" : "Unsigned" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-lg bg-background p-2.5">
                  <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
                  <span className="text-xs font-mono text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </ToolSection>

          {/* Status */}
          {result.status && result.status.length > 0 && (
            <ToolSection title="Domain Status">
              <div className="flex flex-wrap gap-1.5">
                {result.status.map((s) => (
                  <span key={s} className="rounded-full border border-border bg-background px-3 py-1 text-xs font-mono text-foreground">
                    {s}
                  </span>
                ))}
              </div>
            </ToolSection>
          )}

          {/* Nameservers */}
          {result.nameservers && result.nameservers.length > 0 && (
            <ToolSection title="Nameservers">
              <div className="space-y-1">
                {result.nameservers.map((ns) => (
                  <div key={ns} className="rounded-lg bg-background p-2.5">
                    <span className="text-xs font-mono text-foreground">{ns}</span>
                  </div>
                ))}
              </div>
            </ToolSection>
          )}

          {/* Contacts */}
          {result.contacts && result.contacts.length > 0 && (
            <ToolSection title="Contacts">
              <div className="space-y-2">
                {result.contacts.map((c, i) => (
                  <div key={i} className="rounded-lg bg-background p-2.5 space-y-0.5">
                    <span className="text-xs font-semibold text-primary capitalize">{c.role}</span>
                    <p className="text-xs font-mono text-foreground">{c.name || c.organization || "Redacted (GDPR)"}</p>
                  </div>
                ))}
              </div>
            </ToolSection>
          )}
        </div>
      )}

      {/* TLD Info (supplementary) */}
      {tldInfo && !loading && !result && (
        <ToolSection title={`TLD Info: .${tld}`}>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between rounded-lg bg-background p-2.5">
              <span className="text-xs font-medium text-muted-foreground">Type</span>
              <span className="text-xs text-foreground">{tldInfo.type}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-background p-2.5">
              <span className="text-xs font-medium text-muted-foreground">Registry</span>
              <span className="text-xs text-foreground">{tldInfo.org}</span>
            </div>
          </div>
        </ToolSection>
      )}

      {!loading && !result && !error && (
        <div className="rounded-xl border border-border bg-muted p-12 text-center">
          <p className="text-muted-foreground">Enter a domain name to look up its WHOIS registration data.</p>
        </div>
      )}
    </div>
  );
}
