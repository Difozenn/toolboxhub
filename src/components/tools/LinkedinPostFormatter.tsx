"use client";

import { useState } from "react";

function toBoldUnicode(text: string): string {
  return text.replace(/[A-Za-z0-9]/g, (c) => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d5d4 + code - 65);
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d5ee + code - 97);
    if (code >= 48 && code <= 57) return String.fromCodePoint(0x1d7ec + code - 48);
    return c;
  });
}

export default function LinkedinPostFormatter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const addBullets = () => {
    const lines = text.split("\n").map((l) => l.trim() ? `• ${l.trim()}` : l);
    setText(lines.join("\n"));
  };

  const addLineBreaks = () => {
    setText(text.split("\n").join("\n\n"));
  };

  const makeBold = () => {
    const sel = window.getSelection()?.toString();
    if (sel) setText(text.replace(sel, toBoldUnicode(sel)));
    else setText(toBoldUnicode(text));
  };

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">Your Post</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write or paste your LinkedIn post here..."
          className="h-44 w-full resize-y rounded-xl border border-border bg-muted p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={makeBold} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-primary hover:text-white transition-colors">Bold Text</button>
        <button onClick={addBullets} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-primary hover:text-white transition-colors">Add Bullets</button>
        <button onClick={addLineBreaks} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-primary hover:text-white transition-colors">Add Line Breaks</button>
        <button onClick={() => setText("")} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-destructive hover:text-white transition-colors">Clear</button>
      </div>

      {text && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">Preview</p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">{text.length}/3000</span>
              <button onClick={copy} className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-primary hover:text-white transition-colors">{copied ? "Copied!" : "Copy"}</button>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-muted p-4 whitespace-pre-wrap text-foreground text-sm leading-relaxed min-h-[80px]">
            {text}
          </div>
        </div>
      )}
    </div>
  );
}
