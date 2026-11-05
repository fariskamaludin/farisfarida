import { motion, useScroll, useTransform } from "framer-motion";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/**
 * Full-screen card that sticks while the next card slides up over it.
 * Tall cards stick at their bottom edge so all content stays reachable.
 */
export function StackCard({ children, index, last = false }: { children: ReactNode; index: number; last?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(0);

  useLayoutEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const update = () => setTop(Math.min(0, window.innerHeight - el.offsetHeight));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => { ro.disconnect(); window.removeEventListener("resize", update); };
  }, []);

  // 0 → 1 while the next card travels from the bottom to the top of the viewport
  const { scrollYProgress } = useScroll({ target: endRef, offset: ["end end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, last ? 1 : 0.92]);
  const shade = useTransform(scrollYProgress, [0, 1], [0, last ? 0 : 0.45]);

  return (
    <>
      <div ref={cardRef} className="sticky" style={{ top, zIndex: index + 1 }}>
        <motion.div
          style={{ scale, transformOrigin: "50% 0%" }}
          className={`relative min-h-[100svh] overflow-hidden bg-ivory will-change-transform ${index ? "rounded-t-[2rem] shadow-[0_-18px_40px_-12px_color-mix(in_oklab,var(--rosewood)_45%,transparent)]" : ""}`}
        >
          {children}
          <motion.div aria-hidden style={{ opacity: shade }} className="pointer-events-none absolute inset-0 bg-cocoa" />
        </motion.div>
      </div>
      <div ref={endRef} aria-hidden className="h-0" />
    </>
  );
}
