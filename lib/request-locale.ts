import "server-only";

import { cookies, headers } from "next/headers";
import { isLocale, type Locale } from "@/lib/locales";

function getHeaderLocale(acceptLanguage: string | null): Locale {
  const normalized = acceptLanguage?.toLowerCase() ?? "";

  if (normalized.includes("ru")) {
    return "ru";
  }

  return "ro";
}

export async function resolveRequestLocale(
  preferredLocale?: string | null
): Promise<Locale> {
  if (isLocale(preferredLocale)) {
    return preferredLocale;
  }

  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("locale")?.value;

  if (isLocale(cookieLocale)) {
    return cookieLocale;
  }

  const headerStore = await headers();
  return getHeaderLocale(headerStore.get("accept-language"));
}
