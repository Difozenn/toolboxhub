"use client";
import { useState } from "react";
const MORSE: Record<string, string> = {
  A:".-",B:"-...",C:"-.-.",D:"-..",E:".",F:"..-.",G:"--.",H:"....",I:"..",J:".---",K:"-.-",L:".-..",M:"--",N:"-.",O:"---",P:".--.",Q:"--.-",R:".-.",S:"...",T:"-",U:"..-",V:"...-",W:".--",X:"-..-",Y:"-.--",Z:"--..",
  "0":"-----","1":".----","2":"..---","3":"...--","4":"....-","5":".....","6":"-....","7":"--...","8":"---..","9":"----.",
  ".":".-.-.-",",":"--..--","?":"..--..","!":"-.-.--"," ":"/"
};
const REVERSE: Record<string, string> = {};
for (const [k, v] of Object.entries(MORSE)) REVERSE[v] = k;

function textToMorse(text: string): string {
  return text.toUpperCase().split("").map(c => MORSE[c] || "").filter(Boolean).join(" ");
}
function morseToText(morse: string): string {
  return morse.trim().split(/\s{3,}|\//).map(word =>
    word.trim().split(/\s+/).map(c => REVERSE[c] || "?").join("")
  ).join(" ");
}
export default function MorseCodeDecoder() {
  const [mode, setMode] = useState<"encode"|"decode">("encode");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const output = mode === "encode" ? textToMorse(input) : morseToText(input);
  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1200); };
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["encode","decode"] as const).map(m => (
          <button key={m} onClick={() => { setMode(m); setInput(""); }}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${mode===m?"bg-primary text-primary-foreground":"bg-muted border border-border text-foreground hover:bg-muted/80"}`}>
            {m === "encode" ? "Text → Morse" : "Morse → Text"}
          </button>
        ))}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">{mode === "encode" ? "Text" : "Morse Code"}</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={4}
          placeholder={mode === "encode" ? "Type text to encode..." : "Enter morse code (e.g. .... . .-.. .-.. ---)"}
          className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground font-mono placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>
      {output && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-foreground">{mode === "encode" ? "Morse Code" : "Decoded Text"}</label>
            <button onClick={copy} className="text-xs text-primary hover:underline">{copied ? "Copied!" : "Copy"}</button>
          </div>
          <pre className="w-full rounded-lg border border-border bg-muted px-3 py-3 text-sm text-foreground font-mono whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
}
