import { useMemo } from "react";

export function Petals({ count = 14, className = "fixed" }: { count?: number; className?: string }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (i * 97) % 100,
        size: 8 + ((i * 7) % 10),
        dur: 12 + ((i * 5) % 10),
        delay: -((i * 3.3) % 20),
        drift: ((i % 2 ? 1 : -1) * (30 + (i * 11) % 60)) + "px",
        tone: i % 3,
      })),
    [count],
  );
  return (
    <div aria-hidden className={`${className} inset-0 pointer-events-none overflow-hidden z-20`}>
      {petals.map((p, i) => (
        <span
          key={i}
          className={`absolute top-0 animate-fall rounded-[60%_0_60%_0] ${p.tone === 0 ? "bg-princess" : p.tone === 1 ? "bg-blush" : "bg-dusty"} opacity-80`}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.8,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            ["--drift" as string]: p.drift,
          }}
        />
      ))}
    </div>
  );
}
