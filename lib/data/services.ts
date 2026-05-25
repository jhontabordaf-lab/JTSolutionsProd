export type ServiceId = "ia" | "desarrollo" | "consultoria" | "marketing";

export interface Service {
  id: ServiceId;
  number: string;
  category: string;
  headline: string;
  description: string;
  capabilities: string[];
  process: { step: string; description: string }[];
  technologies: string[];
}

const servicesEs: Service[] = [
  {
    id: "ia",
    number: "01",
    category: "IA Aplicada",
    headline: "Inteligencia que opera en producción.",
    description:
      "La IA tiene valor cuando opera. Integramos, entrenamos y desplegamos sistemas de inteligencia artificial adaptados a tus procesos — no prototipos que se quedan en presentaciones. Cada sistema que construimos está diseñado para mantenerse, mejorar con el uso y entregar valor medible desde el primer día.",
    capabilities: [
      "Integración y fine-tuning de LLMs",
      "Sistemas RAG y bases de conocimiento",
      "Automatización de flujos con IA",
      "Data pipelines y feature engineering",
      "MLOps y monitoreo en producción",
      "Visión por computadora y NLP",
      "Evaluación y auditoría de modelos",
      "Estrategia de IA para el negocio",
    ],
    process: [
      { step: "Evaluar", description: "Auditamos el problema, los datos disponibles y el ROI esperado antes de escribir una línea." },
      { step: "Diseñar", description: "Elegimos la arquitectura correcta — no la más cara ni la más novedosa." },
      { step: "Construir", description: "Desarrollamos en sprints cortos con demos frecuentes. Sin sorpresas al final." },
      { step: "Desplegar", description: "Ponemos el sistema en producción con monitoreo, fallbacks y documentación real." },
    ],
    technologies: ["OpenAI", "Anthropic", "LangChain", "HuggingFace", "FastAPI", "Python", "PostgreSQL + pgvector", "AWS / GCP"],
  },
  {
    id: "marketing",
    number: "02",
    category: "Marketing Digital",
    headline: "Crecimiento que se acumula con el tiempo.",
    description:
      "Construimos sistemas de marketing digital que generan crecimiento medible. Desde arquitectura SEO hasta campañas de pago y contenido basado en datos — nos enfocamos en canales que escalan y métricas que importan, no en números de vanidad.",
    capabilities: [
      "Estrategia SEO y optimización técnica",
      "Medios pagados (Google, Meta, LinkedIn)",
      "Estrategia y producción de contenido",
      "Automatización de marketing y CRM",
      "Optimización de tasa de conversión (CRO)",
      "Analytics y modelado de atribución",
      "Posicionamiento de marca y messaging",
      "Redes sociales y crecimiento de comunidad",
    ],
    process: [
      { step: "Auditoría", description: "Mapeamos tu presencia digital actual e identificamos las oportunidades de mayor impacto." },
      { step: "Estrategia", description: "Definimos canales, KPIs y un roadmap de 90 días alineado a tus objetivos de negocio." },
      { step: "Ejecución", description: "Campañas, contenido y optimizaciones entregados semanalmente con reportes transparentes." },
      { step: "Optimizar", description: "A/B testing continuo y reasignación de presupuesto basada en datos de rendimiento real." },
    ],
    technologies: ["Google Ads", "Meta Ads", "HubSpot", "Semrush", "GA4", "Looker Studio", "Klaviyo", "Webflow"],
  },
  {
    id: "consultoria",
    number: "03",
    category: "Consultoría",
    headline: "Claridad técnica cuando más importa.",
    description:
      "La mala estrategia tecnológica se paga dos veces: cuando se decide y cuando hay que deshacerla. Analizamos tu stack, tu equipo y tu negocio para darte recomendaciones concretas — sin jerga, sin conflicto de interés, con criterio real.",
    capabilities: [
      "Auditoría tecnológica integral",
      "Revisión de arquitectura y deuda técnica",
      "Due diligence técnica (M&A, inversión)",
      "Evaluación de equipos y procesos",
      "Planificación de roadmap técnico",
      "CTO as a Service (fraccional)",
      "Selección de stack y proveedores",
      "Formación ejecutiva en tecnología",
    ],
    process: [
      { step: "Diagnóstico", description: "Entrevistas, revisión de código y análisis de procesos en dos semanas." },
      { step: "Análisis", description: "Identificamos riesgos, oportunidades y quick wins con impacto medible." },
      { step: "Recomendaciones", description: "Entregamos un informe ejecutivo y técnico accionable, con prioridades claras." },
      { step: "Seguimiento", description: "Sesiones de revisión para asegurar que las decisiones se ejecutan bien." },
    ],
    technologies: ["Diagnóstico agnóstico de stack", "Metodologías ágiles", "Frameworks de arquitectura", "SLAs y métricas de ingeniería"],
  },
  {
    id: "desarrollo",
    number: "04",
    category: "Desarrollo",
    headline: "Software que aguanta el mundo real.",
    description:
      "Construimos software de misión crítica que funciona bajo presión real: tráfico, equipos, plazos. Desde la arquitectura hasta el CI/CD, cada decisión técnica se toma pensando en mantenibilidad y escalabilidad a largo plazo — porque reescribir sale caro.",
    capabilities: [
      "Plataformas web y aplicaciones SaaS",
      "APIs REST y GraphQL",
      "Infraestructura cloud y serverless",
      "Aplicaciones móviles (iOS / Android)",
      "DevOps y pipelines CI/CD",
      "Arquitectura de sistemas distribuidos",
      "Optimización de rendimiento y escala",
      "Integraciones con sistemas legados",
    ],
    process: [
      { step: "Scoping", description: "Definimos alcance, riesgos técnicos y métricas de éxito antes de empezar." },
      { step: "Arquitectura", description: "Diseñamos el sistema completo: stack, datos, servicios, seguridad." },
      { step: "Desarrollo", description: "Ciclos de dos semanas, código revisado, tests desde el inicio." },
      { step: "Entrega", description: "Deploy automatizado, documentación técnica y transferencia de conocimiento al equipo." },
    ],
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS / GCP / Azure"],
  },
];

