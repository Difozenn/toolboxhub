import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #09090b 0%, #18181b 100%)",
          color: "#fafafa",
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 16 }}>🧰</div>
        <div style={{ fontSize: 64, fontWeight: 700, marginBottom: 12 }}>
          ToolboxHub
        </div>
        <div style={{ fontSize: 28, color: "#a1a1aa", marginBottom: 32 }}>
          500+ Free Online Tools
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            fontSize: 18,
            color: "#71717a",
          }}
        >
          <span>Text</span>
          <span>·</span>
          <span>Developer</span>
          <span>·</span>
          <span>Math</span>
          <span>·</span>
          <span>Finance</span>
          <span>·</span>
          <span>Health</span>
          <span>·</span>
          <span>Converters</span>
          <span>·</span>
          <span>& More</span>
        </div>
      </div>
    ),
    size,
  );
}
