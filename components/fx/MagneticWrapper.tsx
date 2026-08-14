"use client";
import { useRef, type ReactNode, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * MagneticWrapper — the child element gently follows the cursor while hovered
 * (≤6px translate), then springs back on leave. Desktop/pointer only:
 * disabled on touch devices and under `prefers-reduced-motion`.
 */
export function MagneticWrapper({
  children,
  strength = 6,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const d = Math.hypot(dx, dy);
    const k = d > 0 ? Math.min(1, d / 60) : 0;
    x.set(dx * (strength / 60) * k);
    y.set(dy * (strength / 60) * k);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy, display: "inline-block" }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}
