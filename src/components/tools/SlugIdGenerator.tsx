"use client";
import { useState } from "react";

const ALPHABETS = {
  "URL-safe": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  "Alphanumeric": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  "Numeric": "0123456789",
  "Hex": "0123456789abcdef",
};

function genId(len: number, alphabet: string): string {
  const arr = new Uint8Array(len);
  crypto.getRandomValues(arr);
  return Array.from(arr).map(b => alphabet[b % alphabet.length]).join("");
}

export default function SlugIdGenerator() {
  const [length, setLength] = useState(12);
  const [alphabetKey, setAlphabetKey] = useState("URL-safe");
  const [count, setCount] = useState(5);
  const [ids, setIds] = useState<string[]>([]);
  const [copied, setCopied] = useState("");

  function generate() {
    const alpha = ALPHABETS[alphabetKey as keyof typeof ALPHABETS];
    setIds(Array.from({length: count}, () => genId(length, alpha)));
  }
  function copy(id: string) { navigator.clipboard.writeText(id); setCopied(id); setTimeout(()=>setCopied(""),2000); }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground">Length: {length}</label>
          <input type="range" min={4} max={64} value={length} onChange={e=>setLength(+e.target.value)} className="w-full mt-1 accent-primary" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Count: {count}</label>
          <input type="range" min={1} max={20} value={count} onChange={e=>setCount(+e.target.value)} className="w-full mt-1 accent-primary" />
        </div>
      </div>
      <select value={alphabetKey} onChange={e=>setAlphabetKey(e.target.value)}
        className="w-full p-2.5 rounded-xl border border-border bg-muted text-foreground focus:outline-none">
        {Object.keys(ALPHABETS).map(k => <option key={k}>{k}</option>)}
      </select>
      <button onClick={generate} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
        Generate IDs
      </button>
      <div className="space-y-2">
        {ids.map((id,i) => (
          <button key={i} onClick={() => copy(id)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border font-mono text-sm transition-colors ${copied===id?"border-primary bg-primary/10":"border-border bg-muted hover:bg-muted/80"}`}>
            <span className="text-foreground">{id}</span>
            <span className="text-xs text-muted-foreground">{copied===id?"Copied!":"copy"}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
