"use client";

import { useState } from "react";
import { useLocale } from "next-intl";

const PHONE = "573246836131";

const MESSAGES = {
  es: "Hola JTSolutions, me interesa conocer más sobre sus servicios. ¿Podemos hablar?",
  en: "Hi JTSolutions, I'd like to learn more about your services. Can we talk?",
};

export function WhatsAppButton() {
  const locale = useLocale();
  const [hovered, setHovered] = useState(false);

  const msg = encodeURIComponent(MESSAGES[locale as keyof typeof MESSAGES] ?? MESSAGES.es);
  const href = `https://wa.me/${PHONE}?text=${msg}`;
  const label = locale === "en" ? "Chat on WhatsApp" : "Escríbenos por WhatsApp";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
    >
      {/* Tooltip */}
      <span
        className={`
          hidden sm:flex items-center whitespace-nowrap
          bg-[#1a1a1a] text-white text-xs font-medium
          px-3 py-1.5 rounded-full shadow-lg
          transition-all duration-200
          ${hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"}
        `}
      >
        {label}
      </span>

      {/* Button */}
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
        {/* WhatsApp icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="relative h-7 w-7 fill-white"
          aria-hidden
        >
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.522.666 4.89 1.83 6.938L2 30l7.287-1.808A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.56 11.56 0 0 1-5.892-1.608l-.422-.25-4.328 1.074 1.096-4.212-.276-.434A11.553 11.553 0 0 1 4.4 16C4.4 9.594 9.594 4.4 16 4.4S27.6 9.594 27.6 16 22.406 27.6 16 27.6zm6.33-8.67c-.346-.174-2.05-1.012-2.368-1.128-.317-.116-.548-.174-.778.174-.23.347-.894 1.128-1.096 1.36-.202.23-.404.26-.75.086-.347-.174-1.463-.54-2.787-1.72-1.03-.918-1.724-2.052-1.926-2.4-.202-.347-.022-.534.152-.707.156-.155.347-.405.52-.607.174-.202.23-.347.347-.578.116-.23.058-.434-.029-.607-.087-.174-.778-1.878-1.067-2.572-.281-.674-.566-.582-.778-.593l-.664-.012c-.23 0-.607.086-.925.433-.317.347-1.21 1.184-1.21 2.888s1.24 3.35 1.412 3.58c.174.23 2.44 3.724 5.914 5.222.827.357 1.472.57 1.975.73.83.264 1.585.226 2.182.137.666-.1 2.05-.838 2.34-1.648.29-.81.29-1.504.203-1.648-.087-.145-.317-.23-.664-.405z" />
        </svg>
      </span>
    </a>
  );
}
