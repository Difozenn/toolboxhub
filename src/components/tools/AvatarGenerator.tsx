"use client";

import { useState, useEffect, useRef } from "react";

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
  return Math.abs(h);
}

function hslStr(h: number, s: number, l: number) { return `hsl(${h % 360},${s}%,${l}%)`; }

export default function AvatarGenerator() {
  const [name, setName] = useState("John Doe");
  const [size, setSize] = useState(200);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !name) return;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const h = hashStr(name);
    const bg = hslStr(h, 60, 50);
    const fg = hslStr(h + 180, 60, 90);
    const shape1 = hslStr(h + 60, 70, 40);
    const shape2 = hslStr(h + 120, 70, 60);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, size, size);
    const cx = size / 2, cy = size / 2;
    const r1 = (h % 40) + 20;
    const r2 = ((h >> 4) % 30) + 15;
    ctx.fillStyle = shape1;
    ctx.beginPath();
    ctx.arc(cx - size * 0.15, cy - size * 0.1, size * (r1 / 200), 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = shape2;
    ctx.beginPath();
    ctx.arc(cx + size * 0.1, cy + size * 0.15, size * (r2 / 200), 0, Math.PI * 2);
    ctx.fill();
    const initials = name.trim().split(/\s+/).map((w) => w[0].toUpperCase()).slice(0, 2).join("");
    ctx.fillStyle = fg;
    ctx.font = `bold ${size * 0.35}px Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(initials, cx, cy);
  }, [name, size]);

  const download = () => {
    const a = document.createElement("a");
    a.href = canvasRef.current!.toDataURL("image/png");
    a.download = `avatar-${name.replace(/\s+/g, "-")}.png`;
    a.click();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 1500);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name..."
            className="w-full rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Size: {size}px</label>
          <input type="range" min={64} max={400} step={8} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full mt-2" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <canvas ref={canvasRef} className="rounded-xl border border-border" style={{ maxWidth: "100%", height: "auto" }} />
        <button onClick={download} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">
          {downloaded ? "Downloaded!" : "Download PNG"}
        </button>
      </div>
      <p className="text-xs text-muted-foreground text-center">Avatar is generated deterministically from the name — same name always produces the same avatar.</p>
    </div>
  );
}
