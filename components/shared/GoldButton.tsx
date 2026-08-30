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
    sm: "px-3.5 py-1.5 text-xs font-bold",
    md: "px-5 py-2.5 text-sm font-extrabold",
    lg: "px-7 py-3.5 text-base font-black",
  };

  const variants = {
    gold: "gold-gradient-btn text-[#0A0A0C] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
    outline: "text-[#FFC107] border border-[#FFC107]/40 hover:border-[#FFC107] hover:bg-[#FFC107]/10 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
    ghost: "text-white/70 hover:text-[#FFC107] hover:bg-white/5 active:scale-[0.98]",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-200 ease-out cursor-pointer",
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
