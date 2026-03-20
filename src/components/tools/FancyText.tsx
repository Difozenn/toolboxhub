"use client";

import { useState, useMemo, useCallback } from "react";

// Unicode character maps for fancy text conversions
const BOLD_MAP: Record<string, string> = {};
const ITALIC_MAP: Record<string, string> = {};
const BOLD_ITALIC_MAP: Record<string, string> = {};
const MONO_MAP: Record<string, string> = {};
const SCRIPT_MAP: Record<string, string> = {};
const DOUBLE_STRUCK_MAP: Record<string, string> = {};
const CIRCLED_MAP: Record<string, string> = {};
const FULLWIDTH_MAP: Record<string, string> = {};

// Build maps
const lower = "abcdefghijklmnopqrstuvwxyz";
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const digits = "0123456789";

// Bold (Mathematical Bold) U+1D400
const boldUpper = "\u{1D400}\u{1D401}\u{1D402}\u{1D403}\u{1D404}\u{1D405}\u{1D406}\u{1D407}\u{1D408}\u{1D409}\u{1D40A}\u{1D40B}\u{1D40C}\u{1D40D}\u{1D40E}\u{1D40F}\u{1D410}\u{1D411}\u{1D412}\u{1D413}\u{1D414}\u{1D415}\u{1D416}\u{1D417}\u{1D418}\u{1D419}";
const boldLower = "\u{1D41A}\u{1D41B}\u{1D41C}\u{1D41D}\u{1D41E}\u{1D41F}\u{1D420}\u{1D421}\u{1D422}\u{1D423}\u{1D424}\u{1D425}\u{1D426}\u{1D427}\u{1D428}\u{1D429}\u{1D42A}\u{1D42B}\u{1D42C}\u{1D42D}\u{1D42E}\u{1D42F}\u{1D430}\u{1D431}\u{1D432}\u{1D433}";
const boldDigits = "\u{1D7CE}\u{1D7CF}\u{1D7D0}\u{1D7D1}\u{1D7D2}\u{1D7D3}\u{1D7D4}\u{1D7D5}\u{1D7D6}\u{1D7D7}";

// Italic (Mathematical Italic) U+1D434
const italicUpper = "\u{1D434}\u{1D435}\u{1D436}\u{1D437}\u{1D438}\u{1D439}\u{1D43A}\u{1D43B}\u{1D43C}\u{1D43D}\u{1D43E}\u{1D43F}\u{1D440}\u{1D441}\u{1D442}\u{1D443}\u{1D444}\u{1D445}\u{1D446}\u{1D447}\u{1D448}\u{1D449}\u{1D44A}\u{1D44B}\u{1D44C}\u{1D44D}";
const italicLower = "\u{1D44E}\u{1D44F}\u{1D450}\u{1D451}\u{1D452}\u{1D453}\u{1D454}\u{210E}\u{1D456}\u{1D457}\u{1D458}\u{1D459}\u{1D45A}\u{1D45B}\u{1D45C}\u{1D45D}\u{1D45E}\u{1D45F}\u{1D460}\u{1D461}\u{1D462}\u{1D463}\u{1D464}\u{1D465}\u{1D466}\u{1D467}";

// Bold Italic U+1D468
const boldItalicUpper = "\u{1D468}\u{1D469}\u{1D46A}\u{1D46B}\u{1D46C}\u{1D46D}\u{1D46E}\u{1D46F}\u{1D470}\u{1D471}\u{1D472}\u{1D473}\u{1D474}\u{1D475}\u{1D476}\u{1D477}\u{1D478}\u{1D479}\u{1D47A}\u{1D47B}\u{1D47C}\u{1D47D}\u{1D47E}\u{1D47F}\u{1D480}\u{1D481}";
const boldItalicLower = "\u{1D482}\u{1D483}\u{1D484}\u{1D485}\u{1D486}\u{1D487}\u{1D488}\u{1D489}\u{1D48A}\u{1D48B}\u{1D48C}\u{1D48D}\u{1D48E}\u{1D48F}\u{1D490}\u{1D491}\u{1D492}\u{1D493}\u{1D494}\u{1D495}\u{1D496}\u{1D497}\u{1D498}\u{1D499}\u{1D49A}\u{1D49B}";

