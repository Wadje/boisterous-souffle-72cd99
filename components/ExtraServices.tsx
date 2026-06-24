import { SERVICES } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";
import { ProductCard } from "./ProductCard";

const FLAT = { id: "flat", label: "Sabit", months: 1, discount: 0 };

export function ExtraServices() {
  return (
    <section id="ek-hizmetler" className="relative mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <SectionHeading
        eyebrow="Ek Hizmetler"
        title="Ek Hizmetler"
        subtitle="Sunucunu bir adım öne taşıyacak tamamlayıcı çözümler."
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <ProductCard key={s.id} product={s} period={FLAT} index={i} hidePeriod />
        ))}
      </div>
    </section>
  );
}
