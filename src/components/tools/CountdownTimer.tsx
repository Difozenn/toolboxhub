"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function getTimeLeft(target: Date): TimeLeft {
  const total = target.getTime() - Date.now();
  if (total <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };

  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
    total,
  };
}

const QUICK_TIMERS = [
  { label: "5 min", minutes: 5 },
  { label: "10 min", minutes: 10 },
  { label: "15 min", minutes: 15 },
  { label: "30 min", minutes: 30 },
  { label: "1 hour", minutes: 60 },
];

export default function CountdownTimer() {
  const [mode, setMode] = useState<"date" | "quick">("quick");
  const [eventTitle, setEventTitle] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [targetTime, setTargetTime] = useState("");
  const [target, setTarget] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!target) return;

    const update = () => {
      const tl = getTimeLeft(target);
      setTimeLeft(tl);
      if (tl.total <= 0) {
        setFinished(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    };

    update();
    intervalRef.current = setInterval(update, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [target]);

  const startDateCountdown = useCallback(() => {
    if (!targetDate) return;
    const dateStr = targetTime ? `${targetDate}T${targetTime}` : `${targetDate}T00:00:00`;
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return;
    setTarget(d);
    setFinished(false);
  }, [targetDate, targetTime]);

  const startQuickTimer = useCallback(
    (minutes: number) => {
      const d = new Date(Date.now() + minutes * 60 * 1000);
      setTarget(d);
      setFinished(false);
      setEventTitle(eventTitle || `${minutes} minute timer`);
    },
    [eventTitle]
  );

  const reset = useCallback(() => {
    setTarget(null);
    setTimeLeft(null);
    setFinished(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const displayTitle = eventTitle || "Countdown";

  return (
    <div className="space-y-6">
      {/* Title input */}
      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Event Title (optional)
          </label>
          <input
            type="text"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            placeholder="My Birthday, Product Launch, etc."
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Mode toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setMode("quick")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              mode === "quick"
                ? "bg-primary text-white"
                : "border border-border bg-background text-foreground hover:bg-primary/10"
            }`}
          >
            Quick Timer
          </button>
          <button
            onClick={() => setMode("date")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              mode === "date"
                ? "bg-primary text-white"
                : "border border-border bg-background text-foreground hover:bg-primary/10"
            }`}
          >
            Target Date
          </button>
        </div>

        {mode === "quick" ? (
          <div className="flex flex-wrap gap-2">
            {QUICK_TIMERS.map((qt) => (
              <button
                key={qt.label}
                onClick={() => startQuickTimer(qt.minutes)}
                className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
              >
                {qt.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Date</label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  Time (optional)
                </label>
                <input
                  type="time"
                  value={targetTime}
                  onChange={(e) => setTargetTime(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            <button
              onClick={startDateCountdown}
              disabled={!targetDate}
              className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-50"
            >
              Start Countdown
            </button>
          </div>
        )}
      </div>

      {/* Countdown display */}
      {target && timeLeft && (
        <div className="rounded-xl border border-border bg-muted p-6 text-center space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">{displayTitle}</h3>

          {finished ? (
            <div className="space-y-2">
              <p className="text-3xl font-bold text-primary">Time&apos;s Up!</p>
              <p className="text-sm text-muted-foreground">The countdown has finished.</p>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3 sm:gap-6">
              {[
                { value: timeLeft.days, label: "Days" },
                { value: timeLeft.hours, label: "Hours" },
                { value: timeLeft.minutes, label: "Minutes" },
                { value: timeLeft.seconds, label: "Seconds" },
              ].map((unit) => (
                <div key={unit.label} className="text-center">
                  <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-xl border border-border bg-background">
                    <span className="text-2xl sm:text-3xl font-bold font-mono text-foreground tabular-nums">
                      {String(unit.value).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-1 text-[10px] sm:text-xs text-muted-foreground">{unit.label}</p>
                </div>
              ))}
            </div>
          )}

          {target && (
            <p className="text-xs text-muted-foreground">
              Target: {target.toLocaleString()}
            </p>
          )}

          <button
            onClick={reset}
            className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary/10"
          >
            Reset
          </button>
        </div>
      )}

      {!target && (
        <div className="rounded-xl border border-border bg-muted p-12 text-center">
          <p className="text-muted-foreground">
            Choose a quick timer or set a target date to start the countdown.
          </p>
        </div>
      )}
    </div>
  );
}
