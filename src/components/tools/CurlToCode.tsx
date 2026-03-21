"use client";
import { useState } from "react";
function parseCurl(curl: string): { method: string; url: string; headers: [string,string][]; data: string } {
  const method = (curl.match(/-X\s+(\w+)/)?.[1] || (curl.includes("-d") || curl.includes("--data") ? "POST" : "GET")).toUpperCase();
  const url = curl.match(/curl\s+(?:-[^\s]+\s+)*['"]?([^\s'"]+)['"]?/)?.[1] || "";
  const headers: [string,string][] = [];
  const hMatches = [...curl.matchAll(/-H\s+['"]([^'"]+)['"]/g)];
  hMatches.forEach(m => { const [k, ...v] = m[1].split(":"); headers.push([k.trim(), v.join(":").trim()]); });
  const data = curl.match(/(?:-d|--data)\s+['"]([^'"]*)['"]/)?.[1] || "";
  return { method, url, headers, data };
}
function toFetch({ method, url, headers, data }: ReturnType<typeof parseCurl>): string {
  const opts: string[] = [`method: "${method}"`];
  if (headers.length) opts.push(`headers: {\n${headers.map(([k,v]) => `    "${k}": "${v}"`).join(",\n")}\n  }`);
  if (data) opts.push(`body: \`${data}\``);
  return `const response = await fetch("${url}", {\n  ${opts.join(",\n  ")}\n});\nconst data = await response.json();`;
}
function toPython({ method, url, headers, data }: ReturnType<typeof parseCurl>): string {
  const h = headers.length ? `headers = {\n${headers.map(([k,v]) => `    "${k}": "${v}"`).join(",\n")}\n}\n` : "";
  const d = data ? `data = '${data}'\n` : "";
  return `import requests\n\n${h}${d}response = requests.${method.toLowerCase()}(\n    "${url}"${headers.length ? ",\n    headers=headers" : ""}${data ? ",\n    data=data" : ""}\n)\nprint(response.json())`;
}
const converters: Record<string, (p: ReturnType<typeof parseCurl>) => string> = { "JS Fetch": toFetch, Python: toPython };
export default function CurlToCode() {
  const [curl, setCurl] = useState(`curl -X POST "https://api.example.com/data" -H "Content-Type: application/json" -d '{"key":"value"}'`);
  const [lang, setLang] = useState("JS Fetch");
  const parsed = parseCurl(curl);
  const output = converters[lang](parsed);
  return (
    <div className="space-y-4">
      <div><label className="mb-1.5 block text-sm font-medium text-foreground">cURL Command</label><textarea value={curl} onChange={e => setCurl(e.target.value)} rows={4} className="w-full rounded-lg border border-border bg-muted px-4 py-3 font-mono text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
      <div className="flex gap-2">{Object.keys(converters).map(l => <button key={l} onClick={() => setLang(l)} className={`rounded-lg px-4 py-2 text-sm font-medium ${lang === l ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80 border border-border"}`}>{l}</button>)}</div>
      <div className="relative">
        <button onClick={() => navigator.clipboard.writeText(output)} className="absolute right-2 top-2 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground hover:text-foreground border border-border">Copy</button>
        <pre className="overflow-auto rounded-lg border border-border bg-muted p-4 pt-8 font-mono text-sm text-foreground">{output}</pre>
      </div>
    </div>
  );
}
