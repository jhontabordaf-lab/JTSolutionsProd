"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Link } from "@/lib/navigation";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Container } from "@/components/ui/Container";

type DropdownKey = "servicios" | "trabajo" | "nosotros" | "contacto" | null;

const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.18, ease: "easeOut" } },
  exit: { opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.13, ease: "easeIn" } },
};

export function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState<DropdownKey>(null);
  const [mobileExpanded, setMobileExpanded] = useState<DropdownKey>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleMouseEnter(key: DropdownKey) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(key);
  }

  function handleMouseLeave() {
    closeTimer.current = setTimeout(() => setOpen(null), 120);
  }

  const services = [
    { num: "01", label: t("s1label"), desc: t("s1desc"), href: "/servicios#ia" as const, icon: <AIIcon /> },
    { num: "02", label: t("s2label"), desc: t("s2desc"), href: "/servicios#marketing" as const, icon: <MarketingIcon /> },
    { num: "03", label: t("s3label"), desc: t("s3desc"), href: "/servicios#consultoria" as const, icon: <ConsultingIcon /> },
    { num: "04", label: t("s4label"), desc: t("s4desc"), href: "/servicios#desarrollo" as const, icon: <DevIcon /> },
  ];

  const aboutItems = [
    { label: t("aboutItem1"), href: "/nosotros" as const, icon: <WhyIcon /> },
    { label: t("aboutItem2"), href: "/nosotros" as const, icon: <HowIcon /> },
    { label: t("aboutItem3"), href: "/nosotros" as const, icon: <LocationIcon /> },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "border-b border-light-border dark:border-dark-border bg-light-bg/90 dark:bg-dark-bg/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" aria-label="JTSolutions">
            <Logo variant="full" size={34} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">

            {/* Servicios */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("servicios")}
              onMouseLeave={handleMouseLeave}
            >
              <NavTrigger label={t("servicios")} active={open === "servicios"} />
              <AnimatePresence>
                {open === "servicios" && (
                  <motion.div
                    key="servicios-dd"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[480px]"
                  >
                    <div className="rounded-card-lg border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-card shadow-xl dark:shadow-[0_8px_40px_rgba(0,0,0,0.5)] overflow-hidden">
                      <div className="grid grid-cols-2 gap-px bg-light-border dark:bg-dark-border">
                        {services.map((s) => (
                          <Link
                            key={s.href}
                            href={s.href}
                            onClick={() => setOpen(null)}
                            className="group flex items-start gap-3 p-4 bg-light-bg dark:bg-dark-card hover:bg-brand/5 dark:hover:bg-brand/8 transition-colors"
                          >
                            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-card border border-light-border dark:border-dark-border text-brand group-hover:border-brand/40 group-hover:bg-brand/5 transition-colors">
                              {s.icon}
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[10px] text-brand font-bold">{s.num}</span>
                                <span className="text-sm font-semibold text-light-text dark:text-dark-text group-hover:text-brand transition-colors">{s.label}</span>
                              </div>
                              <p className="text-xs text-light-muted dark:text-dark-muted mt-0.5 leading-snug">{s.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="px-4 py-3 border-t border-light-border dark:border-dark-border">
                        <Link
                          href="/servicios"
                          onClick={() => setOpen(null)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:opacity-75 transition-opacity"
                        >
                          {t("servicesCta")}
                          <ArrowRight size={11} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Trabajo */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("trabajo")}
              onMouseLeave={handleMouseLeave}
            >
              <NavTrigger label={t("trabajo")} active={open === "trabajo"} />
              <AnimatePresence>
                {open === "trabajo" && (
                  <motion.div
                    key="trabajo-dd"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72"
                  >
                    <div className="rounded-card-lg border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-card shadow-xl dark:shadow-[0_8px_40px_rgba(0,0,0,0.5)] overflow-hidden">
                      <div className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-card border border-light-border dark:border-dark-border text-brand">
                            <CasesIcon />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-light-text dark:text-dark-text">{t("workTitle")}</p>
                            <p className="text-xs text-light-muted dark:text-dark-muted">{t("workDesc")}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {["IA & ML", "Fintech", "SaaS", "Consultoría"].map((tag) => (
                            <span key={tag} className="text-[10px] font-medium text-brand bg-brand/8 border border-brand/15 rounded-full px-2 py-0.5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="px-5 py-3 border-t border-light-border dark:border-dark-border">
                        <Link
                          href="/trabajo"
                          onClick={() => setOpen(null)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:opacity-75 transition-opacity"
                        >
                          {t("workCta")}
                          <ArrowRight size={11} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Nosotros */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("nosotros")}
              onMouseLeave={handleMouseLeave}
            >
              <NavTrigger label={t("nosotros")} active={open === "nosotros"} />
              <AnimatePresence>
                {open === "nosotros" && (
                  <motion.div
                    key="nosotros-dd"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-64"
                  >
                    <div className="rounded-card-lg border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-card shadow-xl dark:shadow-[0_8px_40px_rgba(0,0,0,0.5)] overflow-hidden">
                      <div className="py-2">
                        {aboutItems.map(({ label, href, icon }) => (
                          <Link
                            key={label}
                            href={href}
                            onClick={() => setOpen(null)}
                            className="group flex items-center gap-3 px-4 py-2.5 hover:bg-brand/5 dark:hover:bg-brand/8 transition-colors"
                          >
                            <span className="text-light-muted dark:text-dark-muted group-hover:text-brand transition-colors">
                              {icon}
                            </span>
                            <span className="text-sm font-medium text-light-text dark:text-dark-text group-hover:text-brand transition-colors">
                              {label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contacto */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("contacto")}
              onMouseLeave={handleMouseLeave}
            >
              <NavTrigger label={t("contacto")} active={open === "contacto"} />
              <AnimatePresence>
                {open === "contacto" && (
                  <motion.div
                    key="contacto-dd"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="absolute top-full right-0 pt-3 w-72"
                  >
                    <div className="rounded-card-lg border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-card shadow-xl dark:shadow-[0_8px_40px_rgba(0,0,0,0.5)] overflow-hidden">
                      <div className="p-5">
                        <p className="text-sm font-semibold text-light-text dark:text-dark-text mb-1">{t("contactTitle")}</p>
                        <p className="text-xs text-light-muted dark:text-dark-muted leading-relaxed mb-4">{t("contactDesc")}</p>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-xs text-light-muted dark:text-dark-muted">
                            <MailIcon />
                            <a href={`mailto:${t("contactEmail")}`} className="hover:text-brand transition-colors">
                              {t("contactEmail")}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-light-muted dark:text-dark-muted">
                            <ClockIcon />
                            <span>{"< 48h"}</span>
                          </div>
                        </div>
                      </div>
                      <div className="px-5 py-3 border-t border-light-border dark:border-dark-border">
                        <Link
                          href="/contacto"
                          onClick={() => setOpen(null)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:opacity-75 transition-opacity"
                        >
                          {t("contactTitle")}
                          <ArrowRight size={11} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right — lang + theme + CTA */}
          <div className="hidden md:flex items-center gap-1">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link
              href="/contacto"
              className="ml-2 inline-flex items-center rounded-card bg-brand px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              {t("cta")}
            </Link>
          </div>

          {/* Mobile — lang + theme + hamburger */}
          <div className="flex md:hidden items-center gap-1">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
              className="flex h-9 w-9 items-center justify-center rounded-card text-light-text dark:text-dark-text"
            >
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="16" x2="20" y2="16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden border-t border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg overflow-hidden"
          >
            <Container>
              <nav className="flex flex-col py-4" aria-label="Navegación móvil">
                {/* Servicios mobile */}
                <MobileSection
                  label={t("servicios")}
                  expanded={mobileExpanded === "servicios"}
                  onToggle={() => setMobileExpanded(mobileExpanded === "servicios" ? null : "servicios")}
                >
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 py-2 pl-4 text-sm text-light-muted dark:text-dark-muted hover:text-brand transition-colors"
                    >
                      <span className="font-mono text-[10px] text-brand">{s.num}</span>
                      {s.label}
                    </Link>
                  ))}
                  <Link href="/servicios" onClick={() => setMobileOpen(false)} className="flex items-center gap-1 py-2 pl-4 text-xs font-semibold text-brand hover:opacity-75 transition-opacity">
                    {t("servicesCta")} <ArrowRight size={10} />
                  </Link>
                </MobileSection>

                {/* Trabajo mobile */}
                <MobileSection
                  label={t("trabajo")}
                  expanded={mobileExpanded === "trabajo"}
                  onToggle={() => setMobileExpanded(mobileExpanded === "trabajo" ? null : "trabajo")}
                >
                  <Link href="/trabajo" onClick={() => setMobileOpen(false)} className="flex items-center gap-1 py-2 pl-4 text-sm text-light-muted dark:text-dark-muted hover:text-brand transition-colors">
                    {t("workTitle")}
                  </Link>
                </MobileSection>

                {/* Nosotros mobile */}
                <MobileSection
                  label={t("nosotros")}
                  expanded={mobileExpanded === "nosotros"}
                  onToggle={() => setMobileExpanded(mobileExpanded === "nosotros" ? null : "nosotros")}
                >
                  {aboutItems.map(({ label, href }) => (
                    <Link key={label} href={href} onClick={() => setMobileOpen(false)} className="block py-2 pl-4 text-sm text-light-muted dark:text-dark-muted hover:text-brand transition-colors">
                      {label}
                    </Link>
                  ))}
                </MobileSection>

                {/* Contacto mobile */}
                <MobileSection
                  label={t("contacto")}
                  expanded={mobileExpanded === "contacto"}
                  onToggle={() => setMobileExpanded(mobileExpanded === "contacto" ? null : "contacto")}
                >
                  <Link href="/contacto" onClick={() => setMobileOpen(false)} className="block py-2 pl-4 text-sm text-light-muted dark:text-dark-muted hover:text-brand transition-colors">
                    {t("contactTitle")}
                  </Link>
                  <a href={`mailto:${t("contactEmail")}`} className="block py-2 pl-4 text-sm text-light-muted dark:text-dark-muted hover:text-brand transition-colors">
                    {t("contactEmail")}
                  </a>
                </MobileSection>

                <div className="pt-4 pb-2">
                  <Link
                    href="/contacto"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-center rounded-card bg-brand px-4 py-3 text-sm font-semibold text-white"
                  >
                    {t("cta")}
                  </Link>
                </div>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ── Sub-components ────────────────────────────── */

function NavTrigger({ label, active }: { label: string; active: boolean }) {
  return (
    <button
      className={`inline-flex items-center gap-1 rounded-card px-3 py-2 text-sm font-medium transition-colors ${
        active
          ? "text-brand"
          : "text-light-muted hover:text-light-text dark:text-dark-muted dark:hover:text-dark-text"
      }`}
    >
      {label}
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-150 ${active ? "rotate-180 text-brand" : ""}`}
        aria-hidden="true"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
  );
}

function MobileSection({
  label,
  expanded,
  onToggle,
  children,
}: {
  label: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-light-border dark:border-dark-border last:border-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-2 py-3 text-sm font-medium text-light-text dark:text-dark-text"
      >
        {label}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-150 ${expanded ? "rotate-180 text-brand" : "text-light-muted dark:text-dark-muted"}`}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="pb-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function AIIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
    </svg>
  );
}

function MarketingIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function ConsultingIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function DevIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function CasesIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function WhyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function HowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
