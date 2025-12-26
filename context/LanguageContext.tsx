"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ro } from "@/lib/locales/ro";
import { ru } from "@/lib/locales/ru";

type Locale = "ro" | "ru";
type Translations = typeof ro;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      const savedLocale = localStorage.getItem("locale") as Locale;
      if (savedLocale && (savedLocale === "ro" || savedLocale === "ru")) {
        return savedLocale;
      }
    }
    return "ro";
  });

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", newLocale);
    }
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
