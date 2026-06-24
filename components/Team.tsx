"use client";

import { motion } from "framer-motion";
import { TEAM } from "@/lib/data";
import { avatarFor } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";

export function Team() {
  return (
    <section id="ekibimiz" className="relative mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <SectionHeading
        eyebrow="Ekibimiz"
        title="Ekibimiz"
        subtitle="Projelerinizi hayata geçiren deneyimli ve özverili kadro."
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {TEAM.map((m, i) => {
          const { gradient, initials } = avatarFor(m.name);
          return (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
              whileHover={{ y: -4 }}
              className="group flex flex-col items-center rounded-2xl border border-line bg-surface/50 p-6 text-center transition-colors hover:border-violet/50"
            >
              <span
                className="grid h-16 w-16 place-items-center rounded-full font-display text-lg font-bold text-white shadow-[0_10px_24px_-10px_rgba(124,58,237,0.8)] ring-2 ring-line transition-transform group-hover:scale-105"
                style={{ background: gradient }}
              >
                {initials}
              </span>
              <span className="mt-4 font-semibold text-paper">{m.name}</span>
              <span className="mt-1 text-xs uppercase tracking-wider text-violet-bright">
                {m.role}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
