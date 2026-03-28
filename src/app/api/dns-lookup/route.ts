import { promises as dns } from "dns";
import { isValidDomain, sanitizeDomain } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp, errorResponse, successResponse } from "@/lib/api-helpers";

export const runtime = "nodejs";
export const maxDuration = 10;

const VALID_TYPES = ["A", "AAAA", "MX", "NS", "TXT", "CNAME", "SOA"] as const;
type RecordType = (typeof VALID_TYPES)[number];

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = rateLimit(ip);
  if (!allowed) return errorResponse("Rate limit exceeded. Try again later.", 429);

  let body: { domain?: string; type?: string };
  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid JSON body");
  }

  const domain = sanitizeDomain(body.domain || "");
  if (!isValidDomain(domain)) return errorResponse("Invalid domain name");

  const type = (body.type || "A").toUpperCase() as RecordType;
  if (!VALID_TYPES.includes(type)) return errorResponse(`Invalid record type. Use: ${VALID_TYPES.join(", ")}`);

  try {
    let records: unknown;

    switch (type) {
      case "A":
        records = await dns.resolve4(domain);
        break;
      case "AAAA":
        records = await dns.resolve6(domain);
        break;
      case "MX":
        records = await dns.resolveMx(domain);
        break;
      case "NS":
        records = await dns.resolveNs(domain);
        break;
      case "TXT":
        records = (await dns.resolveTxt(domain)).map((r) => r.join(""));
        break;
      case "CNAME":
        records = await dns.resolveCname(domain);
        break;
      case "SOA":
        records = await dns.resolveSoa(domain);
        break;
    }

    return successResponse({ domain, type, records });
  } catch (err: unknown) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "ENOTFOUND" || code === "ENODATA") {
      return successResponse({ domain, type, records: [] });
    }
    return errorResponse(`DNS lookup failed: ${code || "unknown error"}`, 502);
  }
}
