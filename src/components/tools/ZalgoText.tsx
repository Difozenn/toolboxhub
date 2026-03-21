"use client";
import { useState } from "react";

const COMBINING_ABOVE = [0x0300,0x0301,0x0302,0x0303,0x0304,0x0305,0x0306,0x0307,0x0308,0x0309,0x030A,0x030B,0x030C,0x030D,0x030E];
const COMBINING_BELOW = [0x0316,0x0317,0x0318,0x0319,0x031A,0x031B,0x031C,0x031D,0x031E,0x031F,0x0320,0x0321,0x0322,0x0323,0x0324];

function zalgo(text: string, intensity: number): string {
  return text.split("").map(ch => {
    if (ch === " ") return ch;
    let out = ch;
    for (let i=0;i<intensity;i++) {
      out += String.fromCodePoint(COMBINING_ABOVE[Math.floor(Math.random()*COMBINING_ABOVE.length)]);
      out += String.fromCodePoint(COMBINING_BELOW[Math.floor(Math.random()*COMBINING_BELOW.length)]);
    }
    return out;
  }).join("");
}

export default function ZalgoText() {
  const [input, setInput] = useState("");
  const [intensity, setIntensity] = useState(3);
  const [output, setOutput] = useState("");

  function generate() { setOutput(zalgo(input, intensity)); }

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e=>setInput(e.target.value)} rows={3}
        placeholder="Enter text to glitch..."
        className="w-full p-3 rounded-xl border border-border bg-muted text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary" />
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-foreground min-w-fit">Intensity: {intensity}</label>
        <input type="range" min={1} max={8} value={intensity} onChange={e=>setIntensity(+e.target.value)} className="flex-1 accent-primary" />
      </div>
      <button onClick={generate} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
        Generate Zalgo
      </button>
      {output && (
        <div className="p-3 rounded-xl bg-muted border border-border min-h-[60px] text-lg text-foreground break-all leading-loose">
          {output}
        </div>
      )}
      {output && (
        <button onClick={() => navigator.clipboard.writeText(output)}
          className="px-4 py-2 rounded-lg bg-muted border border-border text-foreground text-sm font-medium hover:bg-muted/80 transition-colors">
          Copy Result
        </button>
      )}
    </div>
  );
}
