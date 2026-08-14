"use client";
import { cn } from "@/lib/utils";

/**
 * Aurora atmosphere — layered gold radial glows + optional dot grid.
 * All animation lives in the `.fx-aurora-*` CSS classes (GPU-safe,
 * reduced-motion-gated). This component is decorative only.
 *
 * `variant="hero"`  → full stack: top glow + ambient + core + optional grid.
 * `variant="section"` → single top glow at reduced alpha.
 */
export function Aurora({
  variant = "section",
  grid = false,
  className,
}: {
  variant?: "hero" | "section";
  grid?: boolean;
  className?: string;
}) {
  if (variant === "hero") {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden",
          className
        )}
      >
        <div className="fx-aurora-a absolute inset-0" />
        <div className="fx-aurora-b absolute inset-0" />
        <div className="fx-aurora-core absolute inset-0" />
        {grid && <div className="fx-aurora-dots absolute inset-0" />}
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div className="fx-aurora-a absolute inset-0 opacity-40" />
    </div>
  );
}
