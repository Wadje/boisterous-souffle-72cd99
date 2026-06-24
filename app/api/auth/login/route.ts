import { NextResponse } from "next/server";
import { buildAuthorizeUrl, isDiscordConfigured } from "@/lib/discord";
import { createState } from "@/lib/oauthState";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!isDiscordConfigured()) {
    return NextResponse.redirect(new URL("/giris?error=config", req.url));
  }

  // İmzalı state — çerez yok, cross-site dönüşte kaybolmaz.
  return NextResponse.redirect(buildAuthorizeUrl(createState()));
}
