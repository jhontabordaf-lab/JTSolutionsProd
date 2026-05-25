import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { AboutValues } from "@/components/sections/about/AboutValues";
import { ContactCTA } from "@/components/sections/ContactCTA";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: locale === "es" ? "Nosotros" : "About",
    description:
      locale === "es"
        ? "Un equipo pequeño con un estándar alto. Construimos tecnología con honestidad, criterio y foco en resultados reales."
        : "A small team with a high standard. We build technology with honesty, judgment and a focus on real results.",
  };
}

export default async function NosotrosPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "nosotros" });

  const stats = [
    { value: t("stat1value"), label: t("stat1label") },
    { value: t("stat2value"), label: t("stat2label") },
    { value: t("stat3value"), label: t("stat3label") },
    { value: t("stat4value"), label: t("stat4label") },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative pt-32 pb-0 bg-light-bg dark:bg-dark-bg overflow-hidden">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pb-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-5">
                {t("label")}
              </p>
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-light-text dark:text-dark-text tracking-tight leading-[1.06] max-w-xl">
                {t("headline1")}
                <br />
                <span className="text-gradient-brand">{t("headline2")}</span>
              </h1>
              <p className="mt-6 text-lg text-light-muted dark:text-dark-muted leading-relaxed max-w-lg">
                {t("subheadline")}
              </p>
            </div>
            {/* Image */}
            <div className="relative h-72 lg:h-96 rounded-card-lg overflow-hidden border border-light-border dark:border-dark-border">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80&auto=format"
                alt="JTSolutions team"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-light-bg/70 dark:from-dark-bg/70 via-transparent to-transparent" />
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-14 bg-light-card dark:bg-dark-card border-y border-light-border dark:border-dark-border">
        <Container>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-display font-extrabold text-4xl text-brand leading-none">
                  {value}
                </p>
                <p className="mt-2 text-sm text-light-muted dark:text-dark-muted">{label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why we exist */}
      <section className="py-28 bg-light-bg dark:bg-dark-bg relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(37,99,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,255,0.03) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand sticky top-28">
                {t("whyLabel")}
              </p>
            </div>
            <div className="lg:col-span-3 space-y-6">
              <p className="text-xl sm:text-2xl font-body font-medium text-light-text dark:text-dark-text leading-[1.6]">
                {t("whyP1")}
              </p>
              <p className="text-base text-light-muted dark:text-dark-muted leading-relaxed">
                {t("whyP2")}
              </p>
              <p className="text-base text-light-muted dark:text-dark-muted leading-relaxed">
                {t("whyP3")}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-28 bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand sticky top-28">
                {t("howLabel")}
              </p>
            </div>
            <div className="lg:col-span-3">
              <AboutValues />
            </div>
          </div>
        </Container>
      </section>

      {/* Medellín */}
      <section className="py-28 bg-light-card dark:bg-dark-card border-t border-light-border dark:border-dark-border relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(37,99,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,255,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <Container>
          {/* Header */}
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-4">
              {t("medellinLabel")}
            </p>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-light-text dark:text-dark-text tracking-tight leading-[1.08] max-w-3xl">
              {t("medellinTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Photo mosaic */}
            <div className="grid grid-cols-2 gap-3">
              {/* Large top image — spans both columns */}
              <div className="relative col-span-2 h-56 rounded-card-lg overflow-hidden border border-light-border dark:border-dark-border">
                <Image
                  src="https://images.unsplash.com/photo-1633627425472-d07ac65e2a36?w=900&q=80&auto=format&fit=crop"
                  alt="Vista aérea de Medellín, Colombia"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-semibold uppercase tracking-widest text-white bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1">
                  Medellín — Ciudad de la Eterna Primavera
                </span>
              </div>
              {/* Bottom-left: Medellín con montañas */}
              <div className="relative h-44 rounded-card-lg overflow-hidden border border-light-border dark:border-dark-border">
                <Image
                  src="https://images.unsplash.com/photo-1697082390861-9f5186b44431?w=600&q=80&auto=format&fit=crop"
                  alt="Medellín con montañas al fondo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-widest text-white bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-0.5">
                  Valle de Aburrá
                </span>
              </div>
              {/* Bottom-right: panorámica al atardecer */}
              <div className="relative h-44 rounded-card-lg overflow-hidden border border-light-border dark:border-dark-border">
                <Image
                  src="https://plus.unsplash.com/premium_photo-1754341249322-9d6d9fc962c7?w=600&q=80&auto=format&fit=crop"
                  alt="Panorámica de Medellín al atardecer"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-widest text-white bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-0.5">
                  Hub Tecnológico
                </span>
              </div>
            </div>

            {/* Text */}
            <div>
              <p className="text-base text-light-muted dark:text-dark-muted leading-relaxed mb-5">
                {t("medellinP1")}
              </p>
              <p className="text-base text-light-muted dark:text-dark-muted leading-relaxed">
                {t("medellinP2")}
              </p>
              {/* Tech companies badge row */}
              <div className="mt-8 flex flex-wrap gap-2">
                {["Google", "Microsoft", "Globant", "AWS", "Accenture", "Bancolombia Tech"].map((co) => (
                  <span
                    key={co}
                    className="text-xs font-medium text-light-muted dark:text-dark-muted border border-light-border dark:border-dark-border rounded-[6px] px-2.5 py-1 bg-light-bg dark:bg-dark-bg"
                  >
                    {co}
                  </span>
                ))}
                <span className="text-xs font-medium text-brand border border-brand/20 rounded-[6px] px-2.5 py-1 bg-brand/5">
                  +100 más
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ContactCTA headline={t("ctaHeadline")} subheadline={t("ctaSubheadline")} cta={t("ctaButton")} />
    </main>
  );
}
