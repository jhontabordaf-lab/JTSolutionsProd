import type { MetadataRoute } from "next";
import { getCaseSlugs } from "@/lib/mdx";
import { locales } from "@/i18n";

const BASE_URL = "https://www.jtsolutions.digital";

const staticPaths = ["/", "/servicios", "/trabajo", "/nosotros", "/contacto"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: locale === "es" ? `${BASE_URL}${path}` : `${BASE_URL}/en${path}`,
      lastModified: new Date(),
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : 0.8,
    }))
  );

  const caseEntries: MetadataRoute.Sitemap = getCaseSlugs().flatMap((slug) =>
    locales.map((locale) => ({
      url:
        locale === "es"
          ? `${BASE_URL}/trabajo/${slug}`
          : `${BASE_URL}/en/trabajo/${slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    }))
  );

  return [...staticEntries, ...caseEntries];
}
