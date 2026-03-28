"use client";

import { useState } from "react";
import ErrorAlert from "@/components/ui/ErrorAlert";
import ToolSection from "@/components/ui/ToolSection";
import ToggleGroup from "@/components/ui/ToggleGroup";

interface CwvMetric {
  value: string;
  score: "good" | "needs-improvement" | "poor";
}

interface PageSpeedResult {
  url: string;
  strategy: string;
  scores: { performance: number; accessibility: number; seo: number; bestPractices: number };
  coreWebVitals: Record<string, CwvMetric>;
  opportunities: { title: string; description: string; savings?: string }[];
}

const SCORE_COLORS: Record<string, string> = {
  good: "text-green-600 dark:text-green-400 border-green-500",
  "needs-improvement": "text-yellow-600 dark:text-yellow-400 border-yellow-500",
  poor: "text-red-600 dark:text-red-400 border-red-500",
};

function scoreGrade(score: number): string {
  if (score >= 90) return "good";
  if (score >= 50) return "needs-improvement";
  return "poor";
}

function ScoreGauge({ label, score }: { label: string; score: number }) {
  const grade = scoreGrade(score);
  const color = SCORE_COLORS[grade];
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`flex h-16 w-16 items-center justify-center rounded-full border-4 ${color}`}>
        <span className={`text-lg font-bold ${color.split(" ")[0]}`}>{score}</span>
      </div>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

const CWV_LABELS: Record<string, string> = {
  lcp: "Largest Contentful Paint",
  cls: "Cumulative Layout Shift",
  inp: "Interaction to Next Paint",
  fcp: "First Contentful Paint",
  si: "Speed Index",
  tbt: "Total Blocking Time",
};

const TIPS = [
  { cat: "Images", tips: ["Compress images (WebP format)", "Use lazy loading", "Specify width and height", "Use a CDN"] },
  { cat: "CSS & JavaScript", tips: ["Minify CSS and JS", "Remove unused CSS", "Defer non-critical JS", "Use code splitting"] },
  { cat: "Caching", tips: ["Set long cache-control headers", "Use a CDN for static assets", "Enable browser caching"] },
  { cat: "Core Web Vitals", tips: ["Optimize LCP < 2.5s", "Minimize CLS < 0.1", "Improve INP < 200ms", "Preload critical resources"] },
];

export default function PageSpeedChecker() {
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState("mobile");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PageSpeedResult | null>(null);

  const check = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/page-speed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, strategy }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Check failed");
      setResult(json.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex flex-1 gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && url && check()}
            placeholder="https://your-website.com"
            className="flex-1 rounded-xl border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            onClick={check}
            disabled={!url || loading}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Test Speed"}
          </button>
        </div>
        <ToggleGroup
          options={[
            { value: "mobile", label: "Mobile" },
            { value: "desktop", label: "Desktop" },
          ]}
          value={strategy}
          onChange={setStrategy}
        />
      </div>

      {loading && (
        <div className="rounded-xl border border-border bg-muted p-8 text-center">
          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-muted-foreground border-t-primary" />
          <p className="text-sm text-muted-foreground">Analyzing page speed... this may take up to 30 seconds.</p>
        </div>
      )}

      {error && <ErrorAlert message={error} />}

      {result && (
        <div className="space-y-4">
          {/* Score Gauges */}
          <ToolSection>
            <div className="flex flex-wrap justify-around gap-4 py-2">
              <ScoreGauge label="Performance" score={result.scores.performance} />
              <ScoreGauge label="Accessibility" score={result.scores.accessibility} />
              <ScoreGauge label="SEO" score={result.scores.seo} />
              <ScoreGauge label="Best Practices" score={result.scores.bestPractices} />
            </div>
          </ToolSection>

          {/* Core Web Vitals */}
          <ToolSection title="Core Web Vitals">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(result.coreWebVitals).map(([key, metric]) => (
                <div key={key} className="rounded-lg bg-background p-3">
                  <p className="text-xs text-muted-foreground">{CWV_LABELS[key] || key}</p>
                  <p className={`mt-1 text-lg font-bold ${SCORE_COLORS[metric.score]?.split(" ")[0] || "text-foreground"}`}>
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </ToolSection>

          {/* Opportunities */}
          {result.opportunities.length > 0 && (
            <ToolSection title="Optimization Opportunities">
              <div className="space-y-2">
                {result.opportunities.map((opp) => (
                  <div key={opp.title} className="flex items-start justify-between rounded-lg bg-background p-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{opp.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{opp.description}</p>
                    </div>
                    {opp.savings && (
                      <span className="ml-2 shrink-0 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                        {opp.savings}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </ToolSection>
          )}
        </div>
      )}

      {/* Tips (shown when no result) */}
      {!loading && !result && !error && (
        <div className="space-y-3">
          <div className="rounded-xl border border-border bg-muted p-8 text-center">
            <p className="text-muted-foreground">Enter a URL to test its loading speed and Core Web Vitals.</p>
          </div>
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
      )}
    </div>
  );
}
