import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { wedding } from "@/config/wedding";
import mountains from "@/assets/mountains.jpg";
import { Divider, FlowerBorder, Reveal } from "./primitives";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  return (
    <div ref={ref} className="relative h-[100svh] min-h-[560px] overflow-hidden">
      <motion.img style={{ y }} src={mountains} alt="" aria-hidden className="absolute inset-0 h-[115%] w-full object-cover" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 fade-to-ivory" />
      <div className="relative z-10 flex h-full flex-col items-center pt-[18%] text-center">
        <Reveal><p className="font-serif text-xs tracking-[0.4em] text-cocoa">THE WEDDING OF</p></Reveal>
        <Reveal delay={0.2}>
          <h1 className="mt-4 font-script text-7xl leading-[0.95] text-gold-shimmer drop-shadow-sm">
            {wedding.shortNames.groom}<br /><span className="text-5xl">&</span><br />{wedding.shortNames.bride}
          </h1>
        </Reveal>
        <Reveal delay={0.4}><p className="mt-4 font-serif text-lg tracking-[0.25em] text-cocoa">{wedding.dateLabel}</p></Reveal>
        <Reveal delay={0.5}>
          <a href="#countdown" className="mt-5 inline-block rounded-full bg-rose-gradient px-5 py-2.5 text-[11px] font-semibold tracking-[0.2em] text-primary-foreground shadow-soft active:scale-95 transition-transform">
            SAVE THE DATE
          </a>
        </Reveal>
      </div>
      <div className="absolute inset-x-0 -bottom-4 z-10"><FlowerBorder /></div>
    </div>
  );
}

export function Opening() {
  return (
    <section className="relative px-7 pb-10 pt-8 text-center">
      <Reveal><h2 className="font-serif text-3xl tracking-[0.3em] text-gold-shimmer">WITH LOVE</h2></Reveal>
      <Divider />
      <Reveal delay={0.15}>
        <p className="font-serif text-lg italic leading-relaxed text-cocoa">“{wedding.quote.text}”</p>
        <p className="mt-4 text-xs font-semibold tracking-widest text-rosewood">({wedding.quote.source})</p>
      </Reveal>
      <Reveal delay={0.25}>
        <p className="mt-10 text-sm leading-relaxed text-muted-foreground">
          Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i serta kerabat sekalian untuk menghadiri acara pernikahan kami.
        </p>
      </Reveal>
    </section>
  );
}
