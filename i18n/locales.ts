import type { AppLocale } from "./routing";

export interface LocaleMeta {
  label: string;      // native name, shown in the switcher
  englishName: string;
  flag: string;
  dir: "ltr" | "rtl";
  ogLocale: string;
  currency: "USD" | "GBP" | "EUR";
}

export const LOCALES: Record<AppLocale, LocaleMeta> = {
  en: { label: "English", englishName: "English", flag: "🇬🇧", dir: "ltr", ogLocale: "en_US", currency: "USD" },
  es: { label: "Español", englishName: "Spanish", flag: "🇪🇸", dir: "ltr", ogLocale: "es_ES", currency: "USD" },
  pt: { label: "Português", englishName: "Portuguese (Brazil)", flag: "🇧🇷", dir: "ltr", ogLocale: "pt_BR", currency: "USD" },
  ar: { label: "العربية", englishName: "Arabic", flag: "🇦🇪", dir: "rtl", ogLocale: "ar", currency: "USD" },
  de: { label: "Deutsch", englishName: "German", flag: "🇩🇪", dir: "ltr", ogLocale: "de_DE", currency: "USD" },
  fr: { label: "Français", englishName: "French", flag: "🇫🇷", dir: "ltr", ogLocale: "fr_FR", currency: "USD" },
  hi: { label: "हिन्दी", englishName: "Hindi", flag: "🇮🇳", dir: "ltr", ogLocale: "hi_IN", currency: "USD" },
};

export function getLocaleMeta(locale: AppLocale): LocaleMeta {
  return LOCALES[locale];
}
