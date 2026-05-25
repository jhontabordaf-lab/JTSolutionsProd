"use client";

import { Link } from "@/lib/navigation";
import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  description: string;
  tags: string[];
  href: string;
  icon: "ai" | "dev" | "consulting";
  index: number;
}

export function ServiceCard({
  title,
  description,
  tags,
  href,
  icon,
  index,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
    >
      <Link
        href={href}
        className="group flex flex-col h-full rounded-card-lg border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-8 transition-all duration-200 hover:border-brand dark:hover:border-brand hover:shadow-[0_0_0_4px_rgba(37,99,255,0.07)]"
      >
        {/* Icon + arrow */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-card border border-light-border dark:border-dark-border text-brand">
            <ServiceIcon name={icon} />
          </div>
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

        {/* Content */}
        <h3 className="font-display font-bold text-xl text-light-text dark:text-dark-text mb-3 tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed flex-1">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-8">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium text-light-muted dark:text-dark-muted border border-light-border dark:border-dark-border rounded-[6px] px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}

function ServiceIcon({ name }: { name: "ai" | "dev" | "consulting" }) {
  if (name === "ai") {
    return (
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="4" r="2" />
        <circle cx="4" cy="18" r="2" />
        <circle cx="20" cy="18" r="2" />
        <line x1="12" y1="6" x2="4" y2="16" />
        <line x1="12" y1="6" x2="20" y2="16" />
        <line x1="4" y1="18" x2="20" y2="18" />
      </svg>
    );
  }
  if (name === "dev") {
    return (
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    );
  }
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
