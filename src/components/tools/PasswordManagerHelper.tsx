"use client";

import { useState, useCallback } from "react";

export default function PasswordManagerHelper() {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let charset = "";
    if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) charset += "0123456789";
    if (symbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!charset) {
      setPassword("");
      return;
    }

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length];
    }
    setPassword(result);
    setCopied(false);
  }, [length, uppercase, lowercase, numbers, symbols]);

  const handleCopy = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = (): { label: string; color: string; width: string; score: number } => {
    if (!password) return { label: "", color: "bg-gray-300", width: "0%", score: 0 };

    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    if (password.length >= 24) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 2) return { label: "Weak", color: "bg-red-500", width: "25%", score };
    if (score <= 4) return { label: "Fair", color: "bg-orange-500", width: "50%", score };
    if (score <= 6) return { label: "Strong", color: "bg-blue-500", width: "75%", score };
    return { label: "Very Strong", color: "bg-green-500", width: "100%", score };
  };

  const strength = getStrength();

  const charsetSize =
    (uppercase ? 26 : 0) + (lowercase ? 26 : 0) + (numbers ? 10 : 0) + (symbols ? 27 : 0);
  const entropy = password ? Math.floor(password.length * Math.log2(charsetSize || 1)) : 0;

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          Password Length: {length}
        </label>
        <input
          type="range"
          min={8}
          max={64}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>8</span>
          <span>64</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Uppercase (A-Z)", value: uppercase, setter: setUppercase },
          { label: "Lowercase (a-z)", value: lowercase, setter: setLowercase },
          { label: "Numbers (0-9)", value: numbers, setter: setNumbers },
          { label: "Symbols (!@#$)", value: symbols, setter: setSymbols },
        ].map((opt) => (
          <label
            key={opt.label}
            className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm transition-colors ${
              opt.value
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-muted text-muted-foreground"
            }`}
          >
            <input
              type="checkbox"
              checked={opt.value}
              onChange={(e) => opt.setter(e.target.checked)}
              className="accent-primary"
            />
            {opt.label}
          </label>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={generatePassword}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Generate Password
        </button>
        {password && (
          <button
            onClick={handleCopy}
            className="rounded-lg border border-border bg-muted px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/80"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
      </div>

      {password && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-muted p-4 text-center">
            <p className="break-all font-mono text-lg text-foreground">{password}</p>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Strength</span>
              <span className="font-medium text-foreground">{strength.label}</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full transition-all duration-500 ${strength.color}`}
                style={{ width: strength.width }}
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">Entropy</p>
              <p className="mt-1 text-xl font-bold text-foreground">{entropy} bits</p>
            </div>
            <div className="rounded-xl border border-border bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">Character Set Size</p>
              <p className="mt-1 text-xl font-bold text-foreground">{charsetSize}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
