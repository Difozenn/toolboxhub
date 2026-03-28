import * as tls from "tls";
import { isValidDomain, sanitizeDomain } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp, errorResponse, successResponse } from "@/lib/api-helpers";

export const runtime = "nodejs";
export const maxDuration = 10;

interface SslResult {
  hostname: string;
  valid: boolean;
  subject: { CN?: string; O?: string };
  issuer: { CN?: string; O?: string };
  validFrom: string;
  validTo: string;
  daysUntilExpiry: number;
  serialNumber: string;
  fingerprint256: string;
  sans: string[];
  protocol: string;
  cipher: { name: string; version: string };
}

function checkSsl(hostname: string): Promise<SslResult> {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(443, hostname, { servername: hostname, timeout: 8000 }, () => {
      const cert = socket.getPeerCertificate();
      if (!cert || !cert.subject) {
        socket.destroy();
        return reject(new Error("No certificate returned"));
      }

      const validTo = new Date(cert.valid_to);
      const now = new Date();
      const daysUntilExpiry = Math.floor((validTo.getTime() - now.getTime()) / 86_400_000);

      const sans = cert.subjectaltname
        ? cert.subjectaltname.split(",").map((s: string) => s.trim().replace(/^DNS:/, ""))
        : [];

      const cipherInfo = socket.getCipher();
      const protocol = socket.getProtocol() || "unknown";

      const str = (v: string | string[] | undefined): string | undefined =>
        Array.isArray(v) ? v[0] : v;

      const result: SslResult = {
        hostname,
        valid: socket.authorized,
        subject: { CN: str(cert.subject.CN), O: str(cert.subject.O) },
        issuer: { CN: str(cert.issuer.CN), O: str(cert.issuer.O) },
        validFrom: cert.valid_from,
        validTo: cert.valid_to,
        daysUntilExpiry,
        serialNumber: cert.serialNumber,
        fingerprint256: cert.fingerprint256,
        sans,
        protocol,
        cipher: { name: cipherInfo.name, version: cipherInfo.version },
      };

      socket.destroy();
      resolve(result);
    });

    socket.on("timeout", () => {
      socket.destroy();
      reject(new Error("Connection timed out"));
    });

    socket.on("error", (err) => {
      socket.destroy();
      reject(err);
    });
  });
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = rateLimit(ip);
  if (!allowed) return errorResponse("Rate limit exceeded. Try again later.", 429);

  let body: { hostname?: string };
  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid JSON body");
  }

  const hostname = sanitizeDomain(body.hostname || "");
  if (!isValidDomain(hostname)) return errorResponse("Invalid hostname");

  try {
    const result = await checkSsl(hostname);
    return successResponse(result);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "SSL check failed";
    return errorResponse(`SSL check failed: ${msg}`, 502);
  }
}
