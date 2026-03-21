"use client";

import { useState, useRef } from "react";

const MODES = [
  { key: "normal", label: "Normal Vision", filter: "none" },
  { key: "protanopia", label: "Protanopia (Red-Blind)", filter: "url(#protanopia)" },
  { key: "deuteranopia", label: "Deuteranopia (Green-Blind)", filter: "url(#deuteranopia)" },
  { key: "tritanopia", label: "Tritanopia (Blue-Blind)", filter: "url(#tritanopia)" },
  { key: "achromatopsia", label: "Achromatopsia (No Color)", filter: "grayscale(100%)" },
];

export default function ColorBlindnessSimulator() {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [mode, setMode] = useState(MODES[0]);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setImgSrc(e.target?.result as string);
    reader.readAsDataURL(f);
  };

  return (
    <div className="space-y-4">
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="protanopia">
            <feColorMatrix type="matrix" values="0.567,0.433,0,0,0 0.558,0.442,0,0,0 0,0.242,0.758,0,0 0,0,0,1,0" />
          </filter>
          <filter id="deuteranopia">
            <feColorMatrix type="matrix" values="0.625,0.375,0,0,0 0.7,0.3,0,0,0 0,0.3,0.7,0,0 0,0,0,1,0" />
          </filter>
          <filter id="tritanopia">
            <feColorMatrix type="matrix" values="0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0" />
          </filter>
        </defs>
      </svg>
      <div className="rounded-xl border-2 border-dashed border-border bg-muted p-6 text-center cursor-pointer hover:border-primary transition-colors" onClick={() => fileRef.current?.click()}>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        <p className="text-muted-foreground text-sm">{imgSrc ? "Image loaded — click to change" : "Click or drag an image here"}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {MODES.map((m) => (
          <button key={m.key} onClick={() => setMode(m)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${mode.key === m.key ? "bg-primary text-white" : "border border-border bg-background text-foreground hover:bg-muted"}`}>
            {m.label}
          </button>
        ))}
      </div>
      {imgSrc && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{mode.label}</p>
          <img
            src={imgSrc}
            alt={mode.label}
            style={{ filter: mode.filter }}
            className="w-full max-h-64 rounded-xl border border-border object-contain"
          />
        </div>
      )}
    </div>
  );
}
