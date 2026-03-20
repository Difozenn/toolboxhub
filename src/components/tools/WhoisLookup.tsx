"use client";

import { useState, useMemo, useCallback } from "react";

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
  cn: { type: "Country Code (China)", org: "CNNIC" },
  in: { type: "Country Code (India)", org: "NIXI" },
  br: { type: "Country Code (Brazil)", org: "NIC.br" },
  ru: { type: "Country Code (Russia)", org: "Coordination Center for TLD RU" },
  info: { type: "Generic", org: "Identity Digital" },
  biz: { type: "Generic", org: "Identity Digital" },
  xyz: { type: "Generic", org: "XYZ.COM LLC" },
  tech: { type: "Generic", org: "Radix Technologies" },
  site: { type: "Generic", org: "Radix Technologies" },
  online: { type: "Generic", org: "Radix Technologies" },
  store: { type: "Generic", org: "Radix Technologies" },
  cloud: { type: "Generic", org: "Aruba S.p.A." },
  edu: { type: "Sponsored", org: "EDUCAUSE" },
  gov: { type: "Sponsored", org: "Cybersecurity and Infrastructure Security Agency" },
  mil: { type: "Sponsored", org: "US Department of Defense" },
};

const WHOIS_SERVICES = [
  { name: "ICANN WHOIS", url: "https://lookup.icann.org/en/lookup" },
  { name: "Whois.domaintools.com", url: "https://whois.domaintools.com/" },
  { name: "who.is", url: "https://who.is/whois/" },
  { name: "Namecheap WHOIS", url: "https://www.namecheap.com/domains/whois/" },
];

function isValidDomain(domain: string): boolean {
  const re = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
  return re.test(domain);
}

function extractParts(domain: string) {
  const parts = domain.split(".");
  const tld = parts[parts.length - 1].toLowerCase();
  const sld = parts.length >= 2 ? parts[parts.length - 2] : "";
  const subdomain = parts.length > 2 ? parts.slice(0, -2).join(".") : "";
  return { tld, sld, subdomain, fullDomain: domain };
}

export default function WhoisLookup() {
  const [domain, setDomain] = useState("");
  const [searched, setSearched] = useState(false);
  const [copied, setCopied] = useState(false);

  const cleanDomain = useMemo(() => {
    let d = domain.trim().toLowerCase();
    d = d.replace(/^https?:\/\//, "");
    d = d.replace(/\/.*$/, "");
    d = d.replace(/^www\./, "");
    return d;
  }, [domain]);

  const valid = useMemo(() => isValidDomain(cleanDomain), [cleanDomain]);
  const parts = useMemo(() => (valid ? extractParts(cleanDomain) : null), [valid, cleanDomain]);
  const tldInfo = parts ? TLD_INFO[parts.tld] || null : null;

  const handleSearch = useCallback(() => {
    setSearched(true);
  }, []);

  const copyInfo = useCallback(async () => {
    if (!parts) return;
    const lines = [
      `Domain: ${cleanDomain}`,
      `TLD: .${parts.tld}`,
      parts.subdomain ? `Subdomain: ${parts.subdomain}` : null,
      `SLD: ${parts.sld}`,
      tldInfo ? `TLD Type: ${tldInfo.type}` : null,
      tldInfo ? `Registry: ${tldInfo.org}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    await navigator.clipboard.writeText(lines);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [cleanDomain, parts, tldInfo]);

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="rounded-xl border border-border bg-muted p-5 space-y-3">
        <label className="mb-1 block text-sm font-medium text-foreground">Domain Name</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={domain}
            onChange={(e) => { setDomain(e.target.value); setSearched(false); }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="example.com"
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            onClick={handleSearch}
            disabled={!cleanDomain}
            className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-50"
          >
            Lookup
          </button>
        </div>
        {cleanDomain && cleanDomain !== domain.trim().toLowerCase() && (
          <p className="text-xs text-muted-foreground">Cleaned: {cleanDomain}</p>
        )}
      </div>

      {searched && cleanDomain && (
        <>
          {/* Validation */}
          <div className="rounded-xl border border-border bg-muted p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-foreground">Domain Validation</h3>
              {valid && (
                <button
                  onClick={copyInfo}
                  className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-primary/10"
                >
                  {copied ? "Copied!" : "Copy Info"}
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white ${
                  valid ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {valid ? "\u2713" : "\u2717"}
              </span>
              <span className="text-sm text-foreground">
                {valid ? "Valid domain format" : "Invalid domain format"}
              </span>
            </div>

            {!valid && (
              <p className="text-xs text-muted-foreground">
                Please enter a valid domain name (e.g., example.com, sub.example.co.uk)
              </p>
            )}
          </div>

          {/* Domain parts */}
          {parts && (
            <div className="rounded-xl border border-border bg-muted p-4 space-y-3">
              <h3 className="text-sm font-medium text-foreground">Domain Information</h3>
              <div className="space-y-2">
                {[
                  { label: "Full Domain", value: cleanDomain },
                  { label: "Second-Level Domain", value: parts.sld },
                  { label: "Top-Level Domain", value: `.${parts.tld}` },
                  ...(parts.subdomain
                    ? [{ label: "Subdomain", value: parts.subdomain }]
                    : []),
                  ...(tldInfo
                    ? [
                        { label: "TLD Type", value: tldInfo.type },
                        { label: "Registry Operator", value: tldInfo.org },
                      ]
                    : []),
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-lg bg-background p-2.5"
                  >
                    <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
                    <span className="text-xs font-mono text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* External WHOIS services */}
          <div className="rounded-xl border border-border bg-muted p-4 space-y-3">
            <h3 className="text-sm font-medium text-foreground">WHOIS Lookup Services</h3>
            <p className="text-xs text-muted-foreground">
              Full WHOIS queries require server-side processing and cannot be performed directly from a browser.
              Use one of these trusted WHOIS services:
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {WHOIS_SERVICES.map((service) => (
                <a
                  key={service.name}
                  href={`${service.url}${cleanDomain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg border border-border bg-background p-3 text-sm text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  <span className="font-medium">{service.name}</span>
                  <span className="text-xs text-muted-foreground">Open</span>
                </a>
              ))}
            </div>
          </div>
        </>
      )}

      {!searched && (
        <div className="rounded-xl border border-border bg-muted p-12 text-center">
          <p className="text-muted-foreground">
            Enter a domain name to validate it and access WHOIS lookup services.
          </p>
        </div>
      )}
    </div>
  );
}
