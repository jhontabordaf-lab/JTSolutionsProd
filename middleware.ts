import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "./i18n";

// All Spanish-speaking countries (LATAM + Spain)
const SPANISH_COUNTRIES = new Set([
  "ES", // Spain
  "MX", // Mexico
  "CO", // Colombia
  "AR", // Argentina
  "CL", // Chile
  "PE", // Peru
  "VE", // Venezuela
  "EC", // Ecuador
  "BO", // Bolivia
  "PY", // Paraguay
  "UY", // Uruguay
  "CR", // Costa Rica
  "PA", // Panama
  "GT", // Guatemala
  "HN", // Honduras
  "SV", // El Salvador
  "NI", // Nicaragua
  "DO", // Dominican Republic
  "CU", // Cuba
  "PR", // Puerto Rico
  "GQ", // Equatorial Guinea
]);

// Cookie that persists the user's explicit language choice
const PREF_COOKIE = "jts-locale";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /en/* is always English — URL is authoritative
  const hasEnPrefix = pathname === "/en" || pathname.startsWith("/en/");
  if (hasEnPrefix) {
    return intlMiddleware(request);
  }

  // Check for user's explicit language preference (set by LanguageSwitcher)
  const userPref = request.cookies.get(PREF_COOKIE)?.value as "es" | "en" | undefined;

  if (userPref === "en") {
    // User previously chose English → redirect to /en
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  if (userPref === "es") {
    // User explicitly chose Spanish → serve as-is
    return intlMiddleware(request);
  }

  // ── No preference yet: detect by geography ──────────────────────────────
  // Vercel injects x-vercel-ip-country on all requests in production.
  // cf-ipcountry is a Cloudflare fallback if ever deployed there.
  const country = (
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    ""
  ).toUpperCase();

  // If country is known and NOT Spanish-speaking → redirect to /en
  if (country && !SPANISH_COUNTRIES.has(country)) {
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname === "/" ? "" : pathname}`;
    const res = NextResponse.redirect(url);
    // Remember the geo result so we don't redirect on every request
    res.cookies.set(PREF_COOKIE, "en", {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
    });
    return res;
  }

  // Spanish country (or unknown/dev environment) → serve Spanish
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
