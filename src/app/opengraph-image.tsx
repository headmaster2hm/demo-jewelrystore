import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d2418 45%, #1a1a1a 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-80px",
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,137,46,0.35) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            height: "6px",
            background: "linear-gradient(90deg, #c9892e, #e8bf7a, #c9892e)",
          }}
        />

        <p
          style={{
            fontSize: 22,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#e8bf7a",
            marginBottom: 24,
          }}
        >
          Fine Jewelry &amp; Custom Designs
        </p>

        <h1
          style={{
            fontSize: 72,
            fontWeight: 600,
            color: "#ffffff",
            lineHeight: 1.05,
            marginBottom: 20,
            maxWidth: 900,
          }}
        >
          E. Harrington
        </h1>

        <p
          style={{
            fontSize: 34,
            color: "#dda04a",
            fontStyle: "italic",
            marginBottom: 36,
          }}
        >
          Appraisals Jewelry Studio
        </p>

        <p
          style={{
            fontSize: 26,
            color: "#d1d1d1",
            lineHeight: 1.5,
            maxWidth: 780,
          }}
        >
          Engagement rings, necklaces, bracelets &amp; bespoke pieces crafted with timeless elegance.
        </p>
      </div>
    ),
    { ...size }
  );
}
