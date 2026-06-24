import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { exchangeCode, fetchDiscordUser } from "@/lib/discord";
import { prisma } from "@/lib/prisma";
import { sessionOptions, type SessionData } from "@/lib/session";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieStore = await cookies();
  const savedState = cookieStore.get("discord_oauth_state")?.value;

  const fail = (error: string) =>
    NextResponse.redirect(new URL(`/giris?error=${error}`, req.url));

  if (!code || !state || !savedState || state !== savedState) {
    return fail("state");
  }

  try {
    const { access_token } = await exchangeCode(code);
    const du = await fetchDiscordUser(access_token);

    const user = await prisma.user.upsert({
      where: { discordId: du.id },
      create: {
        discordId: du.id,
        username: du.username,
        globalName: du.global_name,
        avatar: du.avatar,
        email: du.email ?? null,
      },
      update: {
        username: du.username,
        globalName: du.global_name,
        avatar: du.avatar,
        email: du.email ?? null,
        lastLoginAt: new Date(),
      },
    });

    // Çerezleri (session + state temizliği) doğrudan redirect yanıtına yazıyoruz.
    const res = NextResponse.redirect(new URL("/panel", req.url));
    res.cookies.delete("discord_oauth_state");

    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    session.userId = user.id;
    await session.save();

    return res;
  } catch {
    return fail("oauth");
  }
}
