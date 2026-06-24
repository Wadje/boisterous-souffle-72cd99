import "server-only";

/**
 * Her yönetilebilir bot ürünü, gerçek bir Discord uygulamasına (kendi
 * client_id + token) karşılık gelir. Eşleme env değişkenleriyle yapılır:
 *
 *   BOT_CLIENT_ID_<KEY>   örn. BOT_CLIENT_ID_TICKET
 *   BOT_TOKEN_<KEY>       örn. BOT_TOKEN_TICKET
 *   BOT_PERMS_<KEY>       (opsiyonel) davet izin bitleri, varsayılan 8 (Administrator)
 *
 * <KEY> = ürün id'sinin BÜYÜK halidir, tireler alt çizgi olur:
 *   ticket -> TICKET, sunucu-aktiflik -> SUNUCU_AKTIFLIK
 *
 * İlgili env yoksa ana uygulamaya (DISCORD_CLIENT_ID / DISCORD_BOT_TOKEN) düşer,
 * böylece botlar tek tek entegre edilebilir.
 */
function envKey(productId: string): string {
  return productId.toUpperCase().replace(/-/g, "_");
}

export function botClientId(productId: string): string | null {
  const k = envKey(productId);
  return process.env[`BOT_CLIENT_ID_${k}`] ?? process.env.DISCORD_CLIENT_ID ?? null;
}

export function botToken(productId: string): string | undefined {
  const k = envKey(productId);
  return process.env[`BOT_TOKEN_${k}`] ?? process.env.DISCORD_BOT_TOKEN ?? undefined;
}

/** Botun bu ürün için kendi env'i tanımlı mı (gerçek bota bağlı mı)? */
export function botIsConfigured(productId: string): boolean {
  const k = envKey(productId);
  return Boolean(process.env[`BOT_TOKEN_${k}`] && process.env[`BOT_CLIENT_ID_${k}`]);
}

/** Bu botu bir sunucuya eklemek için Discord davet (OAuth bot) linki. */
export function botInviteUrl(productId: string): string | null {
  const cid = botClientId(productId);
  if (!cid) return null;
  const perms = process.env[`BOT_PERMS_${envKey(productId)}`] ?? "8";
  return `https://discord.com/oauth2/authorize?client_id=${cid}&scope=bot+applications.commands&permissions=${perms}`;
}