const servicesEn: Service[] = [
  {
    id: "ia",
    number: "01",
    category: "Applied AI",
    headline: "Intelligence that operates in production.",
    description:
      "AI has value when it operates. We integrate, train and deploy artificial intelligence systems tailored to your processes — not prototypes that stay in presentations. Every system we build is designed to be maintained, improve with use, and deliver measurable value from day one.",
    capabilities: [
      "LLM integration and fine-tuning",
      "RAG systems and knowledge bases",
      "AI-powered workflow automation",
      "Data pipelines and feature engineering",
      "MLOps and production monitoring",
      "Computer vision and NLP",
      "Model evaluation and auditing",
      "AI strategy for business",
    ],
    process: [
      { step: "Assess", description: "We audit the problem, available data and expected ROI before writing a single line." },
      { step: "Design", description: "We choose the right architecture — not the most expensive or the most fashionable." },
      { step: "Build", description: "We develop in short sprints with frequent demos. No surprises at the end." },
      { step: "Deploy", description: "We put the system into production with monitoring, fallbacks and real documentation." },
    ],
    technologies: ["OpenAI", "Anthropic", "LangChain", "HuggingFace", "FastAPI", "Python", "PostgreSQL + pgvector", "AWS / GCP"],
  },
  {
    id: "marketing",
    number: "02",
    category: "Digital Marketing",
    headline: "Growth that compounds over time.",
    description:
      "We build digital marketing systems that generate measurable growth. From SEO architecture to paid campaigns and data-driven content — we focus on channels that scale and metrics that matter, not vanity numbers.",
    capabilities: [
      "SEO strategy and technical optimization",
      "Paid media (Google, Meta, LinkedIn)",
      "Content strategy and production",
      "Marketing automation and CRM",
      "Conversion rate optimization (CRO)",
      "Analytics and attribution modeling",
      "Brand positioning and messaging",
      "Social media and community growth",
    ],
    process: [
      { step: "Audit", description: "We map your current digital presence and identify the highest-leverage opportunities." },
      { step: "Strategy", description: "We define channels, KPIs and a 90-day roadmap aligned to your business goals." },
      { step: "Execute", description: "Campaigns, content and optimizations shipped weekly with transparent reporting." },
      { step: "Optimize", description: "Continuous A/B testing and budget reallocation based on real performance data." },
    ],
    technologies: ["Google Ads", "Meta Ads", "HubSpot", "Semrush", "GA4", "Looker Studio", "Klaviyo", "Webflow"],
  },
  {
    id: "consultoria",
    number: "03",
    category: "Consulting",
    headline: "Technical clarity when it matters most.",
    description:
      "Bad technology strategy gets paid for twice: when the decision is made and when it has to be undone. We analyze your stack, your team and your business to give you concrete recommendations — no jargon, no conflict of interest, real judgment.",
    capabilities: [
      "Comprehensive technology audit",
      "Architecture and technical debt review",
      "Technical due diligence (M&A, investment)",
      "Team and process evaluation",
      "Technical roadmap planning",
      "Fractional CTO as a Service",
      "Stack and vendor selection",
      "Executive technology training",
    ],
    process: [
      { step: "Diagnosis", description: "Interviews, code review and process analysis in two weeks." },
      { step: "Analysis", description: "We identify risks, opportunities and quick wins with measurable impact." },
      { step: "Recommendations", description: "We deliver an actionable executive and technical report with clear priorities." },
      { step: "Follow-up", description: "Review sessions to ensure decisions are executed well." },
    ],
    technologies: ["Stack-agnostic diagnosis", "Agile methodologies", "Architecture frameworks", "SLAs and engineering metrics"],
  },
  {
    id: "desarrollo",
    number: "04",
    category: "Development",
    headline: "Software that handles the real world.",
    description:
      "We build mission-critical software that works under real pressure: traffic, teams, deadlines. From architecture to CI/CD, every technical decision is made with long-term maintainability and scalability in mind — because rewrites are expensive.",
    capabilities: [
      "Web platforms and SaaS applications",
      "REST and GraphQL APIs",
      "Cloud and serverless infrastructure",
      "Mobile apps (iOS / Android)",
      "DevOps and CI/CD pipelines",
      "Distributed systems architecture",
      "Performance and scale optimization",
      "Legacy system integrations",
    ],
    process: [
      { step: "Scoping", description: "We define scope, technical risks and success metrics before starting." },
      { step: "Architecture", description: "We design the full system: stack, data, services, security." },
      { step: "Development", description: "Two-week cycles, reviewed code, tests from the start." },
      { step: "Delivery", description: "Automated deploy, technical documentation and knowledge transfer to your team." },
    ],
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS / GCP / Azure"],
  },
];

export function getServices(locale: string): Service[] {
  return locale === "en" ? servicesEn : servicesEs;
}

export const services = servicesEs;
