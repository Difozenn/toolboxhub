const DOMAIN_RE = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

export function isValidDomain(domain: string): boolean {
  return DOMAIN_RE.test(domain);
}

export function sanitizeDomain(input: string): string {
  let d = input.trim().toLowerCase();
  d = d.replace(/^https?:\/\//, "");
  d = d.replace(/\/.*$/, "");
  d = d.replace(/^www\./, "");
  return d;
}

export function isValidUrl(input: string): { valid: boolean; url?: URL; error?: string } {
  try {
    const raw = input.startsWith("http") ? input : "https://" + input;
    const url = new URL(raw);
    if (!["http:", "https:"].includes(url.protocol)) {
      return { valid: false, error: "Only HTTP and HTTPS URLs are supported" };
    }
    return { valid: true, url };
  } catch {
    return { valid: false, error: "Invalid URL format" };
  }
}

const PRIVATE_RANGES = [
  /^127\./,
  /^10\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^192\.168\./,
  /^169\.254\./,
  /^0\./,
  /^::1$/,
  /^fc00:/i,
  /^fd/i,
  /^fe80:/i,
];

const BLOCKED_HOSTNAMES = ["localhost", "metadata.google.internal"];

export function isPrivateHost(hostname: string): boolean {
  const lower = hostname.toLowerCase();
  if (BLOCKED_HOSTNAMES.includes(lower) || lower.endsWith(".internal")) return true;
  return PRIVATE_RANGES.some((re) => re.test(lower));
}

/** Resolve hostname and reject private IPs (SSRF prevention) */
export async function assertPublicHost(hostname: string): Promise<void> {
  if (isPrivateHost(hostname)) {
    throw new Error("Requests to private/internal hosts are not allowed");
  }
  // Resolve to check actual IPs
  const dns = await import("dns");
  const { resolve4 } = dns.promises;
  try {
    const ips = await resolve4(hostname);
    for (const ip of ips) {
      if (isPrivateHost(ip)) {
        throw new Error("Requests to private/internal hosts are not allowed");
      }
    }
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes("not allowed")) throw err;
    // DNS resolution failure is OK here — the actual fetch will fail with a clear error
  }
}
