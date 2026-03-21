"use client";
import { useState } from "react";
function base64urlEncode(str: string): string {
  return btoa(unescape(encodeURIComponent(str))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function buildJwt(header: string, payload: string): string {
  try {
    JSON.parse(header); JSON.parse(payload);
    const h = base64urlEncode(header);
    const p = base64urlEncode(payload);
    const sig = base64urlEncode("signature_placeholder");
    return `${h}.${p}.${sig}`;
  } catch { return ""; }
}
export default function JwtGenerator() {
  const [header, setHeader] = useState(JSON.stringify({ alg: "HS256", typ: "JWT" }, null, 2));
  const [payload, setPayload] = useState(JSON.stringify({ sub: "1234567890", name: "John Doe", iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 3600 }, null, 2));
  const [error, setError] = useState("");
  const jwt = buildJwt(header, payload);
  const [parts] = jwt ? [jwt.split(".")] : [[]];
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
        <p className="text-xs text-amber-600 dark:text-amber-400">Note: This tool generates unsigned JWTs for testing only. Do not use in production — real JWTs require server-side signing.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Header</label><textarea value={header} onChange={e => setHeader(e.target.value)} rows={5} className="w-full rounded-lg border border-border bg-muted px-4 py-3 font-mono text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Payload</label><textarea value={payload} onChange={e => setPayload(e.target.value)} rows={5} className="w-full rounded-lg border border-border bg-muted px-4 py-3 font-mono text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
      </div>
      {jwt && (
        <div>
          <div className="mb-1.5 flex items-center justify-between"><label className="text-sm font-medium text-foreground">Generated JWT</label><button onClick={() => navigator.clipboard.writeText(jwt)} className="text-xs text-muted-foreground hover:text-foreground">Copy</button></div>
          <div className="break-all rounded-lg border border-border bg-muted p-4 font-mono text-sm">
            <span className="text-red-500">{parts[0]}</span>.<span className="text-purple-500">{parts[1]}</span>.<span className="text-blue-500">{parts[2]}</span>
          </div>
        </div>
      )}
    </div>
  );
}
