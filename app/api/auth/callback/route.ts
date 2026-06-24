import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import type { Prisma } from "@prisma/client";
import {
  exchangeCode,
  fetchDiscordUser,
  fetchUserGuilds,
  isGuildAdmin,
} from "@/lib/discord";
import { verifyState } from "@/lib/oauthState";
import { prisma } from "@/lib/prisma";
import { sessionOptions, type SessionData } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const fail = (error: string) =>
    NextResponse.redirect(new URL(`/giris?error=${error}`, req.url));

  // Çerez yok: state imzalı olarak doğrulanır.
  if (!code || !verifyState(state)) {
    return fail("state");
  }

  try {
    const { access_token } = await exchangeCode(code);
    const du = await fetchDiscordUser(access_token);

    // Kullanıcının yönetici olduğu sunucuları çek (guilds kapsamı verildiyse).
    let adminGuilds: Prisma.InputJsonValue | undefined;
    try {
      const guilds = await fetchUserGuilds(access_token);
      adminGuilds = guilds.filter(isGuildAdmin).map((g) => ({
        id: g.id,
        name: g.name,
        icon: g.icon,
        owner: g.owner,
        permissions: g.permissions,
      }));
    } catch {
      adminGuilds = undefined;
    }

    // Çekirdek giriş kaydı (guilds olmadan) — bu her zaman çalışmalı.
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

    // Sunucu listesini ayrıca, en iyi çaba ile yaz.
    if (adminGuilds !== undefined) {
      try {
        await prisma.user.update({
          where: { id: user.id },
          data: { guilds: adminGuilds },
        });
      } catch {
        /* kolon yoksa yok say */
      }
    }

    // Oturum çerezini doğrudan redirect yanıtına işle.
    const res = NextResponse.redirect(new URL("/panel", req.url));
    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    session.userId = user.id;
    await session.save();

    return res;
  } catch {
    return fail("oauth");
  }
}
