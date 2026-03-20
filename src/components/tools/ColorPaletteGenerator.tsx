"use client";

import { useState, useCallback } from "react";

interface PaletteColor {
  hex: string;
  locked: boolean;
}

function hexToHsl(hex: string): [number, number, number] {
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
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
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

function hexToRgb(hex: string): string {
  const c = hex.replace("#", "");
  return `rgb(${parseInt(c.slice(0, 2), 16)}, ${parseInt(c.slice(2, 4), 16)}, ${parseInt(c.slice(4, 6), 16)})`;
}

function randomHex(): string {
  return (
    "#" +
    Array.from({ length: 6 }, () =>
      "0123456789abcdef"[Math.floor(Math.random() * 16)]
    ).join("")
  );
}

type HarmonyMode =
  | "complementary"
  | "analogous"
  | "triadic"
  | "split-complementary"
  | "random";

function generatePalette(base: string, mode: HarmonyMode): string[] {
  const [h, s, l] = hexToHsl(base);

  switch (mode) {
    case "complementary":
      return [
        base,
        hslToHex((h + 180) % 360, s, l),
        hslToHex(h, Math.min(100, s + 10), Math.max(20, l - 15)),
        hslToHex((h + 180) % 360, Math.max(10, s - 10), Math.min(85, l + 15)),
        hslToHex((h + 30) % 360, s, l),
      ];
    case "analogous":
      return [
        hslToHex((h - 30 + 360) % 360, s, l),
        hslToHex((h - 15 + 360) % 360, s, l),
        base,
        hslToHex((h + 15) % 360, s, l),
        hslToHex((h + 30) % 360, s, l),
      ];
    case "triadic":
      return [
        base,
        hslToHex((h + 120) % 360, s, l),
        hslToHex((h + 240) % 360, s, l),
        hslToHex(h, Math.max(10, s - 20), Math.min(90, l + 20)),
        hslToHex((h + 120) % 360, Math.max(10, s - 20), Math.min(90, l + 20)),
      ];
    case "split-complementary":
      return [
        base,
        hslToHex((h + 150) % 360, s, l),
        hslToHex((h + 210) % 360, s, l),
        hslToHex(h, Math.max(10, s - 15), Math.min(90, l + 10)),
        hslToHex((h + 180) % 360, Math.max(10, s - 15), Math.min(90, l + 10)),
      ];
    case "random":
    default:
      return [base, randomHex(), randomHex(), randomHex(), randomHex()];
  }
}

export default function ColorPaletteGenerator() {
  const [baseColor, setBaseColor] = useState("#3b82f6");
  const [mode, setMode] = useState<HarmonyMode>("complementary");
  const [palette, setPalette] = useState<PaletteColor[]>(() =>
    generatePalette("#3b82f6", "complementary").map((hex) => ({
      hex,
      locked: false,
    }))
  );
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const regenerate = useCallback(() => {
    const newColors = generatePalette(baseColor, mode);
    setPalette((prev) =>
      prev.map((c, i) => (c.locked ? c : { hex: newColors[i], locked: false }))
    );
  }, [baseColor, mode]);

  const toggleLock = useCallback((index: number) => {
    setPalette((prev) =>
      prev.map((c, i) => (i === index ? { ...c, locked: !c.locked } : c))
    );
  }, []);

  const copyColor = useCallback(async (value: string, index: number) => {
    await navigator.clipboard.writeText(value);
    setCopiedIdx(index);
    setTimeout(() => setCopiedIdx(null), 1500);
  }, []);

  const modes: HarmonyMode[] = [
    "complementary",
    "analogous",
    "triadic",
    "split-complementary",
    "random",
  ];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="rounded-xl border border-border bg-muted p-5 space-y-5">
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Base Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="h-10 w-14 cursor-pointer rounded-lg border border-border bg-transparent"
              />
              <input
                type="text"
                value={baseColor}
                onChange={(e) => {
                  const v = e.target.value;
                  setBaseColor(v);
                }}
                className="w-28 rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Harmony Mode
            </label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as HarmonyMode)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {modes.map((m) => (
                <option key={m} value={m}>
                  {m.charAt(0).toUpperCase() + m.slice(1).replace("-", " ")}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={regenerate}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Generate Palette
          </button>
        </div>
      </div>

      {/* Palette Display */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
        {palette.map((color, i) => (
          <div
            key={i}
            className="group rounded-xl border border-border overflow-hidden"
          >
            {/* Color swatch */}
            <div
              className="relative h-32 w-full cursor-pointer"
              style={{ backgroundColor: color.hex }}
              onClick={() => copyColor(color.hex, i)}
            >
              <span className="absolute inset-0 flex items-center justify-center text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100 bg-black/20 text-white">
                {copiedIdx === i ? "Copied!" : "Click to copy"}
              </span>
            </div>

            {/* Info */}
            <div className="bg-muted p-3 space-y-1">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => copyColor(color.hex, i)}
                  className="font-mono text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {color.hex.toUpperCase()}
                </button>
                <button
                  onClick={() => toggleLock(i)}
                  className={`text-sm transition-colors ${
                    color.locked
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  title={color.locked ? "Unlock color" : "Lock color"}
                >
                  {color.locked ? "\u{1F512}" : "\u{1F513}"}
                </button>
              </div>
              <p className="font-mono text-xs text-muted-foreground">
                {hexToRgb(color.hex)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
