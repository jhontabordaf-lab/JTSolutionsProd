"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const anchors = [
  { id: "ia", numKey: "num1", catKey: "cat1" },
  { id: "marketing", numKey: "num2", catKey: "cat2" },
  { id: "consultoria", numKey: "num3", catKey: "cat3" },
  { id: "desarrollo", numKey: "num4", catKey: "cat4" },
] as const;

export function ServicesPageHero() {
  const t = useTranslations("servicios");

  return (
    <section className="relative pt-32 pb-20 bg-light-bg dark:bg-dark-bg overflow-hidden">
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
      {/* Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(37,99,255,0.12) 0%, transparent 70%)",
        }}
      />
      <Container>
        <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.1 }}>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-xs font-semibold uppercase tracking-widest text-brand mb-5"
          >
            {t("label")}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-light-text dark:text-dark-text tracking-tight leading-[1.06] max-w-2xl"
          >
            {t("headline1")}{" "}
            <span className="text-gradient-brand">{t("headline2")}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-5 text-lg text-light-muted dark:text-dark-muted leading-relaxed max-w-xl"
          >
            {t("subheadline")}
          </motion.p>

          <motion.nav
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            aria-label={t("label")}
            className="mt-10 flex flex-wrap gap-3"
          >
            {anchors.map(({ id, numKey, catKey }) => (
              <a
                key={id}
                href={`#${id}`}
                className="inline-flex items-center gap-2 rounded-card border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card px-4 py-2 text-sm font-medium text-light-text dark:text-dark-text hover:border-brand hover:text-brand transition-colors"
              >
                <span className="text-xs text-brand font-mono font-bold">
                  {t(numKey)}
                </span>
                {t(catKey)}
              </a>
            ))}
          </motion.nav>
        </motion.div>
      </Container>
    </section>
  );
}
