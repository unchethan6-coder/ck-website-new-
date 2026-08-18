import type { AppLocale } from "./routing";

export interface LocaleMeta {
  label: string;      // native name, shown in the switcher
  englishName: string;
  dir: "ltr" | "rtl";
  ogLocale: string;
  currency: "USD" | "GBP" | "EUR";
}

export const LOCALES: Record<AppLocale, LocaleMeta> = {
  en: { label: "English", englishName: "English", dir: "ltr", ogLocale: "en_US", currency: "USD" },
  es: { label: "Español", englishName: "Spanish", dir: "ltr", ogLocale: "es_ES", currency: "USD" },
  pt: { label: "Português", englishName: "Portuguese (Brazil)", dir: "ltr", ogLocale: "pt_BR", currency: "USD" },
  ar: { label: "العربية", englishName: "Arabic", dir: "rtl", ogLocale: "ar", currency: "USD" },
  de: { label: "Deutsch", englishName: "German", dir: "ltr", ogLocale: "de_DE", currency: "USD" },
  fr: { label: "Français", englishName: "French", dir: "ltr", ogLocale: "fr_FR", currency: "USD" },
  hi: { label: "हिन्दी", englishName: "Hindi", dir: "ltr", ogLocale: "hi_IN", currency: "USD" },
};

export function getLocaleMeta(locale: AppLocale): LocaleMeta {
  return LOCALES[locale];
}
