"use client";

import { usePathname } from "next/navigation";
import { isVipPath, toVipCopy } from "@/lib/vipOffer";

/**
 * Lets shared homepage sections adapt on the 90% OFF copy without props:
 * offer copy reads 90% instead of the public percentage, and the "start a
 * challenge" links stay on the page instead of jumping to the public homepage.
 */
export function useVipOffer() {
  const vip = isVipPath(usePathname());
  return {
    vip,
    copy: (text: string) => (vip ? toVipCopy(text) : text),
    challengeHref: vip ? "#start-challenge" : "/#start-challenge",
  };
}
