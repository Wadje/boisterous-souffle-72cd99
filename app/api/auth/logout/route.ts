import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, type SessionData } from "@/lib/session";

export async function POST(req: Request) {
  // Oturum çerezini doğrudan redirect yanıtına işliyoruz ki Set-Cookie düşmesin.
  const res = NextResponse.redirect(new URL("/", req.url), { status: 303 });
  const session = await getIronSession<SessionData>(req, res, sessionOptions);
  session.destroy();
  return res;
}
