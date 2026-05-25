import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getCaseBySlug, getCaseSlugs } from "@/lib/mdx";
import { Container } from "@/components/ui/Container";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { Link } from "@/lib/navigation";
import { getTranslations } from "next-intl/server";
import { locales } from "@/i18n";

interface PageProps {
  params: { locale: string; slug: string };
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getCaseSlugs().map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  try {
    const { frontmatter } = getCaseBySlug(slug);
    return { title: frontmatter.title, description: frontmatter.excerpt };
  } catch {
    return { title: "Caso de estudio" };
  }
}

export default async function CasePage({ params: { locale, slug } }: PageProps) {
  const t = await getTranslations({ locale, namespace: "trabajo" });

  let caso;
  try {
    caso = getCaseBySlug(slug, locale);
  } catch {
    notFound();
  }

  const { frontmatter, content } = caso;
  const { title, excerpt, client, industry, services, date, duration, results } =
    frontmatter;

  const [year, month] = date.split("-");
  const dateLabel = new Date(`${year}-${month}-01`).toLocaleDateString(
    locale === "en" ? "en-US" : "es-ES",
    { month: "long", year: "numeric" }
  );

  return (
    <main>
      <section className="relative pt-32 pb-16 bg-light-bg dark:bg-dark-bg">
        <Container>
          <Link
            href="/trabajo"
            className="inline-flex items-center gap-2 text-sm text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text transition-colors mb-10"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            {t("backLink")}
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xs font-medium border border-light-border dark:border-dark-border rounded-[6px] px-2.5 py-1 text-light-muted dark:text-dark-muted">
              {industry}
            </span>
            {services.map((s) => (
              <span key={s} className="text-xs font-medium text-brand bg-brand/8 rounded-[5px] px-2.5 py-1">
                {s}
              </span>
            ))}
            <span className="text-xs text-light-muted dark:text-dark-muted">{dateLabel}</span>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-light-text dark:text-dark-text tracking-tight leading-[1.06] max-w-3xl">
            {title}
          </h1>
          <p className="mt-5 text-lg text-light-muted dark:text-dark-muted leading-relaxed max-w-2xl">
            {excerpt}
          </p>

          <div className="mt-8 flex flex-wrap gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-light-muted dark:text-dark-muted mb-1">{t("clientLabel")}</p>
              <p className="text-sm text-light-text dark:text-dark-text">{client}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-light-muted dark:text-dark-muted mb-1">{t("durationLabel")}</p>
              <p className="text-sm text-light-text dark:text-dark-text">{duration}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card py-12">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {results.map(({ metric, label }) => (
              <div key={label} className="text-center sm:text-left">
                <p className="font-display font-extrabold text-4xl text-brand leading-none">{metric}</p>
                <p className="mt-2 text-sm text-light-muted dark:text-dark-muted">{label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 bg-light-bg dark:bg-dark-bg">
        <Container>
          <div className="mx-auto max-w-2xl">
            <MDXRemote source={content} components={mdxComponents} />
          </div>
        </Container>
      </section>

      <ContactCTA />
    </main>
  );
}
