"use client";

import { useState, useEffect, useRef } from "react";

export default function StudyTimer() {
  const [studyMin, setStudyMin] = useState(25);
  const [breakMin, setBreakMin] = useState(5);
  const [mode, setMode] = useState<"study" | "break">("study");
  const [running, setRunning] = useState(false);
  const [remaining, setRemaining] = useState(25 * 60);
  const [totalStudy, setTotalStudy] = useState(() => { try { return parseInt(localStorage.getItem("study-total") || "0"); } catch { return 0; } });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            const next = mode === "study" ? "break" : "study";
            if (mode === "study") {
              const newTotal = totalStudy + studyMin * 60;
              setTotalStudy(newTotal);
              localStorage.setItem("study-total", String(newTotal));
            }
            setMode(next);
            return (next === "study" ? studyMin : breakMin) * 60;
          }
          return r - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, mode, studyMin, breakMin, totalStudy]);

  const reset = () => { setRunning(false); setMode("study"); setRemaining(studyMin * 60); };
  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const fmtHMS = (s: number) => { const h = Math.floor(s / 3600); const m = Math.floor((s % 3600) / 60); return h > 0 ? `${h}h ${m}m` : `${m}m`; };
  const progress = mode === "study" ? 1 - remaining / (studyMin * 60) : 1 - remaining / (breakMin * 60);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1"><label className="text-sm font-medium text-muted-foreground">Study (min)</label><input type="number" min={1} max={120} value={studyMin} disabled={running} onChange={(e) => { setStudyMin(Number(e.target.value)); if (mode === "study") setRemaining(Number(e.target.value) * 60); }} className="w-full rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none disabled:opacity-50" /></div>
        <div className="space-y-1"><label className="text-sm font-medium text-muted-foreground">Break (min)</label><input type="number" min={1} max={60} value={breakMin} disabled={running} onChange={(e) => setBreakMin(Number(e.target.value))} className="w-full rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none disabled:opacity-50" /></div>
      </div>
      <div className="rounded-xl border border-border bg-muted p-8 text-center space-y-4">
        <p className={`text-sm font-semibold uppercase tracking-wide ${mode === "study" ? "text-primary" : "text-green-600 dark:text-green-400"}`}>{mode === "study" ? "Study Time" : "Break Time"}</p>
        <p className="font-mono text-6xl font-bold text-foreground">{fmt(remaining)}</p>
        <div className="h-2 rounded-full bg-border overflow-hidden">
          <div className={`h-full rounded-full transition-all ${mode === "study" ? "bg-primary" : "bg-green-500"}`} style={{ width: `${progress * 100}%` }} />
        </div>
        <div className="flex justify-center gap-3">
          <button onClick={() => setRunning((v) => !v)} className={`rounded-lg px-6 py-2 text-sm font-medium text-white transition-colors ${running ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:opacity-90"}`}>{running ? "Pause" : "Start"}</button>
          <button onClick={reset} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted">Reset</button>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-xl border border-border bg-muted px-4 py-3">
        <span className="text-sm text-muted-foreground">Total Study Time Today</span>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-primary">{fmtHMS(totalStudy)}</span>
          <button onClick={() => { setTotalStudy(0); localStorage.removeItem("study-total"); }} className="text-xs text-muted-foreground hover:text-red-500">Reset</button>
        </div>
      </div>
    </div>
  );
}
