"use client";

import { useState } from "react";

const TLDS = [".com", ".net", ".org", ".io", ".co", ".app", ".dev", ".ai", ".me", ".info"];

export default function DomainAvailability() {
  const [input, setInput] = useState("");
  const [base, setBase] = useState("");

  const check = () => {
    const cleaned = input.toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/^-+|-+$/g, "").slice(0, 63);
    setBase(cleaned);
  };

  const whoisUrl = (domain: string) => `https://www.whois.com/whois/${domain}`;
  const goDaddyUrl = (domain: string) => `https://www.godaddy.com/domainsearch/find?domainToCheck=${domain}`;

  const alternatives = base ? [
    `${base}hq`,
    `get${base}`,
    `the${base}`,
    `${base}app`,
    `${base}pro`,
    `my${base}`,
  ] : [];

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300">
        Domain availability cannot be checked client-side (requires DNS/WHOIS servers). This tool formats your query and links to external checkers.
      </div>
      <div className="flex gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && check()}
          placeholder="Enter domain name (e.g. mystartup)"
          className="flex-1 rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        <button onClick={check} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Check</button>
      </div>
      {base && (
        <>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Check availability on registrars:</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {TLDS.map((tld) => (
                <div key={tld} className="flex items-center justify-between rounded-xl border border-border bg-muted px-4 py-2">
                  <span className="font-mono text-sm text-foreground">{base}{tld}</span>
                  <div className="flex gap-2">
                    <a href={whoisUrl(`${base}${tld}`)} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary">WHOIS</a>
                    <a href={goDaddyUrl(`${base}${tld}`)} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">GoDaddy</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {alternatives.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Alternative name suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {alternatives.map((alt) => (
                  <span key={alt} className="rounded-full border border-border bg-muted px-3 py-1 text-sm font-mono text-foreground">{alt}.com</span>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
