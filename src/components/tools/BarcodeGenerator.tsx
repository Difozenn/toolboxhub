"use client";

import { useState } from "react";

function encodeCode128(text: string): number[] | null {
  const chars = text.split("").map((c) => c.charCodeAt(0));
  if (chars.some((c) => c < 32 || c > 126)) return null;
  const CODE_B_START = 104;
  const STOP = 106;
  const vals: number[] = [CODE_B_START];
  chars.forEach((c) => vals.push(c - 32));
  let checksum = CODE_B_START;
  vals.slice(1).forEach((v, i) => { checksum += v * (i + 1); });
  vals.push(checksum % 103);
  vals.push(STOP);
  return vals;
}

const PATTERNS: Record<number, string> = {
  104: "11010010000", 106: "1100011101011",
};
for (let i = 0; i <= 105; i++) {
  const p = ["11011001100","11001101100","11001100110","10010011000","10010001100","10001001100","10011001000","10011000100","10001100100","11001001000","11001000100","11000100100","10110011100","10011011100","10011001110","10111001100","10011101100","10011100110","11001110010","11001011100","11001001110","11011100100","11001110100","11101101110","11101001100","11100101100","11100100110","11101100100","11100110100","11100110010","11011011000","11011000110","11000110110","10100011000","10001011000","10001000110","10110001000","10001101000","10001100010","11010001000","11000101000","11000100010","10110111000","10110001110","10001101110","10111011000","10111000110","10001110110","11101110110","11010001110","11000101110","11011101000","11011100010","11101011000","11101000110","11100010110","11101101000","11101100010","11100011010","11101111010","11001000010","11110001010","10100110000","10100001100","10010110000","10010000110","10000101100","10000100110","10110010000","10110000100","10011010000","10011000010","10000110100","10000110010","11000010010","11001010000","11110111010","11000010100","10001111010","10100111100","10010111100","10010011110","10111100100","10011110100","10011110010","11110100100","11110010100","11110010010","11011011110","11011110110","11110110110","10101111000","10100011110","10001011110","10111101000","10111100010","11110101000","11110100010","10111011110","10111101110","11101011110","11110101110","11010000100","11010010000"[0]];
  if (!PATTERNS[i]) PATTERNS[i] = ["11011001100","11001101100","11001100110","10010011000","10010001100","10001001100","10011001000","10011000100","10001100100","11001001000","11001000100","11000100100","10110011100","10011011100","10011001110","10111001100","10011101100","10011100110","11001110010","11001011100","11001001110","11011100100","11001110100","11101101110","11101001100","11100101100","11100100110","11101100100","11100110100","11100110010","11011011000","11011000110","11000110110","10100011000","10001011000","10001000110","10110001000","10001101000","10001100010","11010001000","11000101000","11000100010","10110111000","10110001110","10001101110","10111011000","10111000110","10001110110","11101110110","11010001110","11000101110","11011101000","11011100010","11101011000","11101000110","11100010110","11101101000","11101100010","11100011010","11101111010","11001000010","11110001010","10100110000","10100001100","10010110000","10010000110","10000101100","10000100110","10110010000","10110000100","10011010000","10011000010","10000110100","10000110010","11000010010","11001010000","11110111010","11000010100","10001111010","10100111100","10010111100","10010011110","10111100100","10011110100","10011110010","11110100100","11110010100","11110010010","11011011110","11011110110","11110110110","10101111000","10100011110","10001011110","10111101000","10111100010","11110101000","11110100010","10111011110","10111101110","11101011110","11110101110","11010000100","11010010000","11010011100"][i] || "11011001100";
}

export default function BarcodeGenerator() {
  const [text, setText] = useState("HELLO123");
  const [barWidth, setBarWidth] = useState(2);

  const vals = encodeCode128(text);
  const bars = vals ? vals.map((v) => PATTERNS[v] || "11011001100").join("") : null;

  const svgWidth = bars ? bars.length * barWidth + 20 : 0;
  const svgHeight = 80;

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Text (ASCII printable characters)</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)}
            className="w-full rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Bar Width: {barWidth}px</label>
          <input type="range" min={1} max={4} value={barWidth} onChange={(e) => setBarWidth(Number(e.target.value))} className="w-full mt-2" />
        </div>
      </div>
      {bars ? (
        <div className="rounded-xl border border-border bg-white p-4 overflow-auto">
          <svg width={svgWidth} height={svgHeight + 20} xmlns="http://www.w3.org/2000/svg">
            {bars.split("").map((bit, i) => bit === "1" && (
              <rect key={i} x={10 + i * barWidth} y={0} width={barWidth} height={svgHeight} fill="black" />
            ))}
            <text x={svgWidth / 2} y={svgHeight + 14} textAnchor="middle" fontSize="12" fontFamily="monospace" fill="black">{text}</text>
          </svg>
        </div>
      ) : (
        <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700">Text contains invalid characters. Use ASCII printable characters only.</div>
      )}
      <p className="text-xs text-muted-foreground">Code 128 barcode format. For production use, consider a dedicated barcode library.</p>
    </div>
  );
}
