"use client";

import { useState, useMemo, useEffect } from "react";

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export default function AgeCalculator() {
  const [birthdate, setBirthdate] = useState("");
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const result = useMemo(() => {
    if (!birthdate) return null;
    const birth = new Date(birthdate + "T00:00:00");
    if (isNaN(birth.getTime())) return null;
    if (birth > now) return null;

    // Exact age in years, months, days
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += getDaysInMonth(now.getFullYear(), now.getMonth() - 1);
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // Total calculations
    const diffMs = now.getTime() - birth.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));

    // Next birthday
    let nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= now) {
      nextBirthday = new Date(now.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const turningAge = nextBirthday.getFullYear() - birth.getFullYear();

    return {
      years,
      months,
      days,
      totalMonths,
      totalWeeks,
      totalDays,
      totalHours,
      daysUntilBirthday,
      turningAge,
    };
  }, [birthdate, now]);

  return (
    <div className="space-y-6">
      {/* Date input */}
      <div className="rounded-xl border border-border bg-muted p-5 space-y-3">
        <label className="block text-sm font-medium text-foreground">Date of Birth</label>
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {result && (
        <>
          {/* Exact age */}
          <div className="rounded-xl border border-border bg-muted p-5 text-center">
            <p className="text-sm text-muted-foreground mb-2">Your Exact Age</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <div className="rounded-lg bg-primary/10 px-4 py-3 min-w-[80px]">
                <p className="text-3xl font-bold text-primary">{result.years}</p>
                <p className="text-xs text-muted-foreground">Years</p>
              </div>
              <div className="rounded-lg bg-primary/10 px-4 py-3 min-w-[80px]">
                <p className="text-3xl font-bold text-primary">{result.months}</p>
                <p className="text-xs text-muted-foreground">Months</p>
              </div>
              <div className="rounded-lg bg-primary/10 px-4 py-3 min-w-[80px]">
                <p className="text-3xl font-bold text-primary">{result.days}</p>
                <p className="text-xs text-muted-foreground">Days</p>
              </div>
            </div>
          </div>

          {/* Totals grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Total Months", value: result.totalMonths.toLocaleString() },
              { label: "Total Weeks", value: result.totalWeeks.toLocaleString() },
              { label: "Total Days", value: result.totalDays.toLocaleString() },
              { label: "Total Hours", value: result.totalHours.toLocaleString() },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-border bg-muted p-4 text-center">
                <p className="text-xl font-bold text-foreground">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Next birthday */}
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-5 text-center">
            <p className="text-sm text-muted-foreground mb-1">Next Birthday Countdown</p>
            {result.daysUntilBirthday === 0 ? (
              <p className="text-2xl font-bold text-primary">Happy Birthday!</p>
            ) : (
              <>
                <p className="text-3xl font-bold text-primary">{result.daysUntilBirthday} days</p>
                <p className="text-sm text-muted-foreground mt-1">
                  until you turn {result.turningAge}
                </p>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
