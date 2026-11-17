import { ImageResponse } from "next/og";

export const alt = "Atom-lite — local-first, model-agnostic coding agent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#e7dcc3",
          color: "#211e1a",
          padding: 72,
          border: "2px solid #211e1a",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26 }}>
          <span>atom-lite</span>
          <span style={{ color: "#8c2f22", letterSpacing: 4 }}>LOCAL-FIRST</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: -5, lineHeight: 1 }}>
            atom-lite
          </div>
          <div style={{ fontSize: 36, color: "#484236" }}>
            Local-first, model-agnostic coding agent for the terminal.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            background: "#211e1a",
            color: "#efe6d0",
            padding: "24px 32px",
            fontSize: 32,
            fontFamily: "monospace",
          }}
        >
          npm install -g atom-lite
        </div>
      </div>
    ),
    size,
  );
}
