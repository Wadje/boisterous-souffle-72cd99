import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { botToken } from "@/lib/botApps";

/**
 * Gerçek botun, bir sunucudaki ayarlarını çektiği uç nokta.
 *
 *   GET /api/bot/config?productId=ticket&guildId=<id>
 *   Authorization: Bot <BOT_TOKEN_TICKET>
 *
 * Kimlik: gönderilen token, o ürünün yapılandırılmış botu ile eşleşmeli.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const productId = url.searchParams.get("productId");
  const guildId = url.searchParams.get("guildId");

  if (!productId || !guildId) {
    return NextResponse.json({ error: "productId ve guildId gerekli" }, { status: 400 });
  }

  const expected = botToken(productId);
  const provided = req.headers
    .get("authorization")
    ?.replace(/^Bot\s+/i, "")
    .replace(/^Bearer\s+/i, "")
    .trim();

  if (!expected || !provided || provided !== expected) {
    return NextResponse.json({ error: "yetkisiz" }, { status: 401 });
  }

  const config = await prisma.botConfig.findFirst({
    where: { productId, guildId },
    orderBy: { updatedAt: "desc" },
  });

  if (!config) {
    return NextResponse.json({ configured: false, productId, guildId });
  }

  return NextResponse.json({
    configured: true,
    productId,
    guildId,
    logChannelId: config.logChannelId,
    enabledCommands: (config.enabledCommands as string[] | null) ?? [],
    settings: config.settings ?? {},
    updatedAt: config.updatedAt,
  });
}
