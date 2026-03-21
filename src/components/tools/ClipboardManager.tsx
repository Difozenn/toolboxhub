"use client";

import { useState, useEffect } from "react";

interface ClipItem { id: number; text: string; label: string; }

export default function ClipboardManager() {
  const [items, setItems] = useState<ClipItem[]>(() => { try { return JSON.parse(localStorage.getItem("clipboard-mgr") || "[]"); } catch { return []; } });
  const [text, setText] = useState("");
  const [label, setLabel] = useState("");
  const [copied, setCopied] = useState<number | null>(null);

  useEffect(() => { localStorage.setItem("clipboard-mgr", JSON.stringify(items)); }, [items]);

  const add = () => {
    if (!text.trim()) return;
    const item: ClipItem = { id: Date.now(), text, label: label || text.slice(0, 30) + (text.length > 30 ? "..." : "") };
    setItems([item, ...items]);
    setText("");
    setLabel("");
  };

  const fromClipboard = async () => {
    try {
      const t = await navigator.clipboard.readText();
      if (t) { setText(t); }
    } catch { alert("Clipboard access denied"); }
  };

  const copy = async (item: ClipItem) => {
    await navigator.clipboard.writeText(item.text);
    setCopied(item.id);
    setTimeout(() => setCopied(null), 1500);
  };

  const remove = (id: number) => setItems(items.filter((i) => i.id !== id));

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Text to Save</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3}
            placeholder="Paste or type text to save..."
            className="w-full resize-none rounded-xl border border-border bg-muted p-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
        </div>
        <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Label (optional)"
          className="w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
        <div className="flex gap-2">
          <button onClick={add} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">Save</button>
          <button onClick={fromClipboard} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted">Paste from Clipboard</button>
          {items.length > 0 && <button onClick={() => { setItems([]); localStorage.removeItem("clipboard-mgr"); }} className="ml-auto text-xs text-muted-foreground hover:text-red-500">Clear All</button>}
        </div>
      </div>
      <div className="space-y-2 max-h-64 overflow-auto">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No saved items yet.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-start gap-2 rounded-xl border border-border bg-muted p-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-muted-foreground mb-1">{item.label}</p>
                <p className="text-sm text-foreground break-all line-clamp-2">{item.text}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-1">
                <button onClick={() => copy(item)} className="rounded border border-border bg-background px-2 py-0.5 text-xs text-foreground hover:bg-primary hover:text-white">{copied === item.id ? "Copied!" : "Copy"}</button>
                <button onClick={() => remove(item.id)} className="text-xs text-muted-foreground hover:text-red-500">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
