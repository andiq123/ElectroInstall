import { ro } from "@/lib/locales/ro";
import { ru } from "@/lib/locales/ru";

export const LOCALES = ["ro", "ru"] as const;

export type Locale = (typeof LOCALES)[number];
export type Translations = typeof ro;

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "ro" || value === "ru";
}

export function getTranslations(locale: Locale): Translations {
  return locale === "ru" ? ru : ro;
}
