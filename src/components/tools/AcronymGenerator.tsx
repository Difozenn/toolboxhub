"use client";
import { useState } from "react";

const STOP_WORDS = new Set(["a","an","the","of","in","on","at","for","to","by","with","and","or","but","nor","so","yet","is","are","was","were","be","been","being","it","its","from"]);

function generateAcronym(phrase: string, filterStop: boolean): string {
  return phrase.trim().split(/\s+/)
    .filter(w => w.match(/[a-zA-Z]/) && (!filterStop || !STOP_WORDS.has(w.toLowerCase())))
    .map(w => w[0].toUpperCase())
    .join("");
}

export default function AcronymGenerator() {
  const [input, setInput] = useState("");
  const [filterStop, setFilterStop] = useState(true);
  const [upper, setUpper] = useState(true);
  const raw = generateAcronym(input, filterStop);
  const acronym = upper ? raw : raw.toLowerCase();

  return (
    <div className="space-y-4">
      <input value={input} onChange={e=>setInput(e.target.value)}
        placeholder="Enter a phrase (e.g. Application Programming Interface)"
        className="w-full p-3 rounded-xl border border-border bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer select-none">
          <input type="checkbox" checked={filterStop} onChange={e=>setFilterStop(e.target.checked)} className="accent-primary w-4 h-4" />
          Filter stop words
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer select-none">
          <input type="checkbox" checked={upper} onChange={e=>setUpper(e.target.checked)} className="accent-primary w-4 h-4" />
          Uppercase
        </label>
      </div>
      {acronym && (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-muted border border-border">
          <span className="text-4xl font-bold text-primary tracking-wider">{acronym}</span>
          <button onClick={() => navigator.clipboard.writeText(acronym)}
            className="ml-auto px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            Copy
          </button>
        </div>
      )}
      {!acronym && input && <p className="text-muted-foreground text-sm">No letters found in input.</p>}
    </div>
  );
}
