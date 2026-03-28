export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}

export function errorResponse(message: string, status = 400): Response {
  return Response.json({ error: message }, { status });
}

export function successResponse<T>(data: T): Response {
  return Response.json({ data });
}
