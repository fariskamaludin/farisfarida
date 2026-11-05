import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FlyingBirds } from "@/components/wedding/FlyingBirds";
import { MusicButton, playMusic } from "@/components/wedding/BackgroundMusic";

const DEFAULT_GUEST = "Valued Guest";
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
import { StackCard } from "@/components/wedding/StackCard";

const title = `The Wedding of ${wedding.shortNames.groom} & ${wedding.shortNames.bride}`;

export const Route = createFileRoute("/")({
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
  const [guest, setGuest] = useState(DEFAULT_GUEST);
  const [opened, setOpened] = useState(false);
  const [birds, setBirds] = useState(false);
  const opening = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    // URLSearchParams decodes %20 etc.; rendered as plain text by React (no HTML injection).
    const raw = new URLSearchParams(window.location.search).get("to");
    const name = raw?.trim().slice(0, 80);
    if (name) setGuest(name);
    return () => clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
  }, [opened]);

  const handleOpen = () => {
    if (opening.current) return;
    opening.current = true;
    playMusic(); // inside the click gesture so iOS/Android allow it
    setBirds(true);
    timer.current = setTimeout(() => {
      setOpened(true);
      timer.current = setTimeout(() => setBirds(false), 1500);
    }, 1100);
  };

  return (
    <div className="relative min-h-screen">
      {/* fixed decorative background */}
      <div aria-hidden className="fixed inset-0 -z-10 bg-cover bg-bottom" style={{ backgroundImage: `url(${bg})` }} />
      <div className="mx-auto w-full max-w-[440px] sm:py-6">
        <main className="relative min-h-screen overflow-clip bg-ivory shadow-card sm:rounded-[2rem] sm:border sm:border-gold/70">
          <AnimatePresence>{!opened && <Cover key="cover" guest={guest} onOpen={handleOpen} />}</AnimatePresence>
          <StackCard index={0}>
            <Hero />
          </StackCard>
          <StackCard index={1}>
            <Opening />
          </StackCard>
          <StackCard index={2}>
            <Couple />
          </StackCard>
          <StackCard index={3}>
            <Countdown />
          </StackCard>
          <StackCard index={4}>
            <Events />
          </StackCard>
          <StackCard index={5}>
            <LoveStory />
          </StackCard>
          <StackCard index={6}>
            <Gallery />
          </StackCard>
          <StackCard index={7}>
            <Gift />
          </StackCard>
          <StackCard index={8}>
            <Rsvp key={guest} defaultName={guest === DEFAULT_GUEST ? "" : guest} />
          </StackCard>
          <StackCard index={9} last>
            <><Closing />
            <footer className="py-6 text-center text-[10px] tracking-widest text-muted-foreground">Made with love 🌸</footer></>
          </StackCard>
        </main>
      </div>
      {opened && <Petals count={12} />}
      {birds && <FlyingBirds />}
      {opened && <MusicButton />}
    </div>
  );
}
