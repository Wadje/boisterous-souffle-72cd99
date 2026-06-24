export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div
        className="aurora"
        style={{
          width: 620,
          height: 620,
          top: -180,
          left: -120,
          background: "radial-gradient(circle, rgba(124,58,237,0.55), transparent 65%)",
        }}
      />
      <div
        className="aurora"
        style={{
          width: 520,
          height: 520,
          top: 240,
          right: -160,
          background: "radial-gradient(circle, rgba(192,38,211,0.35), transparent 65%)",
          animationDelay: "-6s",
        }}
      />
      <div
        className="aurora"
        style={{
          width: 700,
          height: 700,
          bottom: -260,
          left: "30%",
          background: "radial-gradient(circle, rgba(109,40,217,0.3), transparent 65%)",
          animationDelay: "-11s",
        }}
      />
      <div className="absolute inset-0 grid-lines" />
    </div>
  );
}
