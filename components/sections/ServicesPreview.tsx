import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";
import { Container } from "@/components/ui/Container";

const SERVICE_IMAGES = [
  "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80&auto=format",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&auto=format",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format",
  "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80&auto=format",
];

export async function ServicesPreview() {
  const t = await getTranslations("home");

  const services = [
    { id: "ia", title: t("s1Title"), desc: t("s1Desc"), tags: [t("s1t1"), t("s1t2"), t("s1t3")], href: "/servicios#ia" as const, img: SERVICE_IMAGES[0] },
    { id: "marketing", title: t("s4Title"), desc: t("s4Desc"), tags: [t("s4t1"), t("s4t2"), t("s4t3")], href: "/servicios#marketing" as const, img: SERVICE_IMAGES[3] },
    { id: "consultoria", title: t("s3Title"), desc: t("s3Desc"), tags: [t("s3t1"), t("s3t2"), t("s3t3")], href: "/servicios#consultoria" as const, img: SERVICE_IMAGES[2] },
    { id: "desarrollo", title: t("s2Title"), desc: t("s2Desc"), tags: [t("s2t1"), t("s2t2"), t("s2t3")], href: "/servicios#desarrollo" as const, img: SERVICE_IMAGES[1] },
  ];

  return (
    <section className="py-28 bg-light-bg dark:bg-dark-bg relative overflow-hidden">
      {/* Subtle grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "linear-gradient(rgba(37,99,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,255,0.04) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div className="max-w-lg">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-4">
              {t("servicesLabel")}
            </p>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-light-text dark:text-dark-text tracking-tight leading-tight">
              {t("servicesTitle")}
            </h2>
            <p className="mt-4 text-light-muted dark:text-dark-muted leading-relaxed">
              {t("servicesSubtitle")}
            </p>
          </div>
          <Link href="/servicios" className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:opacity-75 transition-opacity whitespace-nowrap">
            {t("servicesCta")}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <Link
              key={s.id}
              href={s.href}
              className={`group relative flex flex-col overflow-hidden rounded-card-lg border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card hover:border-brand/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(37,99,255,0.12)] ${i === 0 ? "md:col-span-2 lg:col-span-2" : ""}`}
            >
              {/* Image */}
              <div className={`relative w-full overflow-hidden ${i === 0 ? "h-56" : "h-44"}`}>
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-light-card dark:from-dark-card via-light-card/40 dark:via-dark-card/40 to-transparent" />
                {/* Number badge */}
                <span className="absolute top-4 right-4 font-mono text-xs font-bold text-brand bg-brand/10 border border-brand/20 rounded-full px-2.5 py-1">
                  0{i + 1}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text tracking-tight mb-2 group-hover:text-brand transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed flex-1 mb-5">
                  {s.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <span key={tag} className="text-[11px] font-medium text-light-muted dark:text-dark-muted border border-light-border dark:border-dark-border rounded-[6px] px-2 py-0.5 bg-gray-50 dark:bg-dark-card-2">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="absolute top-4 left-4 flex h-7 w-7 items-center justify-center rounded-full bg-light-card/80 dark:bg-dark-card/80 border border-light-border dark:border-dark-border opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
