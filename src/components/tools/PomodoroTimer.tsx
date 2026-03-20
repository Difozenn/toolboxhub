"use client";

import { useState, useEffect, useCallback, useRef } from "react";

type Phase = "work" | "shortBreak" | "longBreak";

function playBeep() {
  try {
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.frequency.value = 800;
    oscillator.type = "sine";
    gain.gain.value = 0.3;
    oscillator.start();
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    oscillator.stop(ctx.currentTime + 0.8);

    // Second beep
    setTimeout(() => {
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.frequency.value = 1000;
      osc2.type = "sine";
      gain2.gain.value = 0.3;
      osc2.start();
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);
      osc2.stop(ctx.currentTime + 1.0);
    }, 300);
  } catch {
    // Audio not available
  }
}

export default function PomodoroTimer() {
  const [workDuration, setWorkDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);
  const [sessionsBeforeLong, setSessionsBeforeLong] = useState(4);

  const [phase, setPhase] = useState<Phase>("work");
  const [timeLeft, setTimeLeft] = useState(25 * 60); // in seconds
  const [running, setRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSeconds = (() => {
    switch (phase) {
      case "work": return workDuration * 60;
      case "shortBreak": return shortBreakDuration * 60;
      case "longBreak": return longBreakDuration * 60;
    }
  })();

  const progressPercent = totalSeconds > 0 ? ((totalSeconds - timeLeft) / totalSeconds) * 100 : 0;

  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }

    if (running && timeLeft === 0) {
      playBeep();
      setRunning(false);

      // Auto-advance
      if (phase === "work") {
        const newCount = sessionCount + 1;
        setSessionCount(newCount);
        if (newCount % sessionsBeforeLong === 0) {
          setPhase("longBreak");
          setTimeLeft(longBreakDuration * 60);
        } else {
          setPhase("shortBreak");
          setTimeLeft(shortBreakDuration * 60);
        }
      } else {
        setPhase("work");
        setTimeLeft(workDuration * 60);
      }
    }
  }, [running, timeLeft, phase, sessionCount, sessionsBeforeLong, workDuration, shortBreakDuration, longBreakDuration]);

  const toggleRunning = useCallback(() => {
    setRunning((r) => !r);
  }, []);

  const reset = useCallback(() => {
    setRunning(false);
    setPhase("work");
    setTimeLeft(workDuration * 60);
    setSessionCount(0);
  }, [workDuration]);

  const skipPhase = useCallback(() => {
    setRunning(false);
    if (phase === "work") {
      const newCount = sessionCount + 1;
      setSessionCount(newCount);
      if (newCount % sessionsBeforeLong === 0) {
        setPhase("longBreak");
        setTimeLeft(longBreakDuration * 60);
      } else {
        setPhase("shortBreak");
        setTimeLeft(shortBreakDuration * 60);
      }
    } else {
      setPhase("work");
      setTimeLeft(workDuration * 60);
    }
  }, [phase, sessionCount, sessionsBeforeLong, workDuration, shortBreakDuration, longBreakDuration]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const phaseLabel =
    phase === "work" ? "Focus" : phase === "shortBreak" ? "Short Break" : "Long Break";
  const phaseColor =
    phase === "work" ? "text-primary" : phase === "shortBreak" ? "text-green-500" : "text-blue-500";
  const ringColor =
    phase === "work" ? "stroke-primary" : phase === "shortBreak" ? "stroke-green-500" : "stroke-blue-500";

  // SVG progress ring
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="space-y-6">
      {/* Phase indicator */}
      <div className="flex items-center justify-center gap-2">
        <span className={`text-sm font-bold ${phaseColor}`}>{phaseLabel}</span>
        <span className="text-xs text-muted-foreground">
          Session {sessionCount + (phase === "work" ? 1 : 0)} / {sessionsBeforeLong}
        </span>
      </div>

      {/* Timer display with progress ring */}
      <div className="flex justify-center">
        <div className="relative">
          <svg width="220" height="220" className="-rotate-90">
            <circle
              cx="110"
              cy="110"
              r={radius}
              fill="none"
              strokeWidth="8"
              className="stroke-border"
            />
            <circle
              cx="110"
              cy="110"
              r={radius}
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              className={`${ringColor} transition-all duration-1000`}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold font-mono text-foreground tabular-nums">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </span>
            <span className={`text-xs font-medium ${phaseColor} mt-1`}>{phaseLabel}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={toggleRunning}
          className="rounded-lg bg-primary px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
        >
          {running ? "Pause" : "Start"}
        </button>
        <button
          onClick={skipPhase}
          className="rounded-lg border border-border bg-muted px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/10"
        >
          Skip
        </button>
        <button
          onClick={reset}
          className="rounded-lg border border-border bg-muted px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/10"
        >
          Reset
        </button>
      </div>

      {/* Session dots */}
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: sessionsBeforeLong }, (_, i) => (
          <div
            key={i}
            className={`h-3 w-3 rounded-full transition-colors ${
              i < sessionCount ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </div>

      {/* Settings */}
      <div className="rounded-xl border border-border bg-muted p-4">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="flex w-full items-center justify-between text-sm font-medium text-foreground"
        >
          Settings
          <span className="text-muted-foreground">{showSettings ? "\u25B2" : "\u25BC"}</span>
        </button>

        {showSettings && (
          <div className="mt-4 space-y-4">
            {[
              {
                label: "Work Duration (min)",
                value: workDuration,
                onChange: (v: number) => {
                  setWorkDuration(v);
                  if (phase === "work" && !running) setTimeLeft(v * 60);
                },
              },
              {
                label: "Short Break (min)",
                value: shortBreakDuration,
                onChange: (v: number) => {
                  setShortBreakDuration(v);
                  if (phase === "shortBreak" && !running) setTimeLeft(v * 60);
                },
              },
              {
                label: "Long Break (min)",
                value: longBreakDuration,
                onChange: (v: number) => {
                  setLongBreakDuration(v);
                  if (phase === "longBreak" && !running) setTimeLeft(v * 60);
                },
              },
              {
                label: "Sessions Before Long Break",
                value: sessionsBeforeLong,
                onChange: setSessionsBeforeLong,
              },
            ].map((setting) => (
              <div key={setting.label} className="flex items-center justify-between">
                <label className="text-sm text-foreground">{setting.label}</label>
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={setting.value}
                  onChange={(e) => setting.onChange(Math.max(1, Number(e.target.value)))}
                  className="w-20 rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground text-center focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
