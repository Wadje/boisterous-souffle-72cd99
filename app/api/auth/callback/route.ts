import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { exchangeCode, fetchDiscordUser } from "@/lib/discord";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

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
  cookieStore.delete("discord_oauth_state");

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

    const session = await getSession();
    session.userId = user.id;
    await session.save();

    return NextResponse.redirect(new URL("/panel", req.url));
  } catch {
    return fail("oauth");
  }
}
