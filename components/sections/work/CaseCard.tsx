"use client";

import { motion } from "framer-motion";
import { Link } from "@/lib/navigation";
import type { CaseStudy } from "@/lib/mdx";

interface CaseCardProps {
  caso: CaseStudy;
  index: number;
}

export function CaseCard({ caso, index }: CaseCardProps) {
  const { slug, frontmatter } = caso;
  const { title, excerpt, industry, services, results } = frontmatter;
  const firstResult = results[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
    >
      <Link
        href={`/trabajo/${slug}` as const}
        className="group flex flex-col h-full rounded-card-lg border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-8 transition-all duration-300 hover:border-brand/50 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(37,99,255,0.12)]"
      >
        {/* Top: industry + arrow */}
        <div className="flex items-start justify-between mb-6">
          <span className="text-xs font-medium text-light-muted dark:text-dark-muted border border-light-border dark:border-dark-border rounded-[6px] px-2.5 py-1 bg-gray-50 dark:bg-dark-card-2">
            {industry}
          </span>
          <span className="text-light-border dark:text-dark-border group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-xl text-light-text dark:text-dark-text tracking-tight leading-snug mb-3 group-hover:text-brand transition-colors">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed flex-1">
          {excerpt}
        </p>

        {/* Key metric */}
        {firstResult && (
          <div className="mt-8 pt-6 border-t border-light-border dark:border-dark-border flex items-end justify-between">
            <div>
              <p className="font-display font-extrabold text-3xl text-brand leading-none">
                {firstResult.metric}
              </p>
              <p className="text-xs text-light-muted dark:text-dark-muted mt-1">
                {firstResult.label}
              </p>
            </div>
            {/* Service tags */}
            <div className="flex flex-wrap justify-end gap-1.5">
              {services.map((s) => (
                <span
                  key={s}
                  className="text-[11px] font-medium text-brand bg-brand/10 border border-brand/20 rounded-[5px] px-2 py-0.5"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </Link>
    </motion.div>
  );
}
