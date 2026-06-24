import { NextResponse } from "next/server";
import { buildAuthorizeUrl, isDiscordConfigured } from "@/lib/discord";

export async function GET(req: Request) {
  if (!isDiscordConfigured()) {
    return NextResponse.redirect(new URL("/giris?error=config", req.url));
  }

  const state = crypto.randomUUID();

  // Çerezi doğrudan yanıt nesnesine yazıyoruz; cookies().set() + redirect()
  // kombinasyonu bazı runtime'larda (ör. Netlify) Set-Cookie'yi eklemiyor.
  const res = NextResponse.redirect(buildAuthorizeUrl(state));
  res.cookies.set("discord_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 600,
  });
  return res;
}
