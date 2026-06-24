"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { DiscordIcon } from "./BrandIcons";
import { Logo } from "./Logo";
import { AccountMenu } from "./AccountMenu";

const INVITE = process.env.NEXT_PUBLIC_DISCORD_INVITE ?? "https://discord.gg/nTttZPETm2";

export function Navbar() {
  const { count, open } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-ink/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" aria-label="DevLoop anasayfa">
          <Logo />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full border border-line bg-surface/60 px-3.5 py-2 text-sm text-paper backdrop-blur transition-colors hover:border-violet sm:flex"
          >
            <DiscordIcon className="h-4 w-4 text-violet-bright" />
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-400 [animation:pulse-dot_2s_infinite]" />
              1.391
            </span>
          </a>

          <button
            onClick={open}
            aria-label="Sepeti aç"
            className="relative grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/60 text-paper backdrop-blur transition-colors hover:border-violet"
          >
            <ShoppingCart className="h-[18px] w-[18px]" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-magenta px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </button>

          <AccountMenu />
        </div>
      </nav>
    </header>
  );
}
