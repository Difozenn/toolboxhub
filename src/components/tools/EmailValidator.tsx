"use client";

import { useState, useCallback } from "react";

const DISPOSABLE_DOMAINS = [
  "mailinator.com", "tempmail.com", "guerrillamail.com", "throwaway.email",
  "yopmail.com", "10minutemail.com", "trashmail.com", "fakeinbox.com",
  "sharklasers.com", "guerrillamailblock.com", "grr.la", "dispostable.com",
  "maildrop.cc", "temp-mail.org", "getnada.com", "mohmal.com",
  "mailnesia.com", "tempail.com", "burnermail.io", "discard.email",
];

const TYPO_MAP: Record<string, string> = {
  "gmial.com": "gmail.com",
  "gmal.com": "gmail.com",
  "gmaill.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gnail.com": "gmail.com",
  "gmail.co": "gmail.com",
  "gmail.con": "gmail.com",
  "hotmal.com": "hotmail.com",
  "hotmial.com": "hotmail.com",
  "hotmail.con": "hotmail.com",
  "outlok.com": "outlook.com",
  "outllook.com": "outlook.com",
  "yaho.com": "yahoo.com",
  "yahooo.com": "yahoo.com",
  "yahoo.con": "yahoo.com",
  "yhoo.com": "yahoo.com",
  "protonmal.com": "protonmail.com",
};

const VALID_TLDS = [
  "com", "org", "net", "edu", "gov", "io", "co", "us", "uk", "de", "fr",
  "ca", "au", "info", "biz", "me", "tv", "app", "dev", "tech", "xyz",
  "online", "store", "site", "cloud", "ai", "ru", "jp", "cn", "in", "br",
];

interface ValidationResult {
  email: string;
  isValid: boolean;
  checks: { label: string; passed: boolean; detail?: string }[];
  suggestion?: string;
}

function validateEmail(email: string): ValidationResult {
  const trimmed = email.trim();
  const checks: { label: string; passed: boolean; detail?: string }[] = [];
  let suggestion: string | undefined;

  // Check for @ symbol
  const hasAt = trimmed.includes("@");
  checks.push({ label: "Contains @ symbol", passed: hasAt });

  if (!hasAt) {
    return { email: trimmed, isValid: false, checks };
  }

  const parts = trimmed.split("@");
  const hasOnlyOneAt = parts.length === 2;
  checks.push({ label: "Single @ symbol", passed: hasOnlyOneAt });

  if (!hasOnlyOneAt) {
    return { email: trimmed, isValid: false, checks };
  }

  const [local, domain] = parts;

  // Local part checks
  checks.push({ label: "Local part not empty", passed: local.length > 0 });
  checks.push({
    label: "Local part length valid",
    passed: local.length <= 64,
    detail: local.length > 64 ? `${local.length} chars (max 64)` : undefined,
  });

  // Domain checks
  checks.push({ label: "Domain not empty", passed: domain.length > 0 });

  const domainParts = domain.split(".");
  const hasTld = domainParts.length >= 2 && domainParts[domainParts.length - 1].length >= 2;
  checks.push({ label: "Valid TLD present", passed: hasTld });

  if (hasTld) {
    const tld = domainParts[domainParts.length - 1].toLowerCase();
    const knownTld = VALID_TLDS.includes(tld);
    checks.push({
      label: "Known TLD",
      passed: knownTld,
      detail: knownTld ? undefined : `".${tld}" is uncommon`,
    });
  }

  // Regex format check
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const formatValid = emailRegex.test(trimmed);
  checks.push({ label: "Valid email format (RFC)", passed: formatValid });

  // Disposable check
  const isDisposable = DISPOSABLE_DOMAINS.includes(domain.toLowerCase());
  checks.push({
    label: "Not a disposable email",
    passed: !isDisposable,
    detail: isDisposable ? "This is a known disposable email domain" : undefined,
  });

  // Typo check
  const lowerDomain = domain.toLowerCase();
  if (TYPO_MAP[lowerDomain]) {
    suggestion = `${local}@${TYPO_MAP[lowerDomain]}`;
    checks.push({
      label: "No domain typos",
      passed: false,
      detail: `Did you mean ${TYPO_MAP[lowerDomain]}?`,
    });
  }

  const isValid = formatValid && !isDisposable && local.length > 0 && hasTld;

  return { email: trimmed, isValid, checks, suggestion };
}

