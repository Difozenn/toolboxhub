"use client";

import { useState, useEffect, useCallback } from "react";

function formatDate(date: Date): {
  iso: string;
  utc: string;
  local: string;
  relative: string;
} {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const absDiff = Math.abs(diff);

  let relative: string;
  if (absDiff < 60_000) {
    relative = "just now";
  } else if (absDiff < 3_600_000) {
    const mins = Math.floor(absDiff / 60_000);
    relative = `${mins} minute${mins !== 1 ? "s" : ""} ${diff > 0 ? "ago" : "from now"}`;
  } else if (absDiff < 86_400_000) {
    const hours = Math.floor(absDiff / 3_600_000);
    relative = `${hours} hour${hours !== 1 ? "s" : ""} ${diff > 0 ? "ago" : "from now"}`;
  } else if (absDiff < 2_592_000_000) {
    const days = Math.floor(absDiff / 86_400_000);
    relative = `${days} day${days !== 1 ? "s" : ""} ${diff > 0 ? "ago" : "from now"}`;
  } else if (absDiff < 31_536_000_000) {
    const months = Math.floor(absDiff / 2_592_000_000);
    relative = `${months} month${months !== 1 ? "s" : ""} ${diff > 0 ? "ago" : "from now"}`;
  } else {
    const years = Math.floor(absDiff / 31_536_000_000);
    relative = `${years} year${years !== 1 ? "s" : ""} ${diff > 0 ? "ago" : "from now"}`;
  }

  return {
    iso: date.toISOString(),
    utc: date.toUTCString(),
    local: date.toLocaleString(),
    relative,
  };
}

export default function TimestampConverter() {
  const [currentTimestamp, setCurrentTimestamp] = useState(
    Math.floor(Date.now() / 1000)
  );

  // Unix to Date
  const [unixInput, setUnixInput] = useState("");
  const [unixUnit, setUnixUnit] = useState<"seconds" | "milliseconds">(
    "seconds"
  );

  // Date to Unix
  const [dateInput, setDateInput] = useState("");
  const [timeInput, setTimeInput] = useState("");

  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Unix to Date conversion
  const unixToDateResult = (() => {
    if (!unixInput.trim()) return null;
    const num = parseInt(unixInput.trim(), 10);
    if (isNaN(num)) return null;

    const ms = unixUnit === "seconds" ? num * 1000 : num;
    const date = new Date(ms);
    if (isNaN(date.getTime())) return null;

    return formatDate(date);
  })();

  // Date to Unix conversion
  const dateToUnixResult = (() => {
    if (!dateInput) return null;
    const dateStr = timeInput ? `${dateInput}T${timeInput}` : `${dateInput}T00:00:00`;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return null;

    return {
      seconds: Math.floor(date.getTime() / 1000),
      milliseconds: date.getTime(),
    };
  })();

  const copyToClipboard = useCallback(
    async (text: string, field: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
      } catch {
        setCopiedField(null);
      }
    },
    []
  );

  return (
    <div className="space-y-8">
      {/* Current timestamp */}
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">
              Current Unix Timestamp
            </p>
            <p className="mt-1 font-mono text-3xl font-bold text-primary">
              {currentTimestamp}
            </p>
          </div>
          <button
            onClick={() => copyToClipboard(currentTimestamp.toString(), "current")}
            className="rounded-xl border border-border bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            {copiedField === "current" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Unix to Date */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Unix Timestamp to Date
          </h3>

          <div className="flex gap-3">
            <input
              type="text"
              value={unixInput}
              onChange={(e) => setUnixInput(e.target.value)}
              placeholder="Enter Unix timestamp..."
              className="flex-1 rounded-xl border border-border bg-muted p-3 font-mono text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <select
              value={unixUnit}
              onChange={(e) =>
                setUnixUnit(e.target.value as "seconds" | "milliseconds")
              }
              className="rounded-xl border border-border bg-muted px-3 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="seconds">Seconds</option>
              <option value="milliseconds">Milliseconds</option>
            </select>
          </div>

          <button
            onClick={() => {
              setUnixInput(currentTimestamp.toString());
              setUnixUnit("seconds");
            }}
            className="text-sm text-primary hover:text-primary-hover transition-colors"
          >
            Use current timestamp
          </button>

          {unixToDateResult && (
            <div className="space-y-2">
              {[
                { label: "ISO 8601", value: unixToDateResult.iso, key: "iso" },
                { label: "UTC", value: unixToDateResult.utc, key: "utc" },
                {
                  label: "Local",
                  value: unixToDateResult.local,
                  key: "local",
                },
                {
                  label: "Relative",
                  value: unixToDateResult.relative,
                  key: "rel",
                },
              ].map(({ label, value, key }) => (
                <div
                  key={key}
                  className="flex items-center justify-between rounded-lg border border-border bg-muted px-4 py-2.5"
                >
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="font-mono text-sm text-foreground">{value}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(value, key)}
                    className="shrink-0 ml-2 rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    {copiedField === key ? "Copied!" : "Copy"}
                  </button>
                </div>
              ))}
            </div>
          )}

          {unixInput && !unixToDateResult && (
            <p className="text-sm text-red-600 dark:text-red-400">
              Invalid timestamp value
            </p>
          )}
        </div>

        {/* Date to Unix */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Date to Unix Timestamp
          </h3>

          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-sm text-muted-foreground">
                Date
              </label>
              <input
                type="date"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                className="w-full rounded-xl border border-border bg-muted p-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-muted-foreground">
                Time (optional)
              </label>
              <input
                type="time"
                value={timeInput}
                onChange={(e) => setTimeInput(e.target.value)}
                step="1"
                className="w-full rounded-xl border border-border bg-muted p-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <button
            onClick={() => {
              const now = new Date();
              setDateInput(now.toISOString().split("T")[0]);
              setTimeInput(now.toTimeString().split(" ")[0]);
            }}
            className="text-sm text-primary hover:text-primary-hover transition-colors"
          >
            Use current date/time
          </button>

          {dateToUnixResult && (
            <div className="space-y-2">
              {[
                {
                  label: "Unix Timestamp (seconds)",
                  value: dateToUnixResult.seconds.toString(),
                  key: "d2u-s",
                },
                {
                  label: "Unix Timestamp (milliseconds)",
                  value: dateToUnixResult.milliseconds.toString(),
                  key: "d2u-ms",
                },
              ].map(({ label, value, key }) => (
                <div
                  key={key}
                  className="flex items-center justify-between rounded-lg border border-border bg-muted px-4 py-2.5"
                >
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="font-mono text-sm text-foreground">{value}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(value, key)}
                    className="shrink-0 ml-2 rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    {copiedField === key ? "Copied!" : "Copy"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
