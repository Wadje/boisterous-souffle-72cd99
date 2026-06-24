import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Activity,
  Bot,
  Calendar,
  FileText,
  Globe,
  Hash,
  LayoutGrid,
  Mail,
  Package,
} from "lucide-react";
import { Background } from "@/components/Background";
import { Navbar } from "@/components/Navbar";
import { DiscordIcon } from "@/components/BrandIcons";
import { getCurrentUser } from "@/lib/auth";

const QUICK = [
  { label: "Bot Yönetimi", desc: "Botlarını yönet", Icon: Bot, href: "/#botlar" },
  { label: "Hizmetler", desc: "Sahip olduğun hizmetler", Icon: Package, href: "/#paketler" },
  { label: "Websiteler", desc: "Web sitelerini yönet", Icon: Globe, href: "/#websiteler" },
  { label: "Faturalarım", desc: "Faturalarını görüntüle", Icon: FileText, href: "/hesap" },
];

function fmtDate(d: Date) {
  return new Intl.DateTimeFormat("tr-TR", { dateStyle: "long" }).format(d);
}

export default async function PanelPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/giris");

  const name = user.globalName || user.username;

  return (
    <>
      <Background />
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 pb-24 pt-32">
        <header>
          <h1 className="font-display text-3xl font-bold text-paper sm:text-4xl">
            Hoş Geldin, <span className="text-violet-bright">{name}</span>
          </h1>
          <p className="mt-2 text-muted">
            Hesap paneline hoş geldin. Hesap bilgilerini ve aktivitelerini buradan yönetebilirsin.
          </p>
        </header>

        {/* Profil Bilgileri */}
        <section className="mt-10 rounded-3xl border border-line bg-surface/50 p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-surface-2 text-violet-bright">
              <DiscordIcon className="h-4 w-4" />
            </span>
            <div>
              <h2 className="font-semibold text-paper">Profil Bilgileri</h2>
              <p className="text-xs text-muted">Discord ile bağlandı</p>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-ink-2/50 p-6">
            <div className="flex items-center gap-4">
              <Image
                src={user.avatarUrl}
                alt={name}
                width={64}
                height={64}
                unoptimized
                className="h-16 w-16 rounded-full ring-2 ring-violet/40"
              />
              <div>
                <p className="font-display text-lg font-bold text-paper">{name}</p>
                <p className="text-sm text-muted">@{user.username}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Info Icon={Hash} label="Discord ID" value={user.discordId} />
              <Info Icon={Calendar} label="Üye Tarihi" value={fmtDate(user.createdAt)} />
              <Info Icon={Mail} label="İletişim" value={user.email ?? "—"} />
            </div>
          </div>
        </section>

        {/* İstatistikler */}
        <section className="mt-8 rounded-3xl border border-line bg-surface/50 p-6 sm:p-8">
          <h2 className="mb-6 flex items-center gap-2.5 font-semibold text-paper">
            <Activity className="h-5 w-5 text-violet-bright" />
            İstatistikler
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Stat label="Aktif Bot" value={0} />
            <Stat label="Toplam Sipariş" value={0} />
          </div>
        </section>

        {/* Hızlı İşlemler */}
        <section className="mt-8 rounded-3xl border border-line bg-surface/50 p-6 sm:p-8">
          <h2 className="mb-6 flex items-center gap-2.5 font-semibold text-paper">
            <LayoutGrid className="h-5 w-5 text-violet-bright" />
            Hızlı İşlemler
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {QUICK.map(({ label, desc, Icon, href }) => (
              <Link
                key={label}
                href={href}
                className="group rounded-2xl border border-line bg-ink-2/50 p-5 transition-colors hover:border-violet/50"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-violet-deep/30 to-violet/20 text-violet-bright transition-transform group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-4 font-semibold text-paper">{label}</p>
                <p className="text-xs text-muted">{desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Son Aktiviteler */}
        <section className="mt-8 rounded-3xl border border-line bg-surface/50 p-6 sm:p-8">
          <h2 className="mb-6 flex items-center gap-2.5 font-semibold text-paper">
            <FileText className="h-5 w-5 text-violet-bright" />
            Son Aktiviteler
          </h2>
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-line py-14 text-center">
            <Activity className="h-8 w-8 text-muted-2" />
            <p className="text-sm text-muted">Henüz aktiviten bulunmuyor.</p>
          </div>
        </section>
      </main>
    </>
  );
}

function Info({
  Icon,
  label,
  value,
}: {
  Icon: typeof Hash;
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-2">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </p>
      <p className="mt-1 truncate font-medium text-paper">{value}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-line bg-ink-2/50 p-6 text-center">
      <p className="font-display text-3xl font-bold text-paper">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}
