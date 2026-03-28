import { isValidUrl, assertPublicHost } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp, errorResponse, successResponse } from "@/lib/api-helpers";

export const runtime = "nodejs";
export const maxDuration = 10;

interface Hop {
  url: string;
  statusCode: number;
  statusText: string;
  server?: string;
  location?: string;
}

const MAX_HOPS = 20;

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

  const chain: Hop[] = [];
  let currentUrl = url.toString();
  const visited = new Set<string>();
  let hasLoop = false;
  const start = Date.now();

  try {
    for (let i = 0; i < MAX_HOPS; i++) {
      if (visited.has(currentUrl)) {
        hasLoop = true;
        break;
      }
      visited.add(currentUrl);

      const res = await fetch(currentUrl, {
        method: "GET",
        redirect: "manual",
        headers: { "User-Agent": "ToolboxHub Redirect Checker" },
        signal: AbortSignal.timeout(5000),
      });

      const location = res.headers.get("location") || undefined;
      const server = res.headers.get("server") || undefined;

      chain.push({
        url: currentUrl,
        statusCode: res.status,
        statusText: res.statusText,
        server,
        location,
      });

      if (res.status >= 300 && res.status < 400 && location) {
        currentUrl = new URL(location, currentUrl).toString();
      } else {
        break;
      }
    }

    return successResponse({
      chain,
      totalHops: chain.length - 1,
      finalUrl: chain[chain.length - 1]?.url || currentUrl,
      hasLoop,
      totalTimeMs: Date.now() - start,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Redirect check failed";
    if (chain.length > 0) {
      return successResponse({
        chain,
        totalHops: chain.length - 1,
        finalUrl: chain[chain.length - 1]?.url || currentUrl,
        hasLoop,
        totalTimeMs: Date.now() - start,
        error: msg,
      });
    }
    return errorResponse(`Could not reach URL: ${msg}`, 502);
  }
}
