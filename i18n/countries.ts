import type { AppLocale } from "./routing";

/**
 * Country → locale map for IP-based language detection. Covers the top
 * prop-firm markets; everything else falls through to the default locale.
 * Priority is maintained by iteration order (MENA Arabic before French
 * for Morocco/Algeria/Tunisia).
 */
export const COUNTRY_TO_LOCALE: Record<string, AppLocale> = {
  // Spanish (ES) — Spain + LatAm
  ES: "es",
  MX: "es",
  AR: "es",
  CO: "es",
  CL: "es",
  PE: "es",
  VE: "es",
  EC: "es",
  BO: "es",
  UY: "es",
  PY: "es",
  CR: "es",
  DO: "es",
  GT: "es",
  HN: "es",
  SV: "es",
  NI: "es",
  PA: "es",
  CU: "es",
  // Portuguese — Brazil + Portugal
  BR: "pt",
  PT: "pt",
  // Arabic — MENA
  DZ: "ar",
  EG: "ar",
  MA: "ar",
  SA: "ar",
  AE: "ar",
  IQ: "ar",
  JO: "ar",
  KW: "ar",
  LB: "ar",
  LY: "ar",
  OM: "ar",
  QA: "ar",
  SY: "ar",
  TN: "ar",
  YE: "ar",
  PS: "ar",
  // German
  DE: "de",
  AT: "de",
  // French — France + francophone
  FR: "fr",
  BE: "fr",
  // Hindi — India
  IN: "hi",
};

/** Sorted list of country codes that map to each locale (for docs/tests). */
export function countriesForLocale(locale: AppLocale): string[] {
  return Object.entries(COUNTRY_TO_LOCALE)
    .filter(([, loc]) => loc === locale)
    .map(([code]) => code);
}
