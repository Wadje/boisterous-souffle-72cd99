"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { keyOf, useCart } from "@/context/CartContext";
import { formatTRY } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, close, total, increment, decrement, remove, clear } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-line bg-ink-2"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h3 className="flex items-center gap-2.5 font-display text-lg font-bold text-paper">
                <ShoppingBag className="h-5 w-5 text-violet-bright" />
                Sepetim
              </h3>
              <button
                onClick={close}
                aria-label="Kapat"
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-violet hover:text-paper"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <ShoppingBag className="h-12 w-12 text-muted-2" />
                <p className="text-muted">Sepetin henüz boş.</p>
              </div>
            ) : (
              <div className="flex-1 space-y-3 overflow-y-auto px-6 py-5">
                {items.map((item) => {
                  const k = keyOf(item);
                  return (
                    <div
                      key={k}
                      className="flex items-start justify-between gap-3 rounded-2xl border border-line bg-surface/60 p-4"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-paper">{item.title}</p>
                        <p className="text-xs text-muted">{item.periodLabel}</p>
                        <div className="mt-3 flex items-center gap-2">
                          <button
                            onClick={() => decrement(k)}
                            aria-label="Azalt"
                            className="grid h-7 w-7 place-items-center rounded-lg border border-line text-paper transition-colors hover:border-violet"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold text-paper">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => increment(k)}
                            aria-label="Artır"
                            className="grid h-7 w-7 place-items-center rounded-lg border border-line text-paper transition-colors hover:border-violet"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <span className="whitespace-nowrap font-display font-bold text-paper">
                          {formatTRY(item.unitPrice * item.qty)}
                        </span>
                        <button
                          onClick={() => remove(k)}
                          aria-label="Kaldır"
                          className="text-muted-2 transition-colors hover:text-magenta"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
                <button
                  onClick={clear}
                  className="mt-2 text-sm text-muted-2 transition-colors hover:text-magenta"
                >
                  Sepeti temizle
                </button>
              </div>
            )}

            {items.length > 0 && (
              <div className="border-t border-line px-6 py-5">
                <div className="flex items-center justify-between">
                  <span className="text-muted">Toplam</span>
                  <span className="font-display text-2xl font-bold text-paper">
                    {formatTRY(total)}
                  </span>
                </div>
                <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-violet-deep to-violet py-3.5 text-sm font-semibold text-white transition-shadow hover:shadow-[0_12px_36px_-10px_rgba(124,58,237,0.9)]">
                  Ödemeye Geç
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
