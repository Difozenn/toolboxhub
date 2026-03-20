"use client";

import { useState, useMemo, useEffect, useCallback } from "react";

const TIMEZONES = [
  { label: "UTC", value: "UTC" },
  { label: "EST (New York)", value: "America/New_York" },
  { label: "CST (Chicago)", value: "America/Chicago" },
  { label: "MST (Denver)", value: "America/Denver" },
  { label: "PST (Los Angeles)", value: "America/Los_Angeles" },
  { label: "AST (Halifax)", value: "America/Halifax" },
  { label: "HST (Honolulu)", value: "Pacific/Honolulu" },
  { label: "AKST (Anchorage)", value: "America/Anchorage" },
  { label: "GMT (London)", value: "Europe/London" },
  { label: "CET (Paris)", value: "Europe/Paris" },
  { label: "EET (Athens)", value: "Europe/Athens" },
  { label: "MSK (Moscow)", value: "Europe/Moscow" },
  { label: "IST (Mumbai)", value: "Asia/Kolkata" },
  { label: "CST (Shanghai)", value: "Asia/Shanghai" },
  { label: "JST (Tokyo)", value: "Asia/Tokyo" },
  { label: "KST (Seoul)", value: "Asia/Seoul" },
  { label: "AEST (Sydney)", value: "Australia/Sydney" },
  { label: "NZST (Auckland)", value: "Pacific/Auckland" },
  { label: "BRT (Sao Paulo)", value: "America/Sao_Paulo" },
  { label: "GST (Dubai)", value: "Asia/Dubai" },
  { label: "SGT (Singapore)", value: "Asia/Singapore" },
  { label: "HKT (Hong Kong)", value: "Asia/Hong_Kong" },
  { label: "ICT (Bangkok)", value: "Asia/Bangkok" },
  { label: "WIB (Jakarta)", value: "Asia/Jakarta" },
];

function formatInTimezone(date: Date, tz: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(date);
  } catch {
    return "Invalid timezone";
  }
}

function getTimeInTimezone(date: Date, tz: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  } catch {
    return "--:--";
  }
}

export default function TimezoneConverter() {
  const [fromTz, setFromTz] = useState("America/New_York");
  const [toTz, setToTz] = useState("Europe/London");
  const [inputDate, setInputDate] = useState("");
  const [inputTime, setInputTime] = useState("");
  const [now, setNow] = useState(new Date());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize with current date/time in source timezone
  useEffect(() => {
    const d = new Intl.DateTimeFormat("en-CA", {
      timeZone: fromTz,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
    const t = getTimeInTimezone(new Date(), fromTz);
    setInputDate(d);
    setInputTime(t);
  }, []);

  const convertedTime = useMemo(() => {
    if (!inputDate || !inputTime) return null;
    try {
      // Create a date in the source timezone
      const dateStr = `${inputDate}T${inputTime}:00`;
      // Get the offset for the source timezone
      const sourceDate = new Date(dateStr);
      // Format in source tz to verify, then format in target tz
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: fromTz,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      // Use a workaround: create the date relative to source timezone
      const parts = formatter.formatToParts(sourceDate);
      const getVal = (type: string) => parts.find((p) => p.type === type)?.value || "";
      const sourceFormatted = `${getVal("year")}-${getVal("month")}-${getVal("day")} ${getVal("hour")}:${getVal("minute")}:${getVal("second")}`;

      // The input specifies a datetime in the source timezone
      // We need to find the UTC equivalent, then convert to target
      // Approximate by calculating offset difference
      const utcDate = new Date(`${inputDate}T${inputTime}:00Z`);
      const sourceOffset = getTimezoneOffset(utcDate, fromTz);
      const adjustedUtc = new Date(utcDate.getTime() + sourceOffset * 60000);

      return formatInTimezone(adjustedUtc, toTz);
    } catch {
      return "Invalid date/time";
    }
  }, [inputDate, inputTime, fromTz, toTz]);

  const swap = useCallback(() => {
    setFromTz(toTz);
    setToTz(fromTz);
  }, [fromTz, toTz]);

  const copyResult = useCallback(async () => {
    if (!convertedTime) return;
    try {
      await navigator.clipboard.writeText(convertedTime);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, [convertedTime]);

  return (
    <div className="space-y-6">
      {/* Current time display */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-muted p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">
            {TIMEZONES.find((t) => t.value === fromTz)?.label || fromTz}
          </p>
          <p className="text-lg font-mono font-bold text-foreground">{formatInTimezone(now, fromTz)}</p>
        </div>
        <div className="rounded-xl border border-border bg-muted p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">
            {TIMEZONES.find((t) => t.value === toTz)?.label || toTz}
          </p>
          <p className="text-lg font-mono font-bold text-foreground">{formatInTimezone(now, toTz)}</p>
        </div>
      </div>

      {/* Converter */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr]">
        {/* From */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">From</label>
          <select
            value={fromTz}
            onChange={(e) => setFromTz(e.target.value)}
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {TIMEZONES.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              className="rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <input
              type="time"
              value={inputTime}
              onChange={(e) => setInputTime(e.target.value)}
              className="rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Swap */}
        <div className="flex items-center justify-center">
          <button
            onClick={swap}
            className="rounded-full border border-border bg-muted p-3 text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            aria-label="Swap timezones"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 16l-4-4 4-4" />
              <path d="M17 8l4 4-4 4" />
              <path d="M3 12h18" />
            </svg>
          </button>
        </div>

        {/* To */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">To</label>
          <select
            value={toTz}
            onChange={(e) => setToTz(e.target.value)}
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {TIMEZONES.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <div className="flex-1 rounded-lg border border-border bg-muted px-3 py-2 text-sm font-mono text-foreground min-h-[38px]">
              {convertedTime || <span className="text-muted-foreground">Result</span>}
            </div>
            <button
              onClick={copyResult}
              disabled={!convertedTime}
              className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getTimezoneOffset(date: Date, tz: string): number {
  try {
    const utcStr = date.toLocaleString("en-US", { timeZone: "UTC" });
    const tzStr = date.toLocaleString("en-US", { timeZone: tz });
    const utcDate = new Date(utcStr);
    const tzDate = new Date(tzStr);
    return (utcDate.getTime() - tzDate.getTime()) / 60000;
  } catch {
    return 0;
  }
}
