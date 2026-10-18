"use client";

import { getCookieConsent } from "@/components/shared/CookieConsent";

/**
 * Meta Pixel and Google Analytics 4 for the landing page.
 *
 * IDs come from NEXT_PUBLIC_META_PIXEL_ID and NEXT_PUBLIC_GA4_ID; with neither
 * set, nothing loads. Nothing loads either until the visitor accepts all
 * cookies in the cookie notice. Each script is installed once per page, so a
 * re-render cannot send a second PageView.
 */

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

type Fbq = ((...args: unknown[]) => void) & { callMethod?: (...a: unknown[]) => void; queue: unknown[]; loaded?: boolean; version?: string; push?: unknown };

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __ckTrackingStarted?: boolean;
  }
}

function addScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function startPixel(id: string) {
  if (window.fbq) return;
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.push = fbq;
  window.fbq = fbq;
  window._fbq = fbq;
  addScript("https://connect.facebook.net/en_US/fbevents.js");
  fbq("init", id);
  fbq("track", "PageView");
}

function startGa(id: string) {
  if (window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js reads the arguments object itself.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  addScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`);
  window.gtag("js", new Date());
  window.gtag("config", id); // sends page_view
}

export function trackingAllowed(): boolean {
  return getCookieConsent() === "all";
}

/** Load the tags (with their PageView) now if consent exists, or as soon as it is given. */
export function startLandingTracking(): () => void {
  if (!PIXEL_ID && !GA4_ID) return () => {};
  const start = () => {
    if (window.__ckTrackingStarted || !trackingAllowed()) return;
    window.__ckTrackingStarted = true;
    if (PIXEL_ID) startPixel(PIXEL_ID);
    if (GA4_ID) startGa(GA4_ID);
  };
  start();
  window.addEventListener("ck:cookie-consent", start);
  return () => window.removeEventListener("ck:cookie-consent", start);
}

/** Call once, after the lead is saved — never on a click. */
export function trackLeadSaved(eventId: string, challengeSize: string) {
  if (!window.__ckTrackingStarted) return;
  window.fbq?.("track", "Lead", { content_name: "CK 80% Landing Page", challenge_size: challengeSize }, { eventID: eventId });
  window.fbq?.("trackCustom", "CouponUnlocked", { offer: "80% OFF" }, { eventID: `${eventId}-coupon` });
  window.gtag?.("event", "generate_lead", { lead_source: "CK 80% Landing Page", challenge_size: challengeSize });
  window.gtag?.("event", "coupon_unlocked", { offer: "80% OFF" });
}

/** Meta's browser cookies, passed to the server so its CAPI event matches this visitor. */
export function metaCookies(): { fbp: string | null; fbc: string | null } {
  const read = (name: string) => document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))?.[1] ?? null;
  let fbc = read("_fbc");
  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  if (!fbc && fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;
  return { fbp: read("_fbp"), fbc };
}
