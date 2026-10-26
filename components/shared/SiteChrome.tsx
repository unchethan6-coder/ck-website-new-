"use client";

import { usePathname } from "next/navigation";
import { isVipPath } from "@/lib/vipOffer";

/**
 * Hides the site's navigation, footer and support widget on pages that stand
 * alone: the 80% OFF campaign page and the leads admin.
 */
const STANDALONE = [/^\/[a-z]{2}\/80-off\/?$/, /^\/[a-z]{2}\/admin(\/|$)/];

export function isStandalonePath(pathname: string | null): boolean {
  return !!pathname && STANDALONE.some((re) => re.test(pathname));
}

export function SiteChrome({ children, hideOnVip = false }: { children: React.ReactNode; hideOnVip?: boolean }) {
  const pathname = usePathname();
  if (isStandalonePath(pathname) || (hideOnVip && isVipPath(pathname))) return null;
  return <>{children}</>;
}
