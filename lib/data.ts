export type Period = {
  id: string;
  label: string;
  months: number;
  discount: number; // 0..1
};

export const PERIODS: Period[] = [
  { id: "1ay", label: "1 Aylık", months: 1, discount: 0 },
  { id: "3ay", label: "3 Aylık", months: 3, discount: 0.05 },
  { id: "6ay", label: "6 Aylık", months: 6, discount: 0.1 },
  { id: "1yil", label: "1 Yıllık", months: 12, discount: 0.15 },
];

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number; // aylık taban fiyat (TL)
  features: string[];
  featured?: boolean;
  tag?: string;
  quote?: boolean; // fiyat isteğe/projeye göre belirlenir
};

export const STATS = [
  { value: 1391, label: "Çevrimiçi Üye" },
  { value: 707, label: "Toplam Müşteri" },
  { value: 2, label: "DevLoop Personel" },
];

export const PACKAGES: Product[] = [
  {
    id: "discord-full-pack",
    title: "Discord Full Pack",
    description: "Bir sunucunun ihtiyaç duyduğu tüm sistemleri içeren eksiksiz paket.",
    price: 1000,
    featured: true,
    tag: "En Çok Tercih Edilen",
    features: [
      "Moderasyon Sistemi",
      "Guard & Anti-Raid",
      "Ticket / Talep Sistemi",
      "Kayıt & Rol Sistemi",
      "Seviye & Davet Takibi",
    ],
  },
  {
    id: "discord-pack",
    title: "Discord Pack",
    description: "Orta ölçekli sunucular için dengeli ve güçlü çekirdek paket.",
    price: 650,
    features: ["Moderasyon Sistemi", "Guard Sistemi", "Ticket Sistemi", "Kayıt Sistemi"],
  },
  {
    id: "legal-pack",
    title: "Legal Pack",
    description: "Legal sunucular için sade ve hızlı kurulum.",
    price: 450,
    features: ["Moderasyon Sistemi", "Guard Sistemi", "Kayıt Sistemi"],
  },
  {
    id: "garrys-mod-full",
    title: "Garry's Mod Full",
    description: "Garry's Mod toplulukları için tam donanımlı yönetim paketi.",
    price: 800,
    features: ["Moderasyon Sistemi", "Guard & Koruma", "Yetkili Takip", "Başvuru Sistemi"],
  },
  {
    id: "garrys-mod",
    title: "Garry's Mod",
    description: "Garry's Mod sunucuları için temel yönetim paketi.",
    price: 650,
    features: ["Moderasyon Sistemi", "Guard Sistemi", "Yetkili Takip"],
  },
  {
    id: "ekip-pack",
    title: "Ekip Pack",
    description: "Ekip ve klanlar için organizasyon odaklı paket.",
    price: 450,
    features: ["Moderasyon Sistemi", "Guard Sistemi", "Etkinlik Sistemi"],
  },
];

export const BOTS: Product[] = [
  {
    id: "moderasyon",
    title: "Moderasyon",
    description: "Sunucu düzenini koruyan kapsamlı moderasyon altyapısı.",
    price: 425,
    features: ["Mute / Ban / Kick", "Uyarı Sistemi", "Otomatik Log", "Küfür & Spam Filtresi"],
  },
  {
    id: "guard",
    title: "Guard",
    description: "Anti-raid ve gelişmiş güvenlik ile sunucunu koruma altına al.",
    price: 350,
    features: ["Anti-Raid Koruması", "Yetki Koruması", "Webhook Koruması", "Anlık Uyarı"],
  },
  {
    id: "ticket",
    title: "Ticket",
    description: "Profesyonel destek talep sistemi.",
    price: 200,
    features: ["Kategori Bazlı Talep", "Talep Logu", "Transkript", "Yetkili Atama"],
  },
  {
    id: "dijo-sistemi",
    title: "Dijo Sistemi",
    description: "Dijital ürün ve davet takibi için özel sistem.",
    price: 300,
    features: ["Davet Takibi", "Ödül Sistemi", "Sıralama Tablosu"],
  },
  {
    id: "menu-sistemi",
    title: "Menu Sistemi",
    description: "Etkileşimli menü ve buton tabanlı kontrol paneli.",
    price: 300,
    features: ["Buton & Menü Paneli", "Rol Dağıtımı", "Özelleştirilebilir Tasarım"],
  },
];

