"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export default function ProbabilityDistribution() {
  const [mean, setMean] = useState("0");
  const [stdDev, setStdDev] = useState("1");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mu = parseFloat(mean) || 0;
  const sigma = parseFloat(stdDev) || 1;

  const normalPdf = (x: number, m: number, s: number): number => {
    const exp = -0.5 * Math.pow((x - m) / s, 2);
    return (1 / (s * Math.sqrt(2 * Math.PI))) * Math.pow(Math.E, exp);
  };

  // Error function approximation for CDF
  const erf = (x: number): number => {
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;

    const sign = x < 0 ? -1 : 1;
    const absX = Math.abs(x);
    const t = 1.0 / (1.0 + p * absX);
    const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);
    return sign * y;
  };

  const normalCdf = (x: number, m: number, s: number): number => {
    return 0.5 * (1 + erf((x - m) / (s * Math.sqrt(2))));
  };

  const sigmaRanges = [1, 2, 3].map((n) => {
    const lower = mu - n * sigma;
    const upper = mu + n * sigma;
    const probability = normalCdf(upper, mu, sigma) - normalCdf(lower, mu, sigma);
    return { n, lower, upper, probability };
  });

  const drawBellCurve = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const padding = { top: 20, right: 20, bottom: 40, left: 20 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;

    ctx.clearRect(0, 0, w, h);

    const xMin = mu - 4 * sigma;
    const xMax = mu + 4 * sigma;
    const yMax = normalPdf(mu, mu, sigma) * 1.15;

    const toCanvasX = (x: number) => padding.left + ((x - xMin) / (xMax - xMin)) * chartW;
    const toCanvasY = (y: number) => padding.top + chartH - (y / yMax) * chartH;

    // Draw sigma region fills
    const sigmaColors = [
      "rgba(99, 102, 241, 0.15)",
      "rgba(99, 102, 241, 0.10)",
      "rgba(99, 102, 241, 0.05)",
    ];

    for (let s = 3; s >= 1; s--) {
      const lo = mu - s * sigma;
      const hi = mu + s * sigma;
      ctx.beginPath();
      ctx.moveTo(toCanvasX(lo), toCanvasY(0));
      for (let x = lo; x <= hi; x += (xMax - xMin) / 300) {
        ctx.lineTo(toCanvasX(x), toCanvasY(normalPdf(x, mu, sigma)));
      }
      ctx.lineTo(toCanvasX(hi), toCanvasY(0));
      ctx.closePath();
      ctx.fillStyle = sigmaColors[s - 1];
      ctx.fill();
    }

    // Draw the curve
    ctx.beginPath();
    ctx.strokeStyle = "rgb(99, 102, 241)";
    ctx.lineWidth = 2.5;
    for (let i = 0; i <= 400; i++) {
      const x = xMin + (i / 400) * (xMax - xMin);
      const y = normalPdf(x, mu, sigma);
      if (i === 0) ctx.moveTo(toCanvasX(x), toCanvasY(y));
      else ctx.lineTo(toCanvasX(x), toCanvasY(y));
    }
    ctx.stroke();

    // Baseline
    ctx.beginPath();
    ctx.strokeStyle = "rgba(150, 150, 150, 0.4)";
    ctx.lineWidth = 1;
    ctx.moveTo(padding.left, toCanvasY(0));
    ctx.lineTo(w - padding.right, toCanvasY(0));
    ctx.stroke();

    // Sigma labels
    ctx.fillStyle = "rgba(150, 150, 150, 0.9)";
    ctx.font = "11px sans-serif";
    ctx.textAlign = "center";
    for (let s = -3; s <= 3; s++) {
      const x = mu + s * sigma;
      const cx = toCanvasX(x);
      ctx.beginPath();
      ctx.strokeStyle = "rgba(150, 150, 150, 0.25)";
      ctx.moveTo(cx, toCanvasY(0));
      ctx.lineTo(cx, toCanvasY(0) + 5);
      ctx.stroke();
      const label = s === 0 ? `\u03BC` : `${s > 0 ? "+" : ""}${s}\u03C3`;
      ctx.fillText(label, cx, toCanvasY(0) + 18);
    }
  }, [mu, sigma]);

  useEffect(() => {
    drawBellCurve();
    const handleResize = () => drawBellCurve();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawBellCurve]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Mean (&mu;)
          </label>
          <input
            type="number"
            step="any"
            value={mean}
            onChange={(e) => setMean(e.target.value)}
            placeholder="0"
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Standard Deviation (&sigma;)
          </label>
          <input
            type="number"
            step="any"
            min="0.01"
            value={stdDev}
            onChange={(e) => setStdDev(e.target.value)}
            placeholder="1"
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-muted p-4">
        <h3 className="mb-3 text-sm font-semibold text-foreground">
          Bell Curve Visualization
        </h3>
        <canvas
          ref={canvasRef}
          className="h-56 w-full sm:h-64"
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">
          Sigma Range Probabilities
        </h3>
        {sigmaRanges.map(({ n, lower, upper, probability }) => (
          <div
            key={n}
            className="rounded-xl border border-border bg-muted p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {n}&sigma; Range
                </p>
                <p className="text-xs text-muted-foreground">
                  {lower.toFixed(2)} to {upper.toFixed(2)}
                </p>
              </div>
              <p className="text-xl font-bold text-foreground">
                {(probability * 100).toFixed(4)}%
              </p>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-indigo-500 transition-all"
                style={{ width: `${probability * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-muted p-4 text-center">
          <p className="text-xs text-muted-foreground">Variance (&sigma;&sup2;)</p>
          <p className="mt-1 text-xl font-bold text-foreground">
            {(sigma * sigma).toFixed(4)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-muted p-4 text-center">
          <p className="text-xs text-muted-foreground">Peak PDF Value</p>
          <p className="mt-1 text-xl font-bold text-foreground">
            {normalPdf(mu, mu, sigma).toFixed(6)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-muted p-4 text-center">
          <p className="text-xs text-muted-foreground">P(X &le; &mu;)</p>
          <p className="mt-1 text-xl font-bold text-foreground">50.0000%</p>
        </div>
      </div>
    </div>
  );
}
