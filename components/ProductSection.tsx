"use client";

import { useState } from "react";
import { PERIODS, type Period, type Product } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";
import { PeriodTabs } from "./PeriodTabs";
import { ProductCard } from "./ProductCard";

export function ProductSection({
  id,
  eyebrow,
  title,
  subtitle,
  products,
  periods = PERIODS,
  cols = "lg:grid-cols-3",
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  products: Product[];
  periods?: Period[];
  cols?: string;
}) {
  const [period, setPeriod] = useState<Period>(periods[0]);

  return (
    <section id={id} className="relative mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <PeriodTabs value={period} onChange={setPeriod} layoutId={`tab-${id}`} />
      <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${cols}`}>
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} period={period} index={i} />
        ))}
      </div>
    </section>
  );
}
