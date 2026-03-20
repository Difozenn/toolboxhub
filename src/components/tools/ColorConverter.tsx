"use client";

import { useState, useCallback } from "react";

/* ── Color conversion helpers ───────────────────────────────────── */

interface RGB {
  r: number;
  g: number;
  b: number;
}
interface HSL {
  h: number;
  s: number;
  l: number;
}
interface HSV {
  h: number;
  s: number;
  v: number;
}

function hexToRgb(hex: string): RGB | null {
  const clean = hex.replace(/^#/, "");
  let full = clean;
  if (full.length === 3) {
    full = full
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (full.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(full)) return null;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

function rgbToHex(rgb: RGB): string {
  const toHex = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

function rgbToHsl(rgb: RGB): HSL {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
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

function hslToRgb(hsl: HSL): RGB {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  if (s === 0) {
    const val = Math.round(l * 255);
    return { r: val, g: val, b: val };
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  return {
    r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  };
}

function rgbToHsv(rgb: RGB): HSV {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
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
    v: Math.round(v * 100),
  };
}

/* ── Parsers ────────────────────────────────────────────────────── */

function parseRgbString(str: string): RGB | null {
  const match = str.match(
    /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/
  );
  if (!match) return null;
  const r = parseInt(match[1]);
  const g = parseInt(match[2]);
  const b = parseInt(match[3]);
  if (r > 255 || g > 255 || b > 255) return null;
  return { r, g, b };
}

function parseHslString(str: string): HSL | null {
  const match = str.match(
    /hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%?\s*,\s*(\d{1,3})%?/
  );
  if (!match) return null;
  const h = parseInt(match[1]);
  const s = parseInt(match[2]);
  const l = parseInt(match[3]);
  if (h > 360 || s > 100 || l > 100) return null;
  return { h, s, l };
}

/* ── Component ──────────────────────────────────────────────────── */

export default function ColorConverter() {
  const [input, setInput] = useState("#3b82f6");
  const [rgb, setRgb] = useState<RGB | null>(hexToRgb("#3b82f6"));
  const [hsl, setHsl] = useState<HSL | null>(
    rgb ? rgbToHsl(rgb) : null
  );
  const [hsv, setHsv] = useState<HSV | null>(
    rgb ? rgbToHsv(rgb) : null
  );
  const [hex, setHex] = useState("#3b82f6");
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const updateFromRgb = useCallback((rgbVal: RGB) => {
    setRgb(rgbVal);
    setHex(rgbToHex(rgbVal));
    setHsl(rgbToHsl(rgbVal));
    setHsv(rgbToHsv(rgbVal));
    setError(null);
  }, []);

  const handleInput = useCallback(
    (value: string) => {
      setInput(value);
      const trimmed = value.trim();

      // Try HEX
      const asRgb = hexToRgb(trimmed);
      if (asRgb) {
        updateFromRgb(asRgb);
        return;
      }

      // Try rgb(...)
      const parsedRgb = parseRgbString(trimmed);
      if (parsedRgb) {
        updateFromRgb(parsedRgb);
        return;
      }

      // Try hsl(...)
      const parsedHsl = parseHslString(trimmed);
      if (parsedHsl) {
        const converted = hslToRgb(parsedHsl);
        updateFromRgb(converted);
        return;
      }

      setError("Enter a valid HEX (#ff0000), RGB (rgb(255,0,0)), or HSL (hsl(0,100%,50%)) value.");
    },
    [updateFromRgb]
  );

  const copyValue = useCallback(async (label: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 1500);
  }, []);

  const hexStr = hex;
  const rgbStr = rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "";
  const hslStr = hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : "";
  const hsvStr = hsv ? `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)` : "";

  const outputs = [
    { label: "HEX", value: hexStr },
    { label: "RGB", value: rgbStr },
    { label: "HSL", value: hslStr },
    { label: "HSV", value: hsvStr },
  ];

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">
          Enter a color (HEX, RGB, or HSL)
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => handleInput(e.target.value)}
          placeholder="#3b82f6, rgb(59,130,246), or hsl(217,91%,60%)"
          className="w-full rounded-xl border border-border bg-muted px-4 py-3 font-mono text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}

      {rgb && !error && (
        <>
          {/* Color swatch */}
          <div
            className="h-32 w-full rounded-xl border border-border"
            style={{ backgroundColor: hexStr }}
          />

          {/* Conversions */}
          <div className="grid gap-3 sm:grid-cols-2">
            {outputs.map((item) => (
              <button
                key={item.label}
                onClick={() => copyValue(item.label, item.value)}
                className="group flex items-center justify-between rounded-xl border border-border bg-muted p-4 text-left transition-colors hover:border-primary"
              >
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="mt-1 font-mono text-sm text-foreground">
                    {item.value}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground transition-colors group-hover:text-primary">
                  {copiedField === item.label ? "Copied!" : "Click to copy"}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
