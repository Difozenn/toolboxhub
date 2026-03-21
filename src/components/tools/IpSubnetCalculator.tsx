"use client";
import { useState } from "react";
function ipToInt(ip: string): number { return ip.split(".").reduce((acc, oct) => (acc << 8) + parseInt(oct), 0) >>> 0; }
function intToIp(n: number): string { return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join("."); }
export default function IpSubnetCalculator() {
  const [cidr, setCidr] = useState("192.168.1.0/24");
  const [result, setResult] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState("");
  const calculate = () => {
    try {
      const [ip, prefix] = cidr.split("/");
      const bits = parseInt(prefix);
      if (bits < 0 || bits > 32 || !ip.match(/^\d+\.\d+\.\d+\.\d+$/)) throw new Error("Invalid CIDR");
      const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;
      const ipInt = ipToInt(ip);
      const network = (ipInt & mask) >>> 0;
      const broadcast = (network | (~mask >>> 0)) >>> 0;
      const hosts = bits >= 31 ? Math.pow(2, 32 - bits) : Math.pow(2, 32 - bits) - 2;
      setResult({
        "Network Address": intToIp(network),
        "Subnet Mask": intToIp(mask),
        "Broadcast Address": intToIp(broadcast),
        "First Usable Host": bits >= 31 ? intToIp(network) : intToIp(network + 1),
        "Last Usable Host": bits >= 31 ? intToIp(broadcast) : intToIp(broadcast - 1),
        "Usable Hosts": hosts.toLocaleString(),
        "Total Addresses": Math.pow(2, 32 - bits).toLocaleString(),
        "Prefix Length": `/${bits}`,
      });
      setError("");
    } catch { setError("Invalid CIDR notation. Example: 192.168.1.0/24"); setResult(null); }
  };
  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="mb-1.5 block text-sm font-medium text-foreground">CIDR Notation</label>
          <input value={cidr} onChange={e => setCidr(e.target.value)} onKeyDown={e => e.key === "Enter" && calculate()} placeholder="192.168.1.0/24" className="w-full rounded-lg border border-border bg-muted px-4 py-3 font-mono text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="flex items-end"><button onClick={calculate} className="rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">Calculate</button></div>
      </div>
      {error && <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
      {result && (
        <div className="divide-y divide-border rounded-lg border border-border">
          {Object.entries(result).map(([k, v]) => (
            <div key={k} className="flex justify-between px-4 py-3"><span className="text-sm text-muted-foreground">{k}</span><span className="font-mono text-sm font-medium text-foreground">{v}</span></div>
          ))}
        </div>
      )}
    </div>
  );
}