// Monospace U+1D670
const monoUpper = "\u{1D670}\u{1D671}\u{1D672}\u{1D673}\u{1D674}\u{1D675}\u{1D676}\u{1D677}\u{1D678}\u{1D679}\u{1D67A}\u{1D67B}\u{1D67C}\u{1D67D}\u{1D67E}\u{1D67F}\u{1D680}\u{1D681}\u{1D682}\u{1D683}\u{1D684}\u{1D685}\u{1D686}\u{1D687}\u{1D688}\u{1D689}";
const monoLower = "\u{1D68A}\u{1D68B}\u{1D68C}\u{1D68D}\u{1D68E}\u{1D68F}\u{1D690}\u{1D691}\u{1D692}\u{1D693}\u{1D694}\u{1D695}\u{1D696}\u{1D697}\u{1D698}\u{1D699}\u{1D69A}\u{1D69B}\u{1D69C}\u{1D69D}\u{1D69E}\u{1D69F}\u{1D6A0}\u{1D6A1}\u{1D6A2}\u{1D6A3}";
const monoDigits = "\u{1D7F6}\u{1D7F7}\u{1D7F8}\u{1D7F9}\u{1D7FA}\u{1D7FB}\u{1D7FC}\u{1D7FD}\u{1D7FE}\u{1D7FF}";

// Script (Mathematical Script) U+1D49C
const scriptUpper = "\u{1D49C}\u{212C}\u{1D49E}\u{1D49F}\u{2130}\u{2131}\u{1D4A2}\u{210B}\u{2110}\u{1D4A5}\u{1D4A6}\u{2112}\u{2133}\u{1D4A9}\u{1D4AA}\u{1D4AB}\u{1D4AC}\u{211B}\u{1D4AE}\u{1D4AF}\u{1D4B0}\u{1D4B1}\u{1D4B2}\u{1D4B3}\u{1D4B4}\u{1D4B5}";
const scriptLower = "\u{1D4B6}\u{1D4B7}\u{1D4B8}\u{1D4B9}\u{212F}\u{1D4BB}\u{210A}\u{1D4BD}\u{1D4BE}\u{1D4BF}\u{1D4C0}\u{1D4C1}\u{1D4C2}\u{1D4C3}\u{2134}\u{1D4C5}\u{1D4C6}\u{1D4C7}\u{1D4C8}\u{1D4C9}\u{1D4CA}\u{1D4CB}\u{1D4CC}\u{1D4CD}\u{1D4CE}\u{1D4CF}";

// Double-struck U+1D538
const dblUpper = "\u{1D538}\u{1D539}\u{2102}\u{1D53B}\u{1D53C}\u{1D53D}\u{1D53E}\u{210D}\u{1D540}\u{1D541}\u{1D542}\u{1D543}\u{1D544}\u{2115}\u{1D546}\u{2119}\u{211A}\u{211D}\u{1D54A}\u{1D54B}\u{1D54C}\u{1D54D}\u{1D54E}\u{1D54F}\u{1D550}\u{2124}";
const dblLower = "\u{1D552}\u{1D553}\u{1D554}\u{1D555}\u{1D556}\u{1D557}\u{1D558}\u{1D559}\u{1D55A}\u{1D55B}\u{1D55C}\u{1D55D}\u{1D55E}\u{1D55F}\u{1D560}\u{1D561}\u{1D562}\u{1D563}\u{1D564}\u{1D565}\u{1D566}\u{1D567}\u{1D568}\u{1D569}\u{1D56A}\u{1D56B}";
const dblDigits = "\u{1D7D8}\u{1D7D9}\u{1D7DA}\u{1D7DB}\u{1D7DC}\u{1D7DD}\u{1D7DE}\u{1D7DF}\u{1D7E0}\u{1D7E1}";

