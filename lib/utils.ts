const tl = new Intl.NumberFormat("tr-TR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatTRY(value: number): string {
  return `${tl.format(value)} ₺`;
}

export function formatInt(value: number): string {
  return new Intl.NumberFormat("tr-TR").format(value);
}

/** İsimden deterministik mor tonlu gradyan + baş harfler üretir (offline avatar). */
export function avatarFor(name: string): { gradient: string; initials: string } {
  const trimmed = name.trim();
  let hash = 0;
  for (let i = 0; i < trimmed.length; i++) {
    hash = (hash * 31 + trimmed.charCodeAt(i)) >>> 0;
  }
  const h1 = 250 + (hash % 40); // mor bandı
  const h2 = 280 + ((hash >> 4) % 40);
  const gradient = `linear-gradient(135deg, hsl(${h1} 70% 58%), hsl(${h2} 65% 38%))`;
  const parts = trimmed.split(/\s+/);
  const initials =
    (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? parts[0]?.[1] ?? "");
  return { gradient, initials: initials.toUpperCase() };
}
