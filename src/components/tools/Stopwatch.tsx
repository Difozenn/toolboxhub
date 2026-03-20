"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface Lap {
  number: number;
  lapTime: number;
  totalTime: number;
}

function formatTime(ms: number): string {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const millis = Math.floor((ms % 1000) / 10);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(millis).padStart(2, "0")}`;
}

function formatLapTime(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const millis = Math.floor((ms % 1000) / 10);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(millis).padStart(2, "0")}`;
}

export default function Stopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const [copied, setCopied] = useState(false);
  const startTimeRef = useRef(0);
  const elapsedBeforePauseRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  const tick = useCallback(() => {
    setElapsed(Date.now() - startTimeRef.current + elapsedBeforePauseRef.current);
    animFrameRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const start = useCallback(() => {
    startTimeRef.current = Date.now();
    setRunning(true);
    animFrameRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const stop = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    elapsedBeforePauseRef.current = elapsed;
    setRunning(false);
  }, [elapsed]);

  const reset = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setRunning(false);
    setElapsed(0);
    elapsedBeforePauseRef.current = 0;
    startTimeRef.current = 0;
    setLaps([]);
  }, []);

  const lap = useCallback(() => {
    const lastLapTotal = laps.length > 0 ? laps[0].totalTime : 0;
    const lapTime = elapsed - lastLapTotal;
    setLaps((prev) => [
      { number: prev.length + 1, lapTime, totalTime: elapsed },
      ...prev,
    ]);
  }, [elapsed, laps]);

  const exportLaps = useCallback(async () => {
    if (laps.length === 0) return;
    const sorted = [...laps].reverse();
    const text = [
      "Lap\tLap Time\tTotal Time",
      ...sorted.map(
        (l) => `${l.number}\t${formatLapTime(l.lapTime)}\t${formatTime(l.totalTime)}`
      ),
    ].join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [laps]);

  // Find best/worst laps
  const bestLap = laps.length > 1 ? Math.min(...laps.map((l) => l.lapTime)) : null;
  const worstLap = laps.length > 1 ? Math.max(...laps.map((l) => l.lapTime)) : null;

  return (
    <div className="space-y-6">
      {/* Display */}
      <div className="rounded-xl border border-border bg-muted p-8 text-center">
        <p className="text-5xl sm:text-6xl font-bold font-mono text-foreground tabular-nums tracking-tight">
          {formatTime(elapsed)}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        {!running ? (
          <button
            onClick={start}
            className="rounded-lg bg-primary px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            {elapsed === 0 ? "Start" : "Resume"}
          </button>
        ) : (
          <button
            onClick={stop}
            className="rounded-lg bg-primary px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Stop
          </button>
        )}
        {running && (
          <button
            onClick={lap}
            className="rounded-lg border border-border bg-muted px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/10"
          >
            Lap
          </button>
        )}
        <button
          onClick={reset}
          disabled={elapsed === 0}
          className="rounded-lg border border-border bg-muted px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/10 disabled:opacity-50"
        >
          Reset
        </button>
      </div>

      {/* Laps */}
      {laps.length > 0 && (
        <div className="rounded-xl border border-border bg-muted p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">
              Laps ({laps.length})
            </h3>
            <button
              onClick={exportLaps}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-primary/10"
            >
              {copied ? "Copied!" : "Export Laps"}
            </button>
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 px-2 text-left text-xs font-medium text-muted-foreground">
                    Lap
                  </th>
                  <th className="py-2 px-2 text-right text-xs font-medium text-muted-foreground">
                    Lap Time
                  </th>
                  <th className="py-2 px-2 text-right text-xs font-medium text-muted-foreground">
                    Total Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {laps.map((l) => (
                  <tr
                    key={l.number}
                    className={`border-b border-border/50 ${
                      l.lapTime === bestLap
                        ? "bg-green-500/5"
                        : l.lapTime === worstLap
                        ? "bg-red-500/5"
                        : ""
                    }`}
                  >
                    <td className="py-1.5 px-2 text-foreground">
                      {l.number}
                      {l.lapTime === bestLap && laps.length > 1 && (
                        <span className="ml-1.5 text-[10px] text-green-500 font-medium">Best</span>
                      )}
                      {l.lapTime === worstLap && laps.length > 1 && (
                        <span className="ml-1.5 text-[10px] text-red-500 font-medium">Worst</span>
                      )}
                    </td>
                    <td className="py-1.5 px-2 text-right font-mono text-foreground tabular-nums">
                      {formatLapTime(l.lapTime)}
                    </td>
                    <td className="py-1.5 px-2 text-right font-mono text-muted-foreground tabular-nums">
                      {formatTime(l.totalTime)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
