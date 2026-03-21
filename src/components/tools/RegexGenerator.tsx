"use client";
import { useState } from "react";

const PATTERNS = [
  {name:"Email",regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,str:"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",desc:"Standard email address"},
  {name:"URL",regex:/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b/,str:"^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b",desc:"HTTP/HTTPS URLs"},
  {name:"Phone (UK)",regex:/^(\+44|0)[\d\s\-]{9,12}$/,str:"^(\\+44|0)[\\d\\s\\-]{9,12}$",desc:"UK phone numbers"},
  {name:"Phone (US)",regex:/^(\+1)?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,str:"^(\\+1)?[\\s.-]?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$",desc:"US phone numbers"},
  {name:"Date (YYYY-MM-DD)",regex:/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,str:"^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$",desc:"ISO date format"},
  {name:"Hex Color",regex:/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,str:"^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$",desc:"CSS hex color codes"},
  {name:"IPv4 Address",regex:/^(\d{1,3}\.){3}\d{1,3}$/,str:"^(\\d{1,3}\\.){3}\\d{1,3}$",desc:"IP version 4 addresses"},
  {name:"Postal Code (UK)",regex:/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,str:"^[A-Z]{1,2}\\d[A-Z\\d]? ?\\d[A-Z]{2}$",desc:"UK postcodes"},
];

export default function RegexGenerator() {
  const [selected, setSelected] = useState(PATTERNS[0]);
  const [test, setTest] = useState("");
  const matches = test ? selected.regex.test(test) : null;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {PATTERNS.map(p => (
          <button key={p.name} onClick={() => setSelected(p)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selected.name===p.name?"bg-primary text-primary-foreground":"bg-muted border border-border text-foreground hover:bg-muted/80"}`}>
            {p.name}
          </button>
        ))}
      </div>
      <div className="p-3 rounded-xl bg-muted border border-border">
        <p className="text-xs text-muted-foreground mb-1">{selected.desc}</p>
        <p className="font-mono text-sm text-foreground break-all">{selected.str}</p>
      </div>
      <div className="flex gap-2">
        <input value={test} onChange={e=>setTest(e.target.value)} placeholder="Test a value against the pattern..."
          className={`flex-1 p-2.5 rounded-xl border text-foreground text-sm focus:outline-none focus:ring-1 bg-muted ${matches===null?"border-border":matches?"border-green-500 bg-green-500/5":"border-red-500 bg-red-500/5"}`} />
        {matches !== null && (
          <span className={`px-3 py-2 rounded-xl text-sm font-medium ${matches?"bg-green-500/10 text-green-600":"bg-red-500/10 text-red-600"}`}>
            {matches?"Match":"No match"}
          </span>
        )}
      </div>
      <button onClick={() => navigator.clipboard.writeText(selected.str)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
        Copy Regex
      </button>
    </div>
  );
}
