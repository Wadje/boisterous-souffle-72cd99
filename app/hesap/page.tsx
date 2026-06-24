import { redirect } from "next/navigation";
import { AlertTriangle, FileText } from "lucide-react";
import { Background } from "@/components/Background";
import { Navbar } from "@/components/Navbar";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AccountForm } from "./AccountForm";
import { DangerZone } from "./DangerZone";

const STATUS_LABEL: Record<string, string> = {
  beklemede: "Beklemede",
  tamamlandi: "Tamamlandı",
  reddedildi: "Reddedildi",
};

function fmt(d: Date) {
  return new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "short" }).format(d);
}

export default async function HesapPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/giris");

  const [profile, transfers] = await Promise.all([
    prisma.profile.findUnique({ where: { userId: user.id } }),
    prisma.transfer.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } }),
  ]);

  const initial = {
    billingType: profile?.billingType ?? "bireysel",
    firstName: profile?.firstName ?? null,
    lastName: profile?.lastName ?? null,
    address1: profile?.address1 ?? null,
    address2: profile?.address2 ?? null,
    district: profile?.district ?? null,
    city: profile?.city ?? null,
    postalCode: profile?.postalCode ?? null,
    country: profile?.country ?? null,
    tcNo: profile?.tcNo ?? null,
    taxOffice: profile?.taxOffice ?? null,
    taxNo: profile?.taxNo ?? null,
    companyName: profile?.companyName ?? null,
  };

  return (
    <>
      <Background />
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        <header className="text-center">
          <h1 className="font-display text-3xl font-bold sm:text-4xl">
            Hesap <span className="text-violet-bright">Ayarları</span>
          </h1>
          <p className="mt-2 text-muted">Hesap bilgilerini düzenle ve yönet.</p>
        </header>

        {/* Kişisel Bilgiler */}
        <section className="mt-10 rounded-3xl border border-line bg-surface/50 p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-surface-2 text-violet-bright">
              <FileText className="h-4 w-4" />
            </span>
            <div>
              <h2 className="font-semibold text-paper">Kişisel Bilgiler</h2>
              <p className="text-xs text-muted">Hesap bilgilerini güncelle.</p>
            </div>
          </div>
          <AccountForm profile={initial} email={user.email} />
        </section>

        {/* Tehlikeli Bölge */}
        <section className="mt-8 rounded-3xl border border-line bg-surface/50 p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-magenta/10 text-magenta">
              <AlertTriangle className="h-4 w-4" />
            </span>
            <div>
              <h2 className="font-semibold text-magenta">Tehlikeli Bölge</h2>
              <p className="text-xs text-muted">Bu işlemler geri alınamaz, dikkatli olun.</p>
            </div>
          </div>
          <DangerZone />
        </section>

        {/* İşlem Geçmişi */}
        <section className="mt-8 rounded-3xl border border-line bg-surface/50 p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-surface-2 text-violet-bright">
              <FileText className="h-4 w-4" />
            </span>
            <div>
              <h2 className="font-semibold text-paper">İşlem Geçmişi</h2>
              <p className="text-xs text-muted">Aktarım taleplerinizin durumunu görüntüleyin.</p>
            </div>
          </div>

          {transfers.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-line py-12 text-center">
              <FileText className="h-8 w-8 text-muted-2" />
              <p className="text-sm text-muted">Henüz aktarım talebiniz bulunmamaktadır.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {transfers.map((t) => (
                <li
                  key={t.id}
                  className="flex items-center justify-between rounded-2xl border border-line bg-ink-2/50 p-4"
                >
                  <div>
                    <p className="text-sm font-medium text-paper">
                      Aktarım → {t.targetDiscordId}
                    </p>
                    <p className="text-xs text-muted">{fmt(t.createdAt)}</p>
                  </div>
                  <span className="rounded-full border border-line-bright px-3 py-1 text-xs font-semibold text-violet-bright">
                    {STATUS_LABEL[t.status] ?? t.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}
