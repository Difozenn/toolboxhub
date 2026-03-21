"use client";
import { useState, useEffect } from "react";

const STORAGE_KEY = "toolboxhub-notepad";

export default function NotePad() {
  const [text, setText] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setText(saved);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, text);
  }, [text, loaded]);

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;

  const download = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "notes.txt";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e => setText(e.target.value)} rows={14} placeholder="Start typing your notes..."
        className="w-full rounded-lg border border-border bg-muted px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-mono text-sm leading-relaxed" />
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{words} words &middot; {chars} characters</p>
        <div className="flex gap-2">
          <button onClick={download} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">Download</button>
          <button onClick={() => setText("")} className="rounded-lg border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/80">Clear</button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">Auto-saved to your browser. Notes persist between sessions.</p>
    </div>
  );
}
