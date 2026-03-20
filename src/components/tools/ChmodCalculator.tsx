"use client";

import { useState, useCallback, useMemo } from "react";

interface Permissions {
  read: boolean;
  write: boolean;
  execute: boolean;
}

const PRESETS = [
  { value: "644", label: "644 — Default file" },
  { value: "755", label: "755 — Default directory / executable" },
  { value: "777", label: "777 — Full access (all)" },
  { value: "600", label: "600 — Private file" },
  { value: "700", label: "700 — Private directory" },
  { value: "444", label: "444 — Read-only (all)" },
  { value: "666", label: "666 — Read/write (all)" },
  { value: "750", label: "750 — Owner full, group read/exec" },
];

function permToOctal(p: Permissions): number {
  return (p.read ? 4 : 0) + (p.write ? 2 : 0) + (p.execute ? 1 : 0);
}

function octalToPerm(n: number): Permissions {
  return {
    read: (n & 4) !== 0,
    write: (n & 2) !== 0,
    execute: (n & 1) !== 0,
  };
}

function permToSymbolic(p: Permissions): string {
  return (
    (p.read ? "r" : "-") +
    (p.write ? "w" : "-") +
    (p.execute ? "x" : "-")
  );
}

export default function ChmodCalculator() {
  const [owner, setOwner] = useState<Permissions>({
    read: true,
    write: true,
    execute: true,
  });
  const [group, setGroup] = useState<Permissions>({
    read: true,
    write: false,
    execute: true,
  });
  const [others, setOthers] = useState<Permissions>({
    read: true,
    write: false,
    execute: true,
  });
  const [numericInput, setNumericInput] = useState("755");
  const [copied, setCopied] = useState<string | null>(null);

  const numericValue = useMemo(() => {
    return `${permToOctal(owner)}${permToOctal(group)}${permToOctal(others)}`;
  }, [owner, group, others]);

  const symbolicValue = useMemo(() => {
    return `${permToSymbolic(owner)}${permToSymbolic(group)}${permToSymbolic(others)}`;
  }, [owner, group, others]);

  const handleNumericChange = useCallback((value: string) => {
    setNumericInput(value);
    const clean = value.replace(/[^0-7]/g, "").slice(0, 3);
    if (clean.length === 3) {
      setOwner(octalToPerm(parseInt(clean[0])));
      setGroup(octalToPerm(parseInt(clean[1])));
      setOthers(octalToPerm(parseInt(clean[2])));
    }
  }, []);

  const applyPreset = useCallback(
    (value: string) => {
      handleNumericChange(value);
    },
    [handleNumericChange]
  );

  // Sync numeric input when checkboxes change
  const updateFromCheckboxes = useCallback(() => {
    const val = `${permToOctal(owner)}${permToOctal(group)}${permToOctal(others)}`;
    setNumericInput(val);
  }, [owner, group, others]);

  // We need to update numeric input when checkboxes change
  // Using a wrapper that updates both state and numeric input
  const togglePerm = useCallback(
    (
      who: "owner" | "group" | "others",
      perm: "read" | "write" | "execute"
    ) => {
      const setter =
        who === "owner" ? setOwner : who === "group" ? setGroup : setOthers;
      setter((prev) => {
        const updated = { ...prev, [perm]: !prev[perm] };
        // Schedule numeric input update
        setTimeout(() => {
          const o = who === "owner" ? updated : owner;
          const g = who === "group" ? updated : group;
          const ot = who === "others" ? updated : others;
          setNumericInput(
            `${permToOctal(o)}${permToOctal(g)}${permToOctal(ot)}`
          );
        }, 0);
        return updated;
      });
    },
    [owner, group, others]
  );

  const copy = useCallback(
    async (label: string, value: string) => {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied(null), 1500);
    },
    []
  );

  const groups = [
    { label: "Owner", perms: owner, key: "owner" as const },
    { label: "Group", perms: group, key: "group" as const },
    { label: "Others", perms: others, key: "others" as const },
  ];

  return (
    <div className="space-y-6">
      {/* Numeric input */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">
          Numeric Value
        </label>
        <input
          type="text"
          value={numericInput}
          onChange={(e) => handleNumericChange(e.target.value)}
          maxLength={3}
          placeholder="755"
          className="w-32 rounded-xl border border-border bg-muted px-4 py-3 text-center font-mono text-2xl font-bold text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Permission checkboxes */}
      <div className="grid gap-4 sm:grid-cols-3">
        {groups.map(({ label, perms, key }) => (
          <div
            key={key}
            className="rounded-xl border border-border bg-muted p-4 space-y-3"
          >
            <h3 className="text-sm font-semibold text-foreground">{label}</h3>
            {(["read", "write", "execute"] as const).map((perm) => (
              <label
                key={perm}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={perms[perm]}
                  onChange={() => togglePerm(key, perm)}
                  className="h-4 w-4 rounded border-border accent-primary"
                />
                <span className="text-sm capitalize text-foreground">
                  {perm}
                </span>
              </label>
            ))}
            <div className="pt-1 border-t border-border">
              <span className="font-mono text-sm text-primary font-medium">
                {permToOctal(perms)} ({permToSymbolic(perms)})
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Results */}
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          onClick={() => copy("numeric", numericValue)}
          className="group flex items-center justify-between rounded-xl border border-border bg-muted p-4 text-left transition-colors hover:border-primary"
        >
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Numeric
            </p>
            <p className="mt-1 font-mono text-xl font-bold text-foreground">
              {numericValue}
            </p>
          </div>
          <span className="text-xs text-muted-foreground transition-colors group-hover:text-primary">
            {copied === "numeric" ? "Copied!" : "Click to copy"}
          </span>
        </button>

        <button
          onClick={() => copy("symbolic", symbolicValue)}
          className="group flex items-center justify-between rounded-xl border border-border bg-muted p-4 text-left transition-colors hover:border-primary"
        >
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Symbolic
            </p>
            <p className="mt-1 font-mono text-xl font-bold text-foreground">
              {symbolicValue}
            </p>
          </div>
          <span className="text-xs text-muted-foreground transition-colors group-hover:text-primary">
            {copied === "symbolic" ? "Copied!" : "Click to copy"}
          </span>
        </button>
      </div>

      {/* Command */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">
            Command
          </label>
          <button
            onClick={() =>
              copy("command", `chmod ${numericValue} filename`)
            }
            className="rounded-lg border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
          >
            {copied === "command" ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground">
          chmod {numericValue} filename
        </pre>
      </div>

      {/* Presets */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Common Presets
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.value}
              onClick={() => applyPreset(preset.value)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                numericValue === preset.value
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-background text-foreground hover:bg-muted"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
