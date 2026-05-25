import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { locales, type Locale } from "@/i18n";
import { notFound } from "next/navigation";

const syne = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal"],
  variable: "--font-dm-sans",
  display: "swap",
});

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isEs = locale === "es";
  return {
    title: {
      default: isEs
        ? "JTSolutions — Tecnología, IA y Consultoría"
        : "JTSolutions — Technology, AI & Consulting",
      template: "%s | JTSolutions",
    },
    description: isEs
      ? "Agencia premium de tecnología, inteligencia artificial y consultoría estratégica para empresas que exigen resultados reales."
      : "Premium technology agency, AI and strategic consulting for companies that demand real results.",
    openGraph: {
      type: "website",
      locale: isEs ? "es_ES" : "en_US",
      siteName: "JTSolutions",
    },
    twitter: { card: "summary_large_image" },
    alternates: {
      canonical: isEs ? "https://www.jtsolutions.digital" : "https://www.jtsolutions.digital/en",
      languages: {
        es: "https://www.jtsolutions.digital",
        en: "https://www.jtsolutions.digital/en",
      },
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as Locale)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${dmSans.variable} font-body antialiased bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.replace('dark','light')}else{document.documentElement.classList.add('dark')}}catch(e){}`,
          }}
        />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider>
            <Navbar />
            {children}
            <Footer />
            <WhatsAppButton />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
