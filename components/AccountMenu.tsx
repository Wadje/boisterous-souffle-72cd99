"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, LayoutDashboard, LogOut, Settings } from "lucide-react";
import { DiscordIcon } from "./BrandIcons";

type Me = {
  username: string;
  globalName: string | null;
  avatarUrl: string;
};

export function AccountMenu() {
  const [me, setMe] = useState<Me | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (active) setMe(d.user);
      })
      .catch(() => {})
      .finally(() => active && setLoaded(true));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (!loaded) {
    return <div className="h-10 w-24 animate-pulse rounded-full bg-surface/60" />;
  }

  if (!me) {
    return (
      <a
        href="/api/auth/login"
        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-deep to-violet px-4 py-2.5 text-sm font-semibold text-white transition-shadow hover:shadow-[0_10px_28px_-10px_rgba(124,58,237,0.9)]"
      >
        <DiscordIcon className="h-4 w-4" />
        Giriş Yap
      </a>
    );
  }

  const name = me.globalName || me.username;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-line bg-surface/60 py-1 pl-1 pr-2.5 backdrop-blur transition-colors hover:border-violet"
      >
        <Image
          src={me.avatarUrl}
          alt={name}
          width={28}
          height={28}
          className="h-7 w-7 rounded-full"
          unoptimized
        />
        <span className="hidden max-w-[120px] truncate text-sm font-medium text-paper sm:inline">
          {name}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-line bg-ink-2/95 p-1.5 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2 px-3 py-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-surface text-violet-bright">
              <DiscordIcon className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-paper">{name}</p>
              <p className="truncate text-xs text-muted">@{me.username}</p>
            </div>
          </div>
          <div className="my-1 h-px bg-line" />
          <Link
            href="/panel"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-paper transition-colors hover:bg-surface"
          >
            <LayoutDashboard className="h-4 w-4 text-muted" />
            Panel
          </Link>
          <Link
            href="/hesap"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-paper transition-colors hover:bg-surface"
          >
            <Settings className="h-4 w-4 text-muted" />
            Hesap Ayarları
          </Link>
          <div className="my-1 h-px bg-line" />
          <form action="/api/auth/logout" method="post">
            <button
              type="submit"
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-magenta transition-colors hover:bg-surface"
            >
              <LogOut className="h-4 w-4" />
              Çıkış Yap
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
