"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import type { Service } from "@/lib/data/services";

const SERVICE_IMAGES: Record<string, string> = {
  ia: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80&auto=format",
  desarrollo: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80&auto=format",
  consultoria: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format",
  marketing: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&q=80&auto=format",
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export function ServiceBlock({ service }: { service: Service }) {
  const t = useTranslations("servicios");
  const { id, number, category, headline, description, capabilities, process, technologies } =
    service;

  const img = SERVICE_IMAGES[id];

  return (
    <section
      id={id}
      className="py-28 border-t border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg scroll-mt-20 relative overflow-hidden"
    >
      {/* Subtle grid */}
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
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.08 }}
        >
          {/* Number + category badge */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="font-mono text-sm font-bold text-brand bg-brand/10 border border-brand/20 rounded-full px-3 py-1">
              {number}
            </span>
            <span className="h-px w-8 bg-light-border dark:bg-dark-border" />
            <span className="text-sm font-medium text-light-muted dark:text-dark-muted">
              {category}
            </span>
          </motion.div>

          {/* Two-column: text + image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            <div>
              <motion.h2
                variants={fadeUp}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-light-text dark:text-dark-text tracking-tight leading-[1.08] max-w-2xl"
              >
                {headline}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mt-6 text-base sm:text-lg text-light-muted dark:text-dark-muted leading-relaxed"
              >
                {description}
              </motion.p>
            </div>

            {/* Image */}
            {img && (
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="relative h-64 lg:h-72 rounded-card-lg overflow-hidden border border-light-border dark:border-dark-border"
              >
                <Image
                  src={img}
                  alt={category}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-light-bg/60 dark:from-dark-bg/60 via-transparent to-transparent" />
              </motion.div>
            )}
          </div>

          {/* Capabilities + Process grid */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="grid grid-cols-1 gap-10 lg:grid-cols-5"
          >
            {/* Capabilities */}
            <div className="lg:col-span-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-brand mb-6">
                {t("capLabel")}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {capabilities.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-light-text dark:text-dark-text leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Process */}
            <div className="lg:col-span-2">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-brand mb-6">
                {t("processLabel")}
              </h3>
              <ol className="flex flex-col gap-6">
                {process.map(({ step, description: desc }, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="font-mono text-xs font-bold text-brand bg-brand/10 border border-brand/20 rounded-full w-7 h-7 flex items-center justify-center shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-light-text dark:text-dark-text mb-1">
                        {step}
                      </p>
                      <p className="text-xs text-light-muted dark:text-dark-muted leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>

          {/* Technologies */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mt-12 pt-8 border-t border-light-border dark:border-dark-border flex flex-wrap items-center gap-3"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-brand mr-2">
              {t("stackLabel")}
            </span>
            {technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs font-medium text-light-muted dark:text-dark-muted border border-light-border dark:border-dark-border rounded-[6px] px-2.5 py-1 bg-gray-50 dark:bg-dark-card-2 hover:border-brand/40 hover:text-light-text dark:hover:text-dark-text transition-colors"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
