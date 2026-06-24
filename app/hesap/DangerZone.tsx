"use client";

import { useState } from "react";
import { AlertTriangle, Trash2, Users } from "lucide-react";
import { deleteAccount, requestTransfer } from "./actions";

export function DangerZone() {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {/* İşlemlerimi Aktar */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
        <h3 className="flex items-center gap-2 font-semibold text-amber-300">
          <Users className="h-5 w-5" />
          İşlemlerimi Aktar
        </h3>
        <p className="mt-2 text-sm text-muted">
          Hesabındaki tüm işlemleri başka bir Discord hesabına aktarabilirsin.
        </p>
        <form action={requestTransfer} className="mt-4 space-y-3">
          <input
            name="targetDiscordId"
            required
            inputMode="numeric"
            placeholder="Hedef Discord ID"
            className="w-full rounded-xl border border-line bg-ink-2/60 px-4 py-2.5 text-sm text-paper outline-none placeholder:text-muted-2 focus:border-amber-400"
          />
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-amber-500/50 bg-amber-500/10 py-2.5 text-sm font-semibold text-amber-300 transition-colors hover:bg-amber-500/20"
          >
            <Users className="h-4 w-4" />
            İşlemlerimi Aktar
          </button>
        </form>
      </div>

      {/* Hesabımı Sil */}
      <div className="rounded-2xl border border-magenta/30 bg-magenta/5 p-6">
        <h3 className="flex items-center gap-2 font-semibold text-magenta">
          <Trash2 className="h-5 w-5" />
          Hesabımı Sil
        </h3>
        <p className="mt-2 text-sm text-muted">
          Hesabını kalıcı olarak silmek istediğinden emin misin? Bu işlem geri alınamaz.
        </p>
        {!confirming ? (
          <button
            onClick={() => setConfirming(true)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-magenta/50 bg-magenta/10 py-2.5 text-sm font-semibold text-magenta transition-colors hover:bg-magenta/20"
          >
            <Trash2 className="h-4 w-4" />
            Hesabımı Sil
          </button>
        ) : (
          <form action={deleteAccount} className="mt-4 space-y-2">
            <p className="flex items-center gap-2 text-xs text-magenta">
              <AlertTriangle className="h-4 w-4" />
              Bu işlem geri alınamaz, emin misin?
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="flex-1 rounded-xl border border-line py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-surface"
              >
                Vazgeç
              </button>
              <button
                type="submit"
                className="flex-1 rounded-xl bg-magenta py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Evet, Sil
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
