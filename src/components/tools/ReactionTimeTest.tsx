"use client";

import { useState, useEffect, useRef } from "react";

type State = "waiting" | "ready" | "go" | "result" | "toosoon";

export default function ReactionTimeTest() {
  const [state, setState] = useState<State>("waiting");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const startRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const handleClick = () => {
    if (state === "waiting") {
      setState("ready");
      const delay = 2000 + Math.random() * 3000;
      timerRef.current = setTimeout(() => {
        setState("go");
        startRef.current = performance.now();
      }, delay);
    } else if (state === "ready") {
      if (timerRef.current) clearTimeout(timerRef.current);
      setState("toosoon");
    } else if (state === "go") {
      const rt = Math.round(performance.now() - startRef.current);
      setReactionTime(rt);
      setHistory(prev => [...prev.slice(-9), rt]);
      setState("result");
    } else {
      setState("waiting");
      setReactionTime(null);
    }
  };

  const rating = (ms: number) => ms < 200 ? "Superhuman!" : ms < 250 ? "Excellent" : ms < 300 ? "Great" : ms < 400 ? "Average" : "Keep practicing";
  const avg = history.length ? Math.round(history.reduce((a, b) => a + b, 0) / history.length) : null;

  const bg = state === "go" ? "bg-green-500" : state === "ready" ? "bg-yellow-500" : state === "toosoon" ? "bg-red-500" : "bg-muted";
  const textColor = ["go", "ready", "toosoon"].includes(state) ? "text-white" : "text-foreground";

  return (
    <div className="space-y-6">
      <button onClick={handleClick}
        className={`w-full rounded-xl border border-border p-16 text-center transition-colors select-none cursor-pointer ${bg}`}>
        <p className={`text-2xl font-bold ${textColor}`}>
          {state === "waiting" && "Click to Start"}
          {state === "ready" && "Wait for Green..."}
          {state === "go" && "CLICK NOW!"}
          {state === "toosoon" && "Too soon! Click to retry."}
          {state === "result" && `${reactionTime} ms — ${rating(reactionTime!)}`}
        </p>
        {state === "result" && <p className={`mt-2 text-sm ${textColor} opacity-80`}>Click to try again</p>}
      </button>

      {history.length > 0 && (
        <div className="rounded-xl border border-border bg-muted p-5 space-y-3">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-foreground">Recent Results</span>
            {avg && <span className="text-sm text-muted-foreground">Avg: {avg} ms</span>}
          </div>
          <div className="flex flex-wrap gap-2">
            {history.map((t, i) => (
              <span key={i} className="rounded-lg bg-background border border-border px-3 py-1 text-sm font-mono text-foreground">{t} ms</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
