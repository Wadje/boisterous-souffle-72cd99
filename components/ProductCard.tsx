"use client";

import { motion } from "framer-motion";
import { Check, MessageCircle, Plus } from "lucide-react";
import type { Period, Product } from "@/lib/data";
import { formatTRY } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const INVITE = process.env.NEXT_PUBLIC_DISCORD_INVITE ?? "https://discord.gg/nTttZPETm2";

export function ProductCard({
  product,
  period,
  index = 0,
  hidePeriod = false,
}: {
  product: Product;
  period: Period;
  index?: number;
  hidePeriod?: boolean;
}) {
  const { add } = useCart();
  const total = product.price * period.months * (1 - period.discount);
  const featured = product.featured;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border p-7 ${
        featured
          ? "border-violet/50 bg-surface-2/80 shadow-glow"
          : "border-line bg-surface/60"
      }`}
    >
      {/* hover parıltısı */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-violet/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      {product.tag && (
        <span
          className={`mb-4 w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
            featured
              ? "bg-violet text-white"
              : "border border-line-bright text-violet-bright"
          }`}
        >
          {product.tag}
        </span>
      )}

      <h3 className="font-display text-xl font-semibold text-paper">{product.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{product.description}</p>

      <div className="mt-6 flex items-end gap-1.5">
        {product.quote ? (
          <span className="font-display text-3xl font-bold text-paper">İsteğe Bağlı</span>
        ) : (
          <>
            <span className="font-display text-3xl font-bold text-paper">{formatTRY(total)}</span>
            {!hidePeriod && (
              <span className="mb-1 text-xs text-muted-2">/ {period.label.toLowerCase()}</span>
            )}
          </>
        )}
      </div>
      {product.quote ? (
        <span className="mt-1 text-xs text-muted-2">
          Fiyat, projenin kapsamına göre belirlenir.
        </span>
      ) : (
        !hidePeriod &&
        period.discount > 0 && (
          <span className="mt-1 text-xs text-muted-2 line-through">
            {formatTRY(product.price * period.months)}
          </span>
        )
      )}

      <ul className="mt-6 space-y-2.5">
        {product.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-paper/85">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-bright" strokeWidth={2.5} />
            {f}
          </li>
        ))}
      </ul>

      <button
        onClick={() =>
          add({
            id: product.id,
            title: product.title,
            unitPrice: total,
            periodLabel: period.label,
          })
        }
        className={`mt-7 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all active:scale-[0.98] ${
          featured
            ? "bg-gradient-to-r from-violet-deep to-violet text-white hover:shadow-[0_10px_30px_-10px_rgba(124,58,237,0.9)]"
            : "border border-line-bright bg-surface text-paper hover:border-violet hover:bg-surface-2"
        }`}
      >
        <Plus className="h-4 w-4" strokeWidth={2.5} />
        Sepete Ekle
      </button>
    </motion.article>
  );
}
