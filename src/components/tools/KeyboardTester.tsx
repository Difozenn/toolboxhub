"use client";

import { useState, useEffect } from "react";

const LAYOUT = [
  ["Escape","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12"],
  ["`","1","2","3","4","5","6","7","8","9","0","-","=","Backspace"],
  ["Tab","q","w","e","r","t","y","u","i","o","p","[","]","\\"],
  ["CapsLock","a","s","d","f","g","h","j","k","l",";","'","Enter"],
  ["Shift","z","x","c","v","b","n","m",",",".","/","Shift"],
  ["Control","Alt","Meta"," ","Alt","Control"],
];

export default function KeyboardTester() {
  const [pressed, setPressed] = useState<Set<string>>(new Set());
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      e.preventDefault();
      const key = e.key === " " ? " " : e.key;
      setPressed((prev) => new Set([...prev, key.toLowerCase()]));
      setHistory((prev) => [key === " " ? "Space" : key, ...prev.slice(0, 19)]);
    };
    const up = (e: KeyboardEvent) => {
      const key = e.key === " " ? " " : e.key;
      setPressed((prev) => { const next = new Set(prev); next.delete(key.toLowerCase()); return next; });
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, []);

  const isPressed = (key: string) => pressed.has(key.toLowerCase());

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-muted p-3 text-sm text-muted-foreground text-center">
        Press any key to test it. Keys turn blue when pressed.
      </div>
      <div className="overflow-auto space-y-1 p-2">
        {LAYOUT.map((row, ri) => (
          <div key={ri} className="flex gap-1 justify-center">
            {row.map((key, ki) => (
              <div key={ki}
                className={`rounded-lg border px-2 py-2 text-center text-xs font-medium min-w-[2rem] transition-colors ${isPressed(key) ? "border-primary bg-primary text-white" : "border-border bg-background text-foreground"} ${key === " " ? "flex-1 min-w-[8rem]" : ""} ${["Backspace","CapsLock","Enter","Shift","Tab"].includes(key) ? "min-w-[4rem]" : ""}`}>
                {key === " " ? "Space" : key}
              </div>
            ))}
          </div>
        ))}
      </div>
      {history.length > 0 && (
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Last pressed:</p>
          <div className="flex flex-wrap gap-1">
            {history.map((k, i) => <span key={i} className="rounded border border-border bg-muted px-2 py-0.5 text-xs font-mono text-foreground">{k}</span>)}
          </div>
        </div>
      )}
    </div>
  );
}
