/**
 * The private 90% OFF copy of the homepage.
 *
 * /{locale}/vip-offer is the homepage as it stands, with every challenge
 * priced at 90% off its list price instead of the public discount. It is for
 * marketing links only: nothing on the site links to it, it is noindex, and
 * it is not in the sitemap, so ordinary visitors only ever see the homepage.
 */

import type { PlanDetails } from "./content";

export const VIP_OFFER = {
  slug: "vip-offer",
  discountPct: 90,
  /**
   * The checkout code that gives 90% off. Empty until CK supplies it: the
   * announcement bar shows no code while this is empty, rather than a code
   * that would charge the public price.
   */
  code: "",
  /** The public discount the shared copy is written around. */
  publicPct: 75,
} as const;

const VIP_PATH = new RegExp(`^/[a-z]{2}/${VIP_OFFER.slug}/?$`);

export function isVipPath(pathname: string | null | undefined): boolean {
  return !!pathname && VIP_PATH.test(pathname);
}

/** Swaps the public percentage for the VIP one in a piece of copy ("75% OFF" → "90% OFF"). */
export function toVipCopy(text: string): string {
  return text.replace(new RegExp(`\\b${VIP_OFFER.publicPct}(\\s?%)`, "g"), `${VIP_OFFER.discountPct}$1`);
}

const money = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/** Every plan re-priced to `pct` off its list price; rules and splits untouched. */
export function discountPlans(
  plans: Record<string, Record<string, PlanDetails | null>>,
  pct: number = VIP_OFFER.discountPct
): Record<string, Record<string, PlanDetails | null>> {
  return Object.fromEntries(
    Object.entries(plans).map(([size, byType]) => [
      size,
      Object.fromEntries(
        Object.entries(byType).map(([type, plan]) => {
          if (!plan) return [type, plan];
          const list = Number(plan.orig.replace(/[$,]/g, ""));
          if (!Number.isFinite(list) || list <= 0) return [type, plan];
          return [type, { ...plan, disc: money(Math.round(list * (100 - pct)) / 100) }];
        })
      ),
    ])
  );
}
