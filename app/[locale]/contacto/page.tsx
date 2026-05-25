import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ScheduleCall } from "@/components/sections/ScheduleCall";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: locale === "es" ? "Contacto" : "Contact",
    description:
      locale === "es"
        ? "Cuéntanos el desafío. Respondemos en menos de 48 horas."
        : "Tell us the challenge. We respond in less than 48 hours.",
  };
}

export default async function ContactoPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "contacto" });

  const contactDetails = [
    { label: "Email", value: t("email"), href: `mailto:${t("email")}` },
    { label: t("responseLabel"), value: t("responseValue"), href: null },
    { label: "Location", value: t("location"), href: null },
    { label: t("availabilityLabel"), value: t("availabilityValue"), href: null },
  ];

  const expects = [t("expect1"), t("expect2"), t("expect3"), t("expect4")];

  return (
    <main>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-light-bg dark:bg-dark-bg overflow-hidden">
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
            {t("headline1")}{" "}
            <span className="text-gradient-brand">{t("headline2")}</span>
          </h1>
          <p className="mt-5 text-lg text-light-muted dark:text-dark-muted leading-relaxed max-w-xl">
            {t("subheadline")}
          </p>
        </Container>
      </section>

      {/* Form + sidebar */}
      <section className="py-16 bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
            <aside className="lg:col-span-2">
              <div className="sticky top-28 flex flex-col gap-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-5">
                    {t("infoLabel")}
                  </p>
                  <ul className="flex flex-col gap-5">
                    {contactDetails.map(({ label, value, href }) => (
                      <li key={label}>
                        <p className="text-xs text-light-muted dark:text-dark-muted mb-1">{label}</p>
                        {href ? (
                          <a
                            href={href}
                            className="text-sm font-medium text-light-text dark:text-dark-text hover:text-brand transition-colors"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-light-text dark:text-dark-text">{value}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-card-lg border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-3">
                    {t("expectLabel")}
                  </p>
                  <ul className="flex flex-col gap-3">
                    {expects.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                          aria-hidden="true"
                        />
                        <span className="text-sm text-light-muted dark:text-dark-muted leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <ScheduleCall />
    </main>
  );
}