export const WEBSITES: Product[] = [
  {
    id: "website-donate",
    title: "Website - Donate",
    description: "Mağaza ve bağış sistemli profesyonel web sitesi.",
    price: 750,
    featured: true,
    tag: "Bundle İçerik -%15",
    features: [
      "Kategori & Ürün Yönetimi",
      "Kasa & Bakiye Sistemi",
      "Vitrin & Banner Yönetimi",
      "Bonus Yönetimi",
      "Personel Yönetimi",
      "Ödeme Entegrasyonu",
      "Bulut Hosting",
    ],
  },
  {
    id: "website-legal",
    title: "Website - Legal",
    description: "Legal sunucular için kurumsal ve başvuru odaklı web sitesi.",
    price: 300,
    tag: "Bundle İçerik • 990 TL",
    features: [
      "Tam Bulundurma",
      "Başvuru Yönetimi",
      "Personel Yönetimi",
      "FTS & FTS Hesabı",
      "Yetkili Yönetimi",
      "Bilgi Yönetimi",
      "Pro Tasarım",
      "Bilgi İletişim Entegrasyonu",
    ],
  },
];

export const SERVICES: Product[] = [
  {
    id: "yetkili-takip",
    title: "Yetkili Takip",
    description: "Yetkili aktifliğini ölçen detaylı takip sistemi.",
    price: 175,
    features: ["Log Sistemi", "Aktiflik Raporu"],
  },
  {
    id: "black-list-sunucu",
    title: "Black List Sunucu",
    description: "Sunucu bazlı kara liste yönetimi.",
    price: 175,
    features: ["Black List Yönetimi", "Çoklu Sunucu Senkronu", "Otomatik Kontrol"],
  },
  {
    id: "webhook-korumasi",
    title: "Webhook Koruması",
    description: "Webhook saldırılarına karşı tam koruma sistemi.",
    price: 250,
    features: ["Anlık Koruma", "Otomatik Engelleme", "Saldırı Logu"],
  },
  {
    id: "kisisellestirilebilir-hizmetler",
    title: "Kişiselleştirilebilir Hizmetler",
    description: "İhtiyacına özel sistem geliştirme.",
    price: 100,
    features: ["İsteğe Özel Geliştirme"],
  },
  {
    id: "reklam-1-haftalik",
    title: "Reklam 1 Haftalık",
    description: "Sunucu reklamını 1 hafta boyunca öne çıkar.",
    price: 400,
    features: ["1 Hafta Sabit Reklam", "Geniş Erişim"],
  },
  {
    id: "reklam-1-aylik",
    title: "Reklam 1 Aylık",
    description: "Sunucu reklamını 1 ay boyunca öne çıkar.",
    price: 1200,
    features: ["1 Ay Sabit Reklam", "Maksimum Erişim"],
  },
];

export type TeamMember = { name: string; role: string };

export const TEAM: TeamMember[] = [
  { name: "kxts", role: "Kurucu" },
  { name: "moment", role: "Founder Manager" },
  { name: "neo", role: "Founder Manager" },
  { name: "lara", role: "Teknik Support" },
  { name: "deci", role: "Teknik Support" },
  { name: "kxl", role: "Teknik Support" },
  { name: "Kasurman", role: "Teknik Support" },
  { name: "Trock", role: "Teknik Support" },
  { name: "ovdka", role: "Teknik Support" },
  { name: "koş kafeini", role: "Teknik Support" },
  { name: "Lawa", role: "Junior Support" },
  { name: "Rubin", role: "Junior Support" },
  { name: "batsby", role: "Junior Support" },
  { name: "hacizevladim", role: "Junior Support" },
  { name: "mxshroe", role: "Junior Support" },
  { name: "peyto", role: "Junior Support" },
];

export type Testimonial = { name: string; handle: string; text: string };

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Anael",
    handle: "Scorned",
    text: "Aldığım en iyi hizmet, kurulan özel sistem sorunsuz ve süper bir şekilde çalışıyor. Kesinlikle herkese tavsiye ederim, DevLoop ekibine tüm emekleri için teşekkürler.",
  },
  {
    name: "Berk",
    handle: "berkdev",
    text: "Sunucumuzun guard ve moderasyon sistemini DevLoop kurdu. Anti-raid gerçekten iş görüyor, kurulumdan sonra tek bir sorun yaşamadık.",
  },
  {
    name: "Selin",
    handle: "selvn",
    text: "Ticket sistemi ekibimizin destek hızını ciddi şekilde artırdı. Tasarım da çok temiz, müşterilerimiz bayıldı.",
  },
  {
    name: "Mert",
    handle: "mrtq",
    text: "Donate web sitemizi 2 günde teslim ettiler. Ödeme entegrasyonu sorunsuz, hosting de dahil olunca işimiz baya kolaylaştı.",
  },
  {
    name: " Damla",
    handle: "dmla",
    text: "Garry's Mod sunucumuz için aldığımız full paket beklentimizin üzerindeydi. Destek hattı her zaman aktif.",
  },
  {
    name: "Onur",
    handle: "onurr",
    text: "Fiyat/performans olarak piyasada en mantıklı yer burası. Webhook koruması sayesinde saldırılardan etkilenmiyoruz.",
  },
];
