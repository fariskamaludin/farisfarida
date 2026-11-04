import { wedding } from "@/config/wedding";
import { Reveal, ScriptTitle } from "./primitives";

export function LoveStory() {
  return (
    <section className="relative px-6 py-16">
      <ScriptTitle>Love Story</ScriptTitle>
      <div className="relative mt-10">
        <div className="absolute left-4 top-0 h-full w-px bg-gold/70" />
        <div className="space-y-12">
          {wedding.story.map((s) => (
            <Reveal key={s.year} className="relative pl-12">
              <span className="absolute left-4 top-1 -translate-x-1/2 text-lg" aria-hidden>🌸</span>
              <p className="font-serif text-sm tracking-[0.3em] text-vrose">{s.year}</p>
              <h3 className="font-serif text-2xl font-semibold text-cocoa">{s.title}</h3>
              <div className="mt-3 overflow-hidden rounded-2xl border-[3px] border-ivory shadow-soft outline outline-1 outline-gold/60">
                <img src={s.photo} alt={s.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-[2s] hover:scale-110" />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
