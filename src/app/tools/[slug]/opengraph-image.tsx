import { ImageResponse } from "next/og";
import { getToolBySlug, tools } from "@/lib/tools";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#09090b",
            color: "#fafafa",
            fontSize: 48,
            fontWeight: 700,
          }}
        >
          ToolboxHub
        </div>
      ),
      size,
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #09090b 0%, #18181b 100%)",
          color: "#fafafa",
        }}
      >
        <div style={{ fontSize: 64, marginBottom: 12 }}>{tool.icon}</div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: 16,
            maxWidth: 900,
          }}
        >
          {tool.name}
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#a1a1aa",
            lineHeight: 1.4,
            maxWidth: 800,
          }}
        >
          {tool.description}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "auto",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#a78bfa",
            }}
          >
            ToolboxHub
          </div>
          <div style={{ fontSize: 20, color: "#52525b" }}>|</div>
          <div style={{ fontSize: 18, color: "#71717a" }}>
            Free Online Tools
          </div>
        </div>
      </div>
    ),
    size,
  );
}
