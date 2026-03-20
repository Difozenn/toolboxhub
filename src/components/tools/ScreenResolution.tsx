"use client";

import { useState, useEffect, useCallback } from "react";

interface ScreenInfo {
  screenWidth: number;
  screenHeight: number;
  viewportWidth: number;
  viewportHeight: number;
  devicePixelRatio: number;
  colorDepth: number;
  orientation: string;
  availWidth: number;
  availHeight: number;
}

function getScreenInfo(): ScreenInfo {
  return {
    screenWidth: typeof screen !== "undefined" ? screen.width : 0,
    screenHeight: typeof screen !== "undefined" ? screen.height : 0,
    viewportWidth: typeof window !== "undefined" ? window.innerWidth : 0,
    viewportHeight: typeof window !== "undefined" ? window.innerHeight : 0,
    devicePixelRatio: typeof window !== "undefined" ? window.devicePixelRatio : 1,
    colorDepth: typeof screen !== "undefined" ? screen.colorDepth : 0,
    orientation:
      typeof screen !== "undefined" && screen.orientation
        ? screen.orientation.type
        : typeof window !== "undefined"
        ? window.innerWidth > window.innerHeight
          ? "landscape"
          : "portrait"
        : "unknown",
    availWidth: typeof screen !== "undefined" ? screen.availWidth : 0,
    availHeight: typeof screen !== "undefined" ? screen.availHeight : 0,
  };
}

export default function ScreenResolution() {
  const [info, setInfo] = useState<ScreenInfo | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setInfo(getScreenInfo());

    const handleResize = () => setInfo(getScreenInfo());
    window.addEventListener("resize", handleResize);

    const handleOrientationChange = () => setInfo(getScreenInfo());
    if (screen.orientation) {
      screen.orientation.addEventListener("change", handleOrientationChange);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (screen.orientation) {
        screen.orientation.removeEventListener("change", handleOrientationChange);
      }
    };
  }, []);

  const copyAll = useCallback(async () => {
    if (!info) return;
    const text = [
      `Screen Resolution: ${info.screenWidth} x ${info.screenHeight}`,
      `Viewport Size: ${info.viewportWidth} x ${info.viewportHeight}`,
      `Available Screen: ${info.availWidth} x ${info.availHeight}`,
      `Device Pixel Ratio: ${info.devicePixelRatio}`,
      `Effective Resolution: ${Math.round(info.screenWidth * info.devicePixelRatio)} x ${Math.round(info.screenHeight * info.devicePixelRatio)}`,
      `Color Depth: ${info.colorDepth}-bit`,
      `Orientation: ${info.orientation}`,
    ].join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [info]);

  if (!info) {
    return (
      <div className="rounded-xl border border-border bg-muted p-12 text-center">
        <p className="text-muted-foreground">Loading screen information...</p>
      </div>
    );
  }

  const items = [
    {
      label: "Screen Resolution",
      value: `${info.screenWidth} x ${info.screenHeight}`,
      desc: "Physical screen resolution (CSS pixels)",
    },
    {
      label: "Viewport Size",
      value: `${info.viewportWidth} x ${info.viewportHeight}`,
      desc: "Current browser viewport size",
    },
    {
      label: "Available Screen",
      value: `${info.availWidth} x ${info.availHeight}`,
      desc: "Screen space minus OS UI (taskbar, dock)",
    },
    {
      label: "Device Pixel Ratio",
      value: `${info.devicePixelRatio}x`,
      desc: info.devicePixelRatio > 1 ? "High-DPI / Retina display" : "Standard display",
    },
    {
      label: "Effective Resolution",
      value: `${Math.round(info.screenWidth * info.devicePixelRatio)} x ${Math.round(info.screenHeight * info.devicePixelRatio)}`,
      desc: "Actual hardware pixels (screen x DPR)",
    },
    {
      label: "Color Depth",
      value: `${info.colorDepth}-bit`,
      desc:
        info.colorDepth >= 24
          ? "True color (16.7M+ colors)"
          : `${Math.pow(2, info.colorDepth).toLocaleString()} colors`,
    },
    {
      label: "Orientation",
      value: info.orientation.replace(/-/g, " "),
      desc: "Current screen orientation",
    },
  ];

  const orientationShort = info.orientation.includes("landscape") ? "landscape" : "portrait";

  return (
    <div className="space-y-6">
      {/* Hero display */}
      <div className="rounded-xl border border-border bg-muted p-6 text-center space-y-2">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">Screen Resolution</p>
        <p className="text-4xl font-bold font-mono text-foreground">
          {info.screenWidth} x {info.screenHeight}
        </p>
        <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
          <span>{info.devicePixelRatio}x DPR</span>
          <span>{info.colorDepth}-bit color</span>
          <span className="capitalize">{orientationShort}</span>
        </div>
      </div>

      {/* Copy button */}
      <div className="flex justify-end">
        <button
          onClick={copyAll}
          className="rounded-lg border border-border bg-muted px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
        >
          {copied ? "Copied all!" : "Copy All Info"}
        </button>
      </div>

      {/* Details */}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-border bg-muted p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <span className="font-mono text-sm font-bold text-foreground">{item.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Visual representation */}
      <div className="rounded-xl border border-border bg-muted p-4">
        <h3 className="mb-3 text-sm font-medium text-foreground">
          Viewport Visualizer
        </h3>
        <div className="flex items-center justify-center">
          <div
            className="relative border-2 border-primary/30 rounded-lg bg-primary/5"
            style={{
              width: Math.min(200, info.viewportWidth / 8),
              height: Math.min(150, info.viewportHeight / 8),
            }}
          >
            <span className="absolute inset-0 flex items-center justify-center text-[10px] text-primary font-medium">
              {info.viewportWidth}x{info.viewportHeight}
            </span>
          </div>
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Resize your browser window to see values update in real time
        </p>
      </div>
    </div>
  );
}
