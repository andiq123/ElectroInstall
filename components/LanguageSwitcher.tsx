"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-1 p-1 bg-[var(--bg-elevated)] border border-[var(--border-glass)] rounded-full shadow-sm">
      <button
        onClick={() => setLocale("ro")}
        className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full transition-all duration-300 ${
          locale === "ro" 
          ? "bg-[var(--accent)] text-black shadow-md" 
          : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
        }`}
      >
        RO
      </button>
      <button
        onClick={() => setLocale("ru")}
        className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full transition-all duration-300 ${
          locale === "ru" 
          ? "bg-[var(--accent)] text-black shadow-md" 
          : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
        }`}
      >
        RU
      </button>
    </div>
  );
}
