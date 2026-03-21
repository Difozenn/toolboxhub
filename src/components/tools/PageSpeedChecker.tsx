"use client";

import { useState } from "react";

const TIPS = [
  { cat: "Images", tips: ["Compress images (WebP format)", "Use lazy loading (loading='lazy')", "Specify width and height attributes", "Use a CDN for images"] },
  { cat: "CSS & JavaScript", tips: ["Minify CSS and JavaScript files", "Remove unused CSS (PurgeCSS)", "Defer non-critical JavaScript", "Use code splitting"] },
  { cat: "Caching", tips: ["Set long cache-control headers", "Use a CDN for static assets", "Enable browser caching", "Use service workers for offline caching"] },
  { cat: "Server", tips: ["Enable Gzip/Brotli compression", "Use HTTP/2 or HTTP/3", "Reduce Time to First Byte (TTFB)", "Use a fast DNS provider"] },
  { cat: "Core Web Vitals", tips: ["Optimize Largest Contentful Paint (LCP < 2.5s)", "Minimize Cumulative Layout Shift (CLS < 0.1)", "Improve Interaction to Next Paint (INP < 200ms)", "Preload critical resources"] },
];

export default function PageSpeedChecker() {
  const [url, setUrl] = useState("");

  const psiUrl = `https://pagespeed.web.dev/report?url=${encodeURIComponent(url)}`;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300">
        Page speed testing requires server-side measurements. Use Google PageSpeed Insights for accurate results.
      </div>
      <div className="flex gap-2">
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)}
          placeholder="https://your-website.com"
          className="flex-1 rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        {url && (
          <a href={psiUrl} target="_blank" rel="noopener noreferrer"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90 whitespace-nowrap">
            Test on PSI
          </a>
        )}
      </div>
      <div className="space-y-3">
        <p className="text-sm font-semibold text-foreground">Performance Optimization Checklist:</p>
        {TIPS.map(({ cat, tips }) => (
          <div key={cat} className="rounded-xl border border-border bg-muted p-4">
            <p className="text-sm font-semibold text-primary mb-2">{cat}</p>
            <ul className="space-y-1">
              {tips.map((tip) => (
                <li key={tip} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-0.5 h-4 w-4 shrink-0 rounded border border-border bg-background" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
