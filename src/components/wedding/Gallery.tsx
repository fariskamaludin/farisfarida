import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { wedding } from "@/config/wedding";
import { Reveal, ScriptTitle } from "./primitives";

const spans = ["row-span-2", "", "", "row-span-2", "", ""];

export function Gallery() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section className="relative px-5 py-14">
      <ScriptTitle>Galeri Foto</ScriptTitle>
      <div className="mt-8 grid auto-rows-[120px] grid-cols-2 gap-3">
        {wedding.gallery.map((src, i) => (
          <Reveal key={i} delay={(i % 2) * 0.1} className={spans[i % spans.length]}>
            <button onClick={() => setOpen(src)} className="group h-full w-full overflow-hidden rounded-2xl border-[3px] border-ivory shadow-soft outline outline-1 outline-gold/60">
              <img src={src} alt={`Galeri ${i + 1}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </button>
          </Reveal>
        ))}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)} className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa/85 p-5">
            <motion.img initial={{ scale: 0.7 }} animate={{ scale: 1 }} exit={{ scale: 0.7 }} transition={{ type: "spring", damping: 22 }} src={open} alt="" className="max-h-[85vh] max-w-full rounded-2xl border-2 border-gold" />
            <button aria-label="Tutup" className="absolute right-4 top-4 rounded-full bg-ivory p-2 text-cocoa"><X className="h-5 w-5" /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
