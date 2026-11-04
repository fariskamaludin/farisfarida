import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import flowers from "@/assets/flowers-border.png";

export function Reveal({ children, delay = 0, y = 24, x = 0, className, ...rest }: { children: ReactNode; delay?: number; y?: number; x?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function ScriptTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <Reveal>
      <h2 className={`font-script text-gold-shimmer text-5xl leading-tight text-center ${className}`}>{children}</h2>
    </Reveal>
  );
}

export function Divider() {
  return (
    <div className="flex items-center justify-center gap-3 my-4 text-gold" aria-hidden>
      <span className="h-px w-12 bg-gold/60" />
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c1.5 3 4 5.5 7 7-3 1.5-5.5 4-7 7-1.5-3-4-5.5-7-7 3-1.5 5.5-4 7-7z" opacity=".85"/></svg>
      <span className="h-px w-12 bg-gold/60" />
    </div>
  );
}

export function FlowerBorder({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <motion.img
      src={flowers}
      alt=""
      aria-hidden
      loading="lazy"
      width={1536}
      height={640}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: "easeOut" }}
      className={`pointer-events-none select-none w-[130%] max-w-none -ml-[15%] ${flip ? "rotate-180" : ""} ${className}`}
    />
  );
}

export function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`relative overflow-hidden px-6 py-16 ${className}`}>
      {children}
    </section>
  );
}
