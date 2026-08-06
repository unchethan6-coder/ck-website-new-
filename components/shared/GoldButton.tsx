"use client";
import { cn } from "@/lib/utils";

interface GoldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  variant?: "gold" | "outline" | "ghost";
  children: React.ReactNode;
}

export function GoldButton({
  size = "md",
  variant = "gold",
  className,
  children,
  ...props
}: GoldButtonProps) {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm font-semibold",
    lg: "px-7 py-3.5 text-base font-semibold",
  };

  const variants = {
    gold: "text-black bg-[image:var(--ck-gold-gradient)] hover:brightness-110 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]",
    outline: "text-[#d4af37] border border-[#d4af37]/40 hover:border-[#d4af37] hover:bg-[#d4af37]/10",
    ghost: "text-white/80 hover:text-white hover:bg-white/5",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-200 cursor-pointer",
        sizes[size],
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
