"use client";

import { useState } from "react";

export default function AddSubtractDays() {
  const [date, setDate] = useState("");
  const [days, setDays] = useState("7");
  const [operation, setOperation] = useState<"add" | "subtract">("add");

  const result = (() => {
    if (!date || !days) return null;
    const d = new Date(date + "T00:00:00");
    if (isNaN(d.getTime())) return null;
    const n = parseInt(days, 10);
    if (isNaN(n) || n < 0) return null;
    const offset = operation === "add" ? n : -n;
    d.setDate(d.getDate() + offset);
    return d;
  })();

  const formatted = result
    ? result.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
    : null;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Start Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Number of Days</label>
            <input type="number" min="0" value={days} onChange={(e) => setDays(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Operation</label>
            <div className="flex gap-2">
              {(["add", "subtract"] as const).map((op) => (
                <button key={op} onClick={() => setOperation(op)}
                  className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${
                    operation === op ? "bg-primary text-white" : "border border-border bg-background text-foreground hover:bg-primary/10"
                  }`}>
                  {op}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {result ? (
        <div className="rounded-xl border border-border bg-muted p-6 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            {days} day{days !== "1" ? "s" : ""} {operation === "add" ? "after" : "before"} your date
          </p>
          <p className="text-2xl font-bold text-primary">{formatted}</p>
          <p className="text-sm text-muted-foreground font-mono">{result.toISOString().split("T")[0]}</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-muted p-10 text-center">
          <p className="text-muted-foreground">Enter a date and number of days to calculate.</p>
        </div>
      )}
    </div>
  );
}
