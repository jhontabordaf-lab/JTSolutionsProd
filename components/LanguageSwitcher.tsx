"use client";

import { useLocale } from "next-intl";
import { usePathname, Link } from "@/lib/navigation";

const PREF_COOKIE = "jts-locale";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60;

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const targetLocale = locale === "es" ? "en" : "es";

  const handleClick = () => {
    // Write explicit preference before navigating so the middleware
    // sees the updated choice on the very next request.
    document.cookie = `${PREF_COOKIE}=${targetLocale};path=/;max-age=${COOKIE_MAX_AGE};samesite=lax`;
  };

  return (
    <Link
      href={pathname}
      locale={targetLocale}
      onClick={handleClick}
      aria-label={`Switch to ${targetLocale === "en" ? "English" : "Español"}`}
      className="flex h-9 items-center justify-center rounded-card px-2 text-xs font-semibold text-light-muted hover:text-light-text dark:text-dark-muted dark:hover:text-dark-text transition-colors tracking-widest"
    >
      {targetLocale.toUpperCase()}
    </Link>
  );
}
