import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Bot, ChevronRight, Settings } from "lucide-react";
import { Background } from "@/components/Background";
import { Navbar } from "@/components/Navbar";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { botDef } from "@/lib/bots";

export default async function BotlarPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/giris");

  const ownedBots = await prisma.orderItem.findMany({
    where: { kind: "bot", order: { userId: user.id, status: "aktif" } },
    distinct: ["productId"],
    select: { productId: true, title: true },
  });

  const configCounts = await prisma.botConfig.groupBy({
    by: ["productId"],
    where: { userId: user.id },
    _count: { _all: true },
  });
  const countOf = (pid: string) =>
    configCounts.find((c) => c.productId === pid)?._count._all ?? 0;

  return (
    <>
      <Background />
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-32">
        <Link
          href="/panel"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-paper"
        >
          <ArrowLeft className="h-4 w-4" />
          Panele dön
        </Link>

        <header className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-surface-2 text-violet-bright">
            <Settings className="h-5 w-5" />
          </span>
          <div>
            <h1 className="font-display text-2xl font-bold text-paper sm:text-3xl">Bot Yönetimi</h1>
            <p className="text-sm text-muted">
              Sahip olduğun botları sunucu bazında ayarla.
            </p>
          </div>
        </header>

        {ownedBots.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-line py-16 text-center">
            <Bot className="h-9 w-9 text-muted-2" />
            <p className="text-muted">Henüz yönetilebilir bir botun yok.</p>
            <Link
              href="/#botlar"
              className="mt-2 rounded-xl bg-gradient-to-r from-violet-deep to-violet px-5 py-2.5 text-sm font-semibold text-white"
            >
              Botları İncele
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ownedBots.map((b) => {
              const def = botDef(b.productId);
              const manageable = Boolean(def);
              const count = countOf(b.productId);
              const card = (
                <div
                  className={`flex h-full items-center gap-4 rounded-2xl border border-line bg-surface/50 p-5 transition-colors ${
                    manageable ? "hover:border-violet/50" : "opacity-70"
                  }`}
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-deep/30 to-violet/20 text-violet-bright">
                    <Bot className="h-6 w-6" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-paper">{def?.title ?? b.title}</p>
                    <p className="truncate text-xs text-muted">
                      {manageable
                        ? count > 0
                          ? `${count} sunucuda ayarlandı`
                          : "Henüz ayarlanmadı"
                        : "Özel bot — ekip tarafından yönetilir"}
                    </p>
                  </div>
                  {manageable && <ChevronRight className="h-5 w-5 shrink-0 text-muted-2" />}
                </div>
              );

              return manageable ? (
                <Link key={b.productId} href={`/panel/botlar/${b.productId}`}>
                  {card}
                </Link>
              ) : (
                <div key={b.productId}>{card}</div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
