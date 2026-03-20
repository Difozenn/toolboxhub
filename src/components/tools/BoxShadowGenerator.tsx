"use client";

import { useState, useCallback, useMemo } from "react";

interface Shadow {
  id: string;
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  inset: boolean;
}

let shadowIdCounter = 0;
function newId(): string {
  return `shadow-${++shadowIdCounter}-${Date.now()}`;
}

function createDefaultShadow(): Shadow {
  return {
    id: newId(),
    x: 4,
    y: 4,
    blur: 10,
    spread: 0,
    color: "#00000040",
    inset: false,
  };
}

export default function BoxShadowGenerator() {
  const [shadows, setShadows] = useState<Shadow[]>([createDefaultShadow()]);
  const [activeId, setActiveId] = useState<string>(shadows[0].id);
  const [copied, setCopied] = useState(false);

  const activeShadow = shadows.find((s) => s.id === activeId) || shadows[0];

  const addShadow = useCallback(() => {
    const newShadow = createDefaultShadow();
    setShadows((prev) => [...prev, newShadow]);
    setActiveId(newShadow.id);
  }, []);

  const removeShadow = useCallback(
    (id: string) => {
      if (shadows.length <= 1) return;
      setShadows((prev) => prev.filter((s) => s.id !== id));
      if (activeId === id) {
        setActiveId(shadows.find((s) => s.id !== id)?.id || shadows[0].id);
      }
    },
    [shadows, activeId]
  );

  const updateShadow = useCallback(
    (field: keyof Shadow, value: number | string | boolean) => {
      setShadows((prev) =>
        prev.map((s) =>
          s.id === activeId ? { ...s, [field]: value } : s
        )
      );
    },
    [activeId]
  );

  const cssValue = useMemo(() => {
    return shadows
      .map((s) => {
        const parts = [
          s.inset ? "inset" : "",
          `${s.x}px`,
          `${s.y}px`,
          `${s.blur}px`,
          `${s.spread}px`,
          s.color,
        ]
          .filter(Boolean)
          .join(" ");
        return parts;
      })
      .join(", ");
  }, [shadows]);

  const cssCode = `box-shadow: ${cssValue};`;

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [cssCode]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Controls */}
        <div className="space-y-5">
          {/* Shadow tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {shadows.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveId(s.id)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeId === s.id
                    ? "bg-primary text-white"
                    : "border border-border bg-background text-foreground hover:bg-muted"
                }`}
              >
                Shadow {i + 1}
              </button>
            ))}
            <button
              onClick={addShadow}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
            >
              + Add
            </button>
          </div>

          {/* Active shadow controls */}
          <div className="rounded-xl border border-border bg-muted p-5 space-y-4">
            {/* X Offset */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-foreground">
                  Horizontal Offset
                </label>
                <span className="rounded-md bg-primary/10 px-2 py-0.5 text-sm font-bold text-primary">
                  {activeShadow.x}px
                </span>
              </div>
              <input
                type="range"
                min={-100}
                max={100}
                value={activeShadow.x}
                onChange={(e) => updateShadow("x", Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            {/* Y Offset */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-foreground">
                  Vertical Offset
                </label>
                <span className="rounded-md bg-primary/10 px-2 py-0.5 text-sm font-bold text-primary">
                  {activeShadow.y}px
                </span>
              </div>
              <input
                type="range"
                min={-100}
                max={100}
                value={activeShadow.y}
                onChange={(e) => updateShadow("y", Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            {/* Blur */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-foreground">
                  Blur Radius
                </label>
                <span className="rounded-md bg-primary/10 px-2 py-0.5 text-sm font-bold text-primary">
                  {activeShadow.blur}px
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={activeShadow.blur}
                onChange={(e) => updateShadow("blur", Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            {/* Spread */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-foreground">
                  Spread Radius
                </label>
                <span className="rounded-md bg-primary/10 px-2 py-0.5 text-sm font-bold text-primary">
                  {activeShadow.spread}px
                </span>
              </div>
              <input
                type="range"
                min={-50}
                max={50}
                value={activeShadow.spread}
                onChange={(e) =>
                  updateShadow("spread", Number(e.target.value))
                }
                className="w-full accent-primary"
              />
            </div>

            {/* Color */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-foreground">
                Color
              </label>
              <input
                type="color"
                value={activeShadow.color.slice(0, 7)}
                onChange={(e) => updateShadow("color", e.target.value + "40")}
                className="h-9 w-12 cursor-pointer rounded border border-border"
              />
              <input
                type="text"
                value={activeShadow.color}
                onChange={(e) => updateShadow("color", e.target.value)}
                className="w-28 rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Inset */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={activeShadow.inset}
                onChange={(e) => updateShadow("inset", e.target.checked)}
                className="h-4 w-4 rounded border-border accent-primary"
              />
              <span className="text-sm font-medium text-foreground">
                Inset
              </span>
            </label>

            {/* Remove */}
            {shadows.length > 1 && (
              <button
                onClick={() => removeShadow(activeShadow.id)}
                className="rounded-lg border border-red-300 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
              >
                Remove This Shadow
              </button>
            )}
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">
            Preview
          </label>
          <div className="flex items-center justify-center rounded-xl border border-border bg-background p-12 min-h-[300px]">
            <div
              className="h-40 w-40 rounded-xl bg-white dark:bg-zinc-800 border border-border"
              style={{ boxShadow: cssValue }}
            />
          </div>
        </div>
      </div>

      {/* Generated CSS */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">
            Generated CSS
          </label>
          <button
            onClick={copy}
            className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="overflow-auto rounded-xl border border-border bg-muted p-4 font-mono text-sm text-foreground whitespace-pre-wrap">
          {cssCode}
        </pre>
      </div>
    </div>
  );
}
