import { isValidUrl, assertPublicHost } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp, errorResponse, successResponse } from "@/lib/api-helpers";

export const runtime = "nodejs";
export const maxDuration = 15;

interface SecurityHeaders {
  hsts: boolean;
  csp: boolean;
  xfo: boolean;
  xcto: boolean;
  referrerPolicy: boolean;
  permissions: boolean;
}

interface MetaTags {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
  canonical?: string;
  robots?: string;
}

function parseMetaTags(html: string): MetaTags {
  const meta: MetaTags = {};

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch) meta.title = titleMatch[1].trim();

  const metaTag = (name: string): string | undefined => {
    const re = new RegExp(`<meta[^>]*(?:name|property)=["']${name}["'][^>]*content=["']([^"']*)["']`, "i");
    const re2 = new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*(?:name|property)=["']${name}["']`, "i");
    return (re.exec(html) || re2.exec(html))?.[1];
  };

  meta.description = metaTag("description");
  meta.ogTitle = metaTag("og:title");
  meta.ogDescription = metaTag("og:description");
  meta.ogImage = metaTag("og:image");
  meta.twitterCard = metaTag("twitter:card");
  meta.robots = metaTag("robots");

  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  if (canonicalMatch) meta.canonical = canonicalMatch[1];

  return meta;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = rateLimit(ip);
  if (!allowed) return errorResponse("Rate limit exceeded. Try again later.", 429);

  let body: { url?: string };
  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid JSON body");
  }

  const { valid, url, error: urlError } = isValidUrl(body.url || "");
  if (!valid || !url) return errorResponse(urlError || "Invalid URL");

  try {
    await assertPublicHost(url.hostname);
  } catch {
    return errorResponse("Requests to private/internal hosts are not allowed");
  }

  const origin = url.origin;
  const fetchOpts = {
    headers: { "User-Agent": "ToolboxHub Site Analyzer" },
    signal: AbortSignal.timeout(10000),
  };

  // Run checks in parallel
  const [headersResult, robotsResult, sitemapResult, pageResult] = await Promise.allSettled([
    // 1. HTTP Headers
    fetch(url.toString(), { method: "HEAD", ...fetchOpts }).then(async (res) => ({
      status: res.status,
      server: res.headers.get("server") || undefined,
      poweredBy: res.headers.get("x-powered-by") || undefined,
      contentType: res.headers.get("content-type") || undefined,
      securityHeaders: {
        hsts: !!res.headers.get("strict-transport-security"),
        csp: !!res.headers.get("content-security-policy"),
        xfo: !!res.headers.get("x-frame-options"),
        xcto: !!res.headers.get("x-content-type-options"),
        referrerPolicy: !!res.headers.get("referrer-policy"),
        permissions: !!res.headers.get("permissions-policy"),
      } as SecurityHeaders,
    })),

    // 2. Robots.txt
    fetch(`${origin}/robots.txt`, fetchOpts).then(async (res) => {
      if (!res.ok) return null;
      const text = await res.text();
      const sitemapUrls = [...text.matchAll(/Sitemap:\s*(.+)/gi)].map((m) => m[1].trim());
      const disallowRules = [...text.matchAll(/Disallow:\s*(.+)/gi)].map((m) => m[1].trim());
      return { exists: true, sitemapUrls, disallowRules };
    }),

    // 3. Sitemap
    fetch(`${origin}/sitemap.xml`, { method: "HEAD", ...fetchOpts }).then(async (res) => ({
      exists: res.ok,
      url: `${origin}/sitemap.xml`,
    })),

    // 4. Page meta tags (GET first 50KB)
    fetch(url.toString(), fetchOpts).then(async (res) => {
      const reader = res.body?.getReader();
      if (!reader) return null;
      let html = "";
      const decoder = new TextDecoder();
      while (html.length < 50000) {
        const { done, value } = await reader.read();
        if (done) break;
        html += decoder.decode(value, { stream: true });
      }
      reader.cancel();
      return parseMetaTags(html);
    }),
  ]);

  const headers = headersResult.status === "fulfilled" ? headersResult.value : null;
  const robotsTxt = robotsResult.status === "fulfilled" ? robotsResult.value : null;
  const sitemap = sitemapResult.status === "fulfilled" ? sitemapResult.value : null;
  const metaTags = pageResult.status === "fulfilled" ? pageResult.value : null;

  return successResponse({
    url: url.toString(),
    httpStatus: headers?.status,
    server: headers?.server,
    poweredBy: headers?.poweredBy,
    securityHeaders: headers?.securityHeaders || null,
    robotsTxt,
    sitemap,
    metaTags,
    isHttps: url.protocol === "https:",
  });
}
