import type { Metadata } from "next";
import { ServicesPageHero } from "@/components/sections/services/ServicesPageHero";
import { ServiceBlock } from "@/components/sections/services/ServiceBlock";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { getServices } from "@/lib/data/services";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: locale === "es" ? "Servicios" : "Services",
    description:
      locale === "es"
        ? "IA aplicada, desarrollo de software de misión crítica y consultoría estratégica para empresas que exigen resultados reales."
        : "Applied AI, mission-critical software development and strategic consulting for companies that demand real results.",
  };
}

export default function ServiciosPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const services = getServices(locale);

  return (
    <main>
      <ServicesPageHero />
      {services.map((service) => (
        <ServiceBlock key={service.id} service={service} />
      ))}
      <ContactCTA />
    </main>
  );
}
