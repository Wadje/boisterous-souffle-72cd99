import "server-only";

const API = "https://discord.com/api/v10";

export const GUILD_ID = process.env.DISCORD_GUILD_ID ?? "";
export const INVITE_URL =
  process.env.NEXT_PUBLIC_DISCORD_INVITE ?? "https://discord.gg/nTttZPETm2";

export function isDiscordConfigured() {
  return Boolean(
    process.env.DISCORD_CLIENT_ID &&
      process.env.DISCORD_CLIENT_SECRET &&
      process.env.DISCORD_REDIRECT_URI,
  );
}

export function buildAuthorizeUrl(state: string) {
  // Sadece kimlik bilgisi: Discord hesabını çekip giriş yapar. Sunucu/üyelik yok.
  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID!,
    redirect_uri: process.env.DISCORD_REDIRECT_URI!,
    response_type: "code",
    // guilds: kullanıcının sunucularını (yönetici olduğu) listelemek için.
    scope: "identify email guilds",
    state,
    prompt: "consent",
  });
  return `${API}/oauth2/authorize?${params.toString()}`;
}

export async function exchangeCode(code: string) {
  const body = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID!,
    client_secret: process.env.DISCORD_CLIENT_SECRET!,
    grant_type: "authorization_code",
    code,
    redirect_uri: process.env.DISCORD_REDIRECT_URI!,
  });

  const res = await fetch(`${API}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Token alınamadı: ${res.status}`);
  return (await res.json()) as { access_token: string; token_type: string };
}

export type DiscordUser = {
  id: string;
  username: string;
  global_name: string | null;
  avatar: string | null;
  email?: string | null;
};

export async function fetchDiscordUser(accessToken: string): Promise<DiscordUser> {
  const res = await fetch(`${API}/users/@me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Kullanıcı alınamadı: ${res.status}`);
  return res.json();
}

export function avatarUrl(discordId: string, avatar: string | null) {
  if (!avatar) {
    const idx = (BigInt(discordId) >> BigInt(22)) % BigInt(6);
    return `https://cdn.discordapp.com/embed/avatars/${idx}.png`;
  }
  const ext = avatar.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${discordId}/${avatar}.${ext}?size=128`;
}

/* ----------------------------- Sunucu (guild) ----------------------------- */

const MANAGE_GUILD = BigInt(0x20); // Manage Server izin biti

export type UserGuild = {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
};

/** Kullanıcının üye olduğu sunucular (OAuth guilds kapsamı gerekir). */
export async function fetchUserGuilds(accessToken: string): Promise<UserGuild[]> {
  const res = await fetch(`${API}/users/@me/guilds`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

/** Kullanıcı bu sunucuda yönetici mi (sahip ya da Manage Server)? */
export function isGuildAdmin(g: { owner: boolean; permissions: string }): boolean {
  if (g.owner) return true;
  try {
    return (BigInt(g.permissions) & MANAGE_GUILD) === MANAGE_GUILD;
  } catch {
    return false;
  }
}

export function guildIconUrl(id: string, icon: string | null): string | null {
  if (!icon) return null;
  const ext = icon.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/icons/${id}/${icon}.${ext}?size=64`;
}

/** Botun bulunduğu sunucuların id kümesi (ilgili botun token'ı gerekir). */
export async function fetchBotGuildIds(
  token: string | undefined = process.env.DISCORD_BOT_TOKEN,
): Promise<Set<string>> {
  if (!token) return new Set();
  const res = await fetch(`${API}/users/@me/guilds?limit=200`, {
    headers: { Authorization: `Bot ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return new Set();
  const list = (await res.json()) as { id: string }[];
  return new Set(list.map((g) => g.id));
}

export type GuildChannel = { id: string; name: string; type: number; position: number };

/** Bir sunucunun yazı kanalları (log kanalı seçimi için, ilgili botun token'ı gerekir). */
export async function fetchGuildTextChannels(
  guildId: string,
  token: string | undefined = process.env.DISCORD_BOT_TOKEN,
): Promise<GuildChannel[]> {
  if (!token) return [];
  const res = await fetch(`${API}/guilds/${guildId}/channels`, {
    headers: { Authorization: `Bot ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const list = (await res.json()) as GuildChannel[];
  // 0 = GUILD_TEXT, 5 = GUILD_ANNOUNCEMENT
  return list
    .filter((c) => c.type === 0 || c.type === 5)
    .sort((a, b) => a.position - b.position);
}
