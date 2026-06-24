import "server-only";
import crypto from "node:crypto";

// OAuth "state" değerini çereze yazmak yerine imzalı (stateless) üretiriz.
// Böylece cross-site Discord dönüşünde çerez taşınmasa bile doğrulama çalışır;
// imza (HMAC + SESSION_PASSWORD) sahteciliği engeller, zaman damgası da tazeliği.

function secret(): string {
  return process.env.SESSION_PASSWORD ?? "dev-only-insecure-password-change-me-32x";
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
}

/** İmzalı state üretir (URL-güvenli). */
export function createState(): string {
  const payload = `${Date.now()}.${crypto.randomBytes(8).toString("hex")}`;
  const b64 = Buffer.from(payload).toString("base64url");
  return `${b64}.${sign(payload)}`;
}

/** State imzasını ve tazeliğini doğrular (çerez gerekmez). */
export function verifyState(state: string | null, maxAgeMs = 10 * 60 * 1000): boolean {
  if (!state) return false;
  const dot = state.lastIndexOf(".");
  if (dot <= 0) return false;
  const b64 = state.slice(0, dot);
  const sig = state.slice(dot + 1);

  let payload: string;
  try {
    payload = Buffer.from(b64, "base64url").toString("utf8");
  } catch {
    return false;
  }

  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

  const ts = Number(payload.split(".")[0]);
  if (!Number.isFinite(ts)) return false;
  return Date.now() - ts <= maxAgeMs;
}
