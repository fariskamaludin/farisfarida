import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { z } from "zod";
import bg from "@/assets/bg-floral.jpg";
import { wedding } from "@/config/wedding";
import { Cover } from "@/components/wedding/Cover";
import { Hero, Opening } from "@/components/wedding/Opening";
import { Couple } from "@/components/wedding/Couple";
import { Countdown } from "@/components/wedding/Countdown";
import { Events } from "@/components/wedding/Events";
import { LoveStory } from "@/components/wedding/LoveStory";
import { Gallery } from "@/components/wedding/Gallery";
import { Gift } from "@/components/wedding/Gift";
import { Rsvp } from "@/components/wedding/Rsvp";
import { Closing } from "@/components/wedding/Closing";
import { Petals } from "@/components/wedding/Petals";

const title = `The Wedding of ${wedding.shortNames.groom} & ${wedding.shortNames.bride}`;

export const Route = createFileRoute("/")({
  validateSearch: z.object({ to: z.string().max(60).optional() }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: `Undangan pernikahan ${wedding.shortNames.groom} & ${wedding.shortNames.bride} — ${wedding.dateLabel}` },
      { property: "og:title", content: title },
      { property: "og:description", content: `Kami mengundang Anda di hari bahagia kami, ${wedding.dateLabel}.` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { to } = Route.useSearch();
  const guest = to?.trim() || "Tamu Undangan";
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
  }, [opened]);

  return (
    <div className="relative min-h-screen">
      {/* fixed decorative background */}
      <div aria-hidden className="fixed inset-0 -z-10 bg-cover bg-bottom" style={{ backgroundImage: `url(${bg})` }} />
      <div className="mx-auto w-full max-w-[440px] sm:py-6">
        <main className="relative min-h-screen overflow-hidden bg-ivory shadow-card sm:rounded-[2rem] sm:border sm:border-gold/70">
          <AnimatePresence>{!opened && <Cover key="cover" guest={guest} onOpen={() => setOpened(true)} />}</AnimatePresence>
          <Hero />
          <Opening />
          <Couple />
          <Countdown />
          <Events />
          <LoveStory />
          <Gallery />
          <Gift />
          <Rsvp defaultName={guest} />
          <Closing />
          <footer className="py-6 text-center text-[10px] tracking-widest text-muted-foreground">Made with love 🌸</footer>
        </main>
      </div>
      {opened && <Petals count={12} />}
    </div>
  );
}
