"use client";

import { useState } from "react";

const MISSPELLINGS: Record<string, string> = {
  teh: "the", recieve: "receive", occured: "occurred", seperate: "separate",
  definately: "definitely", accomodate: "accommodate", begining: "beginning",
  beleive: "believe", calender: "calendar", collegue: "colleague",
  dependant: "dependent", existance: "existence", foriegn: "foreign",
  goverment: "government", harrass: "harass", independant: "independent",
  managment: "management", neccessary: "necessary", occassion: "occasion",
  privelege: "privilege",
};

interface Issue { type: string; message: string }

function checkText(text: string): Issue[] {
  const issues: Issue[] = [];
  if (/  +/.test(text)) issues.push({ type: "spacing", message: "Double spaces detected" });
  const sentences = text.split(/(?<=[.!?])\s+/);
  sentences.forEach((s, i) => {
    if (i > 0 && s.length > 0 && s[0] === s[0].toLowerCase() && /[a-z]/.test(s[0]))
      issues.push({ type: "capitalize", message: `Sentence ${i + 1} may not start with a capital letter` });
  });
  const lastChar = text.trimEnd().slice(-1);
  if (text.trim().length > 20 && ![".", "!", "?", '"', "'"].includes(lastChar))
    issues.push({ type: "period", message: "Text may be missing a period or ending punctuation" });
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  words.forEach((w) => {
    if (MISSPELLINGS[w]) issues.push({ type: "spelling", message: `"${w}" → "${MISSPELLINGS[w]}"` });
  });
  return issues;
}

export default function GrammarChecker() {
  const [text, setText] = useState("");
  const issues = text.trim() ? checkText(text) : [];

  return (
    <div className="space-y-6">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste your text here to check for grammar issues..."
        className="h-44 w-full resize-y rounded-xl border border-border bg-muted p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />

      <div className="rounded-xl border border-border bg-muted p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Issues Found</h3>
          <span className={`text-sm font-bold ${issues.length === 0 ? "text-green-500" : "text-red-500"}`}>{issues.length}</span>
        </div>
        {issues.length === 0 && text.trim() && <p className="text-sm text-green-500">No issues detected. Looks good!</p>}
        {issues.length === 0 && !text.trim() && <p className="text-sm text-muted-foreground">Enter some text above to check it.</p>}
        {issues.map((issue, i) => (
          <div key={i} className="flex items-start gap-3 rounded-lg border border-border bg-background p-3">
            <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">{issue.type}</p>
              <p className="text-sm text-foreground">{issue.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
