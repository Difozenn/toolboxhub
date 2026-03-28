import { promises as dns } from "dns";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp, errorResponse, successResponse } from "@/lib/api-helpers";

export const runtime = "nodejs";
export const maxDuration = 15;

const MAX_TLDS = 15;
const DOMAIN_BASE_RE = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/;

type Status = "registered" | "available" | "unknown";

interface CheckResult {
  domain: string;
  tld: string;
  status: Status;
}

async function checkDomain(base: string, tld: string): Promise<CheckResult> {
  const full = `${base}${tld}`;
  try {
    await dns.resolve4(full);
    return { domain: full, tld, status: "registered" };
  } catch (err: unknown) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "ENOTFOUND") {
      // Double-check with RDAP for authoritative answer
      try {
        const res = await fetch(`https://rdap.org/domain/${full}`, {
          signal: AbortSignal.timeout(5000),
        });
        if (res.status === 404) return { domain: full, tld, status: "available" };
        if (res.ok) return { domain: full, tld, status: "registered" };
        return { domain: full, tld, status: "available" };
      } catch {
        // RDAP failed, rely on DNS result
        return { domain: full, tld, status: "available" };
      }
    }
    if (code === "ENODATA") {
      // Domain exists in DNS but has no A records — likely registered
      return { domain: full, tld, status: "registered" };
    }
    return { domain: full, tld, status: "unknown" };
  }
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = rateLimit(ip);
  if (!allowed) return errorResponse("Rate limit exceeded. Try again later.", 429);

  let body: { domain?: string; tlds?: string[] };
  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid JSON body");
  }

  const base = (body.domain || "").trim().toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/^-+|-+$/g, "");
  if (!base || !DOMAIN_BASE_RE.test(base)) return errorResponse("Invalid domain name");

  const tlds = (body.tlds || [".com", ".net", ".org", ".io", ".co", ".app", ".dev", ".ai", ".me", ".info"]).slice(0, MAX_TLDS);

  const results = await Promise.allSettled(tlds.map((tld: string) => checkDomain(base, tld)));

  const checked: CheckResult[] = results.map((r, i) =>
    r.status === "fulfilled" ? r.value : { domain: `${base}${tlds[i]}`, tld: tlds[i], status: "unknown" as Status }
  );

  return successResponse({ results: checked });
}
