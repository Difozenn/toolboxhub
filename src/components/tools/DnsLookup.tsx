"use client";

import { useState } from "react";

const RECORD_TYPES = [
  { type: "A", desc: "IPv4 address of the domain" },
  { type: "AAAA", desc: "IPv6 address of the domain" },
  { type: "MX", desc: "Mail exchange servers" },
  { type: "NS", desc: "Nameservers for the domain" },
  { type: "TXT", desc: "Text records (SPF, DKIM, etc.)" },
  { type: "CNAME", desc: "Alias to another domain" },
  { type: "SOA", desc: "Start of authority record" },
  { type: "PTR", desc: "Reverse DNS lookup" },
];

const TOOLS = [
  { name: "Google DNS Lookup", url: "https://toolbox.googleapps.com/apps/dig/#", desc: "Google Admin Toolbox" },
  { name: "MXToolbox", url: "https://mxtoolbox.com/DNSLookup.aspx", desc: "DNS, MX, blacklist checking" },
  { name: "Cloudflare DNS Lookup", url: "https://1.1.1.1/", desc: "Cloudflare's DNS resolver" },
];

export default function DnsLookup() {
  const [domain, setDomain] = useState("");

  const googleDig = (type: string) => `https://toolbox.googleapps.com/apps/dig/#${type}/${domain}`;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300">
        DNS lookups require server-side resolution. This tool explains DNS record types and links to external lookup tools.
      </div>
      <div className="flex gap-2">
        <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)}
          placeholder="example.com"
          className="flex-1 rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">DNS Record Types:</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {RECORD_TYPES.map(({ type, desc }) => (
            <div key={type} className="flex items-start justify-between rounded-xl border border-border bg-muted p-3">
              <div>
                <span className="font-mono font-bold text-primary">{type}</span>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </div>
              {domain && (
                <a href={googleDig(type)} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline shrink-0 ml-2">Lookup</a>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">External DNS Tools:</p>
        {TOOLS.map((t) => (
          <a key={t.name} href={t.url} target="_blank" rel="noopener noreferrer"
            className="flex items-start gap-3 rounded-xl border border-border bg-muted p-3 hover:border-primary transition-colors">
            <div className="flex-1"><p className="text-sm font-semibold text-primary">{t.name}</p><p className="text-xs text-muted-foreground">{t.desc}</p></div>
          </a>
        ))}
      </div>
    </div>
  );
}
