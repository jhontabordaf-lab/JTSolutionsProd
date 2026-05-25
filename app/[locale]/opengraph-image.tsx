import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function Image({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "home" });

  let syneFont: ArrayBuffer | null = null;
  try {
    const res = await fetch(
      "https://fonts.gstatic.com/s/syne/v22/8vIS7w4qzmVxsWxjEAc.woff"
    );
    syneFont = await res.arrayBuffer();
  } catch {
    // fall back to system font if fetch fails
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0f",
          padding: "64px 72px",
          fontFamily: syneFont ? "Syne" : "system-ui",
        }}
      >
        {/* Top — logo mark */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
          >
            <rect width="44" height="44" rx="9" fill="#2563FF" />
            <rect x="12" y="9" width="5" height="19" fill="white" />
            <rect x="7" y="23" width="10" height="5" fill="white" />
            <rect x="21" y="9" width="14" height="5" fill="white" />
            <rect x="26" y="14" width="4" height="21" fill="white" />
          </svg>
          <span
            style={{
              color: "#ffffff",
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            JTSolutions
          </span>
        </div>

        {/* Center — headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                color: "#ffffff",
                fontSize: "72px",
                fontWeight: 800,
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
              }}
            >
              {t("headline1")}
            </span>
            <span
              style={{
                color: "#2563FF",
                fontSize: "72px",
                fontWeight: 800,
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
              }}
            >
              {t("headline2")}
            </span>
          </div>
          <p
            style={{
              color: "#6b7280",
              fontSize: "22px",
              fontWeight: 400,
              lineHeight: 1.5,
              maxWidth: "700px",
              margin: 0,
            }}
          >
            {t("subheadline")}
          </p>
        </div>

        {/* Bottom — accent line */}
        <div
          style={{
            width: "64px",
            height: "3px",
            backgroundColor: "#2563FF",
            borderRadius: "2px",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: syneFont
        ? [{ name: "Syne", data: syneFont, weight: 800 }]
        : undefined,
    }
  );
}
