"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface CropRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

type AspectRatio = "free" | "1:1" | "4:3" | "16:9" | "3:2" | "9:16";

const RATIOS: { label: AspectRatio; value: number | null }[] = [
  { label: "free", value: null },
  { label: "1:1", value: 1 },
  { label: "4:3", value: 4 / 3 },
  { label: "16:9", value: 16 / 9 },
  { label: "3:2", value: 3 / 2 },
  { label: "9:16", value: 9 / 16 },
];

export default function ImageCropper() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<CropRect>({ x: 50, y: 50, w: 200, h: 200 });
  const [aspect, setAspect] = useState<AspectRatio>("free");
  const [dragging, setDragging] = useState<"move" | "resize" | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [cropStart, setCropStart] = useState<CropRect>({ x: 0, y: 0, w: 0, h: 0 });
  const [croppedUrl, setCroppedUrl] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const displayRef = useRef<HTMLImageElement>(null);

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCroppedUrl(null);
    const url = URL.createObjectURL(file);
    setImageSrc(url);
    const img = new Image();
    img.onload = () => {
      setImgEl(img);
      const size = Math.min(200, img.naturalWidth / 2, img.naturalHeight / 2);
      setCrop({ x: 20, y: 20, w: size, h: size });
    };
    img.src = url;
  }, []);

  const getScale = useCallback(() => {
    if (!displayRef.current || !imgEl) return 1;
    return displayRef.current.clientWidth / imgEl.naturalWidth;
  }, [imgEl]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, type: "move" | "resize") => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(type);
      setDragStart({ x: e.clientX, y: e.clientY });
      setCropStart({ ...crop });
    },
    [crop]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragging || !imgEl || !displayRef.current) return;

      const scale = getScale();
      const dx = (e.clientX - dragStart.x) / scale;
      const dy = (e.clientY - dragStart.y) / scale;

      const maxW = imgEl.naturalWidth;
      const maxH = imgEl.naturalHeight;

      if (dragging === "move") {
        let nx = cropStart.x + dx;
        let ny = cropStart.y + dy;
        nx = Math.max(0, Math.min(nx, maxW - cropStart.w));
        ny = Math.max(0, Math.min(ny, maxH - cropStart.h));
        setCrop({ ...cropStart, x: nx, y: ny });
      } else {
        const ratioVal = RATIOS.find((r) => r.label === aspect)?.value;
        let nw = Math.max(20, cropStart.w + dx);
        let nh = Math.max(20, cropStart.h + dy);
        nw = Math.min(nw, maxW - cropStart.x);
        nh = Math.min(nh, maxH - cropStart.y);
        if (ratioVal) {
          nh = nw / ratioVal;
          if (cropStart.y + nh > maxH) {
            nh = maxH - cropStart.y;
            nw = nh * ratioVal;
          }
        }
        setCrop({ ...cropStart, w: nw, h: nh });
      }
    },
    [dragging, dragStart, cropStart, aspect, imgEl, getScale]
  );

  const handleMouseUp = useCallback(() => {
    setDragging(null);
  }, []);

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [dragging, handleMouseMove, handleMouseUp]);

  const handleAspectChange = useCallback(
    (a: AspectRatio) => {
      setAspect(a);
      if (!imgEl) return;
      const ratioVal = RATIOS.find((r) => r.label === a)?.value;
      if (ratioVal) {
        const newH = crop.w / ratioVal;
        setCrop((prev) => ({
          ...prev,
          h: Math.min(newH, imgEl.naturalHeight - prev.y),
        }));
      }
    },
    [crop.w, imgEl]
  );

  const doCrop = useCallback(() => {
    if (!imgEl || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const cw = Math.round(crop.w);
    const ch = Math.round(crop.h);
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(
      imgEl,
      Math.round(crop.x),
      Math.round(crop.y),
      cw,
      ch,
      0,
      0,
      cw,
      ch
    );
    setCroppedUrl(canvas.toDataURL("image/png"));
  }, [imgEl, crop]);

  const scale = imgEl && displayRef.current ? getScale() : 1;

  return (
    <div className="space-y-6">
      {/* File input */}
      <div className="rounded-xl border border-border bg-muted p-5">
        <label className="mb-2 block text-sm font-medium text-foreground">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="w-full text-sm text-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-primary-hover"
        />
      </div>

      {imageSrc && imgEl && (
        <>
          {/* Aspect ratio presets */}
          <div className="rounded-xl border border-border bg-muted p-4">
            <label className="mb-2 block text-sm font-medium text-foreground">Aspect Ratio</label>
            <div className="flex flex-wrap gap-2">
              {RATIOS.map((r) => (
                <button
                  key={r.label}
                  onClick={() => handleAspectChange(r.label)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    aspect === r.label
                      ? "bg-primary text-white"
                      : "border border-border bg-background text-foreground hover:bg-primary/10"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Image with crop overlay */}
          <div
            ref={containerRef}
            className="relative inline-block max-w-full overflow-hidden rounded-xl border border-border"
            style={{ cursor: dragging ? "grabbing" : "default" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={displayRef}
              src={imageSrc}
              alt="Source"
              className="block max-h-[500px] max-w-full"
              draggable={false}
            />

            {/* Dark overlay */}
            <div
              className="absolute inset-0 bg-black/50 pointer-events-none"
              style={{
                clipPath: `polygon(
                  0% 0%, 100% 0%, 100% 100%, 0% 100%,
                  0% ${crop.y * scale}px,
                  ${crop.x * scale}px ${crop.y * scale}px,
                  ${crop.x * scale}px ${(crop.y + crop.h) * scale}px,
                  0% ${(crop.y + crop.h) * scale}px
                )`,
              }}
            />

            {/* Crop rectangle (clear area with border) */}
            <div
              className="absolute border-2 border-white border-dashed cursor-grab active:cursor-grabbing"
              style={{
                left: crop.x * scale,
                top: crop.y * scale,
                width: crop.w * scale,
                height: crop.h * scale,
              }}
              onMouseDown={(e) => handleMouseDown(e, "move")}
            >
              {/* Resize handle */}
              <div
                className="absolute -bottom-2 -right-2 h-4 w-4 rounded-full bg-white border-2 border-primary cursor-se-resize"
                onMouseDown={(e) => handleMouseDown(e, "resize")}
              />
              {/* Dimension label */}
              <div className="absolute -top-6 left-0 rounded bg-black/75 px-1.5 py-0.5 text-[10px] text-white whitespace-nowrap">
                {Math.round(crop.w)} x {Math.round(crop.h)}
              </div>
            </div>
          </div>

          <button
            onClick={doCrop}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Crop Image
          </button>

          <canvas ref={canvasRef} className="hidden" />

          {/* Cropped result */}
          {croppedUrl && (
            <div className="rounded-xl border border-border bg-muted p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground">
                  Cropped Result ({Math.round(crop.w)} x {Math.round(crop.h)}px)
                </h3>
                <a
                  href={croppedUrl}
                  download="cropped-image.png"
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
                >
                  Download
                </a>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={croppedUrl}
                alt="Cropped"
                className="max-h-[400px] rounded-lg border border-border object-contain"
              />
            </div>
          )}
        </>
      )}

      {!imageSrc && (
        <div className="rounded-xl border border-border bg-muted p-12 text-center">
          <p className="text-muted-foreground">
            Upload an image to crop it. Drag to move the crop area, use the handle to resize.
          </p>
        </div>
      )}
    </div>
  );
}
