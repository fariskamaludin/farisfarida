import { useEffect, useState } from "react";
import { wedding } from "@/config/wedding";
import { Reveal } from "./primitives";
import { getTimeLeft } from "@/lib/countdown";

export function Countdown() {
  const target = new Date(wedding.date).getTime();
  const [left, setLeft] = useState<ReturnType<typeof getTimeLeft> | null>(null);
  useEffect(() => {
    const tick = () => setLeft(getTimeLeft(target, Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  const units = [
    ["Hari", left?.days],
    ["Jam", left?.hours],
    ["Menit", left?.minutes],
    ["Detik", left?.seconds],
  ] as const;
  return (
    <section id="countdown" className="relative h-[520px] overflow-hidden">
      <img src={wedding.gallery[1]} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover animate-kenburns" />
      <div className="absolute inset-0 bg-cocoa/35" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 fade-to-ivory" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
        <Reveal><h2 className="font-script text-5xl text-ivory drop-shadow">Menuju Hari Bahagia</h2></Reveal>
        <Reveal delay={0.2} className="mt-6 grid w-full max-w-xs grid-cols-4 gap-2">
          {units.map(([label, v]) => (
            <div key={label} className="rounded-xl border border-gold/60 bg-dusty/85 py-3 shadow-soft backdrop-blur-sm">
              <div className="font-serif text-3xl font-semibold text-ivory tabular-nums">{v === undefined ? "--" : String(v).padStart(2, "0")}</div>
              <div className="text-[10px] tracking-widest text-ivory/90">{label}</div>
            </div>
          ))}
        </Reveal>
        <Reveal delay={0.3}><p className="mt-5 font-serif text-lg tracking-[0.2em] text-ivory drop-shadow">{wedding.dateLabel}</p></Reveal>
      </div>
    </section>
  );
}
