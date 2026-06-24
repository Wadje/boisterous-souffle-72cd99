import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AlertTriangle, ArrowLeft, ShieldCheck } from "lucide-react";
import { Background } from "@/components/Background";
import { DiscordIcon } from "@/components/BrandIcons";
import { getCurrentUser } from "@/lib/auth";

const ERRORS: Record<string, string> = {
  state: "Oturum doğrulanamadı, lütfen tekrar deneyin.",
  oauth: "Discord ile bağlantı kurulamadı, lütfen tekrar deneyin.",
  config: "Discord girişi henüz yapılandırılmamış. (.env.local dosyasını doldurun.)",
};

export default async function GirisPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const user = await getCurrentUser();
  if (user) redirect("/panel");

  const { error } = await searchParams;
  const message = error ? ERRORS[error] ?? "Bir hata oluştu." : null;

  return (
    <>
      <Background />
      <main className="flex min-h-screen items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-paper"
          >
            <ArrowLeft className="h-4 w-4" />
            Anasayfaya dön
          </Link>

          <div className="overflow-hidden rounded-3xl border border-line bg-surface/50 backdrop-blur">
            <div className="relative h-40 w-full">
              <Image
                src="/devlooplogo.png"
                alt="DevLoop"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/90 to-transparent" />
            </div>

            <div className="p-8 pt-6">
              <h1 className="font-display text-2xl font-bold text-paper">Giriş Yap</h1>
              <p className="mt-2 text-sm text-muted">
                DevLoop hesabın Discord ile senkronize edilir. Devam etmek için Discord
                hesabınla giriş yap.
              </p>

              {message && (
                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-magenta/40 bg-magenta/10 p-4 text-sm text-paper">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-magenta" />
                  <span>{message}</span>
                </div>
              )}

              <a
                href="/api/auth/login"
                className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-deep to-violet py-3.5 text-sm font-semibold text-white transition-shadow hover:shadow-[0_12px_36px_-10px_rgba(124,58,237,0.9)]"
              >
                <DiscordIcon className="h-5 w-5" />
                Discord ile Giriş Yap
              </a>

              <div className="mt-5 flex items-start gap-2.5 rounded-2xl border border-line bg-ink-2/50 p-4 text-xs text-muted">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-violet-bright" />
                <span>
                  Discord hesabınla güvenli giriş. Yalnızca adın, kullanıcı adın ve
                  e-postan alınır.
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
