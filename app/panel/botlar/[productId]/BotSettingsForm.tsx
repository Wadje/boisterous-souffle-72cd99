"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Hash, Loader2, Save } from "lucide-react";
import { saveBotConfig } from "@/app/panel/actions";

type Channel = { id: string; name: string };
type Feature = { key: string; label: string };

export function BotSettingsForm({
  productId,
  guildId,
  guildName,
  channels,
  features,
  initialLogChannelId,
  initialEnabled,
}: {
  productId: string;
  guildId: string;
  guildName: string;
  channels: Channel[];
  features: Feature[];
  initialLogChannelId: string | null;
  initialEnabled: string[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [logChannelId, setLogChannelId] = useState(initialLogChannelId ?? "");
  const [enabled, setEnabled] = useState<Set<string>>(new Set(initialEnabled));
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggle = (key: string) =>
    setEnabled((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const save = () => {
    setError(null);
    setSaved(false);
    startTransition(async () => {
      const res = await saveBotConfig({
        productId,
        guildId,
        guildName,
        logChannelId: logChannelId || null,
        enabledCommands: [...enabled],
      });
      if (res.ok) {
        setSaved(true);
        router.refresh();
        setTimeout(() => setSaved(false), 2500);
      } else if ("redirect" in res && res.redirect) {
        router.push(res.redirect);
      } else {
        setError(("error" in res && res.error) || "Kaydedilemedi.");
      }
    });
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Log kanalı */}
      <section className="rounded-3xl border border-line bg-surface/50 p-6">
        <h3 className="flex items-center gap-2 font-semibold text-paper">
          <Hash className="h-4 w-4 text-violet-bright" />
          Log Kanalı
        </h3>
        <p className="mt-1 text-sm text-muted">
          Botun işlemleri hangi kanala loglayacağını seç.
        </p>
        {channels.length === 0 ? (
          <p className="mt-4 rounded-xl border border-line bg-ink-2/50 px-4 py-3 text-sm text-muted-2">
            Kanal bulunamadı. Botun bu sunucuda kanalları görme yetkisi olduğundan emin ol.
          </p>
        ) : (
          <select
            value={logChannelId}
            onChange={(e) => setLogChannelId(e.target.value)}
            className="mt-4 w-full rounded-xl border border-line-bright bg-ink-2 px-4 py-3 text-sm text-paper outline-none focus:border-violet"
          >
            <option value="">Seçilmedi</option>
            {channels.map((c) => (
              <option key={c.id} value={c.id}>
                # {c.name}
              </option>
            ))}
          </select>
        )}
      </section>

      {/* Komutlar / özellikler */}
      <section className="rounded-3xl border border-line bg-surface/50 p-6">
        <h3 className="font-semibold text-paper">Komutlar & Özellikler</h3>
        <p className="mt-1 text-sm text-muted">
          Bu sunucuda aktif olacak özellikleri seç.
        </p>
        <div className="mt-4 space-y-2">
          {features.map((f) => {
            const on = enabled.has(f.key);
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => toggle(f.key)}
                className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                  on
                    ? "border-violet/50 bg-violet/10 text-paper"
                    : "border-line bg-ink-2/40 text-muted hover:border-line-bright"
                }`}
              >
                <span>{f.label}</span>
                <span
                  className={`grid h-5 w-5 place-items-center rounded-md border ${
                    on ? "border-violet bg-violet text-white" : "border-line-bright text-transparent"
                  }`}
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {error && (
        <p className="rounded-xl border border-magenta/40 bg-magenta/10 px-4 py-3 text-sm text-paper">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={save}
          disabled={pending}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-deep to-violet px-6 py-3 text-sm font-semibold text-white transition-shadow hover:shadow-[0_12px_36px_-10px_rgba(124,58,237,0.9)] disabled:opacity-60"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {pending ? "Kaydediliyor…" : "Ayarları Kaydet"}
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-300">
            <Check className="h-4 w-4" /> Kaydedildi
          </span>
        )}
      </div>
    </div>
  );
}
