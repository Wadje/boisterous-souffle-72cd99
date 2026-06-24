"use client";

import { useEffect, useState } from "react";
import {
  Boxes,
  FileStack,
  Globe,
  Home,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Bot } from "lucide-react";
import { DiscordIcon } from "./BrandIcons";

const INVITE = process.env.NEXT_PUBLIC_DISCORD_INVITE ?? "https://discord.gg/nTttZPETm2";

type Item = { id: string; label: string; Icon: LucideIcon };

const ITEMS: Item[] = [
  { id: "hero", label: "Anasayfa", Icon: Home },
  { id: "paketler", label: "Paketlerimiz", Icon: Boxes },
  { id: "botlar", label: "Botlarımız", Icon: Bot },
  { id: "websiteler", label: "Websiteler", Icon: Globe },
  { id: "ek-hizmetler", label: "Ek Hizmetler", Icon: FileStack },
  { id: "ekibimiz", label: "Ekibimiz", Icon: Users },
  { id: "yorumlar", label: "Yorumlar", Icon: Star },
];

export function SectionRail() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-1.5 rounded-full border border-line bg-surface/70 p-2 backdrop-blur-xl lg:flex">
      {ITEMS.map(({ id, label, Icon }) => {
        const isActive = active === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-label={label}
            className={`group relative grid h-10 w-10 place-items-center rounded-full transition-colors ${
              isActive
                ? "bg-gradient-to-br from-violet-deep to-violet text-white"
                : "text-muted hover:bg-surface-2 hover:text-paper"
            }`}
          >
            <Icon className="h-[18px] w-[18px]" />
            <span className="pointer-events-none absolute right-12 whitespace-nowrap rounded-lg border border-line bg-ink-2 px-2.5 py-1 text-xs font-medium text-paper opacity-0 transition-opacity group-hover:opacity-100">
              {label}
            </span>
          </a>
        );
      })}
      <span className="my-1 h-px bg-line" />
      <a
        href={INVITE}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Discord sunucusuna katıl"
        className="group relative grid h-10 w-10 place-items-center rounded-full text-violet-bright transition-colors hover:bg-surface-2"
      >
        <DiscordIcon className="h-[18px] w-[18px]" />
        <span className="pointer-events-none absolute right-12 whitespace-nowrap rounded-lg border border-line bg-ink-2 px-2.5 py-1 text-xs font-medium text-paper opacity-0 transition-opacity group-hover:opacity-100">
          Discord&apos;a Katıl
        </span>
      </a>
    </nav>
  );
}
