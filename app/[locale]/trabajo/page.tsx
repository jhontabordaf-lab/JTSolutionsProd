import type { Metadata } from "next";
import { getAllCases } from "@/lib/mdx";
import { CaseCard } from "@/components/sections/work/CaseCard";
import { Container } from "@/components/ui/Container";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: locale === "es" ? "Trabajo" : "Work",
    description:
      locale === "es"
        ? "Casos de estudio reales: IA aplicada, desarrollo de software y consultoría estratégica."
        : "Real case studies: applied AI, software development and strategic consulting.",
  };
}

export default async function TrabajoPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const casos = getAllCases();
  const t = await getTranslations({ locale, namespace: "trabajo" });

  return (
    <main>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-light-bg dark:bg-dark-bg overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(37,99,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,255,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(37,99,255,0.12) 0%, transparent 70%)",
          }}
        />
        <Container>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-5">
            {t("label")}
          </p>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-light-text dark:text-dark-text tracking-tight leading-[1.06] max-w-2xl">
            {t("headline1")}
            <br />
            <span className="text-gradient-brand">{t("headline2")}</span>
          </h1>
          <p className="mt-6 text-lg text-light-muted dark:text-dark-muted leading-relaxed max-w-xl">
            {t("subheadline")}
          </p>
        </Container>
      </section>

      {/* Cases grid */}
      <section className="py-20 bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border">
        <Container>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {casos.map((caso, index) => (
              <CaseCard key={caso.slug} caso={caso} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <ContactCTA
        headline={t("ctaHeadline")}
        subheadline={t("ctaSubheadline")}
        cta={t("ctaButton")}
      />
    </main>
  );
}
