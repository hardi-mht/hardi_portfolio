import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

// Static export needs the image baked at build time rather than on request.
export const dynamic = "force-static";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0f",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 6,
            color: "#8b8b96",
            textTransform: "uppercase",
          }}
        >
          {profile.locationShort}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 128, fontWeight: 700, color: "#f4f4f5", lineHeight: 1 }}>
            Hardi
          </div>
          <div style={{ display: "flex", fontSize: 128, fontWeight: 700, color: "#22d3ee", lineHeight: 1 }}>
            Mehta
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              display: "flex",
              background: "#22d3ee",
              color: "#0a0a0f",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 4,
              padding: "12px 20px",
              borderRadius: 8,
              textTransform: "uppercase",
            }}
          >
            {profile.title}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#8b8b96" }}>
            Agentic AI · React · Node.js
          </div>
        </div>
      </div>
    ),
    size,
  );
}
