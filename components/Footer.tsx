import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";
import { Logo } from "@/components/Logo";
import { Container } from "@/components/ui/Container";

export async function Footer() {
  const [t, tn] = await Promise.all([
    getTranslations("footer"),
    getTranslations("nav"),
  ]);
  const year = new Date().getFullYear();

  const services = [
    { href: "/servicios#ia" as const, label: t("iaLabel") },
    { href: "/servicios#desarrollo" as const, label: t("desarrolloLabel") },
    { href: "/servicios#consultoria" as const, label: t("consultoriaLabel") },
  ];

  const company = [
    { href: "/nosotros" as const, label: tn("nosotros") },
    { href: "/trabajo" as const, label: tn("trabajo") },
    { href: "/contacto" as const, label: tn("contacto") },
  ];

  return (
    <footer className="relative bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border overflow-hidden">
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
        <div className="relative grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Logo variant="full" size={32} />
            <p className="text-sm leading-relaxed text-light-muted dark:text-dark-muted max-w-[200px]">
              {t("tagline")}
            </p>
            <div className="flex items-center gap-3 mt-1">
              <SocialLink href="https://www.linkedin.com/company/jtsolutions-group/about/?viewAsMember=true" label={t("social.linkedin")} icon={<LinkedInIcon />} />
              <SocialLink href="https://twitter.com" label={t("social.twitter")} icon={<XIcon />} />
              <SocialLink href="https://github.com" label={t("social.github")} icon={<GitHubIcon />} />
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand">
              {t("servicesLabel")}
            </h3>
            <ul className="flex flex-col gap-3">
              {services.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-light-muted dark:text-dark-muted hover:text-brand transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand">
              {t("empresaLabel")}
            </h3>
            <ul className="flex flex-col gap-3">
              {company.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-light-muted dark:text-dark-muted hover:text-brand transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand">
              {t("contactoLabel")}
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a href={`mailto:${t("email")}`} className="text-sm text-light-muted dark:text-dark-muted hover:text-brand transition-colors">
                  {t("email")}
                </a>
              </li>
              <li className="text-sm text-light-muted dark:text-dark-muted">
                {t("location")}
              </li>
            </ul>
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-between gap-3 border-t border-light-border dark:border-dark-border py-6 sm:flex-row">
          <p className="text-xs text-light-muted dark:text-dark-muted">
            © {year} JTSolutions. {t("rights")}
          </p>
          <p className="text-xs text-light-muted dark:text-dark-muted">
            {t("madeIn")}
          </p>
        </div>
      </Container>
    </footer>
  );
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-card border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted hover:text-brand hover:border-brand transition-colors"
    >
      {icon}
    </a>
  );
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}
