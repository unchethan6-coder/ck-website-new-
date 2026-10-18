import "server-only";

import { createHash } from "node:crypto";
import type { StoredLead } from "./server";

/**
 * Where a saved lead goes next. Each step is optional and switched on by its
 * environment variables; none of them can stop a lead from being saved.
 *
 *   LEAD_WEBHOOK_URL         POSTs the lead as JSON (Zapier, Make, a CRM's inbound hook…).
 *   LEAD_WEBHOOK_SECRET      Sent as the X-Webhook-Secret header, if set.
 *   NEXT_PUBLIC_META_PIXEL_ID + META_CAPI_ACCESS_TOKEN
 *                            Sends the Lead event to Meta's Conversions API with the same
 *                            event ID the browser Pixel uses, so Meta counts it once.
 */

const TIMEOUT_MS = 4000;

async function post(url: string, body: unknown, headers: Record<string, string> = {}) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`${res.status} from ${new URL(url).host}`);
}

export async function forwardToWebhook(lead: StoredLead) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return;
  const secret = process.env.LEAD_WEBHOOK_SECRET;
  await post(url, { type: "lead.created", lead }, secret ? { "X-Webhook-Secret": secret } : {});
}

const sha256 = (v: string) => createHash("sha256").update(v.trim().toLowerCase()).digest("hex");

export interface BrowserContext {
  ip: string | null;
  userAgent: string | null;
  fbp: string | null;
  fbc: string | null;
  /** The visitor accepted marketing cookies in the cookie notice. */
  trackingConsent: boolean;
}

export async function sendMetaLead(lead: StoredLead, ctx: BrowserContext) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  // Same rule as the browser Pixel: nothing goes to Meta without consent.
  if (!pixelId || !token || !ctx.trackingConsent) return;

  const [first, ...rest] = lead.fullName.split(" ");
  const userData: Record<string, unknown> = {
    em: [sha256(lead.email)],
    fn: [sha256(first)],
    country: [sha256(lead.country)],
  };
  if (rest.length) userData.ln = [sha256(rest.join(" "))];
  if (ctx.ip) userData.client_ip_address = ctx.ip;
  if (ctx.userAgent) userData.client_user_agent = ctx.userAgent;
  if (ctx.fbp) userData.fbp = ctx.fbp;
  if (ctx.fbc) userData.fbc = ctx.fbc;

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.parse(lead.submittedAt) / 1000),
        event_id: lead.eventId,
        action_source: "website",
        event_source_url: lead.landingUrl ?? undefined,
        user_data: userData,
        custom_data: { content_name: lead.source, challenge_size: lead.challengeSize },
      },
    ],
  };
  if (process.env.META_CAPI_TEST_EVENT_CODE) body.test_event_code = process.env.META_CAPI_TEST_EVENT_CODE;

  await post(`https://graph.facebook.com/v21.0/${encodeURIComponent(pixelId)}/events?access_token=${encodeURIComponent(token)}`, body);
}
