"use client";

import { useState } from "react";

const COMPLEX: Record<string, string> = {
  utilize: "use", commence: "start", terminate: "end", facilitate: "help",
  endeavor: "try", demonstrate: "show", necessitate: "need", subsequently: "then",
  aforementioned: "earlier", approximately: "about", cognizant: "aware",
  consequently: "so", disseminate: "share", elucidate: "explain",
  enumerate: "list", expedite: "speed up", leverage: "use",
  mitigate: "reduce", paramount: "most important", procure: "get",
  promulgate: "publish", remediate: "fix", signify: "mean",
  sufficient: "enough", transparent: "clear", ubiquitous: "everywhere",
  validate: "confirm", viable: "possible", whilst: "while",
};

export default function ReadabilityImprover() {
  const [text, setText] = useState("");
  const [applied, setApplied] = useState(false);

  const suggestions: { original: string; simpler: string }[] = [];
  const words = text.match(/\b\w+\b/g) || [];
  words.forEach((w) => {
    const lower = w.toLowerCase();
    if (COMPLEX[lower] && !suggestions.find((s) => s.original === lower)) {
      suggestions.push({ original: lower, simpler: COMPLEX[lower] });
    }
  });

  const applyAll = () => {
    let result = text;
    suggestions.forEach(({ original, simpler }) => {
      result = result.replace(new RegExp(`\\b${original}\\b`, "gi"), (match) =>
        match[0] === match[0].toUpperCase() ? simpler.charAt(0).toUpperCase() + simpler.slice(1) : simpler
      );
    });
    setText(result);
    setApplied(true);
  };

  return (
    <div className="space-y-5">
      <textarea value={text} onChange={(e) => { setText(e.target.value); setApplied(false); }}
        placeholder="Paste your text here to find complex words and get simpler alternatives..."
        className="h-40 w-full resize-y rounded-xl border border-border bg-muted p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />

      <div className="rounded-xl border border-border bg-muted p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Simplification Suggestions</h3>
          <span className={`text-sm font-bold ${suggestions.length === 0 ? "text-green-500" : "text-yellow-500"}`}>{suggestions.length}</span>
        </div>

        {!text.trim() && <p className="text-sm text-muted-foreground">Enter text above to check for complex words.</p>}
        {text.trim() && suggestions.length === 0 && !applied && <p className="text-sm text-green-500">No complex words detected. Your text is already clear!</p>}
        {applied && <p className="text-sm text-green-500">Simplifications applied successfully.</p>}

        {suggestions.map((s) => (
          <div key={s.original} className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-red-500">{s.original}</span>
              <span className="text-muted-foreground">→</span>
              <span className="text-sm font-medium text-green-500">{s.simpler}</span>
            </div>
          </div>
        ))}
      </div>

      {suggestions.length > 0 && (
        <button onClick={applyAll}
          className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
          Apply All Simplifications
        </button>
      )}
    </div>
  );
}
