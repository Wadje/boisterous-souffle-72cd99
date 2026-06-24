"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { findProduct, periodByLabel, unitPriceOf } from "@/lib/catalog";

export type CartLine = { id: string; periodLabel: string; qty: number };

/**
 * Test ödeme akışı: sepeti anında "aktif" bir sipariş olarak kaydeder.
 * Fiyatlar istemciye güvenilmeden sunucuda yeniden hesaplanır.
 */
export async function checkout(lines: CartLine[]) {
  const user = await getCurrentUser();
  if (!user) return { ok: false as const, redirect: "/giris" };
  if (!lines?.length) return { ok: false as const, error: "Sepetin boş." };

  const items = lines.flatMap((l) => {
    const p = findProduct(l.id);
    if (!p) return [];
    const period = periodByLabel(l.periodLabel);
    const qty = Math.max(1, Math.min(99, Math.floor(l.qty) || 1));
    return [
      {
        productId: p.id,
        title: p.title,
        kind: p.kind,
        unitPrice: unitPriceOf(p, period),
        periodLabel: period.label,
        qty,
      },
    ];
  });

  if (!items.length) return { ok: false as const, error: "Geçerli ürün bulunamadı." };

  const total = items.reduce((s, i) => s + i.unitPrice * i.qty, 0);

  const order = await prisma.order.create({
    data: { userId: user.id, total, status: "aktif", items: { create: items } },
  });

  revalidatePath("/panel");
  revalidatePath("/panel/satin-alimlar");
  revalidatePath("/panel/botlar");
  return { ok: true as const, orderId: order.id };
}

/** Bir bot için belirli sunucudaki ayarları kaydeder (log kanalı + açık komutlar). */
export async function saveBotConfig(input: {
  productId: string;
  guildId: string;
  guildName?: string | null;
  logChannelId?: string | null;
  enabledCommands: string[];
}) {
  const user = await getCurrentUser();
  if (!user) return { ok: false as const, redirect: "/giris" };

  // Kullanıcı bu bota gerçekten sahip mi?
  const owns = await prisma.orderItem.findFirst({
    where: {
      kind: "bot",
      productId: input.productId,
      order: { userId: user.id, status: "aktif" },
    },
  });
  if (!owns) return { ok: false as const, error: "Bu bota sahip değilsin." };

  await prisma.botConfig.upsert({
    where: {
      userId_productId_guildId: {
        userId: user.id,
        productId: input.productId,
        guildId: input.guildId,
      },
    },
    create: {
      userId: user.id,
      productId: input.productId,
      guildId: input.guildId,
      guildName: input.guildName ?? null,
      logChannelId: input.logChannelId ?? null,
      enabledCommands: input.enabledCommands,
    },
    update: {
      guildName: input.guildName ?? null,
      logChannelId: input.logChannelId ?? null,
      enabledCommands: input.enabledCommands,
    },
  });

  revalidatePath(`/panel/botlar/${input.productId}`);
  return { ok: true as const };
}
