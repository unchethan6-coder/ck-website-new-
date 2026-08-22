"use client";
import React from "react";
import { cn } from "@/lib/utils";

export interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function SectionReveal({
  children,
  className,
}: SectionRevealProps) {
  return (
    <div className={cn(className)}>
      {children}
    </div>
  );
}
