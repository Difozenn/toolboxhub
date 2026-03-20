"use client";

import { useState, useEffect, useCallback } from "react";

export default function IpAddressLookup() {
  const [publicIp, setPublicIp] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchIp = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        if (!res.ok) throw new Error("Failed to fetch IP");
        const data = await res.json();
        setPublicIp(data.ip);
      } catch {
        setError("Could not fetch your public IP address. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchIp();
  }, []);

  const copyIp = useCallback(async () => {
    if (!publicIp) return;
    await navigator.clipboard.writeText(publicIp);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [publicIp]);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      if (!res.ok) throw new Error("Failed to fetch IP");
      const data = await res.json();
      setPublicIp(data.ip);
    } catch {
      setError("Could not fetch your public IP address. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const isIPv4 = publicIp ? /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(publicIp) : false;
  const isIPv6 = publicIp ? publicIp.includes(":") : false;

  return (
    <div className="space-y-6">
      {/* IP Display */}
      <div className="rounded-xl border border-border bg-muted p-6 text-center space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Your Public IP Address</h3>

        {loading ? (
          <div className="text-lg text-muted-foreground">Loading...</div>
        ) : error ? (
          <div className="text-sm text-red-500">{error}</div>
        ) : (
          <div className="space-y-3">
            <p className="text-3xl font-bold font-mono text-foreground">{publicIp}</p>
            <div className="flex items-center justify-center gap-2">
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {isIPv4 ? "IPv4" : isIPv6 ? "IPv6" : "Unknown"}
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center gap-2">
          <button
            onClick={copyIp}
            disabled={!publicIp}
            className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white disabled:opacity-50"
          >
            {copied ? "Copied!" : "Copy IP"}
          </button>
          <button
            onClick={refresh}
            disabled={loading}
            className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary/10 disabled:opacity-50"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* IP Details */}
      {publicIp && isIPv4 && (
        <div className="rounded-xl border border-border bg-muted p-4 space-y-3">
          <h3 className="text-sm font-medium text-foreground">IP Details</h3>
          <div className="space-y-2">
            {[
              { label: "IP Address", value: publicIp },
              { label: "Type", value: isIPv4 ? "IPv4" : "IPv6" },
              {
                label: "Binary",
                value: isIPv4
                  ? publicIp
                      .split(".")
                      .map((o) => parseInt(o).toString(2).padStart(8, "0"))
                      .join(".")
                  : "N/A",
              },
              {
                label: "Decimal",
                value: isIPv4
                  ? publicIp
                      .split(".")
                      .reduce((acc, o) => acc * 256 + parseInt(o), 0)
                      .toString()
                  : "N/A",
              },
              {
                label: "Hex",
                value: isIPv4
                  ? publicIp
                      .split(".")
                      .map((o) => parseInt(o).toString(16).padStart(2, "0"))
                      .join(":")
                  : "N/A",
              },
              {
                label: "Class",
                value: isIPv4
                  ? (() => {
                      const first = parseInt(publicIp.split(".")[0]);
                      if (first < 128) return "Class A";
                      if (first < 192) return "Class B";
                      if (first < 224) return "Class C";
                      if (first < 240) return "Class D (Multicast)";
                      return "Class E (Reserved)";
                    })()
                  : "N/A",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start justify-between rounded-lg bg-background p-2.5"
              >
                <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
                <span className="text-xs font-mono text-foreground text-right max-w-[60%] break-all">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info note */}
      <div className="rounded-xl border border-border bg-muted p-4">
        <h3 className="mb-2 text-sm font-medium text-foreground">Note</h3>
        <ul className="space-y-1 text-xs text-muted-foreground">
          <li>Your public IP is fetched from api.ipify.org</li>
          <li>Detailed geolocation (city, ISP, timezone) requires a paid API service</li>
          <li>If you are using a VPN, the displayed IP is your VPN exit node</li>
          <li>Your local/private network IP is not exposed to websites by default</li>
        </ul>
      </div>
    </div>
  );
}
