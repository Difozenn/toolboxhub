"use client";

import { useState, useMemo, useCallback } from "react";

const COMMON_PATTERNS = [
  "password", "123456", "qwerty", "abc123", "letmein", "admin",
  "welcome", "monkey", "dragon", "master", "login", "princess",
  "111111", "000000", "iloveyou", "trustno1", "sunshine",
];

interface StrengthResult {
  score: number;
  label: string;
  color: string;
  bgColor: string;
  criteria: { label: string; met: boolean }[];
  timeToCrack: string;
  suggestions: string[];
}

function analyzePassword(password: string): StrengthResult {
  const criteria = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "At least 12 characters", met: password.length >= 12 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains number", met: /\d/.test(password) },
    { label: "Contains special character", met: /[^a-zA-Z0-9]/.test(password) },
    {
      label: "No common patterns",
      met: !COMMON_PATTERNS.some((p) => password.toLowerCase().includes(p)),
    },
    {
      label: "No repeated characters (3+)",
      met: !/(.)\1{2,}/.test(password),
    },
    {
      label: "No sequential characters",
      met: !/(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/i.test(password),
    },
  ];

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  if (!COMMON_PATTERNS.some((p) => password.toLowerCase().includes(p))) score++;
  if (!/(.)\1{2,}/.test(password)) score++;

  // Normalize to 0-4
  const normalized = Math.min(4, Math.floor((score / 7) * 5));

  const labels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
  const colors = ["text-red-500", "text-orange-500", "text-yellow-500", "text-lime-500", "text-green-500"];
  const bgColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-lime-500", "bg-green-500"];

  // Estimate time to crack
  let poolSize = 0;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/\d/.test(password)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 33;
  if (poolSize === 0) poolSize = 26;

  const combinations = Math.pow(poolSize, password.length);
  const guessesPerSecond = 1e10; // 10 billion guesses/sec
  const seconds = combinations / guessesPerSecond;

  let timeToCrack: string;
  if (seconds < 1) timeToCrack = "Instantly";
  else if (seconds < 60) timeToCrack = `${Math.round(seconds)} seconds`;
  else if (seconds < 3600) timeToCrack = `${Math.round(seconds / 60)} minutes`;
  else if (seconds < 86400) timeToCrack = `${Math.round(seconds / 3600)} hours`;
  else if (seconds < 86400 * 365) timeToCrack = `${Math.round(seconds / 86400)} days`;
  else if (seconds < 86400 * 365 * 1000) timeToCrack = `${Math.round(seconds / (86400 * 365))} years`;
  else if (seconds < 86400 * 365 * 1e6) timeToCrack = `${Math.round(seconds / (86400 * 365 * 1000))} thousand years`;
  else if (seconds < 86400 * 365 * 1e9) timeToCrack = `${Math.round(seconds / (86400 * 365 * 1e6))} million years`;
  else timeToCrack = "Billions of years+";

  // Suggestions
  const suggestions: string[] = [];
  if (password.length < 12) suggestions.push("Use at least 12 characters for better security");
  if (!/[A-Z]/.test(password)) suggestions.push("Add uppercase letters");
  if (!/[a-z]/.test(password)) suggestions.push("Add lowercase letters");
  if (!/\d/.test(password)) suggestions.push("Add numbers");
  if (!/[^a-zA-Z0-9]/.test(password)) suggestions.push("Add special characters (!@#$%^&*)");
  if (COMMON_PATTERNS.some((p) => password.toLowerCase().includes(p)))
    suggestions.push("Avoid common words and patterns");
  if (/(.)\1{2,}/.test(password)) suggestions.push("Avoid repeated characters");

  return {
    score: normalized,
    label: labels[normalized],
    color: colors[normalized],
    bgColor: bgColors[normalized],
    criteria,
    timeToCrack,
    suggestions,
  };
}

export default function PasswordStrength() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const result = useMemo(
    () => (password ? analyzePassword(password) : null),
    [password]
  );

  const copyResult = useCallback(async () => {
    if (!result) return;
    const text = [
      `Password Strength: ${result.label} (${result.score}/4)`,
      `Time to crack: ${result.timeToCrack}`,
      `Length: ${password.length}`,
      "",
      "Criteria:",
      ...result.criteria.map((c) => `  ${c.met ? "[PASS]" : "[FAIL]"} ${c.label}`),
    ].join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [result, password]);

  const scorePercent = result ? (result.score / 4) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Password input */}
      <div className="rounded-xl border border-border bg-muted p-5">
        <label className="mb-2 block text-sm font-medium text-foreground">
          Enter Password to Test
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type your password here..."
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary pr-16 font-mono"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {password && (
          <p className="mt-1 text-xs text-muted-foreground">
            {password.length} character{password.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          {/* Strength meter */}
          <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-foreground">Strength</h3>
              <button
                onClick={copyResult}
                className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-primary/10"
              >
                {copied ? "Copied!" : "Copy Report"}
              </button>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-bold ${result.color}`}>{result.label}</span>
                <span className="text-sm text-muted-foreground">{result.score}/4</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-border">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${result.bgColor}`}
                  style={{ width: `${scorePercent}%` }}
                />
              </div>
            </div>

            {/* Time to crack */}
            <div className="rounded-lg bg-background p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Estimated time to crack</span>
                <span className={`text-sm font-bold ${result.color}`}>{result.timeToCrack}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Based on 10 billion guesses per second (offline attack)
              </p>
            </div>
          </div>

          {/* Criteria checklist */}
          <div className="rounded-xl border border-border bg-muted p-4 space-y-2">
            <h3 className="mb-1 text-sm font-medium text-foreground">Criteria</h3>
            {result.criteria.map((c, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span
                  className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white ${
                    c.met ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {c.met ? "\u2713" : "\u2717"}
                </span>
                <span className={c.met ? "text-foreground" : "text-muted-foreground"}>
                  {c.label}
                </span>
              </div>
            ))}
          </div>

          {/* Suggestions */}
          {result.suggestions.length > 0 && (
            <div className="rounded-xl border border-border bg-muted p-4">
              <h3 className="mb-2 text-sm font-medium text-foreground">Suggestions</h3>
              <ul className="space-y-1">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="text-primary mt-0.5">-</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {!password && (
        <div className="rounded-xl border border-border bg-muted p-12 text-center">
          <p className="text-muted-foreground">
            Enter a password above to analyze its strength.
          </p>
        </div>
      )}
    </div>
  );
}
