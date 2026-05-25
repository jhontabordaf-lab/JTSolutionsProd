"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { Container } from "@/components/ui/Container";

/* ── Particles ────────────────────────────────────────────────── */
const PARTICLES = [
  { left: "8%",  delay: 0,    dur: 9  },
  { left: "18%", delay: 2.4,  dur: 13 },
  { left: "28%", delay: 1.1,  dur: 10 },
  { left: "37%", delay: 3.8,  dur: 11 },
  { left: "48%", delay: 0.6,  dur: 14 },
  { left: "56%", delay: 2.0,  dur: 8  },
  { left: "66%", delay: 4.2,  dur: 12 },
  { left: "74%", delay: 1.7,  dur: 10 },
  { left: "83%", delay: 3.1,  dur: 9  },
  { left: "91%", delay: 0.3,  dur: 13 },
  { left: "13%", delay: 5.0,  dur: 11 },
  { left: "43%", delay: 1.5,  dur: 15 },
];

/* ── Glitch bars ──────────────────────────────────────────────── */
const GLITCH_BARS = [
  { top: "11%", h: "2px", delay: 0.10, gap: 0.55 },
  { top: "24%", h: "4px", delay: 0.35, gap: 0.90 },
  { top: "38%", h: "2px", delay: 0.70, gap: 0.50 },
  { top: "52%", h: "6px", delay: 0.20, gap: 1.10 },
  { top: "66%", h: "2px", delay: 0.55, gap: 0.65 },
  { top: "78%", h: "3px", delay: 0.85, gap: 0.80 },
  { top: "88%", h: "2px", delay: 0.40, gap: 1.20 },
];

/* ── Scramble text hook ───────────────────────────────────────── */
const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#%&*";

function useGlitchText(text: string, active: boolean) {
  const [output, setOutput] = useState(() => text.replace(/\S/g, "█"));

  useEffect(() => {
    if (!active) return;
    const indices = text
      .split("")
      .reduce<number[]>((acc, c, i) => (c !== " " ? [...acc, i] : acc), []);
    let frame = 0;
    const FRAMES_PER_CHAR = 3;
    const total = indices.length * FRAMES_PER_CHAR;
    const id = setInterval(() => {
      frame++;
      const resolved = new Set(indices.slice(0, Math.floor(frame / FRAMES_PER_CHAR)));
      setOutput(
        text.split("").map((char, i) => {
          if (char === " ") return " ";
          if (resolved.has(i)) return char;
          return CHARSET[Math.floor(Math.random() * CHARSET.length)];
        }).join("")
      );
      if (frame >= total) { clearInterval(id); setOutput(text); }
    }, 40);
    return () => clearInterval(id);
  }, [active, text]);

  return output;
}

