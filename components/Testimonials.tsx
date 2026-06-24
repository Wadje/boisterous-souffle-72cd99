"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";
import { avatarFor } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";

export function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const count = TESTIMONIALS.length;

  const go = useCallback(
    (next: number, direction: number) => {
      setState([(next + count) % count, direction]);
    },
    [count],
  );

  useEffect(() => {
    const t = setInterval(() => setState(([i]) => [(i + 1) % count, 1]), 6000);
    return () => clearInterval(t);
  }, [count]);

  const item = TESTIMONIALS[index];
  const { gradient, initials } = avatarFor(item.name);

  return (
    <section id="yorumlar" className="relative mx-auto max-w-4xl px-6 py-24 sm:py-28">
      <SectionHeading
        eyebrow="Müşteri Yorumları"
        title="Müşteri Yorumları"
        subtitle="Bizimle çalışan toplulukların deneyimleri."
      />

      <div className="relative flex items-center justify-center gap-3 sm:gap-5">
        <button
          onClick={() => go(index - 1, -1)}
          aria-label="Önceki"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-surface/60 text-paper transition-colors hover:border-violet hover:text-violet-bright"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="relative h-[280px] flex-1 sm:h-[240px]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col justify-between rounded-3xl border border-line bg-surface/60 p-8 backdrop-blur"
            >
              <Quote className="h-8 w-8 text-violet/50" />
              <blockquote className="text-balance text-lg leading-relaxed text-paper/90">
                {item.text}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <span
                  className="grid h-11 w-11 place-items-center rounded-full text-sm font-bold text-white"
                  style={{ background: gradient }}
                >
                  {initials}
                </span>
                <span>
                  <span className="block font-semibold text-paper">{item.name}</span>
                  <span className="block text-sm text-muted">@{item.handle}</span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <button
          onClick={() => go(index + 1, 1)}
          aria-label="Sonraki"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-surface/60 text-paper transition-colors hover:border-violet hover:text-violet-bright"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i, i > index ? 1 : -1)}
            aria-label={`${i + 1}. yorum`}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-7 bg-violet" : "w-2 bg-line-bright hover:bg-violet/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
