import {
  PACKAGES,
  BOTS,
  WEBSITES,
  SERVICES,
  PERIODS,
  type Product,
  type Period,
} from "./data";

export type ProductKind = "paket" | "bot" | "website" | "hizmet";

/** Tüm ürünler tek listede, kind etiketiyle (sipariş/satın alma için). */
export const CATALOG: (Product & { kind: ProductKind })[] = [
  ...PACKAGES.map((p) => ({ ...p, kind: "paket" as const })),
  ...BOTS.map((p) => ({ ...p, kind: "bot" as const })),
  ...WEBSITES.map((p) => ({ ...p, kind: "website" as const })),
  ...SERVICES.map((p) => ({ ...p, kind: "hizmet" as const })),
];

export function findProduct(id: string) {
  return CATALOG.find((p) => p.id === id) ?? null;
}

export function periodByLabel(label: string): Period {
  return PERIODS.find((p) => p.label === label) ?? PERIODS[0];
}

/** Bir sepet satırının (ürün + dönem + adet) güncel fiyatını sunucuda yeniden hesaplar. */
export function unitPriceOf(product: Product, period: Period): number {
  if (product.quote) return 0;
  return product.price * period.months * (1 - period.discount);
}
