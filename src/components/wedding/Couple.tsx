import { Instagram } from "lucide-react";
import { wedding } from "@/config/wedding";
import { Reveal, ScriptTitle } from "./primitives";

type Person = typeof wedding.groom;

function Profile({ p, align }: { p: Person; align: "left" | "right" }) {
  return (
    <Reveal x={align === "left" ? -30 : 30} className="flex flex-col items-center text-center">
      <div className="relative">
        <div className="absolute -inset-2 rounded-[50%] border border-gold/70" />
        <div className="absolute -inset-4 rounded-[50%] border border-dashed border-gold/40" />
        <div className="h-60 w-48 overflow-hidden rounded-[50%] border-[3px] border-gold shadow-soft">
          <img src={p.photo} alt={p.fullName} loading="lazy" className="h-full w-full object-cover transition-transform duration-[2s] hover:scale-110" />
        </div>
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-2xl" aria-hidden>🌸</span>
      </div>
      <h3 className="mt-8 font-script text-4xl text-gold-shimmer">{p.fullName}</h3>
      <p className="mt-2 max-w-[260px] text-xs leading-relaxed text-muted-foreground">{p.parents}</p>
      <a href={`https://instagram.com/${p.instagram}`} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-10 items-center gap-1.5 rounded-full bg-blush px-4 text-xs text-rosewood active:scale-95 transition-transform">
        <Instagram className="h-3.5 w-3.5" /> @{p.instagram}
      </a>
    </Reveal>
  );
}

export function Couple() {
  return (
    <section className="relative px-6 py-16">
      <ScriptTitle>Mempelai</ScriptTitle>
      <p className="mb-10 mt-2 text-center text-xs tracking-widest text-muted-foreground">Dengan memohon rahmat Allah SWT</p>
      <Profile p={wedding.groom} align="left" />
      <Reveal><p className="my-8 text-center font-script text-6xl text-dusty">&</p></Reveal>
      <Profile p={wedding.bride} align="right" />
    </section>
  );
}
