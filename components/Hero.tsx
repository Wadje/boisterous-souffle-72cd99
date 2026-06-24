"use client";

import { motion } from "framer-motion";
import { ArrowDown, Bot } from "lucide-react";
import { STATS } from "@/lib/data";
import { CountUp } from "./CountUp";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-28 text-center"
    >
      <motion.span
        {...fade(0)}
        className="inline-flex items-center gap-2 rounded-full border border-line-bright/70 bg-surface/60 px-4 py-2 text-xs font-semibold text-violet-bright backdrop-blur"
      >
        <Bot className="h-4 w-4" />
        Profesyonel Sistemler
      </motion.span>

      <motion.h1
        {...fade(0.1)}
        className="mt-7 font-display text-6xl font-bold leading-[0.95] tracking-tight sm:text-8xl"
      >
        <span className="bg-gradient-to-br from-white via-violet-bright to-violet bg-clip-text text-transparent">
          DevLoop
        </span>
      </motion.h1>

      <motion.p {...fade(0.2)} className="mt-6 max-w-xl text-balance text-lg text-muted">
        Hızlı, güvenilir ve profesyonel sistemlerin tek adresi.
      </motion.p>

      <motion.div {...fade(0.3)} className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <a
          href="#paketler"
          className="rounded-xl bg-gradient-to-r from-violet-deep to-violet px-6 py-3 text-sm font-semibold text-white transition-shadow hover:shadow-[0_12px_36px_-10px_rgba(124,58,237,0.9)]"
        >
          Paketleri İncele
        </a>
        <a
          href="#botlar"
          className="rounded-xl border border-line-bright bg-surface/60 px-6 py-3 text-sm font-semibold text-paper backdrop-blur transition-colors hover:border-violet"
        >
          Botları Gör
        </a>
      </motion.div>

      <motion.div
        {...fade(0.45)}
        className="mt-20 grid w-full max-w-3xl grid-cols-3 gap-4 rounded-3xl border border-line bg-surface/40 p-8 backdrop-blur"
      >
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col items-center">
            <span className="font-display text-3xl font-bold text-paper sm:text-4xl">
              <CountUp to={s.value} />
            </span>
            <span className="mt-1.5 text-xs uppercase tracking-wider text-muted sm:text-sm">
              {s.label}
            </span>
          </div>
        ))}
      </motion.div>

      <motion.a
        href="#paketler"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 flex flex-col items-center gap-2 text-xs text-muted-2"
      >
        Kaydır
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
