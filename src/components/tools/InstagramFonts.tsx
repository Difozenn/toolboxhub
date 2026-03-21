"use client";

import { useState } from "react";

function convertBold(text: string): string {
  return text.replace(/[A-Za-z]/g, (c) => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d5d4 + code - 65);
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d5ee + code - 97);
    return c;
  });
}
function convertItalic(text: string): string {
  return text.replace(/[A-Za-z]/g, (c) => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d608 + code - 65);
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d622 + code - 97);
    return c;
  });
}
function convertBoldItalic(text: string): string {
  return text.replace(/[A-Za-z]/g, (c) => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d63c + code - 65);
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d656 + code - 97);
    return c;
  });
}
function convertScript(text: string): string {
  const map: Record<string, string> = {
    A:"𝒜",B:"ℬ",C:"𝒞",D:"𝒟",E:"ℰ",F:"ℱ",G:"𝒢",H:"ℋ",I:"ℐ",J:"𝒥",K:"𝒦",L:"ℒ",M:"ℳ",N:"𝒩",O:"𝒪",P:"𝒫",Q:"𝒬",R:"ℛ",S:"𝒮",T:"𝒯",U:"𝒰",V:"𝒱",W:"𝒲",X:"𝒳",Y:"𝒴",Z:"𝒵",
    a:"𝒶",b:"𝒷",c:"𝒸",d:"𝒹",e:"ℯ",f:"𝒻",g:"ℊ",h:"𝒽",i:"𝒾",j:"𝒿",k:"𝓀",l:"𝓁",m:"𝓂",n:"𝓃",o:"ℴ",p:"𝓅",q:"𝓆",r:"𝓇",s:"𝓈",t:"𝓉",u:"𝓊",v:"𝓋",w:"𝓌",x:"𝓍",y:"𝓎",z:"𝓏"
  };
  return text.split("").map((c) => map[c] || c).join("");
}
function convertMono(text: string): string {
  return text.replace(/[A-Za-z0-9]/g, (c) => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d670 + code - 65);
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d68a + code - 97);
    if (code >= 48 && code <= 57) return String.fromCodePoint(0x1d7f6 + code - 48);
    return c;
  });
}
function convertGothic(text: string): string {
  return text.replace(/[A-Za-z]/g, (c) => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d504 + code - 65);
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d51e + code - 97);
    return c;
  });
}

const STYLES = [
  { label: "Bold", fn: convertBold },
  { label: "Italic", fn: convertItalic },
  { label: "Bold Italic", fn: convertBoldItalic },
  { label: "Script", fn: convertScript },
  { label: "Monospace", fn: convertMono },
  { label: "Gothic", fn: convertGothic },
];

export default function InstagramFonts() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="space-y-6">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your text here..."
        className="h-28 w-full resize-y rounded-xl border border-border bg-muted p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <div className="space-y-3">
        {STYLES.map(({ label, fn }) => {
          const result = fn(input || "Preview Text");
          return (
            <div key={label} className="flex items-center justify-between gap-4 rounded-lg border border-border bg-muted p-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">{label}</p>
                <p className="text-base text-foreground break-all">{result}</p>
              </div>
              <button
                onClick={() => copy(result, label)}
                className="shrink-0 rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-primary hover:text-white transition-colors"
              >
                {copied === label ? "Copied!" : "Copy"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
