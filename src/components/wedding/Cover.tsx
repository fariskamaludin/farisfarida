import { motion } from "framer-motion";
import { MailOpen } from "lucide-react";
import { wedding } from "@/config/wedding";
import mountains from "@/assets/mountains.jpg";
import { FlowerBorder } from "./primitives";

export function Cover({ guest, onOpen }: { guest: string; onOpen: () => void }) {
  return (
    <motion.div
      key="cover"
      exit={{ y: "-100%", opacity: 0.6 }}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
      className="absolute inset-0 z-40 flex flex-col items-center overflow-hidden paper"
    >
      <img src={mountains} alt="" aria-hidden className="absolute inset-x-0 top-0 h-[55%] w-full object-cover opacity-60" />
      <div className="absolute inset-x-0 top-[35%] h-[25%] fade-to-ivory" />
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-10 text-center">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-serif text-xs tracking-[0.4em] text-rosewood">
          THE WEDDING OF
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.2 }}
          className="relative mt-5 h-52 w-40 overflow-hidden rounded-[50%] border-[3px] border-gold shadow-soft"
        >
          <img src={wedding.cover} alt="Foto pasangan" className="h-full w-full object-cover animate-kenburns" />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1 }} className="mt-5 font-script text-6xl leading-none text-gold-shimmer">
          {wedding.shortNames.groom} <span className="text-4xl">&</span> {wedding.shortNames.bride}
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="mt-3 font-serif text-lg tracking-[0.25em] text-rosewood">
          {wedding.dateLabel}
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="mt-6">
          <p className="text-[11px] tracking-widest text-muted-foreground">Kepada Yth. Bapak/Ibu/Saudara/i</p>
          <p className="mt-1 font-serif text-2xl font-semibold text-cocoa">{guest}</p>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          whileTap={{ scale: 0.94 }}
          whileHover={{ scale: 1.03 }}
          onClick={onOpen}
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-rose-gradient px-6 py-3 text-xs font-semibold tracking-[0.2em] text-primary-foreground shadow-soft"
        >
          <MailOpen className="h-4 w-4" /> BUKA UNDANGAN
        </motion.button>
      </div>
      <div className="relative z-10 -mb-6 w-full">
        <FlowerBorder />
      </div>
    </motion.div>
  );
}
