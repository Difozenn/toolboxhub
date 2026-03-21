"use client";
import { useState } from "react";

const WORDS = ["apple","bridge","canyon","dragon","forest","guitar","harbor","island","jungle","kernel","lantern","mountain","nebula","ocean","palace","quartz","river","silver","thunder","umbrella","valley","window","xerus","yellow","zenith","amber","breeze","castle","delta","ember","falcon","grove","hollow","ivory","jasper","kindle","lemon","maple","north","orbit","pine","quiet","rustic","storm","torch","ultra","vault","whale","xylem","yarn","zeal"];

function rand<T>(a: T[]): T { return a[Math.floor(Math.random()*a.length)]; }

function capitalize(w: string): string { return w.charAt(0).toUpperCase() + w.slice(1); }

export default function PasswordPhraseGenerator() {
  const [wordCount, setWordCount] = useState(4);
  const [sep, setSep] = useState("-");
  const [caps, setCaps] = useState(false);
  const [digit, setDigit] = useState(false);
  const [passphrase, setPassphrase] = useState("");
  const [copied, setCopied] = useState(false);

  function generate() {
    let words = Array.from({length: wordCount}, () => rand(WORDS));
    if (caps) words = words.map(capitalize);
    if (digit) words = [...words, String(Math.floor(Math.random()*99)+1)];
    setPassphrase(words.join(sep));
  }

  function copy() {
    navigator.clipboard.writeText(passphrase);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const entropy = (wordCount * Math.log2(WORDS.length)).toFixed(1);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground">Word count: {wordCount}</label>
          <input type="range" min={3} max={8} value={wordCount} onChange={e=>setWordCount(+e.target.value)} className="w-full mt-1 accent-primary" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Separator</label>
          <select value={sep} onChange={e=>setSep(e.target.value)} className="w-full mt-1 p-2 rounded-lg border border-border bg-muted text-foreground text-sm focus:outline-none">
            {["-",".",  "_"," ",""].map(s=><option key={s} value={s}>{s||"none"}</option>)}
          </select>
        </div>
      </div>
      <div className="flex gap-4 flex-wrap">
        {[["Capitalise words",caps,setCaps],["Add number",digit,setDigit]].map(([label,val,setter]) => (
          <label key={label as string} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
            <input type="checkbox" checked={val as boolean} onChange={e=>(setter as (v:boolean)=>void)(e.target.checked)} className="accent-primary w-4 h-4" />
            {label as string}
          </label>
        ))}
      </div>
      <button onClick={generate} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
        Generate Passphrase
      </button>
      {passphrase && (
        <div className="p-4 rounded-xl bg-muted border border-border space-y-2">
          <p className="font-mono text-lg font-semibold text-foreground break-all">{passphrase}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">~{entropy} bits entropy</span>
            <button onClick={copy} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
