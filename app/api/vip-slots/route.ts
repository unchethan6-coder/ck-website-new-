import { NextResponse } from "next/server";
import { VIP_OFFER } from "@/lib/vipOffer";

/**
 * How many of the VIP offer's accounts have been claimed.
 *
 * The number must be real, so it comes from one of two places and nowhere
 * else; with neither set, `claimed` is null and the page shows only the cap.
 *
 *   VIP_SLOTS_CLAIMED_URL  An endpoint (e.g. on my.ckpropfirm.com) returning
 *                          JSON with a numeric `claimed` (or `count`) field:
 *                          the orders placed with the VIP code.
 *   VIP_SLOTS_CLAIMED      A count you set by hand from the order system.
 */

export const dynamic = "force-dynamic";

async function claimed(): Promise<number | null> {
  const url = process.env.VIP_SLOTS_CLAIMED_URL;
  if (url) {
    try {
      const res = await fetch(url, {
        headers: process.env.VIP_SLOTS_CLAIMED_TOKEN ? { Authorization: `Bearer ${process.env.VIP_SLOTS_CLAIMED_TOKEN}` } : {},
        signal: AbortSignal.timeout(4000),
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        const n = Number(data?.claimed ?? data?.count);
        if (Number.isFinite(n) && n >= 0) return Math.floor(n);
      }
    } catch (e) {
      console.error("[vip-slots] source failed", e);
    }
    return null;
  }
  const manual = Number(process.env.VIP_SLOTS_CLAIMED);
  return process.env.VIP_SLOTS_CLAIMED && Number.isFinite(manual) && manual >= 0 ? Math.floor(manual) : null;
}

export async function GET() {
  const n = await claimed();
  return NextResponse.json(
    { total: VIP_OFFER.slots, claimed: n === null ? null : Math.min(n, VIP_OFFER.slots) },
    { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } }
  );
}
