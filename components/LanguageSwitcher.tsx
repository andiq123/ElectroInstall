"use client";

import { startTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import type { Locale } from "@/lib/locales";

interface LanguageSwitcherProps {
  locale: Locale;
}

function buildLocaleHref(
  pathname: string,
  search: string,
  locale: Locale
) {
  const nextSearchParams = new URLSearchParams(search);

  if (locale === "ro") {
    nextSearchParams.delete("lang");
  } else {
    nextSearchParams.set("lang", locale);
  }

  const query = nextSearchParams.toString();
  return query ? `${pathname}?${query}` : pathname;
}

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { setLocale } = useLanguage();

  const switchLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) {
      return;
    }

    setLocale(nextLocale);
    document.cookie = `locale=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.lang = nextLocale;

    startTransition(() => {
      router.replace(buildLocaleHref(pathname, window.location.search, nextLocale), {
        scroll: false,
      });
    });
  };

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-zinc-200/80 bg-zinc-100/90 p-1">
      <button
        type="button"
        onClick={() => switchLocale("ro")}
        aria-label="Schimbă limba în Română"
        aria-current={locale === "ro" ? "true" : "false"}
        disabled={locale === "ro"}
        className={`min-w-[2.25rem] rounded-full px-3 py-1.5 text-[0.625rem] font-bold uppercase tracking-[0.12em] transition-all duration-200 ${
          locale === "ro"
            ? "bg-[var(--accent-light)] text-zinc-900 shadow-sm ring-1 ring-amber-500/25"
            : "text-zinc-500 hover:bg-white/70 hover:text-zinc-800"
        }`}
      >
        RO
      </button>
      <button
        type="button"
        onClick={() => switchLocale("ru")}
        aria-label="Сменить язык на Русский"
        aria-current={locale === "ru" ? "true" : "false"}
        disabled={locale === "ru"}
        className={`min-w-[2.25rem] rounded-full px-3 py-1.5 text-[0.625rem] font-bold uppercase tracking-[0.12em] transition-all duration-200 ${
          locale === "ru"
            ? "bg-[var(--accent-light)] text-zinc-900 shadow-sm ring-1 ring-amber-500/25"
            : "text-zinc-500 hover:bg-white/70 hover:text-zinc-800"
        }`}
      >
        RU
      </button>
    </div>
  );
}
