"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ro } from "@/lib/locales/ro";
import { ru } from "@/lib/locales/ru";

type Locale = "ro" | "ru";
type Translations = typeof ro;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start with the default locale — reading localStorage in the
  // useState initialiser runs during SSR too, causing a hydration mismatch
  // when the stored value differs from the server-rendered default.
  const [locale, setLocaleState] = useState<Locale>("ro");

  // Restore persisted locale after first render (client-only).
  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved === "ro" || saved === "ru") {
      let cancelled = false;

      queueMicrotask(() => {
        if (!cancelled) {
          setLocaleState(saved);
        }
      });

      return () => {
        cancelled = true;
      };
    }
  }, []);

  // Keep <html lang="…"> in sync so screen readers and browser
  // translation heuristics always reflect the active language.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000; samesite=lax`;
  };

  const t = locale === "ro" ? ro : ru;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
