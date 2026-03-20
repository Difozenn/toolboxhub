"use client";

import { useState, useMemo } from "react";

interface FieldInfo {
  label: string;
  range: string;
  value: string;
  description: string;
}

const MONTHS = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const PRESETS = [
  { label: "Every minute", value: "* * * * *" },
  { label: "Every hour", value: "0 * * * *" },
  { label: "Daily at midnight", value: "0 0 * * *" },
  { label: "Every Monday at 9am", value: "0 9 * * 1" },
  { label: "Monthly (1st at midnight)", value: "0 0 1 * *" },
  { label: "Every 5 minutes", value: "*/5 * * * *" },
  { label: "Weekdays at 8:30am", value: "30 8 * * 1-5" },
  { label: "Every 6 hours", value: "0 */6 * * *" },
];

function parseField(
  field: string,
  min: number,
  max: number
): number[] {
  const values = new Set<number>();

  const parts = field.split(",");
  for (const part of parts) {
    // Handle step: */n or range/n
    const stepMatch = part.match(/^(.+)\/(\d+)$/);
    if (stepMatch) {
      const step = parseInt(stepMatch[2]);
      const base = stepMatch[1];
      let start = min;
      let end = max;

      if (base !== "*") {
        const rangeMatch = base.match(/^(\d+)-(\d+)$/);
        if (rangeMatch) {
          start = parseInt(rangeMatch[1]);
          end = parseInt(rangeMatch[2]);
        } else {
          start = parseInt(base);
        }
      }

      for (let i = start; i <= end; i += step) {
        values.add(i);
      }
      continue;
    }

    // Handle range: n-m
    const rangeMatch = part.match(/^(\d+)-(\d+)$/);
    if (rangeMatch) {
      const start = parseInt(rangeMatch[1]);
      const end = parseInt(rangeMatch[2]);
      for (let i = start; i <= end; i++) {
        values.add(i);
      }
      continue;
    }

    // Handle wildcard
    if (part === "*") {
      for (let i = min; i <= max; i++) {
        values.add(i);
      }
      continue;
    }

    // Single value
    const num = parseInt(part);
    if (!isNaN(num)) {
      values.add(num);
    }
  }

  return [...values].sort((a, b) => a - b);
}

function describeField(
  field: string,
  type: "minute" | "hour" | "day" | "month" | "weekday"
): string {
  if (field === "*") return `every ${type}`;

  const stepMatch = field.match(/^\*\/(\d+)$/);
  if (stepMatch) return `every ${stepMatch[1]} ${type}${parseInt(stepMatch[1]) > 1 ? "s" : ""}`;

  if (type === "month" && /^\d+$/.test(field)) {
    const num = parseInt(field);
    return num >= 1 && num <= 12 ? MONTHS[num] : field;
  }

  if (type === "weekday" && /^\d+$/.test(field)) {
    const num = parseInt(field);
    return num >= 0 && num <= 6 ? WEEKDAYS[num] : field;
  }

  if (field.includes("-")) {
    if (type === "weekday") {
      const parts = field.split("-");
      const start = parseInt(parts[0]);
      const end = parseInt(parts[1]);
      return `${WEEKDAYS[start] || start} through ${WEEKDAYS[end] || end}`;
    }
    return `${field}`;
  }

  return field;
}

function humanReadable(cron: string): string {
  const parts = cron.trim().split(/\s+/);
  if (parts.length !== 5) return "Invalid cron expression (need 5 fields)";

  const [minute, hour, day, month, weekday] = parts;
  const segments: string[] = [];

  // Minute/Hour
  if (minute === "*" && hour === "*") {
    segments.push("Every minute");
  } else if (minute === "0" && hour === "*") {
    segments.push("Every hour");
  } else if (minute.startsWith("*/")) {
    segments.push(`Every ${minute.slice(2)} minutes`);
  } else if (hour.startsWith("*/")) {
    segments.push(`At minute ${minute}, every ${hour.slice(2)} hours`);
  } else if (hour !== "*" && minute !== "*") {
    segments.push(`At ${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`);
  } else if (hour !== "*") {
    segments.push(`Every minute during hour ${hour}`);
  } else {
    segments.push(`At minute ${minute}`);
  }

  // Day of month
  if (day !== "*") {
    segments.push(`on day ${day} of the month`);
  }

  // Month
  if (month !== "*") {
    segments.push(`in ${describeField(month, "month")}`);
  }

  // Weekday
  if (weekday !== "*") {
    segments.push(`on ${describeField(weekday, "weekday")}`);
  }

  return segments.join(" ");
}

