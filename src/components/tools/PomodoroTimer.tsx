"use client";
import { useState, useEffect, useRef, useCallback } from "react";

type Phase = "work" | "short-break" | "long-break";

export default function PomodoroTimer() {
  const [workMin, setWorkMin] = useState(25);
  const [shortBreakMin, setShortBreakMin] = useState(5);
  const [longBreakMin, setLongBreakMin] = useState(15);
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState<Phase>("work");
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalForPhase = useCallback((p: Phase) => {
    if (p === "work") return workMin * 60;
    if (p === "short-break") return shortBreakMin * 60;
    return longBreakMin * 60;
  }, [workMin, shortBreakMin, longBreakMin]);

  useEffect(() => {
    if (!running) { if (intervalRef.current) clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          setRunning(false);
          if (phase === "work") {
            const next = (sessions + 1) % 4 === 0 ? "long-break" : "short-break";
            setSessions(c => c + 1);
            setPhase(next);
            return totalForPhase(next);
          } else {
            setPhase("work");
            return totalForPhase("work");
          }
        }
        return s - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, phase, sessions, totalForPhase]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const pct = ((totalForPhase(phase) - seconds) / totalForPhase(phase)) * 100;

  const reset = () => { setRunning(false); setPhase("work"); setSeconds(workMin * 60); setSessions(0); };

  const phaseLabel = phase === "work" ? "Focus" : phase === "short-break" ? "Short Break" : "Long Break";
  const phaseColor = phase === "work" ? "text-primary" : phase === "short-break" ? "text-green-500" : "text-blue-500";

  return (
    <div className="space-y-6 text-center">
      <p className={`text-lg font-semibold ${phaseColor}`}>{phaseLabel}</p>
      <div className="relative mx-auto w-48 h-48 flex items-center justify-center">
        <svg className="absolute inset-0" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-muted" strokeWidth="6" />
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className={phaseColor} strokeWidth="6"
            strokeDasharray={`${2 * Math.PI * 45}`} strokeDashoffset={`${2 * Math.PI * 45 * (1 - pct / 100)}`}
            strokeLinecap="round" transform="rotate(-90 50 50)" />
        </svg>
        <span className="text-4xl font-bold text-foreground">{mm}:{ss}</span>
      </div>
      <div className="flex justify-center gap-3">
        <button onClick={() => setRunning(!running)} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          {running ? "Pause" : "Start"}
        </button>
        <button onClick={reset} className="rounded-lg border border-border bg-muted px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/80">Reset</button>
      </div>
      <p className="text-sm text-muted-foreground">Sessions completed: {sessions}</p>
      <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
        <div>
          <label className="text-xs text-muted-foreground">Work (min)</label>
          <input type="number" value={workMin} onChange={e => { const v = +e.target.value || 1; setWorkMin(v); if (!running && phase === "work") setSeconds(v * 60); }} min={1} max={90}
            className="w-full rounded-lg border border-border bg-muted px-2 py-1 text-center text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Short (min)</label>
          <input type="number" value={shortBreakMin} onChange={e => { const v = +e.target.value || 1; setShortBreakMin(v); if (!running && phase === "short-break") setSeconds(v * 60); }} min={1} max={30}
            className="w-full rounded-lg border border-border bg-muted px-2 py-1 text-center text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Long (min)</label>
          <input type="number" value={longBreakMin} onChange={e => { const v = +e.target.value || 1; setLongBreakMin(v); if (!running && phase === "long-break") setSeconds(v * 60); }} min={1} max={60}
            className="w-full rounded-lg border border-border bg-muted px-2 py-1 text-center text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
      </div>
    </div>
  );
}
