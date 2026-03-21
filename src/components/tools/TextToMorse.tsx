"use client";
import { useState } from "react";

const MORSE: Record<string, string> = {
  A:".-",B:"-...",C:"-.-.",D:"-..",E:".",F:"..-.",G:"--.",H:"....",I:"..",J:".---",K:"-.-",L:".-..",M:"--",
  N:"-.",O:"---",P:".--.",Q:"--.-",R:".-.",S:"...",T:"-",U:"..-",V:"...-",W:".--",X:"-..-",Y:"-.--",Z:"--..",
  "0":"-----","1":".----","2":"..---","3":"...--","4":"....-","5":".....","6":"-....","7":"--...","8":"---..",
  "9":"----.",".":".-.-.-",",":"--..--","?":"..--..","!":"-.-.--","/":"-..-."," ":"/"
};

function toMorse(text: string) {
  return text.toUpperCase().split("").map(c => MORSE[c] ?? "?").join(" ");
}
function fromMorse(morse: string) {
  const rev = Object.fromEntries(Object.entries(MORSE).map(([k,v])=>[v,k]));
  return morse.split(" / ").map(w => w.split(" ").map(c => rev[c] ?? "?").join("")).join(" ");
}

export default function TextToMorse() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode"|"decode">("encode");
  const output = mode === "encode" ? toMorse(input) : fromMorse(input);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["encode","decode"] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${mode===m?"bg-primary text-primary-foreground":"bg-muted text-foreground hover:bg-muted/80"}`}>
            {m === "encode" ? "Text → Morse" : "Morse → Text"}
          </button>
        ))}
      </div>
      <textarea value={input} onChange={e=>setInput(e.target.value)} rows={4}
        placeholder={mode==="encode"?"Enter text to convert...":"Enter Morse code (e.g. .- ...)"}
        className="w-full p-3 rounded-xl border border-border bg-muted text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary" />
      <div className="p-3 rounded-xl bg-muted border border-border min-h-[80px] font-mono text-sm text-foreground break-all whitespace-pre-wrap">
        {output || <span className="text-muted-foreground">Output will appear here...</span>}
      </div>
      <button onClick={() => navigator.clipboard.writeText(output)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
        Copy Result
      </button>
    </div>
  );
}