function getNextRunTimes(cron: string, count: number): Date[] {
  const parts = cron.trim().split(/\s+/);
  if (parts.length !== 5) return [];

  const [minuteField, hourField, dayField, monthField, weekdayField] = parts;

  const minutes = parseField(minuteField, 0, 59);
  const hours = parseField(hourField, 0, 23);
  const days = parseField(dayField, 1, 31);
  const months = parseField(monthField, 1, 12);
  const weekdays = parseField(weekdayField, 0, 6);

  const results: Date[] = [];
  const now = new Date();
  const check = new Date(now);
  check.setSeconds(0);
  check.setMilliseconds(0);
  check.setMinutes(check.getMinutes() + 1);

  let safety = 0;
  while (results.length < count && safety < 525960) {
    safety++;

    const m = check.getMinutes();
    const h = check.getHours();
    const d = check.getDate();
    const mo = check.getMonth() + 1;
    const wd = check.getDay();

    if (
      minutes.includes(m) &&
      hours.includes(h) &&
      days.includes(d) &&
      months.includes(mo) &&
      weekdays.includes(wd)
    ) {
      results.push(new Date(check));
    }

    check.setMinutes(check.getMinutes() + 1);
  }

  return results;
}

export default function CronParser() {
  const [expression, setExpression] = useState("0 9 * * 1-5");

  const { description, fields, nextRuns, error } = useMemo(() => {
    const trimmed = expression.trim();
    const parts = trimmed.split(/\s+/);

    if (!trimmed) {
      return { description: "", fields: [], nextRuns: [], error: null };
    }

    if (parts.length !== 5) {
      return {
        description: "",
        fields: [],
        nextRuns: [],
        error: "Cron expression must have exactly 5 fields: minute hour day month weekday",
      };
    }

    const fieldInfos: FieldInfo[] = [
      {
        label: "Minute",
        range: "0-59",
        value: parts[0],
        description: describeField(parts[0], "minute"),
      },
      {
        label: "Hour",
        range: "0-23",
        value: parts[1],
        description: describeField(parts[1], "hour"),
      },
      {
        label: "Day of Month",
        range: "1-31",
        value: parts[2],
        description: describeField(parts[2], "day"),
      },
      {
        label: "Month",
        range: "1-12",
        value: parts[3],
        description: describeField(parts[3], "month"),
      },
      {
        label: "Weekday",
        range: "0-6 (Sun-Sat)",
        value: parts[4],
        description: describeField(parts[4], "weekday"),
      },
    ];

    return {
      description: humanReadable(trimmed),
      fields: fieldInfos,
      nextRuns: getNextRunTimes(trimmed, 5),
      error: null,
    };
  }, [expression]);

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">
          Cron Expression
        </label>
        <input
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="* * * * *"
          spellCheck={false}
          className="w-full rounded-xl border border-border bg-muted px-4 py-3 font-mono text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <p className="text-xs text-muted-foreground">
          Format: minute hour day-of-month month weekday
        </p>
      </div>

      {/* Presets */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Presets
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.value}
              onClick={() => setExpression(preset.value)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                expression === preset.value
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-background text-foreground hover:bg-muted"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Human-readable description */}
      {description && !error && (
        <div className="rounded-xl border border-border bg-muted p-4">
          <p className="text-xs font-medium text-muted-foreground mb-1">
            Description
          </p>
          <p className="text-lg font-medium text-foreground">{description}</p>
        </div>
      )}

      {/* Field breakdown */}
      {fields.length > 0 && !error && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Field Breakdown
          </label>
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="px-4 py-2.5 text-left font-medium text-foreground">
                    Field
                  </th>
                  <th className="px-4 py-2.5 text-left font-medium text-foreground">
                    Value
                  </th>
                  <th className="px-4 py-2.5 text-left font-medium text-foreground">
                    Range
                  </th>
                  <th className="px-4 py-2.5 text-left font-medium text-foreground">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field) => (
                  <tr
                    key={field.label}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-4 py-2 font-medium text-foreground">
                      {field.label}
                    </td>
                    <td className="px-4 py-2 font-mono text-primary">
                      {field.value}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {field.range}
                    </td>
                    <td className="px-4 py-2 text-foreground">
                      {field.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Next run times */}
      {nextRuns.length > 0 && !error && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Next 5 Run Times
          </label>
          <div className="space-y-1">
            {nextRuns.map((date, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg border border-border bg-muted px-4 py-2.5"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <span className="font-mono text-sm text-foreground">
                  {date.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
