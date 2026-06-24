// Panelden yönetilebilen botlar ve her birinin ayarlanabilir komut/özellikleri.
// Bot id'leri lib/data.ts içindeki BOTS[].id ile eşleşir.

export type BotFeature = { key: string; label: string };

export type BotDef = {
  title: string;
  description: string;
  features: BotFeature[];
};

export const BOT_DEFS: Record<string, BotDef> = {
  moderasyon: {
    title: "Moderasyon",
    description: "Sunucu düzenini koruyan moderasyon komutları.",
    features: [
      { key: "ban", label: "Ban" },
      { key: "kick", label: "Kick" },
      { key: "mute", label: "Mute / Sustur" },
      { key: "uyari", label: "Uyarı Sistemi" },
      { key: "otomatik-log", label: "Otomatik Log" },
      { key: "kufur-filtresi", label: "Küfür & Spam Filtresi" },
    ],
  },
  guard: {
    title: "Guard",
    description: "Anti-raid ve güvenlik korumaları.",
    features: [
      { key: "anti-raid", label: "Anti-Raid Koruması" },
      { key: "yetki-koruma", label: "Yetki Koruması" },
      { key: "webhook-koruma", label: "Webhook Koruması" },
      { key: "anlik-uyari", label: "Anlık Uyarı" },
    ],
  },
  ticket: {
    title: "Ticket",
    description: "Destek talep sistemi.",
    features: [
      { key: "kategori-talep", label: "Kategori Bazlı Talep" },
      { key: "talep-log", label: "Talep Logu" },
      { key: "transkript", label: "Transkript" },
      { key: "yetkili-atama", label: "Yetkili Atama" },
    ],
  },
  yonetim: {
    title: "Yönetim",
    description: "Rol, kayıt ve yönetim araçları.",
    features: [
      { key: "rol-yetki", label: "Rol & Yetki Yönetimi" },
      { key: "kayit", label: "Kayıt Sistemi" },
      { key: "yonetim-panel", label: "Yönetim Paneli" },
    ],
  },
  "sunucu-aktiflik": {
    title: "Sunucu Aktiflik",
    description: "Üye ve yetkili aktiflik takibi.",
    features: [
      { key: "aktiflik-takip", label: "Aktiflik Takibi" },
      { key: "mesaj-ses", label: "Mesaj & Ses İstatistiği" },
      { key: "aktiflik-rapor", label: "Aktiflik Raporu" },
    ],
  },
};

export function botDef(productId: string): BotDef | null {
  return BOT_DEFS[productId] ?? null;
}
