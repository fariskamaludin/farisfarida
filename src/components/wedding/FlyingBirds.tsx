import { useMemo } from "react";

type Bird = { dir: 1 | -1; top: number; left: number; size: number; delay: number; dur: number; rise: number; flap: number };

function makeFlock(): Bird[] {
  const birds: Bird[] = [];
  for (let i = 0; i < 14; i++) {
    birds.push({
      dir: i % 2 === 0 ? 1 : -1,
      top: 25 + Math.random() * 45,
      left: 38 + Math.random() * 24,
      size: 18 + Math.random() * 30,
      delay: Math.random() * 0.45,
      dur: 1.3 + Math.random() * 0.7,
      rise: -(60 + Math.random() * 200),
      flap: 0.22 + Math.random() * 0.15,
    });
  }
  return birds;
}

export function FlyingBirds() {
  const flock = useMemo(makeFlock, []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {flock.map((b, i) => (
        <div
          key={i}
          className="bird-fly absolute"
          style={{
            top: `${b.top}%`,
            left: `${b.left}%`,
            width: b.size,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
            ["--bx" as string]: `${b.dir * 75}vw`,
            ["--by" as string]: `${b.rise}px`,
            ["--rot" as string]: `${b.dir * -12}deg`,
          }}
        >
          <svg viewBox="0 0 60 30" className="w-full" style={{ transform: `scaleX(${b.dir})` }}>
            <g className="bird-flap" style={{ animationDuration: `${b.flap}s` }}>
              <path fill="currentColor" className="text-foreground" style={{ color: "oklch(0.12 0 0)" }} d="M30 18 C24 8 14 4 2 6 C12 9 20 13 26 20 C27 22 33 22 34 20 C40 13 48 9 58 6 C46 4 36 8 30 18 Z M30 17 C32 16 36 16 38 15 C36 18 33 19 31 19 Z" />
            </g>
          </svg>
        </div>
      ))}
    </div>
  );
}
