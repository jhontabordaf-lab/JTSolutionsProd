"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function AboutValues() {
  const t = useTranslations("nosotros");

  const values = [
    {
      title: t("v1title"),
      description: t("v1desc"),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      title: t("v2title"),
      description: t("v2desc"),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      title: t("v3title"),
      description: t("v3desc"),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
    },
    {
      title: t("v4title"),
      description: t("v4desc"),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {values.map(({ title, description, icon }, index) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
          className="group rounded-card-lg border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-7 hover:border-brand/50 transition-all duration-300 hover:shadow-[0_0_24px_rgba(37,99,255,0.08)]"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-card border border-light-border dark:border-dark-border bg-gray-50 dark:bg-dark-card-2 text-brand mb-5 group-hover:border-brand/40 group-hover:bg-brand/5 transition-colors">
            {icon}
          </div>
          <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text tracking-tight mb-2 group-hover:text-brand transition-colors">
            {title}
          </h3>
          <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed">
            {description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
