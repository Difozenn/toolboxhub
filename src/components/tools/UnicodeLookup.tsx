"use client";

import { useState } from "react";

const UNICODE_CHARS = [
  { char: "©", name: "Copyright Sign", code: "U+00A9" },
  { char: "®", name: "Registered Sign", code: "U+00AE" },
  { char: "™", name: "Trade Mark Sign", code: "U+2122" },
  { char: "€", name: "Euro Sign", code: "U+20AC" },
  { char: "£", name: "Pound Sign", code: "U+00A3" },
  { char: "¥", name: "Yen Sign", code: "U+00A5" },
  { char: "°", name: "Degree Sign", code: "U+00B0" },
  { char: "±", name: "Plus-Minus Sign", code: "U+00B1" },
  { char: "×", name: "Multiplication Sign", code: "U+00D7" },
  { char: "÷", name: "Division Sign", code: "U+00F7" },
  { char: "≈", name: "Almost Equal To", code: "U+2248" },
  { char: "≠", name: "Not Equal To", code: "U+2260" },
  { char: "≤", name: "Less-Than Or Equal To", code: "U+2264" },
  { char: "≥", name: "Greater-Than Or Equal To", code: "U+2265" },
  { char: "∞", name: "Infinity", code: "U+221E" },
  { char: "√", name: "Square Root", code: "U+221A" },
  { char: "π", name: "Greek Small Letter Pi", code: "U+03C0" },
  { char: "Σ", name: "Greek Capital Letter Sigma", code: "U+03A3" },
  { char: "α", name: "Greek Small Letter Alpha", code: "U+03B1" },
  { char: "β", name: "Greek Small Letter Beta", code: "U+03B2" },
  { char: "→", name: "Rightwards Arrow", code: "U+2192" },
  { char: "←", name: "Leftwards Arrow", code: "U+2190" },
  { char: "↑", name: "Upwards Arrow", code: "U+2191" },
  { char: "↓", name: "Downwards Arrow", code: "U+2193" },
  { char: "↔", name: "Left Right Arrow", code: "U+2194" },
  { char: "⇒", name: "Rightwards Double Arrow", code: "U+21D2" },
  { char: "♠", name: "Black Spade Suit", code: "U+2660" },
  { char: "♣", name: "Black Club Suit", code: "U+2663" },
  { char: "♥", name: "Black Heart Suit", code: "U+2665" },
  { char: "♦", name: "Black Diamond Suit", code: "U+2666" },
  { char: "★", name: "Black Star", code: "U+2605" },
  { char: "☆", name: "White Star", code: "U+2606" },
  { char: "✓", name: "Check Mark", code: "U+2713" },
  { char: "✗", name: "Ballot X", code: "U+2717" },
  { char: "•", name: "Bullet", code: "U+2022" },
  { char: "…", name: "Horizontal Ellipsis", code: "U+2026" },
  { char: "—", name: "Em Dash", code: "U+2014" },
  { char: "–", name: "En Dash", code: "U+2013" },
  { char: String.fromCodePoint(0x201C), name: "Left Double Quotation Mark", code: "U+201C" },
  { char: String.fromCodePoint(0x201D), name: "Right Double Quotation Mark", code: "U+201D" },
];

export default function UnicodeLookup() {
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = search ? UNICODE_CHARS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    c.char === search
  ) : UNICODE_CHARS;

  const copy = async (char: string) => {
    await navigator.clipboard.writeText(char);
    setCopied(char);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="space-y-4">
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or code (e.g. 'arrow', 'U+2192', 'copyright')"
        className="w-full rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      <p className="text-xs text-muted-foreground">{filtered.length} characters</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {filtered.map(({ char, name, code }) => (
          <div key={code} className="flex items-center gap-3 rounded-xl border border-border bg-muted px-4 py-2 hover:border-primary transition-colors">
            <span className="text-3xl w-10 text-center">{char}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground truncate">{name}</p>
              <p className="font-mono text-xs text-muted-foreground">{code}</p>
            </div>
            <button onClick={() => copy(char)} className="shrink-0 text-xs text-muted-foreground hover:text-primary">{copied === char ? "Copied!" : "Copy"}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
