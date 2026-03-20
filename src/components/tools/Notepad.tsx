"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const STORAGE_KEY = "toolboxhub-notepad-content";
const TIMESTAMP_KEY = "toolboxhub-notepad-timestamp";

export default function Notepad() {
  const [text, setText] = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const timestamp = localStorage.getItem(TIMESTAMP_KEY);
      if (saved !== null) setText(saved);
      if (timestamp) setLastSaved(new Date(timestamp));
    } catch {
      // localStorage not available
    }
    setLoaded(true);
  }, []);

  // Auto-save on change
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, text);
      const now = new Date();
      localStorage.setItem(TIMESTAMP_KEY, now.toISOString());
      setLastSaved(now);
    } catch {
      // localStorage full or not available
    }
  }, [text, loaded]);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const lineCount = text ? text.split("\n").length : 0;

  const handleClear = useCallback(() => {
    setShowConfirm(true);
  }, []);

  const confirmClear = useCallback(() => {
    setText("");
    setShowConfirm(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(TIMESTAMP_KEY);
    } catch {
      // ignore
    }
    setLastSaved(null);
  }, []);

  const downloadTxt = useCallback(() => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "notepad.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [text]);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{wordCount} word{wordCount !== 1 ? "s" : ""}</span>
          <span>{charCount} char{charCount !== 1 ? "s" : ""}</span>
          <span>{lineCount} line{lineCount !== 1 ? "s" : ""}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={downloadTxt}
            disabled={!text}
            className="rounded-lg border border-border bg-muted px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-primary/10 disabled:opacity-50"
          >
            Download .txt
          </button>
          <button
            onClick={handleClear}
            disabled={!text}
            className="rounded-lg border border-border bg-muted px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-red-500/10 hover:text-red-500 disabled:opacity-50"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Confirm dialog */}
      {showConfirm && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 flex items-center justify-between">
          <span className="text-sm text-red-600">Are you sure you want to clear the notepad?</span>
          <div className="flex gap-2">
            <button
              onClick={confirmClear}
              className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-600"
            >
              Yes, Clear
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing... Your notes are automatically saved to this browser."
        className="min-h-[400px] w-full resize-y rounded-xl border border-border bg-muted p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-mono text-sm leading-relaxed"
      />

      {/* Last saved */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {lastSaved
            ? `Last saved: ${lastSaved.toLocaleString()}`
            : "Not saved yet"}
        </span>
        <span>Auto-saves on every keystroke</span>
      </div>

      {/* Info */}
      <div className="rounded-xl border border-border bg-muted p-4">
        <h3 className="mb-2 text-sm font-medium text-foreground">Tips</h3>
        <ul className="space-y-1 text-xs text-muted-foreground">
          <li>Your notes are saved automatically to localStorage in this browser</li>
          <li>Use Ctrl+Z / Cmd+Z to undo and Ctrl+Y / Cmd+Shift+Z to redo</li>
          <li>Download your notes as a .txt file for safekeeping</li>
          <li>Notes persist across sessions but are specific to this browser</li>
        </ul>
      </div>
    </div>
  );
}
