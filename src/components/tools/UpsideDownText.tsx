"use client";
import { useState } from "react";

const MAP: Record<string,string> = {
  a:"ɐ",b:"q",c:"ɔ",d:"p",e:"ǝ",f:"ɟ",g:"ƃ",h:"ɥ",i:"ᴉ",j:"ɾ",k:"ʞ",l:"l",m:"ɯ",n:"u",o:"o",p:"d",q:"b",r:"ɹ",s:"s",t:"ʇ",u:"n",v:"ʌ",w:"ʍ",x:"x",y:"ʎ",z:"z",
  A:"∀",B:"ᴮ",C:"Ɔ",D:"ᴰ",E:"Ǝ",F:"Ⅎ",G:"פ",H:"H",I:"I",J:"ɾ",K:"ʞ",L:"˥",M:"W",N:"N",O:"O",P:"Ԁ",Q:"Q",R:"ᴚ",S:"S",T:"⊥",U:"∩",V:"Λ",W:"M",X:"X",Y:"⅄",Z:"Z",
  "0":"0","1":"Ɩ","2":"ᄅ","3":"Ɛ","4":"ᔭ","5":"ϛ","6":"9","7":"ㄥ","8":"8","9":"6",
  ".":"˙",",":"'","?":"¿","!":"¡","(":")"," ":" "
};

function flipText(text: string): string {
  return text.split("").reverse().map(c => MAP[c] ?? c).join("");
}

export default function UpsideDownText() {
  const [input, setInput] = useState("");
  const output = flipText(input);

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e=>setInput(e.target.value)} rows={3}
        placeholder="Type text to flip upside down..."
        className="w-full p-3 rounded-xl border border-border bg-muted text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary" />
      <div className="p-3 rounded-xl bg-muted border border-border min-h-[60px] text-foreground break-all text-lg" dir="ltr">
        {output || <span className="text-muted-foreground text-sm">Flipped text appears here...</span>}
      </div>
      <div className="flex gap-2">
        <button onClick={() => navigator.clipboard.writeText(output)} disabled={!output}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
          Copy Flipped Text
        </button>
        <button onClick={() => setInput("")}
          className="px-4 py-2 rounded-lg bg-muted border border-border text-foreground text-sm font-medium hover:bg-muted/80 transition-colors">
          Clear
        </button>
      </div>
    </div>
  );
}
