"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 p-1 bg-zinc-100/90 border border-zinc-200/80 rounded-full">
      <button
        onClick={() => setLocale("ro")}
        aria-label="Schimbă limba în Română"
        aria-current={locale === "ro" ? "true" : "false"}
        className={`min-w-[2.25rem] px-3 py-1.5 text-[0.625rem] font-bold uppercase tracking-[0.12em] rounded-full transition-all duration-200 ${
          locale === "ro"
            ? "bg-[var(--accent-light)] text-zinc-900 shadow-sm ring-1 ring-amber-500/25"
            : "text-zinc-500 hover:text-zinc-800 hover:bg-white/70"
        }`}
      >
        RO
      </button>
      <button
        onClick={() => setLocale("ru")}
        aria-label="Сменить язык на Русский"
        aria-current={locale === "ru" ? "true" : "false"}
        className={`min-w-[2.25rem] px-3 py-1.5 text-[0.625rem] font-bold uppercase tracking-[0.12em] rounded-full transition-all duration-200 ${
          locale === "ru"
            ? "bg-[var(--accent-light)] text-zinc-900 shadow-sm ring-1 ring-amber-500/25"
            : "text-zinc-500 hover:text-zinc-800 hover:bg-white/70"
        }`}
      >
        RU
      </button>
    </div>
  );
}
