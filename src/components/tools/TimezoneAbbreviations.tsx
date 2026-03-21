"use client";

import { useState } from "react";

const TZ_DATA: { abbr: string; name: string; offset: string; regions: string; dst?: string }[] = [
  { abbr: "EST", name: "Eastern Standard Time", offset: "UTC−5", regions: "Eastern US & Canada", dst: "EDT (UTC−4) Mar–Nov" },
  { abbr: "CST", name: "Central Standard Time", offset: "UTC−6", regions: "Central US & Canada", dst: "CDT (UTC−5) Mar–Nov" },
  { abbr: "MST", name: "Mountain Standard Time", offset: "UTC−7", regions: "Mountain US & Canada" },
  { abbr: "PST", name: "Pacific Standard Time", offset: "UTC−8", regions: "Pacific US & Canada", dst: "PDT (UTC−7) Mar–Nov" },
  { abbr: "GMT", name: "Greenwich Mean Time", offset: "UTC±0", regions: "UK, Iceland, West Africa" },
  { abbr: "UTC", name: "Coordinated Universal Time", offset: "UTC±0", regions: "Universal standard, aviation, servers" },
  { abbr: "CET", name: "Central European Time", offset: "UTC+1", regions: "France, Germany, Italy, Spain", dst: "CEST (UTC+2) Mar–Oct" },
  { abbr: "EET", name: "Eastern European Time", offset: "UTC+2", regions: "Greece, Romania, Finland", dst: "EEST (UTC+3) Mar–Oct" },
  { abbr: "IST", name: "India Standard Time", offset: "UTC+5:30", regions: "India, Sri Lanka" },
  { abbr: "CST", name: "China Standard Time", offset: "UTC+8", regions: "China, Taiwan, Hong Kong" },
  { abbr: "JST", name: "Japan Standard Time", offset: "UTC+9", regions: "Japan, South Korea" },
  { abbr: "AEST", name: "Australian Eastern Standard Time", offset: "UTC+10", regions: "Eastern Australia", dst: "AEDT (UTC+11) Oct–Apr" },
  { abbr: "NZST", name: "New Zealand Standard Time", offset: "UTC+12", regions: "New Zealand", dst: "NZDT (UTC+13) Sep–Apr" },
  { abbr: "BRT", name: "Brasília Time", offset: "UTC−3", regions: "Brazil" },
  { abbr: "AST", name: "Atlantic Standard Time", offset: "UTC−4", regions: "Atlantic Canada, Caribbean" },
  { abbr: "MSK", name: "Moscow Standard Time", offset: "UTC+3", regions: "Russia (Moscow area)" },
  { abbr: "SGT", name: "Singapore Time", offset: "UTC+8", regions: "Singapore" },
  { abbr: "PKT", name: "Pakistan Standard Time", offset: "UTC+5", regions: "Pakistan" },
  { abbr: "WAT", name: "West Africa Time", offset: "UTC+1", regions: "Nigeria, Ghana, Cameroon" },
  { abbr: "EAT", name: "East Africa Time", offset: "UTC+3", regions: "Kenya, Tanzania, Ethiopia" },
];

export default function TimezoneAbbreviations() {
  const [query, setQuery] = useState("");

  const filtered = TZ_DATA.filter(
    (t) =>
      t.abbr.toLowerCase().includes(query.toLowerCase()) ||
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.regions.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <input value={query} onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by abbreviation (e.g., EST), name, or region..."
        className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />

      <div className="rounded-xl border border-border overflow-hidden">
        <div className="grid grid-cols-4 gap-3 bg-muted px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          <span>Abbr.</span><span>Full Name</span><span>UTC Offset</span><span>Regions / DST</span>
        </div>
        <div className="divide-y divide-border max-h-96 overflow-y-auto">
          {filtered.length === 0 && (
            <p className="px-4 py-6 text-sm text-center text-muted-foreground">No timezone found for "{query}"</p>
          )}
          {filtered.map((t, i) => (
            <div key={i} className="grid grid-cols-4 gap-3 px-4 py-3 hover:bg-muted/50 transition-colors">
              <span className="font-bold text-primary text-sm">{t.abbr}</span>
              <span className="text-sm text-foreground">{t.name}</span>
              <span className="text-sm font-mono text-foreground">{t.offset}</span>
              <div>
                <p className="text-xs text-foreground">{t.regions}</p>
                {t.dst && <p className="text-xs text-muted-foreground mt-0.5">DST: {t.dst}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
