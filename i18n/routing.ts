import { defineRouting } from "next-intl/routing";

export const locales = ["en", "es", "pt", "ar", "de", "fr", "hi"] as const;
export type AppLocale = (typeof locales)[number];
export const defaultLocale = "en" as const;

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
  localeCookie: {
    name: "NEXT_LOCALE",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  },
});
