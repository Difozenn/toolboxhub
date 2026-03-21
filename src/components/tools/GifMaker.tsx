"use client";

import { useState, useRef, useEffect } from "react";

export default function GifMaker() {
  const [images, setImages] = useState<string[]>([]);
  const [delay, setDelay] = useState(500);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleFiles = (files: FileList) => {
    const readers = Array.from(files).map((f) => new Promise<string>((resolve) => {
      const r = new FileReader();
      r.onload = (e) => resolve(e.target?.result as string);
      r.readAsDataURL(f);
    }));
    Promise.all(readers).then((srcs) => setImages((prev) => [...prev, ...srcs]));
  };

  useEffect(() => {
    if (playing && images.length > 1) {
      intervalRef.current = setInterval(() => setCurrentFrame((f) => (f + 1) % images.length), delay);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing, delay, images.length]);

  const remove = (i: number) => setImages((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-muted p-3 text-sm text-muted-foreground">
        Upload multiple images to preview them as a slideshow animation. Note: this is a preview only — actual GIF encoding requires a library.
      </div>
      <div className="rounded-xl border-2 border-dashed border-border bg-muted p-6 text-center cursor-pointer hover:border-primary transition-colors" onClick={() => fileRef.current?.click()}>
        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => { if (e.target.files) handleFiles(e.target.files); }} />
        <p className="text-muted-foreground text-sm">Click to add images ({images.length} loaded)</p>
      </div>
      {images.length > 0 && (
        <>
          <div className="rounded-xl border border-border bg-muted p-2 min-h-40 flex items-center justify-center">
            <img src={images[currentFrame]} alt={`Frame ${currentFrame + 1}`} className="max-h-52 object-contain rounded-lg" />
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <button onClick={() => setPlaying((v) => !v)} className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors ${playing ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:opacity-90"}`}>
              {playing ? "Stop" : "Play Preview"}
            </button>
            <span className="text-sm text-muted-foreground">Frame {currentFrame + 1}/{images.length}</span>
            <div className="flex items-center gap-2 ml-auto">
              <label className="text-sm text-muted-foreground">Delay: {delay}ms</label>
              <input type="range" min={100} max={1000} step={50} value={delay} onChange={(e) => setDelay(Number(e.target.value))} className="w-28" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {images.map((src, i) => (
              <div key={i} className="relative group">
                <img src={src} alt={`Frame ${i+1}`} className={`h-16 w-16 rounded-lg object-cover border-2 transition-colors ${i === currentFrame ? "border-primary" : "border-border"}`} onClick={() => setCurrentFrame(i)} />
                <button onClick={() => remove(i)} className="absolute -top-1 -right-1 hidden group-hover:flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs">×</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
