import { isValidDomain, sanitizeDomain } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp, errorResponse, successResponse } from "@/lib/api-helpers";

export const runtime = "nodejs";
export const maxDuration = 15;

interface RdapEvent {
  eventAction: string;
  eventDate: string;
}

interface RdapEntity {
  roles?: string[];
  vcardArray?: [string, ...unknown[][]];
  entities?: RdapEntity[];
}

interface RdapResponse {
  ldhName?: string;
  status?: string[];
  events?: RdapEvent[];
  entities?: RdapEntity[];
  nameservers?: { ldhName: string }[];
  secureDNS?: { delegationSigned?: boolean };
}

function extractContact(entity: RdapEntity): { role: string; name?: string; organization?: string } {
  const role = entity.roles?.[0] || "unknown";
  let name: string | undefined;
  let organization: string | undefined;

  if (entity.vcardArray && entity.vcardArray.length > 1) {
    const fields = entity.vcardArray[1] as unknown[][];
    for (const field of fields) {
      if (field[0] === "fn") name = field[3] as string;
      if (field[0] === "org") organization = field[3] as string;
    }
  }

  return { role, name, organization };
}

function findDate(events: RdapEvent[], action: string): string | undefined {
  return events.find((e) => e.eventAction === action)?.eventDate;
}

function extractRegistrar(entities: RdapEntity[]): string | undefined {
  const registrar = entities.find((e) => e.roles?.includes("registrar"));
  if (!registrar) return undefined;
  if (registrar.vcardArray && registrar.vcardArray.length > 1) {
    const fields = registrar.vcardArray[1] as unknown[][];
    for (const field of fields) {
      if (field[0] === "fn") return field[3] as string;
    }
  }
  return undefined;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = rateLimit(ip);
  if (!allowed) return errorResponse("Rate limit exceeded. Try again later.", 429);

  let body: { domain?: string };
  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid JSON body");
  }

  const domain = sanitizeDomain(body.domain || "");
  if (!isValidDomain(domain)) return errorResponse("Invalid domain name");

  try {
    const res = await fetch(`https://rdap.org/domain/${domain}`, {
      headers: { Accept: "application/rdap+json" },
      signal: AbortSignal.timeout(12000),
    });

    if (res.status === 404) {
      return successResponse({ domain, found: false });
    }

    if (!res.ok) {
      return errorResponse(`RDAP server returned ${res.status}`, 502);
    }

    const data: RdapResponse = await res.json();

    const events = data.events || [];
    const entities = data.entities || [];
    const nameservers = (data.nameservers || []).map((ns) => ns.ldhName);
    const contacts = entities
      .filter((e) => e.roles && !e.roles.includes("registrar"))
      .map(extractContact);

    return successResponse({
      domain: data.ldhName || domain,
      found: true,
      status: data.status || [],
      registrar: extractRegistrar(entities),
      registrationDate: findDate(events, "registration"),
      expirationDate: findDate(events, "expiration"),
      lastUpdated: findDate(events, "last changed"),
      nameservers,
      dnssec: data.secureDNS?.delegationSigned || false,
      contacts,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "WHOIS lookup failed";
    return errorResponse(`WHOIS lookup failed: ${msg}`, 502);
  }
}
