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
    id: "ekip-mesai",
    title: "Ekip & Mesai",
    description: "Ekip yönetimi ve mesai takibi odaklı organizasyon paketi.",
    price: 450,
    features: ["Moderasyon Sistemi", "Guard Sistemi", "Mesai & Yetkili Takibi"],
  },
];

export const BOTS: Product[] = [
  {
    id: "moderasyon",
    title: "Moderasyon",
    description: "Sunucu düzenini koruyan kapsamlı moderasyon altyapısı.",
    price: 400,
    features: ["Mute / Ban / Kick", "Uyarı Sistemi", "Otomatik Log", "Küfür & Spam Filtresi"],
  },
  {
    id: "guard",
    title: "Guard",
    description: "Anti-raid ve gelişmiş güvenlik ile sunucunu koruma altına al.",
    price: 300,
    features: ["Anti-Raid Koruması", "Yetki Koruması", "Webhook Koruması", "Anlık Uyarı"],
  },
  {
    id: "ticket",
    title: "Ticket",
    description: "Profesyonel destek talep sistemi.",
    price: 250,
    features: ["Kategori Bazlı Talep", "Talep Logu", "Transkript", "Yetkili Atama"],
  },
  {
    id: "yonetim",
    title: "Yönetim",
    description: "Sunucu yönetimini kolaylaştıran kontrol ve organizasyon sistemi.",
    price: 300,
    features: ["Rol & Yetki Yönetimi", "Kayıt Sistemi", "Yönetim Paneli"],
  },
  {
    id: "sunucu-aktiflik",
    title: "Sunucu Aktiflik",
    description: "Üye ve yetkili aktifliğini ölçen detaylı takip sistemi.",
    price: 200,
    features: ["Aktiflik Takibi", "Mesaj & Ses İstatistiği", "Aktiflik Raporu"],
  },
  {
    id: "ozel-bot",
    title: "0'dan İsteğinize Özel Bot",
    description: "Sıfırdan, tamamen ihtiyacına özel kodlanan bot. Fiyat, kodlara göre belirlenir; sabit değildir.",
    price: 0,
    quote: true,
    features: ["İhtiyaca Özel Geliştirme", "Özel Komut & Sistemler", "Sürekli Destek"],
  },
];

export const WEBSITES: Product[] = [
  {
    id: "website-kisiye-ozel",
    title: "Kişiye Özel Web Site",
    description: "Tamamen sana özel tasarlanan, ihtiyacına göre geliştirilen web sitesi.",
    price: 0,
    quote: true,
    featured: true,
    tag: "İsteğe Özel",
    features: [
      "Özgün Tasarım",
      "İhtiyaca Göre Geliştirme",
      "Responsive Arayüz",
      "Panel & Yönetim Entegrasyonu",
      "Bulut Hosting Desteği",
    ],
  },
  {
    id: "website-sunucuya-ozel",
    title: "Sunucunuza Özel Web Site",
    description: "Sunucunuzun yapısına özel, mağaza ve başvuru sistemli web sitesi.",
    price: 0,
    quote: true,
    tag: "İsteğe Özel",
    features: [
      "Sunucuya Özel Tasarım",
      "Mağaza & Başvuru Sistemi",
      "Yetkili & Personel Yönetimi",
      "Ödeme Entegrasyonu",
      "Pro Arayüz",
    ],
  },
];

export const SERVICES: Product[] = [
  {
    id: "discord-bot",
    title: "Discord Bot Geliştirme",
    description: "İhtiyacına özel, kararlı ve ölçeklenebilir Discord botları.",
    price: 0,
    quote: true,
    features: ["Özel Komut & Sistemler", "Veritabanı Entegrasyonu"],
  },
  {
    id: "telegram-bot",
    title: "Telegram Bot Geliştirme",
    description: "Telegram için otomasyon ve yönetim botları.",
    price: 0,
    quote: true,
    features: ["Otomasyon Akışları", "API Entegrasyonu"],
  },
  {
    id: "fivem-script",
    title: "FiveM Script ve Sistemleri",
    description: "FiveM sunucuların için özel script ve sistemler.",
    price: 0,
    quote: true,
    features: ["Özel Script Geliştirme", "Sunucuya Özel Sistemler"],
  },
  {
    id: "web-site",
    title: "Web Site Tasarımı ve Geliştirme",
    description: "Modern, hızlı ve özgün web siteleri.",
    price: 0,
    quote: true,
    features: ["Özgün Tasarım", "Tam Responsive Geliştirme"],
  },
  {
    id: "yonetim-panelleri",
    title: "Yönetim Panelleri",
    description: "Verilerini yönetebileceğin güçlü kontrol panelleri.",
    price: 0,
    quote: true,
    features: ["Özel Admin Paneli", "Yetki & Rol Yönetimi"],
  },
  {
    id: "api-otomasyon",
    title: "API ve Otomasyon Sistemleri",
    description: "Servisleri birbirine bağlayan otomasyon çözümleri.",
    price: 0,
    quote: true,
    features: ["Özel API Geliştirme", "Otomasyon & Entegrasyon"],
  },
  {
    id: "sunucuya-ozel-yazilim",
    title: "Sunucuya Özel Yazılım Çözümleri",
    description: "Sunucunun ihtiyacına göre uçtan uca yazılım çözümleri.",
    price: 0,
    quote: true,
    features: ["İhtiyaca Özel Geliştirme", "Sürekli Destek"],
  },
  {
    id: "ozel-yazilim-entegrasyon",
    title: "Özel Yazılım ve Entegrasyon Projeleri",
    description: "Karmaşık ihtiyaçlar için özel yazılım ve entegrasyon projeleri.",
    price: 0,
    quote: true,
    features: ["Özel Proje Geliştirme", "Sistem Entegrasyonu"],
  },
];

export type TeamMember = { name: string; role: string };

export const TEAM: TeamMember[] = [
  { name: "Wadjes", role: "Kurucu & Geliştirici" },
  { name: "Syrix", role: "Kurucu & Geliştirici" },
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
