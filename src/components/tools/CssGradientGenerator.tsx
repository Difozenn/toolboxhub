"use client";

import { useState, useCallback, useMemo } from "react";

interface ColorStop {
  id: string;
  color: string;
  position: number;
}

let stopIdCounter = 0;
function newId(): string {
  return `stop-${++stopIdCounter}-${Date.now()}`;
}

export default function CssGradientGenerator() {
  const [gradientType, setGradientType] = useState<"linear" | "radial">(
    "linear"
  );
  const [angle, setAngle] = useState(90);
  const [stops, setStops] = useState<ColorStop[]>([
    { id: newId(), color: "#3b82f6", position: 0 },
    { id: newId(), color: "#8b5cf6", position: 100 },
  ]);
  const [copied, setCopied] = useState(false);

  const addStop = useCallback(() => {
    setStops((prev) => [
      ...prev,
      { id: newId(), color: "#10b981", position: 50 },
    ]);
  }, []);

  const removeStop = useCallback(
    (id: string) => {
      if (stops.length <= 2) return;
      setStops((prev) => prev.filter((s) => s.id !== id));
    },
    [stops.length]
  );

  const updateStop = useCallback(
    (id: string, field: "color" | "position", value: string | number) => {
      setStops((prev) =>
        prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
      );
    },
    []
  );

  const cssValue = useMemo(() => {
    const sortedStops = [...stops].sort((a, b) => a.position - b.position);
    const stopsStr = sortedStops
      .map((s) => `${s.color} ${s.position}%`)
      .join(", ");

    if (gradientType === "linear") {
      return `linear-gradient(${angle}deg, ${stopsStr})`;
    }
    return `radial-gradient(circle, ${stopsStr})`;
  }, [gradientType, angle, stops]);

  const cssCode = `background: ${cssValue};`;

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [cssCode]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="rounded-xl border border-border bg-muted p-5 space-y-5">
        {/* Type toggle */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-foreground">Type:</label>
          <div className="flex gap-2">
            {(["linear", "radial"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setGradientType(type)}
                className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${
                  gradientType === type
                    ? "bg-primary text-white"
                    : "border border-border bg-background text-foreground hover:bg-muted"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Angle slider (linear only) */}
        {gradientType === "linear" && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-foreground">
                Angle
              </label>
              <span className="rounded-md bg-primary/10 px-2 py-0.5 text-sm font-bold text-primary">
                {angle}deg
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={360}
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0deg</span>
              <span>180deg</span>
              <span>360deg</span>
            </div>
          </div>
        )}

        {/* Color stops */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">
              Color Stops
            </label>
            <button
              onClick={addStop}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-white"
            >
              + Add Stop
            </button>
          </div>

          {stops.map((stop) => (
            <div
              key={stop.id}
              className="flex items-center gap-3 rounded-lg border border-border bg-background p-3"
            >
              <input
                type="color"
                value={stop.color}
                onChange={(e) => updateStop(stop.id, "color", e.target.value)}
                className="h-9 w-12 cursor-pointer rounded border border-border"
              />
              <input
                type="text"
                value={stop.color}
                onChange={(e) => updateStop(stop.id, "color", e.target.value)}
                className="w-24 rounded-lg border border-border bg-muted px-3 py-2 font-mono text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <div className="flex flex-1 items-center gap-2">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={stop.position}
                  onChange={(e) =>
                    updateStop(stop.id, "position", Number(e.target.value))
                  }
                  className="flex-1 accent-primary"
                />
                <span className="w-12 text-right text-sm text-muted-foreground">
                  {stop.position}%
                </span>
              </div>
              {stops.length > 2 && (
                <button
                  onClick={() => removeStop(stop.id)}
                  className="rounded-lg border border-border bg-background px-2 py-1.5 text-sm text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">
          Preview
        </label>
        <div
          className="h-48 w-full rounded-xl border border-border"
          style={{ background: cssValue }}
        />
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
