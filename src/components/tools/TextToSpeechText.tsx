"use client";

import { useState, useRef } from "react";

export default function SsmlGenerator() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertTag = (tag: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = text.slice(start, end);
    let insertion = "";
    switch (tag) {
      case "break": insertion = '<break time="500ms"/>'; break;
      case "emphasis": insertion = `<emphasis level="moderate">${selected || "text"}</emphasis>`; break;
      case "prosody": insertion = `<prosody rate="slow">${selected || "text"}</prosody>`; break;
      case "say-as": insertion = `<say-as interpret-as="characters">${selected || "text"}</say-as>`; break;
      default: insertion = tag;
    }
    const newText = text.slice(0, start) + insertion + text.slice(end);
    setText(newText);
  };

  const output = `<speak>\n  ${text}\n</speak>`;

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {[
          { label: "Break", tag: "break" },
          { label: "Emphasis", tag: "emphasis" },
          { label: "Prosody (rate)", tag: "prosody" },
          { label: "Say-As", tag: "say-as" },
        ].map((btn) => (
          <button key={btn.tag} onClick={() => insertTag(btn.tag)}
            className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white">
            + {btn.label}
          </button>
        ))}
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">Text / SSML Content</label>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your speech text here. Select text, then click a tag button to wrap it."
          spellCheck={false}
          className="h-40 w-full resize-y rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">SSML Output</label>
          <button onClick={copy} className="rounded-lg border border-border bg-background px-3 py-1 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white">{copied ? "Copied!" : "Copy"}</button>
        </div>
        <pre className="rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground whitespace-pre-wrap">{output}</pre>
      </div>
    </div>
  );
}
