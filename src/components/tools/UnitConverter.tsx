"use client";

import { useState, useMemo, useCallback } from "react";

type CategoryKey =
  | "length"
  | "weight"
  | "temperature"
  | "speed"
  | "area"
  | "volume"
  | "data"
  | "time";

interface UnitDef {
  label: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

const CATEGORIES: Record<
  CategoryKey,
  { label: string; units: Record<string, UnitDef> }
> = {
  length: {
    label: "Length",
    units: {
      mm: {
        label: "Millimeters (mm)",
        toBase: (v) => v / 1000,
        fromBase: (v) => v * 1000,
      },
      cm: {
        label: "Centimeters (cm)",
        toBase: (v) => v / 100,
        fromBase: (v) => v * 100,
      },
      m: {
        label: "Meters (m)",
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      km: {
        label: "Kilometers (km)",
        toBase: (v) => v * 1000,
        fromBase: (v) => v / 1000,
      },
      in: {
        label: "Inches (in)",
        toBase: (v) => v * 0.0254,
        fromBase: (v) => v / 0.0254,
      },
      ft: {
        label: "Feet (ft)",
        toBase: (v) => v * 0.3048,
        fromBase: (v) => v / 0.3048,
      },
      yd: {
        label: "Yards (yd)",
        toBase: (v) => v * 0.9144,
        fromBase: (v) => v / 0.9144,
      },
      mi: {
        label: "Miles (mi)",
        toBase: (v) => v * 1609.344,
        fromBase: (v) => v / 1609.344,
      },
    },
  },
  weight: {
    label: "Weight",
    units: {
      mg: {
        label: "Milligrams (mg)",
        toBase: (v) => v / 1_000_000,
        fromBase: (v) => v * 1_000_000,
      },
      g: {
        label: "Grams (g)",
        toBase: (v) => v / 1000,
        fromBase: (v) => v * 1000,
      },
      kg: {
        label: "Kilograms (kg)",
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      t: {
        label: "Metric Tons (t)",
        toBase: (v) => v * 1000,
        fromBase: (v) => v / 1000,
      },
      oz: {
        label: "Ounces (oz)",
        toBase: (v) => v * 0.0283495,
        fromBase: (v) => v / 0.0283495,
      },
      lb: {
        label: "Pounds (lb)",
        toBase: (v) => v * 0.453592,
        fromBase: (v) => v / 0.453592,
      },
      st: {
        label: "Stones (st)",
        toBase: (v) => v * 6.35029,
        fromBase: (v) => v / 6.35029,
      },
    },
  },
  temperature: {
    label: "Temperature",
    units: {
      c: {
        label: "Celsius (\u00B0C)",
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      f: {
        label: "Fahrenheit (\u00B0F)",
        toBase: (v) => ((v - 32) * 5) / 9,
        fromBase: (v) => (v * 9) / 5 + 32,
      },
      k: {
        label: "Kelvin (K)",
        toBase: (v) => v - 273.15,
        fromBase: (v) => v + 273.15,
      },
    },
  },
  speed: {
    label: "Speed",
    units: {
      mps: {
        label: "Meters/second (m/s)",
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      kph: {
        label: "Kilometers/hour (km/h)",
        toBase: (v) => v / 3.6,
        fromBase: (v) => v * 3.6,
      },
      mph: {
        label: "Miles/hour (mph)",
        toBase: (v) => v * 0.44704,
        fromBase: (v) => v / 0.44704,
      },
      knot: {
        label: "Knots (kn)",
        toBase: (v) => v * 0.514444,
        fromBase: (v) => v / 0.514444,
      },
      fps: {
        label: "Feet/second (ft/s)",
        toBase: (v) => v * 0.3048,
        fromBase: (v) => v / 0.3048,
      },
    },
  },
  area: {
    label: "Area",
    units: {
      sqm: {
        label: "Square Meters (m\u00B2)",
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      sqkm: {
        label: "Square Kilometers (km\u00B2)",
        toBase: (v) => v * 1_000_000,
        fromBase: (v) => v / 1_000_000,
      },
      sqft: {
        label: "Square Feet (ft\u00B2)",
        toBase: (v) => v * 0.092903,
        fromBase: (v) => v / 0.092903,
      },
      sqyd: {
        label: "Square Yards (yd\u00B2)",
        toBase: (v) => v * 0.836127,
        fromBase: (v) => v / 0.836127,
      },
      acre: {
        label: "Acres",
        toBase: (v) => v * 4046.86,
        fromBase: (v) => v / 4046.86,
      },
      ha: {
        label: "Hectares (ha)",
        toBase: (v) => v * 10000,
        fromBase: (v) => v / 10000,
      },
      sqmi: {
        label: "Square Miles (mi\u00B2)",
        toBase: (v) => v * 2_589_988,
        fromBase: (v) => v / 2_589_988,
      },
    },
  },
  volume: {
    label: "Volume",
    units: {
      ml: {
        label: "Milliliters (mL)",
        toBase: (v) => v / 1000,
        fromBase: (v) => v * 1000,
      },
      l: {
        label: "Liters (L)",
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      m3: {
        label: "Cubic Meters (m\u00B3)",
        toBase: (v) => v * 1000,
        fromBase: (v) => v / 1000,
      },
      gal: {
        label: "US Gallons (gal)",
        toBase: (v) => v * 3.78541,
        fromBase: (v) => v / 3.78541,
      },
      qt: {
        label: "US Quarts (qt)",
        toBase: (v) => v * 0.946353,
        fromBase: (v) => v / 0.946353,
      },
      cup: {
        label: "US Cups",
        toBase: (v) => v * 0.236588,
        fromBase: (v) => v / 0.236588,
      },
      floz: {
        label: "US Fluid Ounces (fl oz)",
        toBase: (v) => v * 0.0295735,
        fromBase: (v) => v / 0.0295735,
      },
      tbsp: {
        label: "Tablespoons (tbsp)",
        toBase: (v) => v * 0.0147868,
        fromBase: (v) => v / 0.0147868,
      },
      tsp: {
        label: "Teaspoons (tsp)",
        toBase: (v) => v * 0.00492892,
        fromBase: (v) => v / 0.00492892,
      },
    },
  },
  data: {
    label: "Data",
    units: {
      b: {
        label: "Bytes (B)",
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      kb: {
        label: "Kilobytes (KB)",
        toBase: (v) => v * 1024,
        fromBase: (v) => v / 1024,
      },
      mb: {
        label: "Megabytes (MB)",
        toBase: (v) => v * 1024 ** 2,
        fromBase: (v) => v / 1024 ** 2,
      },
      gb: {
        label: "Gigabytes (GB)",
        toBase: (v) => v * 1024 ** 3,
        fromBase: (v) => v / 1024 ** 3,
      },
      tb: {
        label: "Terabytes (TB)",
        toBase: (v) => v * 1024 ** 4,
        fromBase: (v) => v / 1024 ** 4,
      },
      pb: {
        label: "Petabytes (PB)",
        toBase: (v) => v * 1024 ** 5,
        fromBase: (v) => v / 1024 ** 5,
      },
      bit: {
        label: "Bits",
        toBase: (v) => v / 8,
        fromBase: (v) => v * 8,
      },
      kbit: {
        label: "Kilobits (Kbit)",
        toBase: (v) => (v * 1024) / 8,
        fromBase: (v) => (v * 8) / 1024,
      },
      mbit: {
        label: "Megabits (Mbit)",
        toBase: (v) => (v * 1024 ** 2) / 8,
        fromBase: (v) => (v * 8) / 1024 ** 2,
      },
    },
  },
  time: {
    label: "Time",
    units: {
      ms: {
        label: "Milliseconds (ms)",
        toBase: (v) => v / 1000,
        fromBase: (v) => v * 1000,
      },
      s: {
        label: "Seconds (s)",
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      min: {
        label: "Minutes (min)",
        toBase: (v) => v * 60,
        fromBase: (v) => v / 60,
      },
      h: {
        label: "Hours (h)",
        toBase: (v) => v * 3600,
        fromBase: (v) => v / 3600,
      },
      d: {
        label: "Days (d)",
        toBase: (v) => v * 86400,
        fromBase: (v) => v / 86400,
      },
      wk: {
        label: "Weeks (wk)",
        toBase: (v) => v * 604800,
        fromBase: (v) => v / 604800,
      },
      mo: {
        label: "Months (avg)",
        toBase: (v) => v * 2_629_746,
        fromBase: (v) => v / 2_629_746,
      },
      yr: {
        label: "Years (yr)",
        toBase: (v) => v * 31_556_952,
        fromBase: (v) => v / 31_556_952,
      },
    },
  },
};

function formatResult(value: number): string {
  if (!isFinite(value)) return "---";
  // Use toPrecision for very large or very small numbers
  if (Math.abs(value) > 1e12 || (Math.abs(value) < 1e-6 && value !== 0)) {
    return value.toExponential(6);
  }
  // Avoid floating point noise
  const str = value.toPrecision(12);
  return parseFloat(str).toString();
}

export default function UnitConverter() {
  const [category, setCategory] = useState<CategoryKey>("length");
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [copied, setCopied] = useState(false);

  const catData = CATEGORIES[category];
  const unitKeys = Object.keys(catData.units);

  // Initialize from/to when category changes
  const effectiveFrom = fromUnit && catData.units[fromUnit] ? fromUnit : unitKeys[0];
  const effectiveTo = toUnit && catData.units[toUnit] ? toUnit : unitKeys[1] ?? unitKeys[0];

  const result = useMemo(() => {
    const num = parseFloat(inputValue);
    if (isNaN(num)) return "";
    const baseValue = catData.units[effectiveFrom].toBase(num);
    const converted = catData.units[effectiveTo].fromBase(baseValue);
    return formatResult(converted);
  }, [inputValue, effectiveFrom, effectiveTo, catData]);

  const handleSwap = useCallback(() => {
    setFromUnit(effectiveTo);
    setToUnit(effectiveFrom);
    if (result) {
      setInputValue(result);
    }
  }, [effectiveFrom, effectiveTo, result]);

  const copyResult = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [result]);

  return (
    <div className="space-y-6">
      {/* Category selector */}
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Category
        </label>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(CATEGORIES) as CategoryKey[]).map((key) => (
            <button
              key={key}
              onClick={() => {
                setCategory(key);
                setFromUnit("");
                setToUnit("");
                setInputValue("");
              }}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                category === key
                  ? "bg-primary text-white"
                  : "border border-border bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {CATEGORIES[key].label}
            </button>
          ))}
        </div>
      </div>

      {/* Converter */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr]">
        {/* From */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            From
          </label>
          <select
            value={effectiveFrom}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full rounded-xl border border-border bg-muted p-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {unitKeys.map((key) => (
              <option key={key} value={key}>
                {catData.units[key].label}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value..."
            className="w-full rounded-xl border border-border bg-muted p-3 text-lg font-mono text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Swap button */}
        <div className="flex items-center justify-center">
          <button
            onClick={handleSwap}
            className="rounded-full border border-border bg-muted p-3 text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            aria-label="Swap units"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 16l-4-4 4-4" />
              <path d="M17 8l4 4-4 4" />
              <path d="M3 12h18" />
            </svg>
          </button>
        </div>

        {/* To */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            To
          </label>
          <select
            value={effectiveTo}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full rounded-xl border border-border bg-muted p-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {unitKeys.map((key) => (
              <option key={key} value={key}>
                {catData.units[key].label}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-2">
            <div className="flex-1 rounded-xl border border-border bg-muted p-3 text-lg font-mono text-foreground min-h-[52px]">
              {result || (
                <span className="text-muted-foreground">Result</span>
              )}
            </div>
            <button
              onClick={copyResult}
              disabled={!result}
              className="shrink-0 rounded-xl border border-border bg-primary px-3 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>

      {/* Formula display */}
      {result && inputValue && (
        <div className="rounded-xl border border-border bg-muted p-4 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-mono font-medium text-foreground">
              {inputValue} {catData.units[effectiveFrom].label}
            </span>
            {" = "}
            <span className="font-mono font-medium text-primary">
              {result} {catData.units[effectiveTo].label}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