export default function EmailValidator() {
  const [mode, setMode] = useState<"single" | "bulk">("single");
  const [singleEmail, setSingleEmail] = useState("");
  const [bulkEmails, setBulkEmails] = useState("");
  const [results, setResults] = useState<ValidationResult[]>([]);
  const [copied, setCopied] = useState(false);

  const validateSingle = useCallback(() => {
    if (!singleEmail.trim()) return;
    setResults([validateEmail(singleEmail)]);
  }, [singleEmail]);

  const validateBulk = useCallback(() => {
    const emails = bulkEmails
      .split("\n")
      .map((e) => e.trim())
      .filter(Boolean);
    if (emails.length === 0) return;
    setResults(emails.map(validateEmail));
  }, [bulkEmails]);

  const copyResults = useCallback(async () => {
    const text = results
      .map((r) => `${r.email}: ${r.isValid ? "VALID" : "INVALID"}`)
      .join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [results]);

  const validCount = results.filter((r) => r.isValid).length;
  const invalidCount = results.filter((r) => !r.isValid).length;

  return (
    <div className="space-y-6">
      {/* Mode toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => { setMode("single"); setResults([]); }}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            mode === "single"
              ? "bg-primary text-white"
              : "border border-border bg-muted text-foreground hover:bg-primary/10"
          }`}
        >
          Single Email
        </button>
        <button
          onClick={() => { setMode("bulk"); setResults([]); }}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            mode === "bulk"
              ? "bg-primary text-white"
              : "border border-border bg-muted text-foreground hover:bg-primary/10"
          }`}
        >
          Bulk Validate
        </button>
      </div>

      {/* Input */}
      <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
        {mode === "single" ? (
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Email Address
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={singleEmail}
                onChange={(e) => setSingleEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && validateSingle()}
                placeholder="user@example.com"
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                onClick={validateSingle}
                className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
              >
                Validate
              </button>
            </div>
          </div>
        ) : (
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Email Addresses (one per line)
            </label>
            <textarea
              value={bulkEmails}
              onChange={(e) => setBulkEmails(e.target.value)}
              placeholder={"user1@gmail.com\nuser2@yahoo.com\nuser3@mailinator.com"}
              rows={6}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-mono text-sm"
            />
            <button
              onClick={validateBulk}
              className="mt-2 rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
            >
              Validate All
            </button>
          </div>
        )}
      </div>

      {/* Summary */}
      {results.length > 1 && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-green-500 font-medium">{validCount} valid</span>
            <span className="text-red-500 font-medium">{invalidCount} invalid</span>
            <span className="text-muted-foreground">{results.length} total</span>
          </div>
          <button
            onClick={copyResults}
            className="ml-auto rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
          >
            {copied ? "Copied!" : "Copy Results"}
          </button>
        </div>
      )}

      {/* Results */}
      <div className="space-y-3">
        {results.map((result, i) => (
          <div key={i} className="rounded-xl border border-border bg-muted p-4 space-y-3">
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white ${
                  result.isValid ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {result.isValid ? "\u2713" : "\u2717"}
              </span>
              <code className="font-mono text-sm text-foreground">{result.email}</code>
              <span
                className={`ml-auto rounded-full px-2 py-0.5 text-xs font-medium ${
                  result.isValid
                    ? "bg-green-500/10 text-green-500"
                    : "bg-red-500/10 text-red-500"
                }`}
              >
                {result.isValid ? "Valid" : "Invalid"}
              </span>
            </div>

            <div className="space-y-1">
              {result.checks.map((check, j) => (
                <div key={j} className="flex items-center gap-2 text-xs">
                  <span className={check.passed ? "text-green-500" : "text-red-500"}>
                    {check.passed ? "\u2713" : "\u2717"}
                  </span>
                  <span className="text-foreground">{check.label}</span>
                  {check.detail && (
                    <span className="text-muted-foreground">- {check.detail}</span>
                  )}
                </div>
              ))}
            </div>

            {result.suggestion && (
              <div className="rounded-lg bg-yellow-500/10 px-3 py-2 text-xs text-yellow-600">
                Suggestion: Did you mean{" "}
                <button
                  onClick={() => {
                    if (mode === "single") {
                      setSingleEmail(result.suggestion!);
                    }
                  }}
                  className="font-medium underline"
                >
                  {result.suggestion}
                </button>
                ?
              </div>
            )}
          </div>
        ))}
      </div>

      {results.length === 0 && (
        <div className="rounded-xl border border-border bg-muted p-12 text-center">
          <p className="text-muted-foreground">
            Enter an email address to validate its format, domain, and check for common issues.
          </p>
        </div>
      )}
    </div>
  );
}
