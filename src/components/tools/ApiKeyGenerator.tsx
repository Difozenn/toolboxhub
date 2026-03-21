"use client";
import { useState } from "react";

function genBytes(n: number): Uint8Array {
  const arr = new Uint8Array(n);
  crypto.getRandomValues(arr);
  return arr;
}
function toHex(bytes: Uint8Array): string { return Array.from(bytes).map(b=>b.toString(16).padStart(2,"0")).join(""); }
function toBase64(bytes: Uint8Array): string { return btoa(String.fromCharCode(...bytes)).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,""); }
function toAlpha(bytes: Uint8Array): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(bytes).map(b=>chars[b%chars.length]).join("");
}

export default function ApiKeyGenerator() {
  const [format, setFormat] = useState("hex");
  const [bytes, setBytes] = useState(32);
  const [prefix, setPrefix] = useState("");
  const [count, setCount] = useState(3);
  const [keys, setKeys] = useState<string[]>([]);
  const [copied, setCopied] = useState("");

  function generate() {
    const generated = Array.from({length: count}, () => {
      const b = genBytes(bytes);
      const key = format==="hex" ? toHex(b) : format==="base64" ? toBase64(b) : toAlpha(b);
      return prefix ? `${prefix}${key}` : key;
    });
    setKeys(generated);
  }

  function copy(key: string) { navigator.clipboard.writeText(key); setCopied(key); setTimeout(()=>setCopied(""),2000); }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground">Format</label>
          <select value={format} onChange={e=>setFormat(e.target.value)}
            className="w-full mt-1 p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none">
            {["hex","base64","alphanumeric"].map(f=><option key={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Bytes: {bytes}</label>
          <input type="range" min={8} max={64} step={8} value={bytes} onChange={e=>setBytes(+e.target.value)} className="w-full mt-3 accent-primary" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Prefix (optional)</label>
          <input value={prefix} onChange={e=>setPrefix(e.target.value)} placeholder="sk_live_, pk_test_..."
            className="w-full mt-1 p-2.5 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Count: {count}</label>
          <input type="range" min={1} max={10} value={count} onChange={e=>setCount(+e.target.value)} className="w-full mt-3 accent-primary" />
        </div>
      </div>
      <button onClick={generate} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
        Generate API Keys
      </button>
      <div className="space-y-2">
        {keys.map((key,i) => (
          <button key={i} onClick={() => copy(key)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border font-mono text-xs transition-colors text-left ${copied===key?"border-primary bg-primary/10":"border-border bg-muted hover:bg-muted/80"}`}>
            <span className="text-foreground truncate">{key}</span>
            <span className="text-muted-foreground ml-2 shrink-0">{copied===key?"Copied!":"copy"}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