/* ── SVG animated noise ───────────────────────────────────────── */
function TVNoise() {
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  useEffect(() => {
    let raf: number;
    const tick = () => {
      turbRef.current?.setAttribute("seed", String(Math.floor(Math.random() * 999)));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="tv-noise" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence ref={turbRef} type="fractalNoise" baseFrequency="0.85" numOctaves="4" seed="0" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>
      <div className="absolute inset-0" style={{ filter: "url(#tv-noise)", opacity: 0.72 }} />
    </>
  );
}

// Resets on full page reload; persists across client-side navigations within the session
let heroHasPlayed = false;

/* ── Hero ─────────────────────────────────────────────────────── */
export function Hero() {
  const t = useTranslations("home");

  // 0 → 100 drives both clip-paths and the scan line position
  const progress   = useMotionValue(0);
  const glitchDone = useRef(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [sweepDone, setSweepDone]       = useState(false);

  // Static layer: visible at top, clipped away as line descends
  const staticClip = useTransform(progress, (p) => `inset(${p}% 0 0 0)`);
  // Hero layer: hidden at bottom, revealed as line descends
  const heroClip   = useTransform(progress, (p) => `inset(0 0 ${100 - p}% 0)`);
  // Scan line position
  const lineTop    = useTransform(progress, (p) => `${p}%`);
  // Fade line in/out at extremes
  const lineOpacity = useTransform(progress, [0, 4, 96, 100], [0, 1, 1, 0]);

  const startSweep = () =>
    animate(progress, 100, {
      duration: 3.8,
      ease: "linear",
      onUpdate: (v) => {
        // Start glitch when line reaches ~35% (approaching headline center)
        if (v > 35 && !glitchDone.current) {
          glitchDone.current = true;
          setGlitchActive(true);
        }
      },
      onComplete: () => setSweepDone(true),
    });

  useEffect(() => {
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const isBackNav = nav?.type === "back_forward";

    if (isBackNav || heroHasPlayed) {
      glitchDone.current = true;
      setGlitchActive(true);
      progress.set(100);
      setSweepDone(true);
      return;
    }

    heroHasPlayed = true;
    let fired = false;

    const id = setTimeout(() => {
      fired = true;
      startSweep();
    }, 3500);

    return () => {
      clearTimeout(id);
      // React Strict Mode runs cleanup before animation fires — reset flag so real mount plays
      if (!fired) heroHasPlayed = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const skip = () => {
    if (!glitchDone.current) { glitchDone.current = true; setGlitchActive(true); }
    animate(progress, 100, { duration: 0.35, ease: "easeOut", onComplete: () => setSweepDone(true) });
  };

  const line1 = useGlitchText(t("headline1"), glitchActive);
  const line2 = useGlitchText(t("headline2"), glitchActive);

  const metrics = [
    { value: "12+",  label: t("m1label") },
    { value: "4",    label: t("m2label") },
    { value: "100%", label: t("m3label") },
  ];

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-black">

      {/* ── STATIC LAYER — clips away from top as line descends ── */}
      <motion.div
        className="absolute inset-0 z-20 bg-black overflow-hidden"
        style={{ clipPath: staticClip }}
      >
        <TVNoise />

        {/* Scanlines */}
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
          background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.4) 2px,rgba(0,0,0,0.4) 4px)",
        }} />

        {/* Rolling CRT band */}
        <motion.div aria-hidden
          className="absolute left-0 right-0 h-24 pointer-events-none"
          style={{ background: "linear-gradient(to bottom,transparent,rgba(255,255,255,0.06),transparent)" }}
          animate={{ top: ["-15%", "115%"] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
        />

        {/* RGB aberration */}
        <motion.div aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg,rgba(255,0,60,0.04),rgba(0,255,120,0.04),rgba(0,80,255,0.04))",
            backgroundSize: "6px 100%",
          }}
          animate={{ x: [-4, 4, -2, 3, -4] }}
          transition={{ duration: 0.18, repeat: Infinity, ease: "linear" }}
        />

        {/* Glitch bars */}
        {GLITCH_BARS.map((bar, i) => (
          <motion.div key={i} aria-hidden
            className="absolute left-0 pointer-events-none bg-white/75"
            style={{ top: bar.top, height: bar.h }}
            animate={{ opacity: [0, 1, 0], width: ["20%", "100%", "60%", "0%"] }}
            transition={{ duration: 0.09, repeat: Infinity, delay: bar.delay, repeatDelay: bar.gap }}
          />
        ))}

        {/* NO SIGNAL — centered, large */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          animate={{ opacity: [0.55, 1, 0.35, 0.85, 0.55] }}
          transition={{ duration: 0.85, repeat: Infinity, ease: "linear" }}
        >
          <p className="font-mono font-bold text-4xl sm:text-6xl lg:text-7xl tracking-[0.28em] uppercase text-white/85 select-none">
            NO SIGNAL
          </p>
          <motion.div
            className="mt-3 h-[3px] bg-white/50 rounded-full"
            animate={{ width: ["0%", "75%", "35%", "60%", "0%"] }}
            transition={{ duration: 0.65, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </motion.div>

      {/* ── HERO LAYER — everything revealed from top as line descends ── */}
      <motion.div
        className="absolute inset-0 z-10 flex items-center bg-light-bg dark:bg-dark-bg overflow-hidden"
        style={{ clipPath: heroClip }}
      >
        {/* Blobs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -left-40 h-[700px] w-[700px] rounded-full"
            style={{ background: "radial-gradient(circle,rgba(37,99,255,0.28) 0%,transparent 68%)" }}
            animate={{ x: [0,90,-30,0], y: [0,-70,50,0], scale: [1,1.18,0.88,1] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-48 -right-16 h-[800px] w-[800px] rounded-full"
            style={{ background: "radial-gradient(circle,rgba(124,58,237,0.22) 0%,transparent 68%)" }}
            animate={{ x: [0,-70,45,0], y: [0,55,-80,0], scale: [1,0.88,1.16,1] }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />
        </div>

        {/* Grid */}
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(37,99,255,0.055) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,255,0.055) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }} />

        {/* Particles */}
        {PARTICLES.map((p, i) => (
          <motion.span key={i} aria-hidden
            className="pointer-events-none absolute bottom-0 h-[3px] w-[3px] rounded-full bg-brand/50"
            style={{ left: p.left }}
            animate={{ y: [0,-700], opacity: [0,0.9,0.9,0] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "linear", times: [0,0.1,0.9,1] }}
          />
        ))}

        {/* Text content */}
        <Container className="relative z-10 w-full">
          <div className="mx-auto max-w-5xl pt-36 pb-32 text-center">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={glitchActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2.5 rounded-full border border-brand/30 bg-brand/10 px-5 py-2 text-xs font-semibold text-brand tracking-widest uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
                </span>
                {t("badge")}
              </span>
            </motion.div>

            {/* Glitch headline */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={glitchActive ? { opacity: 1 } : {}}
              transition={{ duration: 0.25 }}
              className="mt-8 font-display font-extrabold text-5xl sm:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] text-light-text dark:text-dark-text tracking-tight leading-[1.02]"
            >
              <span className="font-mono">{line1}</span>
              <br />
              <span className="font-mono text-gradient-brand">{line2}</span>
            </motion.h1>

            {/* Subheadline — appears after sweep finishes */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={sweepDone ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-8 text-lg sm:text-xl text-light-muted dark:text-dark-muted leading-relaxed max-w-2xl mx-auto"
            >
              {t("subheadline")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={sweepDone ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/contacto"
                className="inline-flex items-center gap-2 rounded-card bg-brand px-8 py-4 font-semibold text-white text-sm hover:bg-brand/90 transition-all duration-200 glow-brand-sm">
                {t("ctaPrimary")} <ArrowRight />
              </Link>
              <Link href="/trabajo"
                className="inline-flex items-center gap-2 rounded-card border border-light-border dark:border-dark-border-2 bg-light-card/60 dark:bg-dark-card/60 backdrop-blur-sm px-8 py-4 font-medium text-light-text dark:text-dark-text text-sm hover:border-brand/50 transition-all duration-200">
                {t("ctaSecondary")}
              </Link>
            </motion.div>

            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={sweepDone ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-24 grid grid-cols-3 gap-4 max-w-xl mx-auto"
            >
              {metrics.map(({ value, label }, i) => (
                <motion.div key={label}
                  whileHover={{ y: -4, borderColor: "rgba(37,99,255,0.4)" }}
                  transition={{ duration: 0.2 }}
                  className={`flex flex-col items-center gap-1.5 py-5 rounded-card-lg border border-light-border dark:border-dark-border bg-light-card/70 dark:bg-dark-card/60 backdrop-blur-sm cursor-default ${i === 1 ? "dark:border-brand/20" : ""}`}
                >
                  <p className="font-display font-extrabold text-3xl sm:text-4xl text-light-text dark:text-dark-text">{value}</p>
                  <p className="text-xs text-light-muted dark:text-dark-muted tracking-wide text-center leading-tight px-2">{label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Container>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5"
          initial={{ opacity: 0 }}
          animate={sweepDone ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1.5">
            <div className="h-10 w-px bg-gradient-to-b from-transparent to-brand/70" />
            <div className="h-2 w-2 rounded-full bg-brand/70" />
          </motion.div>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 z-[3] h-36 bg-gradient-to-t from-light-bg dark:from-dark-bg to-transparent" />
      </motion.div>

      {/* ── SCAN LINE — the glowing boundary ──────────────────── */}
      <motion.div
        aria-hidden
        className="absolute left-0 right-0 z-30 pointer-events-none"
        style={{ top: lineTop, opacity: lineOpacity }}
      >
        {/* Main bright line */}
        <div style={{
          height: "3px",
          background: "linear-gradient(90deg,transparent 0%,rgba(37,99,255,0.5) 10%,#ffffff 50%,rgba(37,99,255,0.5) 90%,transparent 100%)",
          boxShadow: "0 0 8px rgba(255,255,255,0.95), 0 0 22px rgba(37,99,255,0.7), 0 0 55px rgba(37,99,255,0.35)",
        }} />
        {/* After-glow trail below line */}
        <div style={{
          height: "70px",
          background: "linear-gradient(to bottom,rgba(37,99,255,0.09),transparent)",
        }} />
      </motion.div>

      {/* ── SKIP button ───────────────────────────────────────── */}
      {!sweepDone && (
        <button
          onClick={skip}
          className="absolute bottom-8 right-8 z-40 font-mono text-[11px] tracking-widest uppercase text-white/35 hover:text-white/75 transition-colors"
        >
          skip →
        </button>
      )}
    </section>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
