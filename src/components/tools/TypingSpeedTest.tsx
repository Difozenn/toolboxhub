"use client";

import { useState, useRef, useEffect } from "react";

const TEXTS = [
  "The quick brown fox jumps over the lazy dog and continues to run through the forest at an impressive speed.",
  "Learning to type faster requires consistent practice and proper finger placement on the keyboard home row.",
  "Technology advances rapidly and those who adapt quickly will find themselves at an advantage in the modern workplace.",
];

export default function TypingSpeedTest() {
  const [textIdx, setTextIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const startRef = useRef<number>(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const target = TEXTS[textIdx];

  useEffect(() => { if (started && !finished) inputRef.current?.focus(); }, [started, finished]);

  const handleChange = (val: string) => {
    if (!started) { setStarted(true); startRef.current = Date.now(); }
    setTyped(val);
    if (val.length >= target.length) {
      const elapsed = (Date.now() - startRef.current) / 1000 / 60;
      const words = target.split(" ").length;
      setWpm(Math.round(words / elapsed));
      const correct = val.split("").filter((c, i) => c === target[i]).length;
      setAccuracy(Math.round((correct / target.length) * 100));
      setFinished(true);
    }
  };

  const reset = () => { setTyped(""); setStarted(false); setFinished(false); setWpm(0); setAccuracy(0); };
  const next = () => { setTextIdx((i) => (i + 1) % TEXTS.length); reset(); };

  const renderTarget = () => {
    return target.split("").map((char, i) => {
      let cls = "text-muted-foreground";
      if (i < typed.length) cls = typed[i] === char ? "text-green-600 dark:text-green-400" : "bg-red-200 dark:bg-red-900 text-red-700 dark:text-red-400 rounded";
      else if (i === typed.length) cls = "bg-primary/20 text-foreground rounded";
      return <span key={i} className={cls}>{char}</span>;
    });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-muted p-4 font-mono text-base leading-relaxed">{renderTarget()}</div>
      {!finished ? (
        <textarea
          ref={inputRef}
          value={typed}
          onChange={(e) => handleChange(e.target.value)}
          disabled={finished}
          placeholder="Start typing here..."
          className="h-24 w-full resize-none rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-muted p-6 text-center">
            <p className="text-xs text-muted-foreground">Speed</p>
            <p className="text-4xl font-bold text-primary">{wpm} WPM</p>
          </div>
          <div className="rounded-xl border border-border bg-muted p-6 text-center">
            <p className="text-xs text-muted-foreground">Accuracy</p>
            <p className="text-4xl font-bold text-primary">{accuracy}%</p>
          </div>
        </div>
      )}
      <div className="flex gap-2">
        <button onClick={reset} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted">Restart</button>
        <button onClick={next} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted">Next Text</button>
      </div>
    </div>
  );
}
