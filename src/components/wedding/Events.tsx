import { CalendarDays, Clock, MapPin } from "lucide-react";
import { wedding } from "@/config/wedding";
import { Divider, FlowerBorder, Reveal, ScriptTitle } from "./primitives";

export function Events() {
  return (
    <section className="relative px-5 pt-14">
      <ScriptTitle>Acara Pernikahan</ScriptTitle>
      <div className="mt-8 space-y-8">
        {wedding.events.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.1}>
            <div className="relative overflow-hidden rounded-[2rem] border border-gold/60 paper px-6 pb-8 pt-10 text-center shadow-soft frame-gold">
              <h3 className="font-script text-5xl text-gold-shimmer">{e.title}</h3>
              <Divider />
              <p className="flex items-center justify-center gap-2 font-serif text-xl font-semibold text-cocoa"><CalendarDays className="h-4 w-4 text-vrose" />{e.day}</p>
              <p className="mt-2 flex items-center justify-center gap-2 text-sm text-rosewood"><Clock className="h-4 w-4" />{e.time}</p>
              <p className="mt-4 font-serif text-lg font-semibold text-cocoa">{e.place}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{e.address}</p>
              <a href={e.maps} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-rose-gradient px-5 text-[11px] font-semibold tracking-[0.2em] text-primary-foreground shadow-soft active:scale-95 transition-transform">
                <MapPin className="h-4 w-4" /> LOKASI ACARA
              </a>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="-mx-5 -mt-6"><FlowerBorder /></div>
    </section>
  );
}
