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
    scope: "identify email",
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
