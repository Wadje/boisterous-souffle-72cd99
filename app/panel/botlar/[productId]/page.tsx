import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ArrowLeft, Bot, Plus, ServerCog, ShieldAlert } from "lucide-react";
import { Background } from "@/components/Background";
import { Navbar } from "@/components/Navbar";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { botDef } from "@/lib/bots";
import { fetchBotGuildIds, fetchGuildTextChannels, guildIconUrl } from "@/lib/discord";
import { BotSettingsForm } from "./BotSettingsForm";

type StoredGuild = {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
};

function botInviteUrl() {
  const cid = process.env.DISCORD_CLIENT_ID;
  if (!cid) return null;
  return `https://discord.com/oauth2/authorize?client_id=${cid}&scope=bot+applications.commands&permissions=8`;
}

export default async function BotYonetimPage({
  params,
  searchParams,
}: {
  params: Promise<{ productId: string }>;
  searchParams: Promise<{ guild?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/giris");

  const { productId } = await params;
  const { guild: selectedGuildId } = await searchParams;

  const def = botDef(productId);
  if (!def) redirect("/panel/botlar");

  // Sahiplik kontrolü
  const owns = await prisma.orderItem.findFirst({
    where: { kind: "bot", productId, order: { userId: user.id, status: "aktif" } },
  });
  if (!owns) redirect("/panel/botlar");

  const record = await prisma.user.findUnique({
    where: { id: user.id },
    select: { guilds: true },
  });
  const adminGuilds = (record?.guilds as StoredGuild[] | null) ?? null;

  const Header = (
    <header className="flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-deep/30 to-violet/20 text-violet-bright">
        <Bot className="h-5 w-5" />
      </span>
      <div>
        <h1 className="font-display text-2xl font-bold text-paper sm:text-3xl">{def.title}</h1>
        <p className="text-sm text-muted">{def.description}</p>
      </div>
    </header>
  );

  // guilds kapsamı verilmemişse (eski oturum) → tekrar giriş iste
  if (adminGuilds === null) {
    return (
      <Shell>
        {Header}
        <Notice
          icon={<ShieldAlert className="h-6 w-6 text-amber-300" />}
          title="Sunucuların yüklenemedi"
          desc="Sunucularını görebilmek için Discord ile tekrar giriş yapıp sunucu iznini onayla."
          action={
            <a
              href="/api/auth/login"
              className="rounded-xl bg-gradient-to-r from-violet-deep to-violet px-5 py-2.5 text-sm font-semibold text-white"
            >
              Tekrar Giriş Yap
            </a>
          }
        />
      </Shell>
    );
  }

  const botGuildIds = await fetchBotGuildIds();
  const manageable = adminGuilds.filter((g) => botGuildIds.has(g.id));
  const invite = botInviteUrl();

  // Sunucu seçilmemişse → liste
  if (!selectedGuildId) {
    return (
      <Shell>
        {Header}
        <div className="mt-8">
          <h2 className="mb-1 flex items-center gap-2 font-semibold text-paper">
            <ServerCog className="h-5 w-5 text-violet-bright" />
            Sunucu Seç
          </h2>
          <p className="mb-5 text-sm text-muted">
            Botun bulunduğu ve senin yönetici olduğun sunucular listelenir.
          </p>

          {manageable.length === 0 ? (
            <Notice
              icon={<Bot className="h-6 w-6 text-violet-bright" />}
              title="Uygun sunucu yok"
              desc="Botun eklendiği ve senin yönetici olduğun bir sunucu bulunamadı. Botu sunucuna ekledikten sonra burada görünecek."
              action={
                invite && (
                  <a
                    href={invite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-deep to-violet px-5 py-2.5 text-sm font-semibold text-white"
                  >
                    <Plus className="h-4 w-4" />
                    Botu Sunucuna Ekle
                  </a>
                )
              }
            />
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {manageable.map((g) => {
                const icon = guildIconUrl(g.id, g.icon);
                return (
                  <Link
                    key={g.id}
                    href={`/panel/botlar/${productId}?guild=${g.id}`}
                    className="flex items-center gap-3 rounded-2xl border border-line bg-surface/50 p-4 transition-colors hover:border-violet/50"
                  >
                    {icon ? (
                      <Image
                        src={icon}
                        alt={g.name}
                        width={44}
                        height={44}
                        unoptimized
                        className="h-11 w-11 rounded-full ring-1 ring-line"
                      />
                    ) : (
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-surface-2 font-display text-sm font-bold text-paper ring-1 ring-line">
                        {g.name.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="truncate font-medium text-paper">{g.name}</p>
                      <p className="text-xs text-muted">{g.owner ? "Sahip" : "Yönetici"}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {manageable.length > 0 && invite && (
            <a
              href={invite}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm text-violet-bright hover:underline"
            >
              <Plus className="h-4 w-4" />
              Başka bir sunucuya ekle
            </a>
          )}
        </div>
      </Shell>
    );
  }

  // Seçilen sunucu — ayar formu
  const guild = manageable.find((g) => g.id === selectedGuildId);
  if (!guild) {
    return (
      <Shell>
        {Header}
        <Notice
          icon={<ShieldAlert className="h-6 w-6 text-amber-300" />}
          title="Sunucu uygun değil"
          desc="Bu sunucuyu yönetme yetkin yok ya da bot bu sunucuda değil."
          action={
            <Link
              href={`/panel/botlar/${productId}`}
              className="rounded-xl border border-line-bright px-5 py-2.5 text-sm font-semibold text-paper"
            >
              Sunucu Listesine Dön
            </Link>
          }
        />
      </Shell>
    );
  }

  const [channels, config] = await Promise.all([
    fetchGuildTextChannels(guild.id),
    prisma.botConfig.findUnique({
      where: {
        userId_productId_guildId: { userId: user.id, productId, guildId: guild.id },
      },
    }),
  ]);

  const initialEnabled = (config?.enabledCommands as string[] | null) ?? def.features.map((f) => f.key);

  return (
    <Shell>
      {Header}
      <div className="mt-6 flex items-center gap-3 rounded-2xl border border-line bg-ink-2/50 p-4">
        {guildIconUrl(guild.id, guild.icon) ? (
          <Image
            src={guildIconUrl(guild.id, guild.icon)!}
            alt={guild.name}
            width={40}
            height={40}
            unoptimized
            className="h-10 w-10 rounded-full ring-1 ring-line"
          />
        ) : (
          <span className="grid h-10 w-10 place-items-center rounded-full bg-surface-2 font-display text-xs font-bold text-paper">
            {guild.name.slice(0, 2).toUpperCase()}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-paper">{guild.name}</p>
          <p className="text-xs text-muted">Ayarladığın sunucu</p>
        </div>
        <Link
          href={`/panel/botlar/${productId}`}
          className="rounded-lg border border-line-bright px-3 py-1.5 text-xs font-semibold text-paper transition-colors hover:border-violet"
        >
          Değiştir
        </Link>
      </div>

      <BotSettingsForm
        productId={productId}
        guildId={guild.id}
        guildName={guild.name}
        channels={channels.map((c) => ({ id: c.id, name: c.name }))}
        features={def.features}
        initialLogChannelId={config?.logChannelId ?? null}
        initialEnabled={initialEnabled}
      />
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Background />
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        <Link
          href="/panel/botlar"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-paper"
        >
          <ArrowLeft className="h-4 w-4" />
          Bot Yönetimine dön
        </Link>
        {children}
      </main>
    </>
  );
}

function Notice({
  icon,
  title,
  desc,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mt-8 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-line px-6 py-14 text-center">
      {icon}
      <p className="font-semibold text-paper">{title}</p>
      <p className="max-w-md text-sm text-muted">{desc}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
