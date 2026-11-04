import { wedding } from "@/config/wedding";
import mountains from "@/assets/mountains.jpg";
import { Divider, FlowerBorder, Reveal } from "./primitives";
import { Petals } from "./Petals";

export function Closing() {
  return (
    <section className="relative overflow-hidden pt-16 text-center">
      <img src={mountains} alt="" aria-hidden loading="lazy" className="absolute inset-x-0 top-0 h-80 w-full object-cover opacity-40" />
      <div className="absolute inset-x-0 top-40 h-40 fade-to-ivory" />
      <Petals count={10} className="absolute" />
      <div className="relative z-10 px-6">
        <Reveal>
          <div className="mx-auto h-64 w-52 overflow-hidden rounded-t-full border-[3px] border-gold shadow-soft">
            <img src={wedding.gallery[2]} alt="Foto pasangan" loading="lazy" className="h-full w-full object-cover animate-kenburns" />
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xs font-serif text-lg font-semibold leading-snug tracking-[0.15em] text-cocoa">
            THANK YOU FOR BEING PART OF OUR SPECIAL DAY
          </p>
        </Reveal>
        <Divider />
        <Reveal delay={0.3}>
          <p className="font-script text-6xl text-gold-shimmer">{wedding.shortNames.groom} & {wedding.shortNames.bride}</p>
        </Reveal>
      </div>
      <div className="relative z-10 -mb-4 mt-6"><FlowerBorder /></div>
    </section>
  );
}