// Circled letters: uppercase U+24B6, lowercase U+24D0
const circledUpper = "\u24B6\u24B7\u24B8\u24B9\u24BA\u24BB\u24BC\u24BD\u24BE\u24BF\u24C0\u24C1\u24C2\u24C3\u24C4\u24C5\u24C6\u24C7\u24C8\u24C9\u24CA\u24CB\u24CC\u24CD\u24CE\u24CF";
const circledLower = "\u24D0\u24D1\u24D2\u24D3\u24D4\u24D5\u24D6\u24D7\u24D8\u24D9\u24DA\u24DB\u24DC\u24DD\u24DE\u24DF\u24E0\u24E1\u24E2\u24E3\u24E4\u24E5\u24E6\u24E7\u24E8\u24E9";
const circledDigit = "\u24EA\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468";

// Fullwidth: letters start at U+FF21 (A) and U+FF41 (a), digits at U+FF10
const fwUpper = "\uFF21\uFF22\uFF23\uFF24\uFF25\uFF26\uFF27\uFF28\uFF29\uFF2A\uFF2B\uFF2C\uFF2D\uFF2E\uFF2F\uFF30\uFF31\uFF32\uFF33\uFF34\uFF35\uFF36\uFF37\uFF38\uFF39\uFF3A";
const fwLower = "\uFF41\uFF42\uFF43\uFF44\uFF45\uFF46\uFF47\uFF48\uFF49\uFF4A\uFF4B\uFF4C\uFF4D\uFF4E\uFF4F\uFF50\uFF51\uFF52\uFF53\uFF54\uFF55\uFF56\uFF57\uFF58\uFF59\uFF5A";
const fwDigits = "\uFF10\uFF11\uFF12\uFF13\uFF14\uFF15\uFF16\uFF17\uFF18\uFF19";

function buildMap(
  map: Record<string, string>,
  srcUpper: string,
  destUpper: string,
  srcLower: string,
  destLower: string,
  srcDigits?: string,
  destDigits?: string
) {
  const destUpperArr = [...destUpper];
  const destLowerArr = [...destLower];
  for (let i = 0; i < 26; i++) {
    map[srcUpper[i]] = destUpperArr[i];
    map[srcLower[i]] = destLowerArr[i];
  }
  if (srcDigits && destDigits) {
    const destDigArr = [...destDigits];
    for (let i = 0; i < 10; i++) {
      map[srcDigits[i]] = destDigArr[i];
    }
  }
}

buildMap(BOLD_MAP, upper, boldUpper, lower, boldLower, digits, boldDigits);
buildMap(ITALIC_MAP, upper, italicUpper, lower, italicLower);
buildMap(BOLD_ITALIC_MAP, upper, boldItalicUpper, lower, boldItalicLower);
buildMap(MONO_MAP, upper, monoUpper, lower, monoLower, digits, monoDigits);
buildMap(SCRIPT_MAP, upper, scriptUpper, lower, scriptLower);
buildMap(DOUBLE_STRUCK_MAP, upper, dblUpper, lower, dblLower, digits, dblDigits);
buildMap(CIRCLED_MAP, upper, circledUpper, lower, circledLower, digits, circledDigit);
buildMap(FULLWIDTH_MAP, upper, fwUpper, lower, fwLower, digits, fwDigits);

// Upside-down character map
const UPSIDE_DOWN_MAP: Record<string, string> = {
  a: "\u0250", b: "q", c: "\u0254", d: "p", e: "\u01DD", f: "\u025F",
  g: "\u0253", h: "\u0265", i: "\u0131", j: "\u027E", k: "\u029E",
  l: "l", m: "\u026F", n: "u", o: "o", p: "d", q: "b", r: "\u0279",
  s: "s", t: "\u0287", u: "n", v: "\u028C", w: "\u028D", x: "x",
  y: "\u028E", z: "z",
  A: "\u2200", B: "\u15FA", C: "\u2183", D: "\u15E1", E: "\u018E",
  F: "\u2132", G: "\u2141", H: "H", I: "I", J: "\u017F", K: "\u22CA",
  L: "\u2142", M: "W", N: "N", O: "O", P: "\u0500", Q: "\u038C",
  R: "\u1D1A", S: "S", T: "\u22A5", U: "\u2229", V: "\u039B",
  W: "M", X: "X", Y: "\u2144", Z: "Z",
  "0": "0", "1": "\u0196", "2": "\u1105", "3": "\u0190", "4": "\u3123",
  "5": "\u03DB", "6": "9", "7": "\u3125", "8": "8", "9": "6",
  ".": "\u02D9", ",": "'", "'": ",", '"': ",,", "`": ",",
  "!": "\u00A1", "?": "\u00BF", "(": ")", ")": "(", "[": "]", "]": "[",
  "{": "}", "}": "{", "<": ">", ">": "<", "&": "\u214B", "_": "\u203E",
  ";": "\u061B",
};

