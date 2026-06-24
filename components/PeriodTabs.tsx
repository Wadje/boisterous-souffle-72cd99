"use client";

import { motion } from "framer-motion";
import { PERIODS, type Period } from "@/lib/data";

export function PeriodTabs({
  value,
  onChange,
  layoutId,
}: {
  value: Period;
  onChange: (p: Period) => void;
  layoutId: string;
}) {
  return (
    <div className="mx-auto mb-12 flex w-fit gap-1 rounded-full border border-line bg-surface/70 p-1.5 backdrop-blur">
      {PERIODS.map((p) => {
        const active = p.id === value.id;
        return (
          <button
            key={p.id}
            onClick={() => onChange(p)}
            className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:px-5 ${
              active ? "text-white" : "text-muted hover:text-paper"
            }`}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-deep to-violet shadow-[0_8px_24px_-8px_rgba(124,58,237,0.8)]"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10 whitespace-nowrap">{p.label}</span>
            {p.discount > 0 && (
              <span
                className={`relative z-10 ml-1.5 hidden text-[10px] font-bold sm:inline ${
                  active ? "text-violet-bright" : "text-magenta"
                }`}
              >
                -%{Math.round(p.discount * 100)}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
