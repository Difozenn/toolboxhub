"use client";

import { useState, useCallback } from "react";

/* ── Color helpers ──────────────────────────────────────────────── */

function randomHex(): string {
  return (
    "#" +
    Array.from({ length: 6 }, () =>
      "0123456789abcdef"[Math.floor(Math.random() * 16)]
    ).join("")
  );
}

function hexToRgb(hex: string): string {
  const c = hex.replace("#", "");
  return `rgb(${parseInt(c.slice(0, 2), 16)}, ${parseInt(c.slice(2, 4), 16)}, ${parseInt(c.slice(4, 6), 16)})`;
}

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16) / 255;
  const g = parseInt(c.slice(2, 4), 16) / 255;
  const b = parseInt(c.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToHex(h: number, s: number, l: number): string {
  const sn = s / 100;
  const ln = l / 100;
  const hue2rgb = (p: number, q: number, t: number) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };
  let r: number, g: number, b: number;
  if (sn === 0) {
    r = g = b = ln;
  } else {
    const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
    const p = 2 * ln - q;
    r = hue2rgb(p, q, h / 360 + 1 / 3);
    g = hue2rgb(p, q, h / 360);
    b = hue2rgb(p, q, h / 360 - 1 / 3);
  }
  const toHex = (n: number) =>
    Math.round(Math.min(255, Math.max(0, n * 255)))
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function getShades(hex: string): string[] {
  const { h, s } = hexToHsl(hex);
  const shades: string[] = [];
  for (let l = 95; l >= 5; l -= 10) {
    shades.push(hslToHex(h, s, l));
  }
  return shades;
}

interface HistoryColor {
  hex: string;
  locked: boolean;
}

export default function RandomColor() {
  const [current, setCurrent] = useState(randomHex());
  const [history, setHistory] = useState<HistoryColor[]>([]);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const generate = useCallback(() => {
    const newColor = randomHex();
    setCurrent(newColor);
    setHistory((prev) => {
      const entry: HistoryColor = { hex: current, locked: false };
      return [entry, ...prev].slice(0, 20);
    });
  }, [current]);

  const toggleLock = useCallback((index: number) => {
    setHistory((prev) =>
      prev.map((c, i) =>
        i === index ? { ...c, locked: !c.locked } : c
      )
    );
  }, []);

  const copyValue = useCallback(async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedValue(value);
    setTimeout(() => setCopiedValue(null), 1500);
  }, []);

  const hsl = hexToHsl(current);
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  const rgbStr = hexToRgb(current);
  const shades = getShades(current);

  const formats = [
    { label: "HEX", value: current.toUpperCase() },
    { label: "RGB", value: rgbStr },
    { label: "HSL", value: hslStr },
  ];

  return (
    <div className="space-y-6">
      {/* Main swatch */}
      <div
        className="flex h-48 w-full items-center justify-center rounded-xl border border-border"
        style={{ backgroundColor: current }}
      >
        <span
          className="rounded-lg bg-black/20 px-4 py-2 font-mono text-xl font-bold text-white backdrop-blur-sm"
        >
          {current.toUpperCase()}
        </span>
      </div>

      {/* Generate button */}
      <button
        onClick={generate}
        className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
      >
        Generate Random Color
      </button>

      {/* Color values */}
      <div className="grid gap-3 sm:grid-cols-3">
        {formats.map((f) => (
          <button
            key={f.label}
            onClick={() => copyValue(f.value)}
            className="group flex items-center justify-between rounded-xl border border-border bg-muted p-4 text-left transition-colors hover:border-primary"
          >
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                {f.label}
              </p>
              <p className="mt-1 font-mono text-sm text-foreground">
                {f.value}
              </p>
            </div>
            <span className="text-xs text-muted-foreground transition-colors group-hover:text-primary">
              {copiedValue === f.value ? "Copied!" : "Copy"}
            </span>
          </button>
        ))}
      </div>

      {/* Shades */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">
          Light / Dark Variations
        </h3>
        <div className="flex overflow-hidden rounded-xl border border-border">
          {shades.map((shade, i) => (
            <button
              key={i}
              onClick={() => copyValue(shade.toUpperCase())}
              className="group relative h-16 flex-1 transition-transform hover:scale-y-110"
              style={{ backgroundColor: shade }}
              title={shade.toUpperCase()}
            >
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 text-white">
                {copiedValue === shade.toUpperCase() ? "Copied!" : shade.toUpperCase()}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            History ({history.length})
          </h3>
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
            {history.map((item, i) => (
              <div key={i} className="group relative">
                <button
                  onClick={() => copyValue(item.hex.toUpperCase())}
                  className="h-12 w-full rounded-lg border border-border transition-transform hover:scale-105"
                  style={{ backgroundColor: item.hex }}
                  title={item.hex.toUpperCase()}
                />
                <button
                  onClick={() => toggleLock(i)}
                  className={`absolute -top-1 -right-1 h-5 w-5 rounded-full text-[10px] ${
                    item.locked
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground opacity-0 group-hover:opacity-100"
                  } border border-border transition-opacity`}
                  title={item.locked ? "Unlock" : "Lock"}
                >
                  {item.locked ? "\u{1F512}" : "\u{1F513}"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
