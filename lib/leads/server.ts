import "server-only";

import { createHash } from "node:crypto";
import { get, head, list, put } from "@vercel/blob";
import { OFFER } from "./offer";
import type { LeadInput } from "./schema";

/**
 * Lead storage.
 *
 * Each lead is one JSON file in a private Vercel Blob store (token in
 * BLOB_READ_WRITE_TOKEN). Private blobs need that token to read, so nothing
 * here is reachable from the web; only the admin page lists them.
 *
 * The file is named after a hash of the email address, which makes saving
 * idempotent: a second submission from the same address finds the first and
 * is not stored twice.
 */

/** The code is configurable so it can change without a deploy; OCT80 is this campaign's. */
export const COUPON_CODE = process.env.LEAD_COUPON_CODE || "OCT80";

const PREFIX = "leads/";

export interface StoredLead {
  id: string;
  fullName: string;
  email: string;
  country: string;
  challengeSize: string;
  timeline: string;
  submittedAt: string;
  couponCode: string;
  source: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
  marketingConsent: boolean;
  /** For deduplicating with Meta CAPI or a CRM sync. */
  eventId: string;
  landingUrl: string | null;
}

export function isLeadStoreConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

const pathFor = (email: string) => `${PREFIX}${createHash("sha256").update(email).digest("hex").slice(0, 40)}.json`;

async function exists(pathname: string): Promise<boolean> {
  try {
    await head(pathname);
    return true;
  } catch {
    return false;
  }
}

export async function saveLead(
  input: LeadInput,
  landingUrl: string | null
): Promise<{ lead: StoredLead; duplicate: boolean }> {
  const pathname = pathFor(input.email);
  const lead: StoredLead = {
    id: pathname.slice(PREFIX.length, -5),
    fullName: input.fullName,
    email: input.email,
    country: input.country,
    challengeSize: input.challengeSize,
    timeline: input.timeline,
    submittedAt: new Date().toISOString(),
    couponCode: COUPON_CODE,
    source: OFFER.source,
    utmSource: input.utm.utm_source ?? null,
    utmMedium: input.utm.utm_medium ?? null,
    utmCampaign: input.utm.utm_campaign ?? null,
    utmContent: input.utm.utm_content ?? null,
    utmTerm: input.utm.utm_term ?? null,
    marketingConsent: input.marketingConsent,
    eventId: input.eventId,
    landingUrl,
  };

  if (await exists(pathname)) return { lead, duplicate: true };
  try {
    await put(pathname, JSON.stringify(lead), {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: false,
    });
    return { lead, duplicate: false };
  } catch (error) {
    // Two submissions racing: the other one won, and the lead is saved.
    if (await exists(pathname)) return { lead, duplicate: true };
    throw error;
  }
}

/** Every stored lead, newest first. Server-only: called by the admin page. */
export async function listLeads(): Promise<StoredLead[]> {
  const pathnames: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: PREFIX, cursor, limit: 1000 });
    pathnames.push(...page.blobs.map((b) => b.pathname));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  const leads: StoredLead[] = [];
  const BATCH = 20;
  for (let i = 0; i < pathnames.length; i += BATCH) {
    const batch = await Promise.all(
      pathnames.slice(i, i + BATCH).map(async (pathname) => {
        try {
          const result = await get(pathname, { access: "private" });
          if (!result || result.statusCode !== 200) return null;
          return JSON.parse(await new Response(result.stream).text()) as StoredLead;
        } catch {
          return null;
        }
      })
    );
    for (const lead of batch) if (lead) leads.push(lead);
  }
  return leads.sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
}
