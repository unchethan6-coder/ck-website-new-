import type { Variants } from "framer-motion";

/** Shared scroll-reveal variants (upcomers-style easing). */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2 },
  },
};

export const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.02 },
  },
};

export const chipIn: Variants = {
  hidden: { opacity: 1, scale: 1 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2 },
  },
};
