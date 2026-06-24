import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { buildAuthorizeUrl, isDiscordConfigured } from "@/lib/discord";

export async function GET(req: Request) {
  if (!isDiscordConfigured()) {
    return NextResponse.redirect(new URL("/giris?error=config", req.url));
  }

  const state = crypto.randomUUID();
  const cookieStore = await cookies();
  cookieStore.set("discord_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 600,
  });

  return NextResponse.redirect(buildAuthorizeUrl(state));
}
