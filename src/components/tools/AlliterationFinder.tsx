"use client";

import { useState } from "react";

interface Group { letter: string; words: string[]; startIndex: number }

function findAlliteration(text: string): Group[] {
  const tokens = text.match(/\b[a-zA-Z]+\b/g) || [];
  const groups: Group[] = [];
  let i = 0;

  while (i < tokens.length) {
    const letter = tokens[i][0].toLowerCase();
    let j = i + 1;
    while (j < tokens.length && tokens[j][0].toLowerCase() === letter) j++;
    if (j - i >= 2) {
      groups.push({ letter: letter.toUpperCase(), words: tokens.slice(i, j), startIndex: i });
      i = j;
    } else {
      i++;
    }
  }
  return groups;
}

export default function AlliterationFinder() {
  const [text, setText] = useState("");

  const groups = text.trim() ? findAlliteration(text) : [];

  const highlighted = text ? (() => {
    let result = text;
    groups.forEach(({ words }) => {
      words.forEach((w) => {
        const re = new RegExp(`\\b${w}\\b`);
        result = result.replace(re, `<mark class="bg-primary/20 text-primary rounded px-0.5 font-semibold">${w}</mark>`);
      });
    });
    return result;
  })() : "";

  return (
    <div className="space-y-6">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text to find alliterative words..."
        className="h-36 w-full resize-y rounded-xl border border-border bg-muted p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />

      {text.trim() && (
        <>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-muted p-4">
            <span className="text-2xl font-bold text-primary">{groups.length}</span>
            <p className="text-sm text-foreground">alliterative group{groups.length !== 1 ? "s" : ""} found</p>
          </div>
          {groups.length > 0 && (
            <>
              <div className="rounded-xl border border-border bg-muted p-4">
                <p className="text-xs font-semibold text-muted-foreground mb-2">Highlighted alliteration</p>
                <div className="text-sm text-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: highlighted }} />
              </div>
              <div className="space-y-2">
                {groups.map((g, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-muted p-3">
                    <span className="text-lg font-bold text-primary w-6">{g.letter}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {g.words.map((w, j) => <span key={j} className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{w}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
