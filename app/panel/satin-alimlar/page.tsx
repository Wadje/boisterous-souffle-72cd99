import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Bot, Package, Receipt, Settings } from "lucide-react";
import { Background } from "@/components/Background";
import { Navbar } from "@/components/Navbar";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatTRY } from "@/lib/utils";

function fmtDate(d: Date) {
  return new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "short" }).format(d);
}

const KIND_LABEL: Record<string, string> = {
  bot: "Bot",
  paket: "Paket",
  website: "Website",
  hizmet: "Hizmet",
};

export default async function SatinAlimlarPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/giris");

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

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
            <Receipt className="h-5 w-5" />
          </span>
          <div>
            <h1 className="font-display text-2xl font-bold text-paper sm:text-3xl">Satın Alımlar</h1>
            <p className="text-sm text-muted">Aldığın paket, bot ve hizmetler.</p>
          </div>
        </header>

        {orders.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-line py-16 text-center">
            <Package className="h-9 w-9 text-muted-2" />
            <p className="text-muted">Henüz bir satın alımın yok.</p>
            <Link
              href="/#paketler"
              className="mt-2 rounded-xl bg-gradient-to-r from-violet-deep to-violet px-5 py-2.5 text-sm font-semibold text-white"
            >
              Ürünleri İncele
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-5">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-3xl border border-line bg-surface/50 p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-2">
                      Sipariş #{order.id.slice(-6)}
                    </p>
                    <p className="mt-0.5 text-sm text-muted">{fmtDate(order.createdAt)}</p>
                  </div>
                  <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                    {order.status === "aktif" ? "Aktif" : order.status}
                  </span>
                </div>

                <ul className="mt-4 space-y-3">
                  {order.items.map((it) => (
                    <li key={it.id} className="flex items-center justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ink-2 text-violet-bright">
                          {it.kind === "bot" ? <Bot className="h-4 w-4" /> : <Package className="h-4 w-4" />}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-medium text-paper">{it.title}</p>
                          <p className="text-xs text-muted">
                            {KIND_LABEL[it.kind] ?? it.kind} · {it.periodLabel}
                            {it.qty > 1 ? ` · ${it.qty} adet` : ""}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="whitespace-nowrap text-sm font-semibold text-paper">
                          {it.unitPrice === 0 ? "İsteğe Bağlı" : formatTRY(it.unitPrice * it.qty)}
                        </span>
                        {it.kind === "bot" && (
                          <Link
                            href={`/panel/botlar/${it.productId}`}
                            className="flex items-center gap-1.5 rounded-lg border border-line-bright px-3 py-1.5 text-xs font-semibold text-paper transition-colors hover:border-violet"
                          >
                            <Settings className="h-3.5 w-3.5" />
                            Yönet
                          </Link>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex items-center justify-end gap-2 border-t border-line pt-4">
                  <span className="text-sm text-muted">Toplam</span>
                  <span className="font-display text-lg font-bold text-paper">
                    {formatTRY(order.total)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
