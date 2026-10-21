import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { isLanguage, LANGUAGE_STORAGE_KEY, translate, type Language } from "@/lib/translations";

const LanguageContext = createContext({
  language: "es" as Language,
  direction: "ltr" as "ltr" | "rtl",
  locale: "es-CA",
  setLanguage: (_language: Language) => {},
  t: (text: string, values?: Record<string, string | number>) => translate("es", text, values),
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, updateLanguage] = useState<Language>("es");
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (isLanguage(saved)) updateLanguage(saved);
    } catch { /* Language selection still works when storage is unavailable. */ }
  }, []);
  const direction = language === "ar" ? "rtl" : "ltr";
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [language, direction]);
  function setLanguage(next: Language) {
    updateLanguage(next);
    try { localStorage.setItem(LANGUAGE_STORAGE_KEY, next); } catch { /* Optional preference storage. */ }
  }
  return (
    <LanguageContext.Provider value={{ language, direction, locale: language === "ar" ? "ar" : `${language}-CA`, setLanguage, t: (text, values) => translate(language, text, values) }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);