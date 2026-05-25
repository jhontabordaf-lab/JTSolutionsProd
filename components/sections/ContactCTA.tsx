"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { Container } from "@/components/ui/Container";

interface ContactCTAProps {
  headline?: string;
  subheadline?: string;
  cta?: string;
}

export function ContactCTA({ headline, subheadline, cta }: ContactCTAProps) {
  const t = useTranslations("common");

  return (
    <section className="relative py-28 bg-light-bg dark:bg-dark-bg overflow-hidden">
      {/* Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,255,0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(37,99,255,0.18) 0%, transparent 70%)",
        }}
      />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative text-center max-w-3xl mx-auto"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-6">
            {t("ctaContact")}
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-light-text dark:text-dark-text tracking-tight leading-[1.06]">
            {headline ?? t("ctaHeadline")}
          </h2>
          <p className="mt-6 text-lg text-light-muted dark:text-dark-muted leading-relaxed max-w-xl mx-auto">
            {subheadline ?? t("ctaSubheadline")}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-card bg-brand px-8 py-4 font-semibold text-white text-sm hover:opacity-90 transition-opacity glow-brand-sm"
            >
              {cta ?? t("ctaContact")}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link
              href="/trabajo"
              className="inline-flex items-center gap-2 rounded-card border border-light-border dark:border-dark-border px-8 py-4 font-medium text-light-text dark:text-dark-text text-sm hover:border-brand hover:text-brand transition-colors"
            >
              {t("ctaCases")}
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
