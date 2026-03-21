"use client";

import { useState, useEffect, useRef } from "react";

interface Entry { task: string; duration: number; date: string; }

export default function TimeTracker() {
  const [task, setTask] = useState("");
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [history, setHistory] = useState<Entry[]>(() => { try { return JSON.parse(localStorage.getItem("time-tracker") || "[]"); } catch { return []; } });
  const startRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      startRef.current = Date.now() - elapsed * 1000;
      intervalRef.current = setInterval(() => setElapsed(Math.floor((Date.now() - startRef.current) / 1000)), 100);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  const toggle = () => {
    if (running) {
      const entry: Entry = { task: task || "Untitled", duration: elapsed, date: new Date().toLocaleDateString() };
      const updated = [entry, ...history];
      setHistory(updated);
      localStorage.setItem("time-tracker", JSON.stringify(updated));
      setRunning(false);
      setElapsed(0);
    } else {
      setRunning(true);
    }
  };

  const fmt = (s: number) => `${String(Math.floor(s / 3600)).padStart(2, "0")}:${String(Math.floor((s % 3600) / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const total = history.reduce((s, e) => s + e.duration, 0);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-muted p-6 text-center space-y-4">
        <p className="font-mono text-5xl font-bold text-primary">{fmt(elapsed)}</p>
        <input type="text" value={task} onChange={(e) => setTask(e.target.value)} disabled={running}
          placeholder="Task name (optional)"
          className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none disabled:opacity-50" />
        <button onClick={toggle}
          className={`rounded-lg px-8 py-3 text-sm font-medium text-white transition-colors ${running ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:opacity-90"}`}>
          {running ? "Stop & Save" : "Start"}
        </button>
      </div>
      {history.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">History ({history.length} entries)</p>
            <div className="flex gap-2 items-center">
              <span className="text-sm text-muted-foreground">Total: <span className="font-semibold text-primary">{fmt(total)}</span></span>
              <button onClick={() => { setHistory([]); localStorage.removeItem("time-tracker"); }} className="text-xs text-muted-foreground hover:text-red-500">Clear</button>
            </div>
          </div>
          <div className="space-y-1 max-h-48 overflow-auto">
            {history.map((e, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-muted px-3 py-2 text-sm">
                <span className="text-foreground">{e.task}</span>
                <span className="text-xs text-muted-foreground">{e.date}</span>
                <span className="font-mono font-semibold text-primary">{fmt(e.duration)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
