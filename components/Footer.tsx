import { DiscordIcon, GithubIcon, TwitterIcon } from "./BrandIcons";
import { Logo } from "./Logo";

const INVITE = process.env.NEXT_PUBLIC_DISCORD_INVITE ?? "https://discord.gg/nTttZPETm2";

const QUICK = [
  { label: "Paketlerimiz", href: "#paketler" },
  { label: "Botlarımız", href: "#botlar" },
  { label: "Ekibimiz", href: "#ekibimiz" },
  { label: "Yorumlar", href: "#yorumlar" },
];

const LEGAL = [
  { label: "Kullanım Şartları", href: "#" },
  { label: "Gizlilik Politikası", href: "#" },
  { label: "Çerez Politikası", href: "#" },
];

const SOCIAL = [
  { Icon: DiscordIcon, label: "Discord", href: INVITE },
  { Icon: GithubIcon, label: "GitHub", href: "#" },
  { Icon: TwitterIcon, label: "Twitter", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink-2/60">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            Hızlı, güvenilir ve profesyonel sistemlerin tek adresi.
          </p>
          <div className="mt-6 flex gap-3">
            {SOCIAL.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href === "#" ? undefined : "_blank"}
                rel={href === "#" ? undefined : "noopener noreferrer"}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface/60 text-muted transition-colors hover:border-violet hover:text-violet-bright"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-paper">
            Hızlı Linkler
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            {QUICK.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-muted transition-colors hover:text-violet-bright">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-paper">Yasal</h4>
          <ul className="mt-4 space-y-3 text-sm">
            {LEGAL.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-muted transition-colors hover:text-violet-bright">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line py-6 text-center text-sm text-muted-2">
        © 2025 DevLoop. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