function applyMap(text: string, map: Record<string, string>): string {
  return [...text].map((ch) => map[ch] || ch).join("");
}

function upsideDown(text: string): string {
  return [...text]
    .map((ch) => UPSIDE_DOWN_MAP[ch] || ch)
    .reverse()
    .join("");
}

interface FancyStyle {
  label: string;
  example: string;
  fn: (text: string) => string;
}

const STYLES: FancyStyle[] = [
  { label: "Bold", example: "\u{1D5D5}\u{1D5FC}\u{1D5F9}\u{1D5F1}", fn: (t) => applyMap(t, BOLD_MAP) },
  { label: "Italic", example: "\u{1D43C}\u{1D461}\u{1D44E}\u{1D459}\u{1D456}\u{1D450}", fn: (t) => applyMap(t, ITALIC_MAP) },
  { label: "Bold Italic", example: "\u{1D469}\u{1D490}\u{1D48D}\u{1D485}", fn: (t) => applyMap(t, BOLD_ITALIC_MAP) },
  { label: "Monospace", example: "\u{1D674}\u{1D698}\u{1D697}\u{1D698}", fn: (t) => applyMap(t, MONO_MAP) },
  { label: "Script", example: "\u{1D4AE}\u{1D4B8}\u{1D4C7}\u{1D4BE}\u{1D4C5}\u{1D4C9}", fn: (t) => applyMap(t, SCRIPT_MAP) },
  { label: "Double-struck", example: "\u{1D53B}\u{1D560}\u{1D566}\u{1D553}\u{1D55D}\u{1D556}", fn: (t) => applyMap(t, DOUBLE_STRUCK_MAP) },
  { label: "Circled", example: "\u24B6\u24D1\u24D2", fn: (t) => applyMap(t, CIRCLED_MAP) },
  { label: "Fullwidth", example: "\uFF26\uFF55\uFF4C\uFF4C", fn: (t) => applyMap(t, FULLWIDTH_MAP) },
  { label: "Upside Down", example: "u\u028Dop \u01DDp\u0131sd\u2229", fn: upsideDown },
];

export default function FancyText() {
  const [input, setInput] = useState("");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const results = useMemo(() => {
    if (!input) return [];
    return STYLES.map((style) => ({
      label: style.label,
      text: style.fn(input),
    }));
  }, [input]);

  const copyStyle = useCallback(async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">
          Enter Text
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your text here..."
          className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {!input && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Available styles:</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {STYLES.map((style) => (
              <div
                key={style.label}
                className="rounded-xl border border-border bg-muted p-3"
              >
                <p className="text-xs font-medium text-muted-foreground">
                  {style.label}
                </p>
                <p className="mt-1 text-lg text-foreground">{style.example}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((result, idx) => (
            <button
              key={idx}
              onClick={() => copyStyle(result.text, idx)}
              className="group rounded-xl border border-border bg-muted p-4 text-left transition-colors hover:border-primary"
            >
              <p className="text-xs font-medium text-muted-foreground">
                {result.label}
              </p>
              <p className="mt-2 break-all text-lg text-foreground">
                {result.text}
              </p>
              <p className="mt-2 text-xs text-muted-foreground transition-colors group-hover:text-primary">
                {copiedIdx === idx ? "Copied!" : "Click to copy"}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
