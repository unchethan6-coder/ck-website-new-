/**
 * The 80% OFF lead campaign.
 *
 * The coupon itself is not here on purpose: anything in this file can end up
 * in the page's JavaScript, and the code must only reach a visitor after their
 * lead is saved. It is read on the server (see lib/leads/server.ts).
 */

export const OFFER = {
  /** Shown on the page and stored with each lead. */
  source: "CK 80% Landing Page",
  discount: "80%",
  claimUrl: "https://my.ckpropfirm.com/challenges/new",
} as const;

export const CHALLENGE_SIZES = ["10K", "25K", "50K", "100K", "200K", "300K", "Not Sure Yet"] as const;
export const TIMELINES = ["Today", "This Week", "This Month", "Just Exploring"] as const;

export type ChallengeSize = (typeof CHALLENGE_SIZES)[number];
export type Timeline = (typeof TIMELINES)[number];

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
export type UtmKey = (typeof UTM_KEYS)[number];
