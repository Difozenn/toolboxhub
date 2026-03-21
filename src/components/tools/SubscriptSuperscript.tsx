"use client";
import { useState } from "react";

const SUPER: Record<string,string> = {
  "0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹",
  a:"ᵃ",b:"ᵇ",c:"ᶜ",d:"ᵈ",e:"ᵉ",f:"ᶠ",g:"ᵍ",h:"ʰ",i:"ⁱ",j:"ʲ",k:"ᵏ",l:"ˡ",m:"ᵐ",
  n:"ⁿ",o:"ᵒ",p:"ᵖ",r:"ʳ",s:"ˢ",t:"ᵗ",u:"ᵘ",v:"ᵛ",w:"ʷ",x:"ˣ",y:"ʸ",z:"ᶻ"
};
const SUB: Record<string,string> = {
  "0":"₀","1":"₁","2":"₂","3":"₃","4":"₄","5":"₅","6":"₆","7":"₇","8":"₈","9":"₉",
  a:"ₐ",e:"ₑ",h:"ₕ",i:"ᵢ",j:"ⱼ",k:"ₖ",l:"ₗ",m:"ₘ",n:"ₙ",o:"ₒ",p:"ₚ",r:"ᵣ",s:"ₛ",t:"ₜ",u:"ᵤ",v:"ᵥ",x:"ₓ"
};

function convert(text: string, map: Record<string,string>): string {
  return text.split("").map(c => map[c] ?? c).join("");
}

export default function SubscriptSuperscript() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"super"|"sub">("super");
  const output = convert(input, mode === "super" ? SUPER : SUB);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["super","sub"] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode===m?"bg-primary text-primary-foreground":"bg-muted text-foreground hover:bg-muted/80"}`}>
            {m === "super" ? "Superscript x²" : "Subscript x₂"}
          </button>
        ))}
      </div>
      <input value={input} onChange={e=>setInput(e.target.value)}
        placeholder="Enter text to convert..."
        className="w-full p-3 rounded-xl border border-border bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
      <div className="p-3 rounded-xl bg-muted border border-border min-h-[48px] text-foreground text-xl break-all">
        {output || <span className="text-muted-foreground text-sm">Result appears here...</span>}
      </div>
      <button onClick={() => navigator.clipboard.writeText(output)} disabled={!output}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
        Copy Result
      </button>
    </div>
  );
}
