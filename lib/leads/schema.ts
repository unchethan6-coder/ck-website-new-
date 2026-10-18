/**
 * Lead form validation, shared by the form (for instant feedback) and the API
 * (which is the one that counts).
 */

import { CHALLENGE_SIZES, TIMELINES, UTM_KEYS, type ChallengeSize, type Timeline, type UtmKey } from "./offer";
import { COUNTRY_CODES } from "./countries";

export interface LeadInput {
  fullName: string;
  email: string;
  country: string;
  challengeSize: ChallengeSize;
  timeline: Timeline;
  marketingConsent: boolean;
  utm: Partial<Record<UtmKey, string>>;
  /** Shared by the browser Pixel event and the server CAPI event so Meta counts the lead once. */
  eventId: string;
}

export type LeadField = "fullName" | "email" | "country" | "challengeSize" | "timeline";
export type LeadErrors = Partial<Record<LeadField, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EVENT_ID = /^[A-Za-z0-9-]{8,64}$/;

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export function validateLead(raw: unknown): { lead: LeadInput; errors: null } | { lead: null; errors: LeadErrors } {
  const body = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const errors: LeadErrors = {};

  const fullName = str(body.fullName, 120).replace(/\s+/g, " ");
  if (fullName.length < 2) errors.fullName = "Please enter your full name.";

  const email = str(body.email, 254).toLowerCase();
  if (!EMAIL.test(email)) errors.email = "Please enter a valid email address.";

  const country = str(body.country, 2).toUpperCase();
  if (!COUNTRY_CODES.includes(country)) errors.country = "Please choose your country.";

  const challengeSize = str(body.challengeSize, 20) as ChallengeSize;
  if (!CHALLENGE_SIZES.includes(challengeSize)) errors.challengeSize = "Please choose a challenge size.";

  const timeline = str(body.timeline, 20) as Timeline;
  if (!TIMELINES.includes(timeline)) errors.timeline = "Please choose when you plan to start.";

  if (Object.keys(errors).length) return { lead: null, errors };

  const utmRaw = (body.utm && typeof body.utm === "object" ? body.utm : {}) as Record<string, unknown>;
  const utm: LeadInput["utm"] = {};
  for (const key of UTM_KEYS) {
    const v = str(utmRaw[key], 200);
    if (v) utm[key] = v;
  }

  const eventId = str(body.eventId, 64);

  return {
    lead: {
      fullName,
      email,
      country,
      challengeSize,
      timeline,
      marketingConsent: body.marketingConsent === true,
      utm,
      eventId: EVENT_ID.test(eventId) ? eventId : crypto.randomUUID(),
    },
    errors: null,
  };
}
