"use client";

import { useState, useCallback } from "react";

const CHARSETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:',.<>?/`~",
};

function getStrength(
  password: string
): { label: string; percent: number; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 20) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2)
    return { label: "Weak", percent: 25, color: "bg-red-500" };
  if (score <= 3)
    return { label: "Fair", percent: 50, color: "bg-orange-500" };
  if (score <= 4)
    return { label: "Good", percent: 75, color: "bg-yellow-500" };
  return { label: "Strong", percent: 100, color: "bg-green-500" };
}

function generatePassword(
  length: number,
  options: { uppercase: boolean; lowercase: boolean; numbers: boolean; symbols: boolean }
): string {
  let charset = "";
  if (options.uppercase) charset += CHARSETS.uppercase;
  if (options.lowercase) charset += CHARSETS.lowercase;
  if (options.numbers) charset += CHARSETS.numbers;
  if (options.symbols) charset += CHARSETS.symbols;

  if (charset.length === 0) charset = CHARSETS.lowercase; // fallback

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  return Array.from(array, (n) => charset[n % charset.length]).join("");
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [count, setCount] = useState(1);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [passwords, setPasswords] = useState<string[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generate = useCallback(() => {
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      result.push(generatePassword(length, options));
    }
    setPasswords(result);
    setCopiedIdx(null);
    setCopiedAll(false);
  }, [length, count, options]);

  const copyOne = useCallback(
    async (index: number) => {
      await navigator.clipboard.writeText(passwords[index]);
      setCopiedIdx(index);
      setTimeout(() => setCopiedIdx(null), 1500);
    },
    [passwords]
  );

  const copyAll = useCallback(async () => {
    await navigator.clipboard.writeText(passwords.join("\n"));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1500);
  }, [passwords]);

  const toggleOption = (key: keyof typeof options) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="rounded-xl border border-border bg-muted p-5 space-y-5">
        {/* Length slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground">
              Password Length
            </label>
            <span className="rounded-md bg-primary/10 px-2 py-0.5 text-sm font-bold text-primary">
              {length}
            </span>
          </div>
          <input
            type="range"
            min={8}
            max={128}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>8</span>
            <span>128</span>
          </div>
        </div>

        {/* Count */}
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Number of Passwords
          </label>
          <input
            type="number"
            min={1}
            max={20}
            value={count}
            onChange={(e) =>
              setCount(Math.min(20, Math.max(1, Number(e.target.value))))
            }
            className="w-24 rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Toggles */}
        <div className="flex flex-wrap gap-4">
          {(
            Object.keys(CHARSETS) as Array<keyof typeof CHARSETS>
          ).map((key) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options[key]}
                onChange={() => toggleOption(key)}
                className="h-4 w-4 rounded border-border accent-primary"
              />
              <span className="text-sm capitalize text-foreground">{key}</span>
            </label>
          ))}
        </div>

        {/* Generate button */}
        <button
          onClick={generate}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
        >
          Generate Password{count > 1 ? "s" : ""}
        </button>
      </div>

      {/* Results */}
      {passwords.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">
              Generated Passwords
            </h3>
            {passwords.length > 1 && (
              <button
                onClick={copyAll}
                className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
              >
                {copiedAll ? "Copied All!" : "Copy All"}
              </button>
            )}
          </div>

          {passwords.map((pw, i) => {
            const strength = getStrength(pw);
            return (
              <div
                key={i}
                className="rounded-xl border border-border bg-muted p-4 space-y-2"
              >
                <div className="flex items-center gap-3">
                  <code className="flex-1 break-all font-mono text-sm text-foreground">
                    {pw}
                  </code>
                  <button
                    onClick={() => copyOne(i)}
                    className="shrink-0 rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
                  >
                    {copiedIdx === i ? "Copied!" : "Copy"}
                  </button>
                </div>

                {/* Strength meter */}
                <div className="flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-border">
                    <div
                      className={`h-full rounded-full transition-all ${strength.color}`}
                      style={{ width: `${strength.percent}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    {strength.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
