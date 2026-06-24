export function LoopMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" fill="none" className={className} aria-hidden>
      <defs>
        <linearGradient id="loopGrad" x1="0" y1="0" x2="48" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c4b5fd" />
          <stop offset="0.5" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#6d28d9" />
        </linearGradient>
      </defs>
      <path
        d="M24 16c-3.6-6-7.2-9-11.4-9C7.9 7 5 11 5 16s2.9 9 7.6 9c4.2 0 7.8-3 11.4-9 3.6-6 7.2-9 11.4-9C40.1 7 43 11 43 16s-2.9 9-7.6 9c-4.2 0-7.8-3-11.4-9Z"
        stroke="url(#loopGrad)"
        strokeWidth="3.2"
        strokeLinecap="round"
        style={{ filter: "drop-shadow(0 0 6px rgba(139,92,246,0.65))" }}
      />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LoopMark className="h-7 w-11" />
      <span className="font-display text-lg font-bold tracking-tight">
        <span className="text-paper">dev</span>
        <span className="text-violet-bright">loop</span>
      </span>
    </span>
  );
}
