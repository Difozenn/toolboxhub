"use client";

import { useState } from "react";

const SYNONYMS: Record<string, string[]> = {
  good: ["great", "excellent", "superb", "fine", "solid"],
  bad: ["poor", "terrible", "awful", "dreadful", "inferior"],
  big: ["large", "enormous", "vast", "massive", "sizable"],
  small: ["tiny", "little", "compact", "petite", "minuscule"],
  happy: ["joyful", "elated", "content", "pleased", "delighted"],
  sad: ["unhappy", "sorrowful", "gloomy", "melancholy", "downcast"],
  fast: ["quick", "swift", "rapid", "speedy", "brisk"],
  slow: ["sluggish", "gradual", "leisurely", "unhurried", "plodding"],
  show: ["display", "reveal", "present", "demonstrate", "exhibit"],
  tell: ["inform", "explain", "describe", "notify", "convey"],
  make: ["create", "build", "produce", "craft", "generate"],
  get: ["obtain", "acquire", "receive", "gain", "secure"],
  use: ["utilize", "employ", "apply", "leverage", "implement"],
  help: ["assist", "support", "aid", "facilitate", "enable"],
  think: ["believe", "consider", "reflect", "ponder", "contemplate"],
  know: ["understand", "realize", "recognize", "comprehend", "grasp"],
};

export default function WordSpinner() {
  const [text, setText] = useState("");
  const [selected, setSelected] = useState<{ word: string; index: number } | null>(null);
  const [output, setOutput] = useState("");

  const words = text.split(/(\s+)/);

  const handleWordClick = (word: string, index: number) => {
    const clean = word.toLowerCase().replace(/[^a-z]/g, "");
    if (SYNONYMS[clean]) setSelected({ word: clean, index });
  };

  const applySynonym = (synonym: string) => {
    if (!selected) return;
    const result = words.map((w, i) => {
      if (i === selected.index) {
        const match = w.match(/^([^a-zA-Z]*)([a-zA-Z]+)([^a-zA-Z]*)$/);
        if (match) return match[1] + synonym + match[3];
      }
      return w;
    }).join("");
    setOutput(result);
    setText(result);
    setSelected(null);
  };

  const synonyms = selected ? SYNONYMS[selected.word] || [] : [];

  return (
    <div className="space-y-5">
      <textarea value={text} onChange={(e) => { setText(e.target.value); setSelected(null); setOutput(""); }}
        placeholder="Type or paste your text here, then click any word to see synonyms..."
        className="h-36 w-full resize-y rounded-xl border border-border bg-muted p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />

      {text.trim() && (
        <div className="rounded-xl border border-border bg-muted p-4">
          <p className="text-xs text-muted-foreground mb-3">Click a word to see synonyms:</p>
          <p className="leading-8 text-foreground flex flex-wrap gap-x-1">
            {words.map((word, i) => {
              const clean = word.toLowerCase().replace(/[^a-z]/g, "");
              const hasSynonyms = !!SYNONYMS[clean];
              return (
                <span key={i} onClick={() => hasSynonyms && handleWordClick(word, i)}
                  className={`rounded px-0.5 transition-colors ${hasSynonyms ? "cursor-pointer bg-primary/10 hover:bg-primary/25 text-primary font-medium" : "text-foreground"} ${selected?.index === i ? "ring-2 ring-primary" : ""}`}>
                  {word}
                </span>
              );
            })}
          </p>
        </div>
      )}

      {selected && synonyms.length > 0 && (
        <div className="rounded-xl border border-border bg-muted p-4 space-y-2">
          <p className="text-sm font-medium text-foreground">Synonyms for <span className="text-primary">"{selected.word}"</span>:</p>
          <div className="flex flex-wrap gap-2">
            {synonyms.map((s) => (
              <button key={s} onClick={() => applySynonym(s)}
                className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground hover:bg-primary hover:text-white transition-colors">
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {output && (
        <div className="flex items-center gap-3">
          <button onClick={() => navigator.clipboard.writeText(output)}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
            Copy Result
          </button>
          <span className="text-xs text-muted-foreground">Word replaced successfully</span>
        </div>
      )}
    </div>
  );
}
