import { isValidUrl } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp, errorResponse, successResponse } from "@/lib/api-helpers";

export const runtime = "nodejs";
export const maxDuration = 30;

interface PsiAudit {
  id: string;
  title: string;
  description: string;
  score: number | null;
  displayValue?: string;
  numericValue?: number;
}

interface PsiCategory {
  score: number;
}

interface PsiResponse {
  lighthouseResult?: {
    categories: Record<string, PsiCategory>;
    audits: Record<string, PsiAudit>;
  };
  error?: { message: string };
}

const CWV_AUDITS = [
  { id: "largest-contentful-paint", key: "lcp", label: "LCP" },
  { id: "cumulative-layout-shift", key: "cls", label: "CLS" },
  { id: "interaction-to-next-paint", key: "inp", label: "INP" },
  { id: "first-contentful-paint", key: "fcp", label: "FCP" },
  { id: "speed-index", key: "si", label: "Speed Index" },
  { id: "total-blocking-time", key: "tbt", label: "TBT" },
];

function auditScore(score: number | null): "good" | "needs-improvement" | "poor" {
  if (score === null) return "needs-improvement";
  if (score >= 0.9) return "good";
  if (score >= 0.5) return "needs-improvement";
  return "poor";
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = rateLimit(ip, 10, 60_000); // stricter: 10 req/min for PSI
  if (!allowed) return errorResponse("Rate limit exceeded. Try again later.", 429);

  let body: { url?: string; strategy?: string };
  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid JSON body");
  }

  const { valid, url, error: urlError } = isValidUrl(body.url || "");
  if (!valid || !url) return errorResponse(urlError || "Invalid URL");

  const strategy = body.strategy === "desktop" ? "desktop" : "mobile";

  const apiKey = process.env.PSI_API_KEY || "";
  const params = new URLSearchParams({
    url: url.toString(),
    strategy,
    category: "performance",
  });
  // Add all categories
  ["accessibility", "seo", "best-practices"].forEach((c) => params.append("category", c));
  if (apiKey) params.set("key", apiKey);

  try {
    const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params}`;
    const res = await fetch(psiUrl, { signal: AbortSignal.timeout(28000) });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      const msg = (data as PsiResponse).error?.message || `PSI API returned ${res.status}`;
      return errorResponse(msg, 502);
    }

    const data: PsiResponse = await res.json();
    const lr = data.lighthouseResult;
    if (!lr) return errorResponse("No Lighthouse results returned", 502);

    const scores = {
      performance: Math.round((lr.categories.performance?.score || 0) * 100),
      accessibility: Math.round((lr.categories.accessibility?.score || 0) * 100),
      seo: Math.round((lr.categories.seo?.score || 0) * 100),
      bestPractices: Math.round((lr.categories["best-practices"]?.score || 0) * 100),
    };

    const coreWebVitals: Record<string, { value: string; score: string }> = {};
    for (const { id, key } of CWV_AUDITS) {
      const audit = lr.audits[id];
      if (audit) {
        coreWebVitals[key] = {
          value: audit.displayValue || String(audit.numericValue || "N/A"),
          score: auditScore(audit.score),
        };
      }
    }

    // Top opportunities
    const opportunityIds = [
      "render-blocking-resources",
      "unused-css-rules",
      "unused-javascript",
      "modern-image-formats",
      "uses-optimized-images",
      "uses-text-compression",
      "uses-responsive-images",
      "efficient-animated-content",
      "offscreen-images",
      "unminified-css",
      "unminified-javascript",
    ];

    const opportunities = opportunityIds
      .map((id) => lr.audits[id])
      .filter((a) => a && a.score !== null && a.score < 1)
      .map((a) => ({
        title: a.title,
        description: a.description.split(".")[0] + ".",
        savings: a.displayValue || undefined,
      }))
      .slice(0, 8);

    return successResponse({
      url: url.toString(),
      strategy,
      scores,
      coreWebVitals,
      opportunities,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Page speed check failed";
    return errorResponse(`Page speed check failed: ${msg}`, 502);
  }
}
