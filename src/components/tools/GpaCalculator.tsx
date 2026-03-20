"use client";

import { useState, useMemo, useCallback } from "react";

interface Course {
  id: number;
  name: string;
  credits: string;
  grade: string;
}

const GRADES: Record<string, number> = {
  "A+": 4.0, A: 4.0, "A-": 3.7,
  "B+": 3.3, B: 3.0, "B-": 2.7,
  "C+": 2.3, C: 2.0, "C-": 1.7,
  "D+": 1.3, D: 1.0, "D-": 0.7,
  F: 0.0,
};

let nextId = 1;

export default function GpaCalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { id: nextId++, name: "", credits: "3", grade: "A" },
    { id: nextId++, name: "", credits: "3", grade: "A" },
  ]);
  const [copied, setCopied] = useState(false);

  const addCourse = useCallback(() => {
    setCourses((prev) => [...prev, { id: nextId++, name: "", credits: "3", grade: "A" }]);
  }, []);

  const removeCourse = useCallback((id: number) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const updateCourse = useCallback((id: number, field: keyof Course, value: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  }, []);

  const result = useMemo(() => {
    const validCourses = courses.filter(
      (c) => parseFloat(c.credits) > 0 && c.grade in GRADES
    );
    if (validCourses.length === 0) return null;

    let totalPoints = 0;
    let totalCredits = 0;
    const breakdown = validCourses.map((c) => {
      const credits = parseFloat(c.credits);
      const gradePoints = GRADES[c.grade];
      const qualityPoints = credits * gradePoints;
      totalPoints += qualityPoints;
      totalCredits += credits;
      return { ...c, gradePoints, qualityPoints, creditsNum: credits };
    });

    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

    return { gpa, totalCredits, totalPoints, breakdown };
  }, [courses]);

  const copyGpa = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.gpa.toFixed(2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, [result]);

  return (
    <div className="space-y-6">
      {/* Courses */}
      <div className="space-y-3">
        {courses.map((course, idx) => (
          <div
            key={course.id}
            className="rounded-xl border border-border bg-muted p-4"
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_80px_100px_auto]">
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">
                  Course {idx + 1}
                </label>
                <input
                  type="text"
                  value={course.name}
                  onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                  placeholder="Course name (optional)"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">Credits</label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={course.credits}
                  onChange={(e) => updateCourse(course.id, "credits", e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">Grade</label>
                <select
                  value={course.grade}
                  onChange={(e) => updateCourse(course.id, "grade", e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {Object.keys(GRADES).map((g) => (
                    <option key={g} value={g}>
                      {g} ({GRADES[g].toFixed(1)})
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => removeCourse(course.id)}
                  disabled={courses.length <= 1}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addCourse}
        className="w-full rounded-lg border-2 border-dashed border-border py-3 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors"
      >
        + Add Course
      </button>

      {/* Results */}
      {result && (
        <>
          {/* GPA display */}
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Your GPA</p>
            <p className="text-5xl font-bold text-primary">{result.gpa.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {result.totalCredits} credits | {result.totalPoints.toFixed(1)} quality points
            </p>
            <button
              onClick={copyGpa}
              className="mt-3 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
            >
              {copied ? "Copied!" : "Copy GPA"}
            </button>
          </div>

          {/* Breakdown table */}
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr className="border-b border-border">
                  <th className="px-3 py-2 text-left text-muted-foreground font-medium">Course</th>
                  <th className="px-3 py-2 text-center text-muted-foreground font-medium">Credits</th>
                  <th className="px-3 py-2 text-center text-muted-foreground font-medium">Grade</th>
                  <th className="px-3 py-2 text-center text-muted-foreground font-medium">Points</th>
                  <th className="px-3 py-2 text-right text-muted-foreground font-medium">Quality Pts</th>
                </tr>
              </thead>
              <tbody>
                {result.breakdown.map((row, idx) => (
                  <tr key={idx} className="border-b border-border/50">
                    <td className="px-3 py-2 text-foreground">
                      {row.name || `Course ${idx + 1}`}
                    </td>
                    <td className="px-3 py-2 text-center font-mono text-foreground">{row.creditsNum}</td>
                    <td className="px-3 py-2 text-center font-semibold text-foreground">{row.grade}</td>
                    <td className="px-3 py-2 text-center font-mono text-muted-foreground">{row.gradePoints.toFixed(1)}</td>
                    <td className="px-3 py-2 text-right font-mono text-foreground">{row.qualityPoints.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
