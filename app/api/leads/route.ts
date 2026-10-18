import { NextResponse } from "next/server";
import { validateLead } from "@/lib/leads/schema";
import { COUPON_CODE, isLeadStoreConfigured, saveLead } from "@/lib/leads/server";
import { forwardToWebhook, sendMetaLead } from "@/lib/leads/integrations";

/**
 * Saves a lead from the 80% OFF landing page and, only then, returns the
 * coupon code. The code is never in the page itself.
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Per-instance throttle: enough to blunt a script hammering the form.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 8;
const hits = new Map<string, number[]>();

function throttled(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
  if (ip && throttled(ip)) {
    return json({ ok: false, error: "Too many attempts. Please wait a few minutes and try again." }, 429);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  // Honeypot: a field people never see. Bots that fill it get a quiet "success" and no code.
  if (typeof body.website === "string" && body.website.trim()) {
    return json({ ok: true, coupon: null });
  }

  const result = validateLead(body);
  if (!result.lead) return json({ ok: false, error: "Please check the highlighted fields.", fields: result.errors }, 422);

  if (!isLeadStoreConfigured()) {
    console.error("[leads] BLOB_READ_WRITE_TOKEN is not set; lead not saved");
    return json({ ok: false, error: "We couldn't save your details right now. Please try again shortly." }, 503);
  }

  const landingUrl = typeof body.landingUrl === "string" ? body.landingUrl.slice(0, 500) : null;

  let saved;
  try {
    saved = await saveLead(result.lead, landingUrl);
  } catch (error) {
    console.error("[leads] save failed", error);
    return json({ ok: false, error: "We couldn't save your details right now. Please try again." }, 502);
  }

  // A repeat submission is already in the CRM and already counted by Meta.
  if (!saved.duplicate) {
    const str = (v: unknown) => (typeof v === "string" && v ? v.slice(0, 300) : null);
    const outcomes = await Promise.allSettled([
      forwardToWebhook(saved.lead),
      sendMetaLead(saved.lead, {
        ip,
        userAgent: request.headers.get("user-agent"),
        fbp: str(body.fbp),
        fbc: str(body.fbc),
        trackingConsent: body.trackingConsent === true,
      }),
    ]);
    for (const o of outcomes) if (o.status === "rejected") console.error("[leads] integration failed", o.reason);
  }

  return json({ ok: true, coupon: COUPON_CODE, eventId: saved.lead.eventId, duplicate: saved.duplicate });
}
