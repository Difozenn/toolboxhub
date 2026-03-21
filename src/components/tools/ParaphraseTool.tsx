"use client";

import { useState } from "react";

const SYNONYMS: Record<string, string> = {
  happy: "joyful", big: "large", small: "tiny", fast: "quick", slow: "gradual",
  show: "demonstrate", use: "utilize", get: "obtain", make: "create", help: "assist",
  good: "excellent", bad: "poor", hard: "challenging", easy: "simple", start: "begin",
  end: "conclude", look: "examine", say: "state", need: "require", keep: "maintain",
  give: "provide", find: "discover", know: "understand", think: "consider", see: "observe",
  change: "alter", also: "additionally", but: "however", so: "therefore", very: "extremely",
  often: "frequently", now: "currently", old: "established", new: "novel", many: "numerous",
  few: "limited", great: "significant", important: "crucial", different: "distinct", able: "capable",
  real: "genuine", long: "extended", high: "elevated", clear: "evident", true: "accurate",
  want: "desire", try: "attempt", move: "transfer", work: "function", tell: "inform",
};

function paraphrase(text: string): string {
  return text.replace(/\b(\w+)\b/g, (word) => {
    const lower = word.toLowerCase();
    const syn = SYNONYMS[lower];
    if (!syn) return word;
    return word[0] === word[0].toUpperCase() ? syn.charAt(0).toUpperCase() + syn.slice(1) : syn;
  });
}

export default function ParaphraseTool() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const output = paraphrase(input);

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Original Text</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter your text here..."
            className="h-48 w-full resize-none rounded-xl border border-border bg-muted p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-foreground">Paraphrased</label>
            {output && <button onClick={copy} className="rounded-lg border border-border bg-background px-3 py-1 text-xs font-medium text-foreground hover:bg-primary hover:text-white transition-colors">{copied ? "Copied!" : "Copy"}</button>}
          </div>
          <div className="h-48 overflow-y-auto rounded-xl border border-border bg-muted p-4 text-foreground text-sm leading-relaxed">
            {output || <span className="text-muted-foreground">Paraphrased text will appear here...</span>}
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">Note: Uses synonym substitution. Results may need manual review for context accuracy.</p>
    </div>
  );
}
