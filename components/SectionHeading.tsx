import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-line-bright/60 bg-surface/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-violet-bright">
          <span className="h-1.5 w-1.5 rounded-full bg-violet [animation:pulse-dot_2s_infinite]" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-paper sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.16}>
          <p className="mt-4 text-balance text-muted">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
