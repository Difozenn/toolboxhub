"use client";
import { useState } from "react";

function describe(min: string, hr: string, dom: string, mon: string, dow: string): string {
  const parts: string[] = [];
  if (min==="*" && hr==="*") parts.push("every minute");
  else if (min.startsWith("*/")) { parts.push(`every ${min.slice(2)} minutes`); }
  else parts.push(`at minute ${min} of hour ${hr==="*"?"every hour":hr}`);
  if (dom!=="*") parts.push(`on day ${dom} of the month`);
  if (mon!=="*") parts.push(`in month ${mon}`);
  if (dow!=="*") parts.push(`on weekday ${dow}`);
  return parts.join(", ").replace(/^./,c=>c.toUpperCase());
}

export default function CrontabGenerator() {
  const [min, setMin] = useState("0");
  const [hr, setHr] = useState("*");
  const [dom, setDom] = useState("*");
  const [mon, setMon] = useState("*");
  const [dow, setDow] = useState("*");

  const expr = `${min} ${hr} ${dom} ${mon} ${dow}`;

  const PRESETS = [
    {label:"Every minute",v:["*","*","*","*","*"]},
    {label:"Every hour",v:["0","*","*","*","*"]},
    {label:"Daily midnight",v:["0","0","*","*","*"]},
    {label:"Weekly Sunday",v:["0","0","*","*","0"]},
    {label:"Monthly 1st",v:["0","0","1","*","*"]},
  ];

  const fields = [
    {label:"Minute",val:min,set:setMin,placeholder:"0-59, */5"},
    {label:"Hour",val:hr,set:setHr,placeholder:"0-23, */2"},
    {label:"Day/Month",val:dom,set:setDom,placeholder:"1-31"},
    {label:"Month",val:mon,set:setMon,placeholder:"1-12"},
    {label:"Weekday",val:dow,set:setDow,placeholder:"0-7"},
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map(p => (
          <button key={p.label} onClick={() => { setMin(p.v[0]);setHr(p.v[1]);setDom(p.v[2]);setMon(p.v[3]);setDow(p.v[4]); }}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-muted border border-border text-foreground hover:bg-muted/80 transition-colors">
            {p.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-2">
        {fields.map(f => (
          <div key={f.label}>
            <label className="text-xs font-medium text-muted-foreground">{f.label}</label>
            <input value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.placeholder}
              className="w-full mt-1 p-2 rounded-lg border border-border bg-muted text-foreground text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        ))}
      </div>
      <div className="p-3 rounded-xl bg-muted border border-border">
        <p className="font-mono text-lg font-bold text-primary">{expr}</p>
        <p className="text-sm text-muted-foreground mt-1">{describe(min,hr,dom,mon,dow)}</p>
      </div>
      <button onClick={() => navigator.clipboard.writeText(expr)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
        Copy Expression
      </button>
    </div>
  );
}
