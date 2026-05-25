"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

const CALENDLY_URL = "https://calendly.com/jhon-taborda-f?hide_gdpr_banner=1&primary_color=2563ff";

export function ScheduleCall() {
  const t = useTranslations("schedule");

  return (
    <section className="relative py-28 bg-light-bg dark:bg-dark-bg overflow-hidden">
      {/* Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,255,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Top glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(37,99,255,0.10) 0%, transparent 70%)",
        }}
      />

      <Container className="relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-4">
            {t("label")}
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-light-text dark:text-dark-text tracking-tight leading-tight">
            {t("headline1")}{" "}
            <span className="text-gradient-brand">{t("headline2")}</span>
          </h2>
          <p className="mt-5 text-lg text-light-muted dark:text-dark-muted leading-relaxed">
            {t("subheadline")}
          </p>
        </div>

        {/* Calendly embed */}
        <div className="mx-auto max-w-4xl rounded-card-lg border border-light-border dark:border-dark-border bg-white shadow-lg dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)] overflow-hidden">
          <iframe
            src={CALENDLY_URL}
            title={t("iframeTitle")}
            width="100%"
            height="700"
            frameBorder="0"
            loading="lazy"
            allow="camera; microphone"
            className="block w-full"
            style={{ minHeight: 700 }}
          />
        </div>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-light-muted dark:text-dark-muted">
          {t("note")}
        </p>
      </Container>
    </section>
  );
}
