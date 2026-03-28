"use client";

import { useState } from "react";
import ErrorAlert from "@/components/ui/ErrorAlert";
import ToolSection from "@/components/ui/ToolSection";

const RECORD_TYPES = [
  { type: "A", desc: "IPv4 address" },
  { type: "AAAA", desc: "IPv6 address" },
  { type: "MX", desc: "Mail servers" },
  { type: "NS", desc: "Nameservers" },
  { type: "TXT", desc: "Text records" },
  { type: "CNAME", desc: "Alias" },
  { type: "SOA", desc: "Start of authority" },
];

interface MxRecord {
  priority: number;
  exchange: string;
}

interface SoaRecord {
  nsname: string;
  hostmaster: string;
  serial: number;
  refresh: number;
  retry: number;
  expire: number;
  minttl: number;
}

interface DnsResult {
  domain: string;
  type: string;
  records: string[] | MxRecord[] | SoaRecord | unknown;
}

export default function DnsLookup() {
  const [domain, setDomain] = useState("");
  const [selectedType, setSelectedType] = useState("A");
  const [loading, setLoading] = useState(false);
  const [loadingAll, setLoadingAll] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<DnsResult[]>([]);

  const lookup = async (type: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/dns-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain, type }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Lookup failed");
      setResults([json.data]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const lookupAll = async () => {
    setLoadingAll(true);
    setError(null);
    setResults([]);
    try {
      const fetches = RECORD_TYPES.map(({ type }) =>
        fetch("/api/dns-lookup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ domain, type }),
        }).then((r) => r.json())
      );
      const all = await Promise.all(fetches);
      const valid = all.filter((r) => r.data).map((r) => r.data as DnsResult);
      setResults(valid);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setLoadingAll(false);
    }
  };

  const renderRecords = (result: DnsResult) => {
    const { type, records } = result;
    if (!records || (Array.isArray(records) && records.length === 0)) {
      return <p className="text-sm text-muted-foreground">No {type} records found</p>;
    }

    if (type === "SOA") {
      const soa = records as SoaRecord;
      return (
        <div className="space-y-1">
          {Object.entries(soa).map(([key, val]) => (
            <div key={key} className="flex justify-between rounded-lg bg-background p-2">
              <span className="text-xs font-medium text-muted-foreground">{key}</span>
              <span className="text-xs font-mono text-foreground">{String(val)}</span>
            </div>
          ))}
        </div>
      );
    }

    if (type === "MX") {
      const mx = records as MxRecord[];
      return (
        <div className="space-y-1">
          {mx.sort((a, b) => a.priority - b.priority).map((r, i) => (
            <div key={i} className="flex justify-between rounded-lg bg-background p-2">
              <span className="text-xs font-mono text-foreground">{r.exchange}</span>
              <span className="text-xs text-muted-foreground">Priority: {r.priority}</span>
            </div>
          ))}
        </div>
      );
    }

    const arr = records as string[];
    return (
      <div className="space-y-1">
        {arr.map((r, i) => (
          <div key={i} className="rounded-lg bg-background p-2">
            <span className="text-xs font-mono text-foreground break-all">{r}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && domain && lookup(selectedType)}
          placeholder="example.com"
          className="flex-1 rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button
          onClick={() => lookup(selectedType)}
          disabled={!domain || loading}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Looking up..." : "Lookup"}
        </button>
        <button
          onClick={lookupAll}
          disabled={!domain || loadingAll}
          className="rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10 disabled:opacity-50"
        >
          {loadingAll ? "Checking..." : "All Records"}
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {RECORD_TYPES.map(({ type, desc }) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              selectedType === type
                ? "bg-primary text-white"
                : "border border-border bg-muted text-muted-foreground hover:text-foreground"
            }`}
            title={desc}
          >
            {type}
          </button>
        ))}
      </div>

      {error && <ErrorAlert message={error} />}

      {results.length > 0 && (
        <div className="space-y-3">
          {results.map((result) => (
            <ToolSection key={result.type} title={`${result.type} Records — ${result.domain}`}>
              {renderRecords(result)}
            </ToolSection>
          ))}
        </div>
      )}

      {!loading && !loadingAll && results.length === 0 && !error && (
        <div className="rounded-xl border border-border bg-muted p-12 text-center">
          <p className="text-muted-foreground">Enter a domain name to look up its DNS records.</p>
        </div>
      )}
    </div>
  );
}
